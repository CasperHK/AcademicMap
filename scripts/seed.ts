/**
 * Seed script — run with: bun run scripts/seed.ts
 *
 * Creates the database schema and loads seed data from
 * database/seeds/nodes.json and database/seeds/edges.json.
 */

import { Database } from "bun:sqlite";
import { readFileSync } from "fs";
import { join } from "path";

const DB_PATH = join(import.meta.dir, "..", "database", "academic.db");
const SCHEMA_PATH = join(import.meta.dir, "..", "database", "schema.sql");
const NODES_PATH = join(import.meta.dir, "..", "database", "seeds", "nodes.json");
const EDGES_PATH = join(import.meta.dir, "..", "database", "seeds", "edges.json");
const NODE_TRANSLATIONS_PATH = join(
  import.meta.dir,
  "..",
  "database",
  "seeds",
  "nodeTranslations.json"
);
const EDGE_TRANSLATIONS_PATH = join(
  import.meta.dir,
  "..",
  "database",
  "seeds",
  "edgeTranslations.json"
);
const UNIVERSITY_RANKINGS_PATH = join(
  import.meta.dir,
  "..",
  "database",
  "seeds",
  "universityRankings.json"
);

interface NodeRow {
  id: string;
  label: string;
  type: string;
  description: string | null;
}

interface EdgeRow {
  id: string;
  source: string;
  target: string;
  label: string | null;
}

interface NodeTranslationRow {
  node_id: string;
  locale: string;
  label: string;
  description: string | null;
}

interface EdgeTranslationRow {
  edge_id: string;
  locale: string;
  label: string;
}

interface UniversityRankingRow {
  id: string;
  node_id: string;
  rank: number;
  university: string;
  country: string;
}

const db = new Database(DB_PATH, { create: true });

// Apply schema
const schema = readFileSync(SCHEMA_PATH, "utf-8");
db.exec(schema);

// Seed nodes
const nodes: NodeRow[] = JSON.parse(readFileSync(NODES_PATH, "utf-8"));
const insertNode = db.prepare(
  "INSERT OR REPLACE INTO nodes (id, label, type, description) VALUES ($id, $label, $type, $description)"
);

for (const node of nodes) {
  insertNode.run({
    $id: node.id,
    $label: node.label,
    $type: node.type,
    $description: node.description ?? null,
  });
}

console.log(`✅ Inserted ${nodes.length} nodes.`);

// Seed edges
const edges: EdgeRow[] = JSON.parse(readFileSync(EDGES_PATH, "utf-8"));
const insertEdge = db.prepare(
  "INSERT OR REPLACE INTO edges (id, source, target, label) VALUES ($id, $source, $target, $label)"
);

for (const edge of edges) {
  insertEdge.run({
    $id: edge.id,
    $source: edge.source,
    $target: edge.target,
    $label: edge.label ?? null,
  });
}

console.log(`✅ Inserted ${edges.length} edges.`);

// Seed node translations
const nodeTranslations: NodeTranslationRow[] = JSON.parse(
  readFileSync(NODE_TRANSLATIONS_PATH, "utf-8")
);
const insertNodeTranslation = db.prepare(
  "INSERT OR REPLACE INTO node_translations (node_id, locale, label, description) VALUES ($node_id, $locale, $label, $description)"
);

for (const row of nodeTranslations) {
  insertNodeTranslation.run({
    $node_id: row.node_id,
    $locale: row.locale,
    $label: row.label,
    $description: row.description ?? null,
  });
}

console.log(`✅ Inserted ${nodeTranslations.length} node translations.`);

// Seed edge translations
const edgeTranslations: EdgeTranslationRow[] = JSON.parse(
  readFileSync(EDGE_TRANSLATIONS_PATH, "utf-8")
);
const insertEdgeTranslation = db.prepare(
  "INSERT OR REPLACE INTO edge_translations (edge_id, locale, label) VALUES ($edge_id, $locale, $label)"
);

for (const row of edgeTranslations) {
  insertEdgeTranslation.run({
    $edge_id: row.edge_id,
    $locale: row.locale,
    $label: row.label,
  });
}

console.log(`✅ Inserted ${edgeTranslations.length} edge translations.`);

// Seed university rankings
const universityRankings: UniversityRankingRow[] = JSON.parse(
  readFileSync(UNIVERSITY_RANKINGS_PATH, "utf-8")
);
const insertUniversityRanking = db.prepare(
  "INSERT OR REPLACE INTO university_rankings (id, node_id, rank, university, country) VALUES ($id, $node_id, $rank, $university, $country)"
);

for (const row of universityRankings) {
  insertUniversityRanking.run({
    $id: row.id,
    $node_id: row.node_id,
    $rank: row.rank,
    $university: row.university,
    $country: row.country,
  });
}

console.log(`✅ Inserted ${universityRankings.length} university rankings.`);

db.close();
console.log("🎉 Seed complete:", DB_PATH);
