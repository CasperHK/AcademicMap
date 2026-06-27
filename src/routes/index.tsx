import { createAsync } from "@solidjs/router";
import { Suspense, type Component } from "solid-js";
import AcademicMapCanvas from "~/components/graph/AcademicMapCanvas";
import AppShell from "~/components/layout/AppShell";
import { getMapData } from "~/lib/server/map";

const MapPage: Component = () => {
  const data = createAsync(() => getMapData());

  return (
    <AppShell>
      <Suspense
        fallback={
          <div class="flex h-full w-full items-center justify-center">
            <span class="animate-pulse text-slate-400">Loading map…</span>
          </div>
        }
      >
        {data() && <AcademicMapCanvas elements={data()!} />}
      </Suspense>
    </AppShell>
  );
};

export default MapPage;
