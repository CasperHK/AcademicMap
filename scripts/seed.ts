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

db.close();
console.log("🎉 Seed complete:", DB_PATH);
