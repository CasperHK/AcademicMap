# Production image for Academic Map
# Build: docker build -f docker/app/Dockerfile -t academic-map .

FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

# Copy source
COPY . .

# Build the app
RUN bun run build

# Runtime stage — leaner image
FROM oven/bun:1-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=base /app/.output ./.output
COPY --from=base /app/database ./database

EXPOSE 3000

CMD ["bun", "run", ".output/server/index.mjs"]
