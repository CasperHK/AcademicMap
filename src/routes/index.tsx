import { createAsync, useSearchParams } from "@solidjs/router";
import { Suspense, type Component } from "solid-js";
import AcademicMapCanvas from "~/components/graph/AcademicMapCanvas";
import AppShell from "~/components/layout/AppShell";
import { UI_COPY, parseLocale } from "~/lib/i18n";
import { getMapData } from "~/lib/server/map";

const MapPage: Component = () => {
  const [searchParams] = useSearchParams();
  const locale = () => parseLocale(searchParams.lang);
  const data = createAsync(() => getMapData(locale()));

  return (
    <AppShell locale={locale()}>
      <Suspense
        fallback={
          <div class="flex h-full w-full items-center justify-center">
            <span class="animate-pulse text-slate-400">{UI_COPY[locale()].loading}</span>
          </div>
        }
      >
        {data() && (
          <AcademicMapCanvas
            elements={data()!}
            locale={locale()}
            detailHrefBase="/academic/"
          />
        )}
      </Suspense>
    </AppShell>
  );
};

export default MapPage;
