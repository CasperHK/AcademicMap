import type { DbEdge, Locale } from "~/types/graph";
import { getDb } from "../client";

export function getAllEdges(locale: Locale): DbEdge[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT
        e.id,
        e.source,
        e.target,
        COALESCE(et.label, e.label) AS label
      FROM edges e
      LEFT JOIN edge_translations et
        ON et.edge_id = e.id
       AND et.locale = ?
      ORDER BY e.id`
    )
    .all(locale) as DbEdge[];
}

export function getEdgesByNodeId(nodeId: string, locale: Locale): DbEdge[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT
        e.id,
        e.source,
        e.target,
        COALESCE(et.label, e.label) AS label
      FROM edges e
      LEFT JOIN edge_translations et
        ON et.edge_id = e.id
       AND et.locale = ?
      WHERE e.source = ? OR e.target = ?
      ORDER BY e.id`
    )
    .all(locale, nodeId, nodeId) as DbEdge[];
}
