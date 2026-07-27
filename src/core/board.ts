export interface BoardNode {
    id: string;
    characterId: string;
    position: {
        x: number;
        y: number;
    }
}

export interface BoardEdge {
    id: string;
    sourceNodeId: string;
    targetNodeId: string;
}

export interface Board {
    schemaVersion: number;
    gameId: string;
    nodes: BoardNode[];
    edges: BoardEdge[];
}