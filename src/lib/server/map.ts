import { cache } from "@solidjs/router";
import { mapToGraphElements } from "~/lib/db/mappers/graph";
import { getAllEdges } from "~/lib/db/queries/edges";
import { getAllNodes } from "~/lib/db/queries/nodes";
import type { GraphElements } from "~/types/graph";

export const getMapData = cache(async (): Promise<GraphElements> => {
  "use server";
  const nodes = getAllNodes();
  const edges = getAllEdges();
  return mapToGraphElements(nodes, edges);
}, "mapData");
