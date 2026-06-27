# 🤖 AI Agent Guidelines (AGENTS.md)

Welcome! This document provides crucial context, architectural boundaries, and coding standards for this project. Before generating code, refactoring, or fixing bugs, please read and strictly adhere to these instructions.

---

## 🎯 Core Project Context

- **Goal**: Build an interactive Academic System Relationship Map (visualizing connections, prerequisites, and overlaps between fields, majors, and research areas).
- **Architecture**: Monorepo fueled by **SolidStart** (Full-stack framework).
- **Data Flow**: SQLite DB ➔ SolidStart Server Functions (RPC) ➔ SolidJS Fine-grained Reactive UI ➔ Cytoscape.js Canvas.

---

## 🛠️ Technical Constraints & Rules

### 1. Runtime & Package Management (Bun Only)
- ❌ **NEVER** generate commands for `npm`, `yarn`, or `pnpm`.
- ❌ **NEVER** install external database drivers like `sqlite3` or `better-sqlite3`.
- ⚠️ **Always** use `bun install` and `bun run`.
- ⚠️ **Always** use the built-in native **`bun:sqlite`** driver.

### 2. Database Queries (`bun:sqlite`)
When writing backend code or seed scripts, utilize the native Bun driver pattern:

```typescript
import { Database } from "bun:sqlite";

// Open connection
const db = new Database("academic.db");

// Query multiple rows (Must use .all())
const nodes = db.query("SELECT * FROM nodes").all();

// Query a single row (Must use .get())
const node = db.query("SELECT * FROM nodes WHERE id = id").get( id: "cs" });
```

### 3. SSR Boundary & Client-Side Libraries
- Cytoscape.js and other graph visualization libraries (like D3.js) **DO NOT support Server-Side Rendering (SSR)** because they rely directly on the browser DOM.
- ❌ **Incorrect**: Initializing Cytoscape at the top-level of a component or during server execution.
- ⚠️ **Correct**: Always wrap canvas initialization inside SolidJS's `onMount` lifecycle hook to ensure it runs exclusively on the client.

### 4. Data Fetching & RPC (Server Functions)
- Communication between the frontend and the SQLite database should leverage SolidStart Server Functions (`"use server"`).
- Use SolidStart's `cache` and `createAsync` to handle asynchronous data loading gracefully.

Recommended pattern:
```tsx
import { cache, createAsync } from "@solidjs/router";

// Server-side fetcher
const getMapData = cache(async () => {
  "use server";
  import { Database } from "bun:sqlite";
  const db = new Database("academic.db");
  return {
    nodes: db.query("SELECT id, label, description FROM nodes").all(),
    edges: db.query("SELECT id, source, target, label FROM edges").all()
  };
}, "mapData");
```

---

## 🧩 Feature Implementation Checklist

When tasked with creating new features, verify that:
- [ ] Database updates respect SQLite Foreign Key constraints (`edges.source` ➔ `nodes.id`).
- [ ] The Cytoscape canvas handles dynamic container resizing to avoid broken viewports.
- [ ] Async operations have loading states (e.g., Skeleton loaders or UI overlays).
- [ ] TypeScript types match Cytoscape’s native `ElementsDefinition` or `ElementDefinition[]` structures.

---

## 🛡️ Code Style Preferences

- **Fine-grained Reactivity**: Prefer using specific signals (`createSignal`, `createMemo`) instead of forcing large-scale component re-renders.
- **Tailwind UI**: Use Tailwind CSS for all stylings. Stick to the default dark theme palette (`bg-slate-900`, `text-white`, `border-slate-700`) for visual consistency across new components.
