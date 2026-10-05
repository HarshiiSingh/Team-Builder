"use client";
import {
  ReactFlow,
  Background,
  Controls,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { ReactFlowInstance } from "@xyflow/react";
import type { BoardNode } from "@/core/board";
import type { Character } from "@/core/character";
import CharacterNode, { type CharacterFlowNode } from "./character-node";
import { useState } from "react";
interface BoardEditorProps {
  characters: Character[];
}

const nodeTypes = {
  character: CharacterNode,
};
export default function BoardEditor({ characters }: BoardEditorProps) {
  //   const sampleNode: BoardNode = {
  //     id: "node-1",
  //     characterId: "anby",
  //     position: { x: 100, y: 100 },
  //   };

  const [boardNodes, setBoardNodes] = useState<BoardNode[]>([]);
  console.log("Current boardNodes:", boardNodes);
  const [flowInstance, setFlowInstance] =
    useState<ReactFlowInstance<CharacterFlowNode> | null>(null);

  const [nodeMeasurements, setNodeMeasurements] = useState<Record<string, { width: number; height: number } | undefined>>({});
  const [nodeSelections, setNodeSelections] = useState<Record<string, boolean>>({});
  const flowNodes: CharacterFlowNode[] = boardNodes.map((boardNode) => {
    const character = characters.find(
      (character) => character.id === boardNode.characterId,
    );
    return {
      id: boardNode.id,
      type: "character",
      position: boardNode.position,
      data: {
        image: character?.image,
        label: character?.name ?? "Unknown character",
      },
      measured: nodeMeasurements[boardNode.id],
      selected: nodeSelections[boardNode.id] ?? false,
    };
  });
  function addBoardNode(characterId: string, position: BoardNode["position"]) {
    const newNode: BoardNode = {
      id: crypto.randomUUID(),
      characterId,
      position,
    };
    setBoardNodes((currentNodes) => [...currentNodes, newNode]);
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <ReactFlow
        nodes={flowNodes}
        nodeTypes={nodeTypes}
        onDragOver={(event) => {
          event.preventDefault();
          event.dataTransfer.dropEffect = "copy";
        }}
        onDrop={(event) => {
          event.preventDefault();

          const characterId = event.dataTransfer.getData(
            "application/x-character-id",
          );
          if (!flowInstance) return;
          const characterExists = characters.some(
            (character) => character.id === characterId,
          );
          if (!characterExists) return;

          const position = flowInstance.screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          });
          addBoardNode(characterId, position);
        }}
        onInit={setFlowInstance}
        onNodesChange={(changes) => {
          console.log(
            "Change types:",
            changes.map((change) => change.type),
          );
          console.log("Node Changes:", changes);
          // boardNodes.map((boardNode) => {
          //   const changeNode = changes.find((change) => change.type === "position" && change.id ===  boardNode.id)
          //   if (changeNode?.type === "position" && changeNode.position) {
          //     return {...boardNode, position: changeNode.position}
          //   } else {
          //     return boardNode
          //   }

          // })
          const selectionChanges = changes.filter((change) => change.type === "select");
          console.log("selectionChange: ", selectionChanges);
          setNodeSelections((currentSelections) => {
            console.log("currentSelections: ", currentSelections);
                let nextSelections = currentSelections;
                for (const select of selectionChanges) {
                  nextSelections = {
                    ...nextSelections,
                    [select.id]: select.selected,
                  }
                }
                return nextSelections;
          });
          const dimensionChanges = changes.filter(
            (change) => change.type === "dimensions",
          );
          console.log("dimension:", dimensionChanges);
          setNodeMeasurements((currentMeasurements) => {
            console.log("currentMeasurements:", currentMeasurements);
            let nextMeasurements = currentMeasurements;
            for (const change of dimensionChanges) {
              console.log("Dimension change:", change);
              if (!change.dimensions) continue;
              const previousMeasurement = nextMeasurements[change.id];
              if (previousMeasurement?.width === change.dimensions.width && previousMeasurement?.height === change.dimensions.height) continue;
              nextMeasurements = {
                ...nextMeasurements,
                [change.id]: change.dimensions,
              };
            }
            return nextMeasurements;
          });
          // Ignore batches without position updates: map() creates a new state array
          // even when every node is unchanged, which can trigger a measurement/render loop.
          const hasPositionChange = changes.some(
            (change) => change.type === "position" && change.position,
          );
          if (!hasPositionChange) return;
          setBoardNodes((currentNodes) =>
            currentNodes.map((boardNode) => {
              const changeNode = changes.find(
                (change) =>
                  change.type === "position" && change.id === boardNode.id,
              );
              if (changeNode?.type === "position" && changeNode.position) {
                return { ...boardNode, position: changeNode.position };
              } else {
                return boardNode;
              }
            }),
          );
        }}
      >
        <Background
          id="1"
          bgColor="Black"
          color="White"
          variant={BackgroundVariant.Dots}
        />
        <Controls showZoom={true} showInteractive={true} />
      </ReactFlow>
    </div>
  );
}
