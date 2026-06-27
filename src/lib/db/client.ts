import { Database } from "bun:sqlite";
import { join } from "path";

const DB_PATH = process.env.DATABASE_PATH
  ? join(process.cwd(), process.env.DATABASE_PATH)
  : join(process.cwd(), "database", "academic.db");

/** Returns a shared SQLite connection for the current process. */
export function getDb(): Database {
  return new Database(DB_PATH, { create: true });
}
