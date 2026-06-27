import BetterSqlite3 from "better-sqlite3";
import { join } from "path";

const DB_PATH = process.env.DATABASE_PATH
  ? join(process.cwd(), process.env.DATABASE_PATH)
  : join(process.cwd(), "database", "academic.db");

/** Returns a shared SQLite connection for the current process. */
let db: BetterSqlite3.Database | null = null;

export function getDb(): BetterSqlite3.Database {
  if (!db) {
    db = new BetterSqlite3(DB_PATH);
  }

  return db;
}
