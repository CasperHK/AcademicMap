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

CREATE TABLE IF NOT EXISTS node_translations (
  node_id      TEXT NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
  locale       TEXT NOT NULL,
  label        TEXT NOT NULL,
  description  TEXT,
  PRIMARY KEY (node_id, locale)
);

CREATE TABLE IF NOT EXISTS edge_translations (
  edge_id  TEXT NOT NULL REFERENCES edges(id) ON DELETE CASCADE,
  locale   TEXT NOT NULL,
  label    TEXT NOT NULL,
  PRIMARY KEY (edge_id, locale)
);

CREATE TABLE IF NOT EXISTS university_rankings (
  id          TEXT PRIMARY KEY,
  node_id     TEXT NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
  rank        INTEGER NOT NULL,
  university  TEXT NOT NULL,
  country     TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_node_translations_locale
  ON node_translations(locale);

CREATE INDEX IF NOT EXISTS idx_edge_translations_locale
  ON edge_translations(locale);

CREATE INDEX IF NOT EXISTS idx_university_rankings_node_id
  ON university_rankings(node_id, rank);
