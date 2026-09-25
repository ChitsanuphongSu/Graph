import { GraphData, DijkstraStep, DijkstraCandidatePath } from '../types';

/**
 * Dijkstra's Shortest Path Algorithm
 * Chapter 11 rules:
 * 1. Insert starting vertex into Tree (T=0).
 * 2. Evaluate all candidate paths from Tree vertices to outside vertices, calculating ACCUMULATED weight T(v) = T(u) + weight(u, v).
 * 3. Select the vertex/path with minimum accumulated weight and insert into Tree.
 * 4. Repeat until all reachable vertices are included.
 *
 * Handles ties explicitly with explanation note as demonstrated in PDF p. 90-91.
 */
export function runDijkstra(
  graph: GraphData,
  startVertexId?: string
): {
  distances: Record<string, number>;
  previousNodes: Record<string, string | null>;
  steps: DijkstraStep[];
  treeEdges: { source: string; target: string; weight: number }[];
} {
  const steps: DijkstraStep[] = [];
  const vertexIds = graph.vertices.map((v) => v.id);
  const start = startVertexId || graph.defaultStartVertex || vertexIds[0] || 'A';

  const distances: Record<string, number> = {};
  const previousNodes: Record<string, string | null> = {};
  const treeVertices: string[] = [start];
  const treeEdges: { source: string; target: string; weight: number }[] = [];

  for (const v of vertexIds) {
    distances[v] = v === start ? 0 : Infinity;
    previousNodes[v] = null;
  }

  // Step 0: Start Node insertion
  steps.push({
    stepIndex: 0,
    round: 0,
    treeVertices: [...treeVertices],
    distances: { ...distances },
    previousNodes: { ...previousNodes },
    candidatePaths: [],
    selectedCandidate: null,
    treeEdges: [],
    explanation: `ขั้นตอนที่ 1: กำหนดโหนดเริ่มต้น '${start}' ลงใน Tree โดยมีค่าน้ำหนักสะสมเริ่มต้น T = 0`,
    isComplete: false,
  });

  let round = 1;

  while (treeVertices.length < vertexIds.length) {
    // Find all candidate paths from all vertices currently in Tree to outside vertices
    const candidates: DijkstraCandidatePath[] = [];

    for (const u of treeVertices) {
      const distU = distances[u];
      for (const edge of graph.edges) {
        let v: string | null = null;
        let w = edge.weight ?? 1;

        if (edge.source === u && !treeVertices.includes(edge.target)) {
          v = edge.target;
        } else if (!graph.directed && edge.target === u && !treeVertices.includes(edge.source)) {
          v = edge.source;
        }

        if (v !== null) {
          const accDist = distU + w;
          candidates.push({
            source: u,
            target: v,
            edgeWeight: w,
            totalAccumulatedWeight: accDist,
            pathString: `${u} -> ${v} (T = ${distU} + ${w} = ${accDist})`,
          });
        }
      }
    }

    if (candidates.length === 0) {
      // Disconnected remaining nodes
      break;
    }

    // Sort candidates by totalAccumulatedWeight ascending, then alphabetical target
    candidates.sort((a, b) => {
      if (a.totalAccumulatedWeight !== b.totalAccumulatedWeight) {
        return a.totalAccumulatedWeight - b.totalAccumulatedWeight;
      }
      return a.target.localeCompare(b.target);
    });

    // Check for ties in minimum accumulated weight
    const minAcc = candidates[0].totalAccumulatedWeight;
    const tieCandidates = candidates.filter((c) => c.totalAccumulatedWeight === minAcc);
    let tieNote: string | undefined = undefined;

    if (tieCandidates.length > 1) {
      tieNote = `กรณีนี้มีเส้นทางคำนวณสะสมเท่ากัน (T = ${minAcc}): ${tieCandidates.map((c) => `${c.source}->${c.target}`).join(' และ ')} — ให้ผู้เรียนพิจารณาตามตัวอย่าง/คำอธิบายในเอกสาร (สามารถเลือกเส้นทางใดเส้นทางหนึ่งได้ตามสไลด์หน้า 90-91)`;
    }

    const chosen = candidates[0];
    const targetNode = chosen.target;

    treeVertices.push(targetNode);
    distances[targetNode] = chosen.totalAccumulatedWeight;
    previousNodes[targetNode] = chosen.source;
    treeEdges.push({ source: chosen.source, target: targetNode, weight: chosen.edgeWeight });

    const isComplete = treeVertices.length === vertexIds.length;

    steps.push({
      stepIndex: round,
      round: round,
      treeVertices: [...treeVertices],
      distances: { ...distances },
      previousNodes: { ...previousNodes },
      candidatePaths: candidates,
      selectedCandidate: chosen,
      treeEdges: [...treeEdges],
      explanation: `รอบที่ ${round}: พิจารณาโหนดข้างเคียงจาก Tree {${treeVertices.slice(0, -1).join(', ')}} -> คำนวณค่าน้ำหนักสะสม T -> เลือกโหนด '${chosen.target}' ผ่านเส้น (${chosen.source}->${chosen.target}) ที่มีน้ำหนักสะสมน้อยที่สุด T = ${chosen.totalAccumulatedWeight}`,
      tieNote,
      isComplete,
    });

    round++;
  }

  return {
    distances,
    previousNodes,
    steps,
    treeEdges,
  };
}
