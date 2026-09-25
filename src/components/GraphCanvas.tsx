import React from 'react';
import { GraphData, Vertex, Edge } from '../types';

interface GraphCanvasProps {
  graph: GraphData;
  activeVertex?: string | null;
  visitedVertices?: string[];
  treeVertices?: string[];
  activeEdge?: { source: string; target: string } | null;
  selectedEdges?: { source: string; target: string }[];
  rejectedEdge?: { source: string; target: string } | null;
  candidateEdges?: { source: string; target: string }[];
  distances?: Record<string, number>;
  onVertexClick?: (vertex: Vertex) => void;
  onEdgeClick?: (edge: Edge) => void;
  width?: number;
  height?: number;
  interactive?: boolean;
}

export const GraphCanvas: React.FC<GraphCanvasProps> = ({
  graph,
  activeVertex,
  visitedVertices = [],
  treeVertices = [],
  activeEdge,
  selectedEdges = [],
  rejectedEdge,
  candidateEdges = [],
  distances,
  onVertexClick,
  onEdgeClick,
  width = 460,
  height = 360,
  interactive = true,
}) => {
  // Compute auto-fit bounding box across all vertices
  const PADDING = 45; // Space for vertex radius (19-26px) + labels + distance badges (-27px) + arrowheads + stroke
  const TOP_EXTRA_PADDING = distances && Object.values(distances).some((d) => d !== Infinity) ? 20 : 0;

  let computedMinX = Infinity;
  let computedMaxX = -Infinity;
  let computedMinY = Infinity;
  let computedMaxY = -Infinity;

  const positions: Record<string, { x: number; y: number }> = {};

  graph.vertices.forEach((v, idx) => {
    let px: number;
    let py: number;

    if (v.x !== undefined && v.y !== undefined) {
      px = v.x;
      py = v.y;
    } else {
      // Fallback circle layout
      const total = Math.max(graph.vertices.length, 1);
      const angle = (idx / total) * 2 * Math.PI - Math.PI / 2;
      px = width / 2 + (Math.min(width, height) / 2.6) * Math.cos(angle);
      py = height / 2 + (Math.min(width, height) / 2.6) * Math.sin(angle);
    }

    positions[v.id] = { x: px, y: py };

    if (px < computedMinX) computedMinX = px;
    if (px > computedMaxX) computedMaxX = px;
    if (py < computedMinY) computedMinY = py;
    if (py > computedMaxY) computedMaxY = py;
  });

  const getVertexPos = (id: string): { x: number; y: number } => {
    if (positions[id]) return positions[id];
    const v = graph.vertices.find((item) => item.id === id);
    if (v && v.x !== undefined && v.y !== undefined) return { x: v.x, y: v.y };
    return { x: width / 2, y: height / 2 };
  };

  // Safe fallback if graph has 0 or 1 vertices or equal min/max
  let vbX = 0;
  let vbY = 0;
  let vbWidth = width;
  let vbHeight = height;

  if (graph.vertices.length > 0 && computedMinX !== Infinity) {
    const rawMinX = computedMinX - PADDING;
    const rawMaxX = computedMaxX + PADDING;
    const rawMinY = computedMinY - PADDING - TOP_EXTRA_PADDING;
    const rawMaxY = computedMaxY + PADDING;

    const spanX = Math.max(rawMaxX - rawMinX, 100);
    const spanY = Math.max(rawMaxY - rawMinY, 100);

    // Keep aspect ratio aligned with canvas width/height container
    const targetAspect = width / height;
    const currentAspect = spanX / spanY;

    if (currentAspect > targetAspect) {
      // Wider than target aspect ratio: expand height centered
      vbWidth = spanX;
      vbHeight = spanX / targetAspect;
      vbX = rawMinX;
      vbY = rawMinY - (vbHeight - spanY) / 2;
    } else {
      // Taller than target aspect ratio: expand width centered
      vbHeight = spanY;
      vbWidth = spanY * targetAspect;
      vbY = rawMinY;
      vbX = rawMinX - (vbWidth - spanX) / 2;
    }
  }

  const isEdgeSelected = (source: string, target: string) => {
    return selectedEdges.some(
      (e) =>
        (e.source === source && e.target === target) ||
        (!graph.directed && e.source === target && e.target === source)
    );
  };

  const isEdgeCandidate = (source: string, target: string) => {
    return candidateEdges.some(
      (e) =>
        (e.source === source && e.target === target) ||
        (!graph.directed && e.source === target && e.target === source)
    );
  };

  const isEdgeActive = (source: string, target: string) => {
    if (!activeEdge) return false;
    return (
      (activeEdge.source === source && activeEdge.target === target) ||
      (!graph.directed && activeEdge.source === target && activeEdge.target === source)
    );
  };

  const isEdgeRejected = (source: string, target: string) => {
    if (!rejectedEdge) return false;
    return (
      (rejectedEdge.source === source && rejectedEdge.target === target) ||
      (!graph.directed && rejectedEdge.source === target && rejectedEdge.target === source)
    );
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-2 bg-surface rounded-2xl border border-border overflow-hidden select-none">
      <svg
        viewBox={`${vbX} ${vbY} ${vbWidth} ${vbHeight}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-auto max-w-[540px] max-h-[420px]"
        style={{ minHeight: '260px' }}
      >
        <defs>
          <marker
            id="arrowhead-default"
            markerWidth="8"
            markerHeight="6"
            refX="22"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill="var(--muted-text)" opacity="0.6" />
          </marker>
          <marker
            id="arrowhead-selected"
            markerWidth="8"
            markerHeight="6"
            refX="22"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill="var(--primary)" />
          </marker>
          <marker
            id="arrowhead-active"
            markerWidth="8"
            markerHeight="6"
            refX="22"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill="#f59e0b" />
          </marker>
        </defs>

        {/* Edges */}
        {graph.edges.map((edge) => {
          const p1 = getVertexPos(edge.source);
          const p2 = getVertexPos(edge.target);
          const selected = isEdgeSelected(edge.source, edge.target);
          const active = isEdgeActive(edge.source, edge.target);
          const rejected = isEdgeRejected(edge.source, edge.target);
          const candidate = isEdgeCandidate(edge.source, edge.target);

          let strokeColor = 'var(--edge-default)';
          let strokeWidth = 2.5;
          let strokeDash = 'none';
          let markerEnd = graph.directed ? 'url(#arrowhead-default)' : undefined;

          if (selected) {
            strokeColor = 'var(--primary)';
            strokeWidth = 4;
            markerEnd = graph.directed ? 'url(#arrowhead-selected)' : undefined;
          } else if (active) {
            strokeColor = '#f59e0b'; // Amber active
            strokeWidth = 3.5;
            markerEnd = graph.directed ? 'url(#arrowhead-active)' : undefined;
          } else if (rejected) {
            strokeColor = '#ef4444'; // Red rejected
            strokeWidth = 3;
            strokeDash = '5,5';
          } else if (candidate) {
            strokeColor = '#3b82f6'; // Blue candidate
            strokeWidth = 3;
            strokeDash = '4,4';
          }

          // Edge midpoint for weight label
          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2;
          // Offset weight label slightly perpendicular
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          const offsetX = (-dy / len) * 12;
          const offsetY = (dx / len) * 12;

          return (
            <g
              key={edge.id}
              className={interactive ? 'cursor-pointer' : ''}
              onClick={() => onEdgeClick && onEdgeClick(edge)}
            >
              <line
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDash}
                markerEnd={markerEnd}
                className="transition-all duration-300"
              />
              {graph.weighted && edge.weight !== undefined && (
                <g transform={`translate(${midX + offsetX}, ${midY + offsetY})`}>
                  <circle r="11" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="text-[12px] font-bold fill-primary font-mono select-none"
                  >
                    {edge.weight}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Vertices */}
        {graph.vertices.map((vertex) => {
          const pos = getVertexPos(vertex.id);
          const isActive = activeVertex === vertex.id;
          const isVisited = visitedVertices.includes(vertex.id);
          const inTree = treeVertices.includes(vertex.id);
          const dist = distances?.[vertex.id];

          let fillColor = 'var(--surface)';
          let strokeColor = 'var(--border-dark)';
          let strokeWidth = 2.5;
          let textColor = 'var(--text-main)';

          if (isActive) {
            fillColor = 'var(--primary)';
            strokeColor = 'var(--primary-dark)';
            strokeWidth = 4;
            textColor = '#ffffff';
          } else if (inTree || isVisited) {
            fillColor = 'var(--primary-light-bg)';
            strokeColor = 'var(--primary)';
            strokeWidth = 3;
            textColor = 'var(--primary-dark)';
          }

          return (
            <g
              key={vertex.id}
              transform={`translate(${pos.x}, ${pos.y})`}
              className={interactive ? 'cursor-pointer group' : ''}
              onClick={() => onVertexClick && onVertexClick(vertex)}
            >
              {/* Pulse effect if active */}
              {isActive && (
                <circle
                  r="26"
                  className="animate-ping fill-primary opacity-25"
                  style={{ animationDuration: '2s' }}
                />
              )}
              <circle
                r="19"
                fill={fillColor}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                className="transition-colors duration-250 shadow-sm"
              />
              <text
                textAnchor="middle"
                dominantBaseline="central"
                fill={textColor}
                className="font-bold text-[15px] font-sans pointer-events-none select-none"
              >
                {vertex.label}
              </text>

              {/* Accumulated Distance / Tag if available (Dijkstra) */}
              {dist !== undefined && dist !== Infinity && (
                <g transform="translate(0, -27)">
                  <rect
                    x="-18"
                    y="-9"
                    width="36"
                    height="18"
                    rx="5"
                    fill="var(--surface-elevated)"
                    stroke="var(--primary)"
                    strokeWidth="1.5"
                  />
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="text-[11px] font-bold fill-primary font-mono"
                  >
                    T={dist}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      {/* Visual Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-muted mt-2 pt-2 border-t border-border w-full">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full border-2 border-primary bg-primary-light-bg" />
          Visited / Tree
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-primary" /> Current Active
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-1 bg-primary rounded" /> MST / Path Edge
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-1 bg-blue-500 rounded border-b border-dashed" /> Candidate
        </span>
      </div>
    </div>
  );
};
