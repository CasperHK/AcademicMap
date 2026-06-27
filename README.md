# 🎓 Academic Map

**學術體系關係圖 (Academic System Relationship Map)**

An interactive graph visualising connections, prerequisites, and overlaps between academic fields, majors, and research areas. Built with **SolidStart**, **Bun**, **SQLite (`bun:sqlite`)**, **Tailwind CSS**, and **Cytoscape.js**.

## ✨ Features

- ⚡ **Fine-grained reactivity** — SolidJS signals keep the UI snappy even with large graphs.
- 🗄️ **SQLite backend** — lightweight, zero-dependency database via the native `bun:sqlite` driver.
- 🎨 **Interactive canvas** — Cytoscape.js powers drag, zoom, COSE auto-layout, and node selection.
- 🌙 **Dark-first UI** — Tailwind CSS with a `slate-900` base theme.
- 🐳 **Docker-ready** — one-command dev environment with `docker compose up`.

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | [Bun](https://bun.sh) |
| Full-stack framework | [SolidStart](https://start.solidjs.com) |
| Graph visualisation | [Cytoscape.js](https://js.cytoscape.org) |
| Database | SQLite via `bun:sqlite` |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |

## 📂 Project Structure

```text
AcademicMap/
├─ src/
│  ├─ app.tsx                          # Root SolidStart app
│  ├─ entry-client.tsx
│  ├─ entry-server.tsx
│  ├─ routes/
│  │  └─ index.tsx                     # Map homepage
│  ├─ components/
│  │  ├─ graph/
│  │  │  └─ AcademicMapCanvas.tsx      # Cytoscape canvas (client-only via onMount)
│  │  └─ layout/
│  │     └─ AppShell.tsx
│  ├─ lib/
│  │  ├─ db/
│  │  │  ├─ client.ts                  # bun:sqlite connection helper
│  │  │  ├─ queries/                   # SQL query functions
│  │  │  └─ mappers/                   # DB rows → Cytoscape elements
│  │  └─ server/
│  │     └─ map.ts                     # Cached "use server" functions
│  ├─ types/
│  │  └─ graph.ts
│  └─ styles/
│     └─ app.css
├─ database/
│  ├─ schema.sql
│  └─ seeds/
│     ├─ nodes.json
│     └─ edges.json
├─ scripts/
│  └─ seed.ts                          # bun run scripts/seed.ts
├─ docker/
│  └─ app/
│     ├─ Dockerfile                    # Production image
│     └─ Dockerfile.dev               # Dev image (used by compose)
├─ docker-compose.yml
├─ .dockerignore
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
└─ tailwind.config.ts
```

## 🚀 Local Setup (Bun)

### Prerequisites

- [Bun](https://bun.sh) ≥ 1.1

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/CasperHK/AcademicMap.git
cd AcademicMap

# 2. Install dependencies
bun install

# 3. Create .env from the example
cp .env.example .env

# 4. Seed the database
bun run seed

# 5. Start the development server
bun run dev
```

Open <http://localhost:3000> in your browser.

## 🐳 Docker Setup

```bash
# Start the development environment
docker compose up

# Rebuild after dependency changes
docker compose up --build
```

The app will be available at <http://localhost:3000>.

> **Note:** Seed the database on first launch inside the container:
> ```bash
> docker compose exec app bun run seed
> ```

## 📦 Available Scripts

| Command | Description |
|---|---|
| `bun run dev` | Start dev server with hot reload |
| `bun run build` | Build for production |
| `bun start` | Start production server |
| `bun run seed` | Create DB schema and load seed data |

## 🗺️ Roadmap

- [ ] Node detail panel (click a node to see full description).
- [ ] Filter by node type (field / major / research).
- [ ] Search / highlight by label.
- [ ] Additional seed data covering more academic disciplines.
