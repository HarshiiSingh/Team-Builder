"use client";
import {
  ReactFlow,
  Background,
  Controls,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
export default function BoardEditor() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <ReactFlow>
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
