import cytoscape from "cytoscape";
import { createEffect, createSignal, onCleanup, onMount, type Component } from "solid-js";
import type { GraphElements } from "~/types/graph";
import type { Locale } from "~/types/graph";
import { UI_COPY } from "~/lib/i18n";

interface AcademicMapCanvasProps {
  elements: GraphElements;
  locale: Locale;
  detailHrefBase?: string;
}

const AcademicMapCanvas: Component<AcademicMapCanvasProps> = (props) => {
  let containerRef: HTMLDivElement | undefined;
  let cy: cytoscape.Core | undefined;
  const [selectedNode, setSelectedNode] = createSignal<{ id: string; label: string } | null>(null);

  createEffect(() => {
    if (!cy) return;

    cy.elements().remove();
    cy.add([
      ...props.elements.nodes,
      ...props.elements.edges,
    ]);
    cy.layout({
      name: "cose",
      animate: false,
    }).run();
    setSelectedNode(null);
  });

  onMount(() => {
    if (!containerRef) return;

    cy = cytoscape({
      container: containerRef,
      elements: [],
      style: [
        {
          selector: "node",
          style: {
            "background-color": "#3b82f6",
            label: "data(label)",
            color: "#ffffff",
            "font-size": "12px",
            "text-valign": "center",
            "text-halign": "center",
            width: 60,
            height: 60,
          },
        },
        {
          selector: "node[type='field']",
          style: { "background-color": "#7c3aed" },
        },
        {
          selector: "node[type='major']",
          style: { "background-color": "#0891b2" },
        },
        {
          selector: "node[type='research']",
          style: { "background-color": "#059669" },
        },
        {
          selector: "node:selected",
          style: { "border-width": 3, "border-color": "#f59e0b" },
        },
        {
          selector: "edge",
          style: {
            width: 2,
            "line-color": "#475569",
            "target-arrow-color": "#475569",
            "target-arrow-shape": "triangle",
            "curve-style": "bezier",
            label: "data(label)",
            "font-size": "10px",
            color: "#94a3b8",
          },
        },
      ],
      layout: {
        name: "cose",
        animate: true,
      },
      userZoomingEnabled: true,
      userPanningEnabled: true,
    });

    cy.on("tap", "node", (evt) => {
      const node = evt.target;
      setSelectedNode({
        id: node.data("id") as string,
        label: node.data("label") as string,
      });
    });

    cy.on("tap", (evt) => {
      if (evt.target === cy) setSelectedNode(null);
    });

    const handleResize = () => cy?.resize();
    window.addEventListener("resize", handleResize);
    onCleanup(() => {
      window.removeEventListener("resize", handleResize);
      cy?.destroy();
    });
  });

  return (
    <div class="relative h-full w-full">
      <div ref={containerRef} class="h-full w-full" />

      {selectedNode() && (
        <div class="absolute bottom-4 left-4 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-white shadow-lg">
          <div>
            {UI_COPY[props.locale].selected}: <span class="font-semibold">{selectedNode()!.label}</span>
          </div>
          {props.detailHrefBase && (
            <a
              class="mt-2 inline-block text-cyan-300 transition hover:text-cyan-200"
              href={`${props.detailHrefBase}${selectedNode()!.id}?lang=${props.locale}`}
            >
              {UI_COPY[props.locale].viewDetails}
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default AcademicMapCanvas;
