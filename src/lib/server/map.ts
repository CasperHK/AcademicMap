import { cache } from "@solidjs/router";
import { mapToGraphElements } from "~/lib/db/mappers/graph";
import { getAllEdges, getEdgesByNodeId } from "~/lib/db/queries/edges";
import { getAllNodes, getNodeById, getNodesByIds } from "~/lib/db/queries/nodes";
import { getRankingsByNodeId } from "~/lib/db/queries/rankings";
import type { AcademicDetailData, AcademicRelation, GraphElements } from "~/types/graph";
import { parseLocale } from "~/lib/i18n";

export const getMapData = cache(async (locale: string): Promise<GraphElements> => {
  "use server";
  const normalizedLocale = parseLocale(locale);
  const nodes = getAllNodes(normalizedLocale);
  const edges = getAllEdges(normalizedLocale);
  return mapToGraphElements(nodes, edges);
}, "mapData");

export const getAcademicDetailData = cache(async (academicCode: string, locale: string): Promise<AcademicDetailData | null> => {
  "use server";
  const normalizedLocale = parseLocale(locale);
  const academic = getNodeById(academicCode, normalizedLocale);

  if (!academic) {
    return null;
  }

  const edges = getEdgesByNodeId(academicCode, normalizedLocale);
  const relatedIds = Array.from(
    new Set(
      edges.flatMap((edge) => [edge.source, edge.target])
    )
  );
  const relatedNodes = getNodesByIds(relatedIds, normalizedLocale);
  const nodeById = new Map(relatedNodes.map((node) => [node.id, node]));

  const relatedAcademics: AcademicRelation[] = edges
    .map((edge) => {
      const relatedId = edge.source === academicCode ? edge.target : edge.source;
      const node = nodeById.get(relatedId);

      if (!node) {
        return null;
      }

      return {
        node,
        edge,
        direction: edge.source === academicCode ? "outgoing" : "incoming",
      } as AcademicRelation;
    })
    .filter((relation): relation is AcademicRelation => relation !== null)
    .sort((left, right) => left.node.label.localeCompare(right.node.label));

  return {
    academic,
    relatedAcademics,
    rankings: getRankingsByNodeId(academicCode),
    graph: mapToGraphElements(relatedNodes, edges),
  };
}, "academicDetailData");
