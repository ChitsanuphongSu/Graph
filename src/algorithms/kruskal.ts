import { GraphData, KruskalStep, KruskalEdgeEvaluation } from '../types';
import { UnionFind } from './graphUtils';

/**
 * Kruskal's Minimum Spanning Tree Algorithm
 * Chapter 11 rules:
 * 1. Sort all edges by weight from smallest to largest.
 * 2. Select the smallest weight edge.
 * 3. Check if adding the edge creates a cycle (วงจร).
 * 4. If no cycle, add it to spanning tree. If cycle detected, REJECT it.
 * 5. Repeat until all vertices are connected / spanning tree complete.
 */
export function runKruskal(graph: GraphData): {
  mstEdges: KruskalEdgeEvaluation[];
  totalWeight: number;
  steps: KruskalStep[];
  allSortedEdges: KruskalEdgeEvaluation[];
} {
  const steps: KruskalStep[] = [];
  const vertexIds = graph.vertices.map((v) => v.id);

  // Extract unique edges (for undirected graph)
  const uniqueEdges: KruskalEdgeEvaluation[] = [];
  const edgeSeen = new Set<string>();

  for (const edge of graph.edges) {
    const u = edge.source;
    const v = edge.target;
    const key = graph.directed ? `${u}->${v}` : [u, v].sort().join('-');
    if (!edgeSeen.has(key)) {
      edgeSeen.add(key);
      uniqueEdges.push({
        source: u,
        target: v,
        weight: edge.weight ?? 1,
        status: 'pending',
      });
    }
  }

  // 1. Sort all edges by weight ascending. Tie breaker: alphabetical edge name
  uniqueEdges.sort((a, b) => {
    if (a.weight !== b.weight) return a.weight - b.weight;
    const nameA = `${a.source}${a.target}`;
    const nameB = `${b.source}${b.target}`;
    return nameA.localeCompare(nameB);
  });

  const allSortedEdges = uniqueEdges.map((e) => ({ ...e }));
  const uf = new UnionFind(vertexIds);
  const mstEdges: KruskalEdgeEvaluation[] = [];
  let totalWeight = 0;
  let stepIndex = 0;

  // Initial step: sorted list shown
  steps.push({
    stepIndex: stepIndex++,
    round: 0,
    allEdgesSorted: allSortedEdges.map((e) => ({ ...e })),
    currentEdgeIndex: -1,
    currentEdge: null,
    action: 'examine',
    cycleDetected: false,
    mstEdges: [],
    totalWeight: 0,
    explanation: `ขั้นตอนที่ 1: เรียงลำดับเส้นเชื่อมทั้งหมดตามค่าน้ำหนักจากน้อยไปมาก: ${allSortedEdges.map((e) => `${e.source}${e.target}(${e.weight})`).join(', ')}`,
    isComplete: false,
  });

  const targetEdgesCount = vertexIds.length - 1;

  for (let i = 0; i < allSortedEdges.length; i++) {
    const edge = allSortedEdges[i];
    const wouldFormCycle = uf.connected(edge.source, edge.target);

    if (!wouldFormCycle) {
      // Accept edge
      uf.union(edge.source, edge.target);
      edge.status = 'selected';
      mstEdges.push({ ...edge });
      totalWeight += edge.weight;

      const isDone = mstEdges.length === targetEdgesCount;

      steps.push({
        stepIndex: stepIndex++,
        round: mstEdges.length,
        allEdgesSorted: allSortedEdges.map((e) => ({ ...e })),
        currentEdgeIndex: i,
        currentEdge: { ...edge },
        action: 'select',
        cycleDetected: false,
        mstEdges: [...mstEdges],
        totalWeight,
        explanation: `พิจารณาเส้น ${edge.source}${edge.target} (Weight = ${edge.weight}) -> ไม่ทำให้เกิดวงจร (No Cycle) -> เลือกเส้นนี้เข้าสู่ Spanning Tree (น้ำหนักรวม = ${totalWeight})`,
        isComplete: isDone,
      });

      if (isDone) {
        break;
      }
    } else {
      // Reject edge due to cycle
      edge.status = 'rejected';
      edge.reason = 'ทำให้เกิดวงจร (Cycle Detected)';

      steps.push({
        stepIndex: stepIndex++,
        round: mstEdges.length,
        allEdgesSorted: allSortedEdges.map((e) => ({ ...e })),
        currentEdgeIndex: i,
        currentEdge: { ...edge },
        action: 'reject',
        cycleDetected: true,
        mstEdges: [...mstEdges],
        totalWeight,
        explanation: `พิจารณาเส้น ${edge.source}${edge.target} (Weight = ${edge.weight}) -> เกิดวงจร (Cycle)! -> ข้าม/ปฏิเสธเส้นนี้ (Rejected)`,
        isComplete: false,
      });
    }
  }

  // Final Complete step
  steps.push({
    stepIndex: stepIndex,
    round: mstEdges.length,
    allEdgesSorted: allSortedEdges.map((e) => ({ ...e })),
    currentEdgeIndex: allSortedEdges.length - 1,
    currentEdge: null,
    action: 'complete',
    cycleDetected: false,
    mstEdges: [...mstEdges],
    totalWeight,
    explanation: `ครบทุกโหนดแล้ว หรือต้นไม้ครอบคลุมสมบูรณ์! ได้ Minimum Spanning Tree รวมน้ำหนัก = ${totalWeight}`,
    isComplete: true,
  });

  return {
    mstEdges,
    totalWeight,
    steps,
    allSortedEdges,
  };
}
