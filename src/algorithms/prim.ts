import { GraphData, PrimStep, PrimCandidateEdge } from '../types';

/**
 * Prim's Minimum Spanning Tree Algorithm
 * Chapter 11 rules:
 * 1. Choose starting vertex, mark as in tree.
 * 2. Find minimum weight edge connecting any vertex in tree to a vertex NOT yet in tree.
 * 3. Add selected edge and target vertex to tree.
 * 4. Repeat until all vertices are included in tree.
 */
export function runPrim(
  graph: GraphData,
  startVertexId?: string
): {
  mstEdges: PrimCandidateEdge[];
  totalWeight: number;
  steps: PrimStep[];
} {
  const steps: PrimStep[] = [];
  const allVertices = graph.vertices.map((v) => v.id);
  const start = startVertexId || graph.defaultStartVertex || allVertices[0] || 'a';

  const treeVertices: string[] = [start];
  const mstEdges: PrimCandidateEdge[] = [];
  let totalWeight = 0;
  let round = 1;

  // Step 0: Start vertex selected
  steps.push({
    stepIndex: 0,
    round: 0,
    currentTreeVertices: [...treeVertices],
    candidateEdges: [],
    selectedEdge: null,
    totalWeight: 0,
    mstEdges: [],
    explanation: `เริ่มต้นที่โหนด '${start}': กำหนดให้ '${start}' อยู่ในต้นไม้ครอบคลุม (Tree)`,
    isComplete: false,
  });

  while (treeVertices.length < allVertices.length) {
    // Find all candidate edges from treeVertices to outside vertices
    const candidates: PrimCandidateEdge[] = [];

    for (const u of treeVertices) {
      for (const edge of graph.edges) {
        let v: string | null = null;
        if (edge.source === u && !treeVertices.includes(edge.target)) {
          v = edge.target;
        } else if (!graph.directed && edge.target === u && !treeVertices.includes(edge.source)) {
          v = edge.source;
        }

        if (v !== null) {
          const w = edge.weight ?? 1;
          // Avoid duplicate candidate edge entries
          if (!candidates.some((c) => (c.source === u && c.target === v) || (c.source === v && c.target === u))) {
            candidates.push({ source: u, target: v, weight: w });
          }
        }
      }
    }

    if (candidates.length === 0) {
      // Graph is disconnected
      break;
    }

    // Sort candidates by weight ascending, then alphabetically by target node for tie-breaking
    candidates.sort((a, b) => {
      if (a.weight !== b.weight) return a.weight - b.weight;
      return a.target.localeCompare(b.target);
    });

    const chosen = candidates[0];
    treeVertices.push(chosen.target);
    mstEdges.push(chosen);
    totalWeight += chosen.weight;

    steps.push({
      stepIndex: round,
      round: round,
      currentTreeVertices: [...treeVertices],
      candidateEdges: candidates,
      selectedEdge: chosen,
      totalWeight,
      mstEdges: [...mstEdges],
      explanation: `รอบที่ ${round}: พิจารณาโหนดข้างเคียงของ {${treeVertices.slice(0, -1).join(', ')}} ทั้งหมด -> เส้นเชื่อมที่มีค่าน้อยสุดที่เชื่อมไปยังโหนดนอก Tree คือ (${chosen.source}-${chosen.target}, Weight = ${chosen.weight}) -> เลือกและเพิ่มโหนด '${chosen.target}' เข้าสู่ Tree (น้ำหนักรวมสะสม = ${totalWeight})`,
      isComplete: treeVertices.length === allVertices.length,
    });

    round++;
  }

  return {
    mstEdges,
    totalWeight,
    steps,
  };
}
