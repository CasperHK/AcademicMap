import type { DbEdge } from "~/types/graph";
import { getDb } from "../client";

export function getAllEdges(): DbEdge[] {
  const db = getDb();
  return db
    .query<DbEdge, []>("SELECT id, source, target, label FROM edges")
    .all();
}

export function getEdgesByNodeId(nodeId: string): DbEdge[] {
  const db = getDb();
  return db
    .query<DbEdge, { $nodeId: string }>(
      "SELECT id, source, target, label FROM edges WHERE source = $nodeId OR target = $nodeId"
    )
    .all({ $nodeId: nodeId });
}
