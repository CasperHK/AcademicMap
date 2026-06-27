import type { DbNode } from "~/types/graph";
import { getDb } from "../client";

export function getAllNodes(): DbNode[] {
  const db = getDb();
  return db
    .query<DbNode, []>("SELECT id, label, type, description FROM nodes")
    .all();
}

export function getNodeById(id: string): DbNode | null {
  const db = getDb();
  return (
    db
      .query<DbNode, { $id: string }>(
        "SELECT id, label, type, description FROM nodes WHERE id = $id"
      )
      .get({ $id: id }) ?? null
  );
}
