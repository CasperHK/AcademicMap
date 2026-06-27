// Shared graph types used across server queries, mappers, and client components.

export type Locale = "en" | "zh-HK";

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

export interface UniversityRanking {
  id: string;
  node_id: string;
  rank: number;
  university: string;
  country: string;
}

export interface AcademicRelation {
  node: DbNode;
  edge: DbEdge;
  direction: "incoming" | "outgoing";
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

export interface AcademicDetailData {
  academic: DbNode;
  relatedAcademics: AcademicRelation[];
  rankings: UniversityRanking[];
  graph: GraphElements;
}
