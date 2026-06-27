import type {
  CyEdgeElement,
  CyNodeElement,
  DbEdge,
  DbNode,
  GraphElements,
} from "~/types/graph";

export function mapNodeToElement(node: DbNode): CyNodeElement {
  return {
    data: {
      id: node.id,
      label: node.label,
      type: node.type,
      ...(node.description ? { description: node.description } : {}),
    },
  };
}

export function mapEdgeToElement(edge: DbEdge): CyEdgeElement {
  return {
    data: {
      id: edge.id,
      source: edge.source,
      target: edge.target,
      ...(edge.label ? { label: edge.label } : {}),
    },
  };
}

export function mapToGraphElements(
  nodes: DbNode[],
  edges: DbEdge[]
): GraphElements {
  return {
    nodes: nodes.map(mapNodeToElement),
    edges: edges.map(mapEdgeToElement),
  };
}
