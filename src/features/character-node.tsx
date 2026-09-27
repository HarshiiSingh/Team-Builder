import type { Node, NodeProps } from "@xyflow/react";
import Image from "next/image";
import styles from "./character-node.module.css";

export type CharacterFlowNode = Node<{ label: string; image?: string }, "character">;
export default function CharacterNode({ data }: NodeProps<CharacterFlowNode>) {
  return (
    <div className={styles.card}>
      {data.image && (
        <Image
          src={data.image}
          alt={data.label}
          width={75}
          height={75}
          className={styles.portrait}
        />
      )}
      <p className={styles.name}>{data.label}</p>
    </div>
  );
}
