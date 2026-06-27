// Shared graph types used across server queries, mappers, and client components.

/** A single node as stored in the database. */
export interface DbNode {
  id: string;
  label: string;
  type: string;
  description: string | null;
}

/** A single edge as stored in the database. */
export interface DbEdge {
  id: string;
  source: string;
  target: string;
  label: string | null;
}

/** Cytoscape-compatible node element. */
export interface CyNodeElement {
  data: {
    id: string;
    label: string;
    type: string;
    description?: string;
  };
}

/** Cytoscape-compatible edge element. */
export interface CyEdgeElement {
  data: {
    id: string;
    source: string;
    target: string;
    label?: string;
  };
}

/** Full Cytoscape elements payload delivered from server to client. */
export interface GraphElements {
  nodes: CyNodeElement[];
  edges: CyEdgeElement[];
}
