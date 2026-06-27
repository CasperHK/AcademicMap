import cytoscape from "cytoscape";
import { createSignal, onCleanup, onMount, type Component } from "solid-js";
import type { GraphElements } from "~/types/graph";

interface AcademicMapCanvasProps {
  elements: GraphElements;
}

const AcademicMapCanvas: Component<AcademicMapCanvasProps> = (props) => {
  let containerRef: HTMLDivElement | undefined;
  let cy: cytoscape.Core | undefined;
  const [selectedLabel, setSelectedLabel] = createSignal<string | null>(null);

  onMount(() => {
    if (!containerRef) return;

    cy = cytoscape({
      container: containerRef,
      elements: [
        ...props.elements.nodes,
        ...props.elements.edges,
      ],
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
      setSelectedLabel(node.data("label") as string);
    });

    cy.on("tap", (evt) => {
      if (evt.target === cy) setSelectedLabel(null);
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

      {selectedLabel() && (
        <div class="absolute bottom-4 left-4 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-white shadow-lg">
          Selected: <span class="font-semibold">{selectedLabel()}</span>
        </div>
      )}
    </div>
  );
};

export default AcademicMapCanvas;
