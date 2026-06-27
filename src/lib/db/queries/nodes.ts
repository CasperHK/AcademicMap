import type { DbNode, Locale } from "~/types/graph";
import { getDb } from "../client";

export function getAllNodes(locale: Locale): DbNode[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT
        n.id,
        COALESCE(nt.label, n.label) AS label,
        n.type,
        COALESCE(nt.description, n.description) AS description
      FROM nodes n
      LEFT JOIN node_translations nt
        ON nt.node_id = n.id
       AND nt.locale = ?
      ORDER BY n.id`
    )
    .all(locale) as DbNode[];
}

export function getNodeById(id: string, locale: Locale): DbNode | null {
  const db = getDb();
  return (
    db
      .prepare(
        `SELECT
          n.id,
          COALESCE(nt.label, n.label) AS label,
          n.type,
          COALESCE(nt.description, n.description) AS description
        FROM nodes n
        LEFT JOIN node_translations nt
          ON nt.node_id = n.id
         AND nt.locale = ?
        WHERE n.id = ?`
      )
      .get(locale, id) as DbNode | undefined
  ) ?? null;
}

export function getNodesByIds(ids: string[], locale: Locale): DbNode[] {
  if (ids.length === 0) {
    return [];
  }

  const db = getDb();
  const placeholders = ids.map(() => "?").join(", ");

  return db
    .prepare(
      `SELECT
        n.id,
        COALESCE(nt.label, n.label) AS label,
        n.type,
        COALESCE(nt.description, n.description) AS description
      FROM nodes n
      LEFT JOIN node_translations nt
        ON nt.node_id = n.id
       AND nt.locale = ?
      WHERE n.id IN (${placeholders})
      ORDER BY n.label`
    )
    .all(locale, ...ids) as DbNode[];
}
