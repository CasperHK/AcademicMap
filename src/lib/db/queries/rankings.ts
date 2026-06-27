import type { UniversityRanking } from "~/types/graph";
import { getDb } from "../client";

export function getRankingsByNodeId(nodeId: string): UniversityRanking[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT
        id,
        node_id,
        rank,
        university,
        country
      FROM university_rankings
      WHERE node_id = ?
      ORDER BY rank ASC`
    )
    .all(nodeId) as UniversityRanking[];
}