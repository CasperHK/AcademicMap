-- Academic Map database schema
-- Compatible with bun:sqlite

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS nodes (
  id          TEXT PRIMARY KEY,
  label       TEXT NOT NULL,
  type        TEXT NOT NULL CHECK (type IN ('field', 'major', 'research')),
  description TEXT
);

CREATE TABLE IF NOT EXISTS edges (
  id      TEXT PRIMARY KEY,
  source  TEXT NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
  target  TEXT NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
  label   TEXT
);
