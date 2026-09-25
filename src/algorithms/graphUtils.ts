import { GraphData, Vertex, Edge } from '../types';

/**
 * Get sorted unique vertex IDs
 */
export function getVertexIds(graph: GraphData): string[] {
  return graph.vertices.map((v) => v.id);
}

/**
 * Get neighbors of a vertex, sorted alphabetically according to lecture standard rule (A < B < C ...)
 */
export function getSortedNeighbors(
  graph: GraphData,
  vertexId: string
): { targetId: string; weight: number; edgeId: string }[] {
  const neighbors: { targetId: string; weight: number; edgeId: string }[] = [];

  for (const edge of graph.edges) {
    if (edge.source === vertexId) {
      neighbors.push({
        targetId: edge.target,
        weight: edge.weight ?? 1,
        edgeId: edge.id,
      });
    } else if (!graph.directed && edge.target === vertexId) {
      neighbors.push({
        targetId: edge.source,
        weight: edge.weight ?? 1,
        edgeId: edge.id,
      });
    }
  }

  // Sort alphabetically by targetId
  return neighbors.sort((a, b) => a.targetId.localeCompare(b.targetId));
}

/**
 * Convert Graph to Adjacency Matrix (N x N)
 * M[i][j] = weight or 1 (if edge exists), else 0
 */
export function graphToAdjacencyMatrix(graph: GraphData): {
  matrix: number[][];
  labels: string[];
} {
  const labels = graph.vertices.map((v) => v.id);
  const n = labels.length;
  const matrix: number[][] = Array.from({ length: n }, () => Array(n).fill(0));

  for (const edge of graph.edges) {
    const fromIdx = labels.indexOf(edge.source);
    const toIdx = labels.indexOf(edge.target);

    if (fromIdx !== -1 && toIdx !== -1) {
      const val = graph.weighted ? edge.weight ?? 1 : 1;
      matrix[fromIdx][toIdx] = val;
      if (!graph.directed) {
        matrix[toIdx][fromIdx] = val;
      }
    }
  }

  return { matrix, labels };
}

/**
 * Convert Adjacency Matrix back to GraphData
 */
export function matrixToGraph(
  matrix: number[][],
  labels: string[],
  directed: boolean,
  weighted: boolean
): GraphData {
  const vertices: Vertex[] = labels.map((label, idx) => {
    const angle = (idx / labels.length) * 2 * Math.PI - Math.PI / 2;
    const cx = 200;
    const cy = 200;
    const r = 130;
    return {
      id: label,
      label,
      x: Math.round(cx + r * Math.cos(angle)),
      y: Math.round(cy + r * Math.sin(angle)),
    };
  });

  const edges: Edge[] = [];
  const n = matrix.length;
  const added = new Set<string>();

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const val = matrix[i][j];
      if (val > 0) {
        const u = labels[i];
        const v = labels[j];
        if (directed) {
          edges.push({
            id: `e-${u}-${v}`,
            source: u,
            target: v,
            weight: weighted ? val : undefined,
            directed: true,
          });
        } else {
          const key = [u, v].sort().join('-');
          if (!added.has(key)) {
            added.add(key);
            edges.push({
              id: `e-${u}-${v}`,
              source: u,
              target: v,
              weight: weighted ? val : undefined,
              directed: false,
            });
          }
        }
      }
    }
  }

  return {
    vertices,
    edges,
    directed,
    weighted,
    defaultStartVertex: labels[0] || 'A',
  };
}

/**
 * Convert Graph to Adjacency List
 * Returns a map of vertexId -> Array of { vertex: string, weight?: number }
 */
export function graphToAdjacencyList(graph: GraphData): {
  list: Record<string, { target: string; weight?: number }[]>;
  totalLength: number;
} {
  const list: Record<string, { target: string; weight?: number }[]> = {};
  for (const v of graph.vertices) {
    list[v.id] = [];
  }

  let totalLength = 0;

  for (const v of graph.vertices) {
    const neighbors = getSortedNeighbors(graph, v.id);
    list[v.id] = neighbors.map((n) => ({
      target: n.targetId,
      weight: graph.weighted ? n.weight : undefined,
    }));
    totalLength += list[v.id].length;
  }

  return { list, totalLength };
}

/**
 * Cycle Detection helper for Kruskal using Disjoint Set / Connected Components
 */
export class UnionFind {
  private parent: Record<string, string> = {};

  constructor(elements: string[]) {
    for (const el of elements) {
      this.parent[el] = el;
    }
  }

  find(i: string): string {
    if (this.parent[i] === i) {
      return i;
    }
    this.parent[i] = this.find(this.parent[i]);
    return this.parent[i];
  }

  union(i: string, j: string): boolean {
    const rootI = this.find(i);
    const rootJ = this.find(j);
    if (rootI !== rootJ) {
      this.parent[rootI] = rootJ;
      return true; // Successfully connected
    }
    return false; // Already in same component => cycle
  }

  connected(i: string, j: string): boolean {
    return this.find(i) === this.find(j);
  }
}
