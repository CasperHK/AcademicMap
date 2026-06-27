import { createAsync, useParams, useSearchParams } from "@solidjs/router";
import { Suspense, type Component } from "solid-js";
import AcademicMapCanvas from "~/components/graph/AcademicMapCanvas";
import AppShell from "~/components/layout/AppShell";
import { UI_COPY, parseLocale } from "~/lib/i18n";
import { getAcademicDetailData } from "~/lib/server/map";

function getTypeLabel(type: string, locale: ReturnType<typeof parseLocale>): string {
  if (type === "field") {
    return UI_COPY[locale].typeField;
  }

  if (type === "major") {
    return UI_COPY[locale].typeMajor;
  }

  return UI_COPY[locale].typeResearch;
}

const AcademicDetailPage: Component = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const locale = () => parseLocale(searchParams.lang);
  const detail = createAsync(() => getAcademicDetailData(params.academic_code, locale()));

  return (
    <AppShell locale={locale()}>
      <Suspense
        fallback={
          <div class="flex h-full w-full items-center justify-center">
            <span class="animate-pulse text-slate-400">{UI_COPY[locale()].loading}</span>
          </div>
        }
      >
        {detail() ? (
          <div class="grid h-full flex-1 gap-6 overflow-auto p-6 xl:grid-cols-[minmax(340px,420px)_minmax(0,1fr)]">
            <div class="space-y-6">
              <div class="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/40">
                <div class="mb-3 flex items-start justify-between gap-4">
                  <div>
                    <h2 class="text-2xl font-semibold text-white">{detail()!.academic.label}</h2>
                    <p class="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                      {UI_COPY[locale()].academicCode}: {detail()!.academic.id}
                    </p>
                  </div>

                  <a
                    class="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 transition hover:border-slate-500 hover:text-white"
                    href={`/?lang=${locale()}`}
                  >
                    {UI_COPY[locale()].backToMap}
                  </a>
                </div>

                <h3 class="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
                  {UI_COPY[locale()].intro}
                </h3>
                <p class="leading-7 text-slate-300">
                  {detail()!.academic.description ?? "-"}
                </p>
              </div>

              <div class="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/40">
                <h3 class="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
                  {UI_COPY[locale()].relatedAcademics}
                </h3>

                {detail()!.relatedAcademics.length > 0 ? (
                  <div class="space-y-3">
                    {detail()!.relatedAcademics.map((relation) => (
                      <a
                        class="block rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 transition hover:border-slate-600 hover:bg-slate-950"
                        href={`/academic/${relation.node.id}?lang=${locale()}`}
                      >
                        <div class="flex items-center justify-between gap-3">
                          <span class="font-medium text-white">{relation.node.label}</span>
                          <span class="rounded-full border border-slate-700 px-2 py-0.5 text-[11px] uppercase tracking-[0.15em] text-slate-400">
                            {getTypeLabel(relation.node.type, locale())}
                          </span>
                        </div>
                        <div class="mt-2 text-sm text-slate-400">
                          <span class="text-slate-500">{UI_COPY[locale()].relation}:</span>{" "}
                          {relation.edge.label ?? "-"}
                        </div>
                        <div class="mt-1 text-xs text-slate-500">
                          {relation.direction === "incoming"
                            ? UI_COPY[locale()].directionIncoming
                            : UI_COPY[locale()].directionOutgoing}
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p class="text-sm text-slate-400">{UI_COPY[locale()].noRelated}</p>
                )}
              </div>

              <div class="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/40">
                <h3 class="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
                  {UI_COPY[locale()].topUniversities}
                </h3>

                {detail()!.rankings.length > 0 ? (
                  <div class="overflow-hidden rounded-xl border border-slate-800">
                    <table class="min-w-full divide-y divide-slate-800 text-sm">
                      <thead class="bg-slate-950/80 text-left text-slate-400">
                        <tr>
                          <th class="px-4 py-3 font-medium">#</th>
                          <th class="px-4 py-3 font-medium">{UI_COPY[locale()].university}</th>
                          <th class="px-4 py-3 font-medium">{UI_COPY[locale()].country}</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-800 bg-slate-950/40 text-slate-200">
                        {detail()!.rankings.map((ranking) => (
                          <tr>
                            <td class="px-4 py-3 font-semibold text-cyan-300">{ranking.rank}</td>
                            <td class="px-4 py-3">{ranking.university}</td>
                            <td class="px-4 py-3 text-slate-400">{ranking.country}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p class="text-sm text-slate-400">{UI_COPY[locale()].noRankings}</p>
                )}
              </div>
            </div>

            <div class="flex min-h-[520px] flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/40">
              <div class="mb-4">
                <h3 class="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
                  {UI_COPY[locale()].firstLevelGraph}
                </h3>
              </div>

              <div class="min-h-0 flex-1 overflow-hidden rounded-xl border border-slate-800 bg-slate-950/50">
                <AcademicMapCanvas
                  detailHrefBase="/academic/"
                  elements={detail()!.graph}
                  locale={locale()}
                />
              </div>
            </div>
          </div>
        ) : (
          <div class="flex h-full w-full items-center justify-center p-6">
            <div class="rounded-2xl border border-slate-800 bg-slate-900/70 px-6 py-5 text-slate-300 shadow-lg shadow-slate-950/40">
              {UI_COPY[locale()].notFound}
            </div>
          </div>
        )}
      </Suspense>
    </AppShell>
  );
};

export default AcademicDetailPage;