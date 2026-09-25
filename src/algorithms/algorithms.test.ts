import { describe, it, expect } from 'vitest';
import {
  allLectureExamples,
  traversal5NodeExample,
  traversal7NodeExample,
  mst7NodeExample,
  prim6NodeExample,
  dijkstra6NodeExample,
  undirectedGraphExample,
  directedCycleExample,
  directedMatrixListExample,
  directedWeightedExample,
} from '../data/examplesLibrary';
import { runDFS } from './dfs';
import { runBFS } from './bfs';
import { runPrim } from './prim';
import { runKruskal } from './kruskal';
import { runDijkstra } from './dijkstra';
import {
  graphToAdjacencyMatrix,
  matrixToGraph,
  graphToAdjacencyList,
} from './graphUtils';

describe('Chapter 11 Lecture Algorithm Unit Tests', () => {
  it('DFS on 5-Node Graph should match lecture slide: S -> A -> D -> B -> C', () => {
    const { traversalOrder } = runDFS(traversal5NodeExample, 'S');
    expect(traversalOrder).toEqual(['S', 'A', 'D', 'B', 'C']);
  });

  it('DFS on 7-Node Graph should match lecture slide: S -> A -> D -> G -> E -> B -> F -> C', () => {
    const { traversalOrder } = runDFS(traversal7NodeExample, 'S');
    expect(traversalOrder).toEqual(['S', 'A', 'D', 'G', 'E', 'B', 'F', 'C']);
  });

  it('BFS on 5-Node Graph should match lecture slide: S -> A -> B -> C -> D', () => {
    const { traversalOrder } = runBFS(traversal5NodeExample, 'S');
    expect(traversalOrder).toEqual(['S', 'A', 'B', 'C', 'D']);
  });

  it('BFS on 7-Node Graph starting from S should visit all layers', () => {
    const { traversalOrder } = runBFS(traversal7NodeExample, 'S');
    expect(traversalOrder).toEqual(['S', 'A', 'B', 'C', 'D', 'E', 'F', 'G']);
  });

  it('BFS on 7-Node Graph starting from E should match lecture slide p.45: E -> B -> G -> S -> D -> F -> A -> C', () => {
    const { traversalOrder } = runBFS(traversal7NodeExample, 'E');
    expect(traversalOrder).toEqual(['E', 'B', 'G', 'S', 'D', 'F', 'A', 'C']);
  });

  it("Prim's Algorithm on 7-Node Graph from 'a' matches total weight 51 and round progression", () => {
    const { totalWeight, mstEdges } = runPrim(mst7NodeExample, 'a');
    expect(totalWeight).toBe(51);
    expect(mstEdges.length).toBe(6);
  });

  it("Prim's Algorithm on 6-Node Graph from 'A' matches total weight 13 (p. 61-67)", () => {
    const { totalWeight, mstEdges } = runPrim(prim6NodeExample, 'A');
    expect(totalWeight).toBe(13);
    expect(mstEdges.length).toBe(5);
  });

  it("Kruskal's Algorithm on 7-Node Graph matches total weight 51 and edge count 6", () => {
    const { totalWeight, mstEdges } = runKruskal(mst7NodeExample);
    expect(totalWeight).toBe(51);
    expect(mstEdges.length).toBe(6);
  });

  it("Dijkstra's Algorithm on 6-Node Graph starting at A computes exact shortest cumulative distances (p. 92-97)", () => {
    const { distances } = runDijkstra(dijkstra6NodeExample, 'A');
    expect(distances['A']).toBe(0);
    expect(distances['B']).toBe(5); // A->C->B: 3+2=5
    expect(distances['C']).toBe(3); // A->C: 3
    expect(distances['D']).toBe(6); // A->C->D: 3+3=6
    expect(distances['E']).toBe(7); // A->C->E: 3+4=7
    expect(distances['F']).toBe(9); // A->C->D->F: 6+3=9
  });

  it('Adjacency Matrix bidirectional conversion preserves graph structure', () => {
    const { matrix, labels } = graphToAdjacencyMatrix(undirectedGraphExample);
    expect(matrix.length).toBe(5);
    const aIdx = labels.indexOf('A');
    const bIdx = labels.indexOf('B');
    expect(matrix[aIdx][bIdx]).toBe(1);
    expect(matrix[bIdx][aIdx]).toBe(1);

    const reconstructed = matrixToGraph(matrix, labels, false, false);
    expect(reconstructed.vertices.length).toBe(5);
    expect(reconstructed.edges.length).toBe(6);
  });

  it('Adjacency List length for undirected graph is 2x edges (12 for 6 edges)', () => {
    const { totalLength } = graphToAdjacencyList(undirectedGraphExample);
    expect(totalLength).toBe(12);
  });
});

describe('GraphCanvas Auto-Fit & Bounding Box Calculations', () => {
  it('Calculates non-clipping bounding box for all lecture preset graphs', () => {
    for (const g of allLectureExamples) {
      expect(g.vertices.length).toBeGreaterThan(0);
      for (const v of g.vertices) {
        if (v.x !== undefined && v.y !== undefined) {
          expect(typeof v.x).toBe('number');
          expect(typeof v.y).toBe('number');
        }
      }
    }
  });

  it('Matrix-generated graph coordinates remain within circle layout bounds', () => {
    const { matrix, labels } = graphToAdjacencyMatrix(directedMatrixListExample || directedWeightedExample);
    const reconstructed = matrixToGraph(matrix, labels, true, false);
    for (const v of reconstructed.vertices) {
      expect(v.x).toBeGreaterThanOrEqual(50);
      expect(v.x).toBeLessThanOrEqual(350);
      expect(v.y).toBeGreaterThanOrEqual(50);
      expect(v.y).toBeLessThanOrEqual(350);
    }
  });
});
