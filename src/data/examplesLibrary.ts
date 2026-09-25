import { GraphData } from '../types';

/**
 * 1. Undirected Graph Example (PDF p. 4, 10, 15)
 * Vertices: {A, B, C, D, E}
 * Edges: {AB, AC, AD, BD, CE, ED} (6 edges, undirected)
 */
export const undirectedGraphExample: GraphData = {
  id: 'undirected-lecture',
  title: 'Undirected Graph (กราฟไม่มีทิศทาง)',
  description: 'ตัวอย่างจากสไลด์หน้า 4, 10, 15 มี 5 Vertices {A, B, C, D, E} และ 6 Edges {AB, AC, AD, BD, CE, ED}',
  directed: false,
  weighted: false,
  vertices: [
    { id: 'A', label: 'A', x: 120, y: 80 },
    { id: 'B', label: 'B', x: 320, y: 80 },
    { id: 'C', label: 'C', x: 80, y: 220 },
    { id: 'D', label: 'D', x: 300, y: 260 },
    { id: 'E', label: 'E', x: 200, y: 340 },
  ],
  edges: [
    { id: 'e-AB', source: 'A', target: 'B', directed: false },
    { id: 'e-AC', source: 'A', target: 'C', directed: false },
    { id: 'e-AD', source: 'A', target: 'D', directed: false },
    { id: 'e-BD', source: 'B', target: 'D', directed: false },
    { id: 'e-CE', source: 'C', target: 'E', directed: false },
    { id: 'e-ED', source: 'E', target: 'D', directed: false },
  ],
  defaultStartVertex: 'A',
};

/**
 * 2. Directed Graph Example / Cyclic (PDF p. 5, 6, 11, 16)
 * Directed Cycle: A -> B -> C -> D -> E -> A
 * With extra internal directed edges in p. 11/16:
 * (p.11 & 16 show: A->B, A->E, B->C, B->D, D->A, D->C, D->E, E->B, E->D)
 * Let's provide both the pure cycle and the matrix/list directed graph.
 */
export const directedCycleExample: GraphData = {
  id: 'directed-cycle-lecture',
  title: 'Cyclic Directed Graph (กราฟระบุทิศทางแบบมีวงจร)',
  description: 'ตัวอย่างจากสไลด์หน้า 5-6 เส้นทาง A -> B -> C -> D -> E -> A เกิด Directed Cycle',
  directed: true,
  weighted: false,
  vertices: [
    { id: 'A', label: 'A', x: 100, y: 80 },
    { id: 'B', label: 'B', x: 300, y: 80 },
    { id: 'C', label: 'C', x: 360, y: 240 },
    { id: 'D', label: 'D', x: 240, y: 300 },
    { id: 'E', label: 'E', x: 100, y: 340 },
  ],
  edges: [
    { id: 'e-AB', source: 'A', target: 'B', directed: true },
    { id: 'e-BC', source: 'B', target: 'C', directed: true },
    { id: 'e-CD', source: 'C', target: 'D', directed: true },
    { id: 'e-DE', source: 'D', target: 'E', directed: true },
    { id: 'e-EA', source: 'E', target: 'A', directed: true },
  ],
  defaultStartVertex: 'A',
};

export const directedMatrixListExample: GraphData = {
  id: 'directed-matrix-lecture',
  title: 'Directed Graph for Matrix & List (สไลด์หน้า 11, 16)',
  description: 'ตัวอย่างกราฟระบุทิศทางที่ใช้สอน Adjacency Matrix และ List',
  directed: true,
  weighted: false,
  vertices: [
    { id: 'A', label: 'A', x: 100, y: 80 },
    { id: 'B', label: 'B', x: 300, y: 80 },
    { id: 'C', label: 'C', x: 360, y: 220 },
    { id: 'D', label: 'D', x: 220, y: 340 },
    { id: 'E', label: 'E', x: 80, y: 260 },
  ],
  edges: [
    { id: 'e-AB', source: 'A', target: 'B', directed: true },
    { id: 'e-AE', source: 'A', target: 'E', directed: true },
    { id: 'e-BC', source: 'B', target: 'C', directed: true },
    { id: 'e-BD', source: 'B', target: 'D', directed: true },
    { id: 'e-DA', source: 'D', target: 'A', directed: true },
    { id: 'e-DC', source: 'D', target: 'C', directed: true },
    { id: 'e-DE', source: 'D', target: 'E', directed: true },
    { id: 'e-EB', source: 'E', target: 'B', directed: true },
    { id: 'e-ED', source: 'E', target: 'D', directed: true },
  ],
  defaultStartVertex: 'A',
};

/**
 * 3. Weighted Directed Graph (PDF p. 12, 13, 17)
 * A->B (4), B->C (3), B->D (3), C->A (2), C->E (2), E->B (5), E->D (2)
 */
export const directedWeightedExample: GraphData = {
  id: 'directed-weighted-lecture',
  title: 'Directed Weighted Graph (กราฟระบุทิศทางมีค่าน้ำหนัก)',
  description: 'ตัวอย่างจากสไลด์หน้า 12, 13, 17 สำหรับ Adjacency Matrix & List แบบมี Weight',
  directed: true,
  weighted: true,
  vertices: [
    { id: 'A', label: 'A', x: 80, y: 180 },
    { id: 'B', label: 'B', x: 200, y: 60 },
    { id: 'C', label: 'C', x: 180, y: 300 },
    { id: 'D', label: 'D', x: 340, y: 80 },
    { id: 'E', label: 'E', x: 300, y: 300 },
  ],
  edges: [
    { id: 'e-AB', source: 'A', target: 'B', weight: 4, directed: true },
    { id: 'e-BC', source: 'B', target: 'C', weight: 3, directed: true },
    { id: 'e-BD', source: 'B', target: 'D', weight: 3, directed: true },
    { id: 'e-CA', source: 'C', target: 'A', weight: 2, directed: true },
    { id: 'e-CE', source: 'C', target: 'E', weight: 2, directed: true },
    { id: 'e-EB', source: 'E', target: 'B', weight: 5, directed: true },
    { id: 'e-ED', source: 'E', target: 'D', weight: 2, directed: true },
  ],
  defaultStartVertex: 'A',
};

/**
 * 4. DFS / BFS 5-Node Graph (PDF p. 21-28, 34-43)
 * Vertices: S, A, B, C, D
 * S connects to A, B, C
 * A connects to S, D
 * B connects to S, D
 * C connects to S, D
 * D connects to A, B, C
 * DFS order: S -> A -> D -> B -> C
 * BFS order: S -> A -> B -> C -> D
 */
export const traversal5NodeExample: GraphData = {
  id: 'traversal-5node-lecture',
  title: 'DFS & BFS 5-Node Graph (สไลด์หน้า 21-28, 34-43)',
  description: 'กราฟ 5 โหนด S, A, B, C, D ใช้แสดงกฎการทำงานของ DFS (Stack) และ BFS (Queue) ตามลำดับตัวอักษร',
  directed: false,
  weighted: false,
  vertices: [
    { id: 'S', label: 'S', x: 200, y: 60 },
    { id: 'A', label: 'A', x: 80, y: 180 },
    { id: 'B', label: 'B', x: 200, y: 180 },
    { id: 'C', label: 'C', x: 320, y: 180 },
    { id: 'D', label: 'D', x: 200, y: 300 },
  ],
  edges: [
    { id: 'e-SA', source: 'S', target: 'A', directed: false },
    { id: 'e-SB', source: 'S', target: 'B', directed: false },
    { id: 'e-SC', source: 'S', target: 'C', directed: false },
    { id: 'e-AD', source: 'A', target: 'D', directed: false },
    { id: 'e-BD', source: 'B', target: 'D', directed: false },
    { id: 'e-CD', source: 'C', target: 'D', directed: false },
  ],
  defaultStartVertex: 'S',
};

/**
 * 5. DFS / BFS 7-Node Diamond-Grid Graph (PDF p. 19, 29-31, 32, 44-45)
 * Vertices: S, A, B, C, D, E, F, G
 * Edges: (S,A), (S,B), (S,C), (A,D), (B,E), (C,F), (D,G), (E,G), (F,G)
 * DFS from S (alphabetical): S -> A -> D -> G -> E -> B -> F -> C
 * BFS from S (alphabetical): S -> A -> B -> C -> D -> E -> F -> G
 * BFS from E (p.45): E -> B -> G -> S -> D -> F -> A -> C
 */
export const traversal7NodeExample: GraphData = {
  id: 'traversal-7node-lecture',
  title: 'DFS & BFS 7-Node Graph (สไลด์หน้า 19, 29-31, 44-45)',
  description: 'กราฟ 7 โหนด {S, A, B, C, D, E, F, G} สำหรับแสดง Traversal แบบสมบูรณ์ในสไลด์',
  directed: false,
  weighted: false,
  vertices: [
    { id: 'S', label: 'S', x: 200, y: 50 },
    { id: 'A', label: 'A', x: 80, y: 140 },
    { id: 'B', label: 'B', x: 200, y: 140 },
    { id: 'C', label: 'C', x: 320, y: 140 },
    { id: 'D', label: 'D', x: 80, y: 250 },
    { id: 'E', label: 'E', x: 200, y: 250 },
    { id: 'F', label: 'F', x: 320, y: 250 },
    { id: 'G', label: 'G', x: 200, y: 350 },
  ],
  edges: [
    { id: 'e-SA', source: 'S', target: 'A', directed: false },
    { id: 'e-SB', source: 'S', target: 'B', directed: false },
    { id: 'e-SC', source: 'S', target: 'C', directed: false },
    { id: 'e-AD', source: 'A', target: 'D', directed: false },
    { id: 'e-BE', source: 'B', target: 'E', directed: false },
    { id: 'e-CF', source: 'C', target: 'F', directed: false },
    { id: 'e-DG', source: 'D', target: 'G', directed: false },
    { id: 'e-EG', source: 'E', target: 'G', directed: false },
    { id: 'e-FG', source: 'F', target: 'G', directed: false },
  ],
  defaultStartVertex: 'S',
};

/**
 * 6. Minimum Spanning Tree Example 1: 7-Node Graph (PDF p. 53-60, 69-76)
 * Vertices: a, b, c, d, e, f, g
 * Edges & Weights:
 * (b,c)=2, (a,b)=6, (f,g)=8, (a,g)=10, (e,d)=10, (e,f)=15, (d,f)=22, (c,d)=30, (e,g)=50
 *
 * Prim from 'a':
 * R1: select (a,b)=6 (tree: {a,b})
 * R2: select (b,c)=2 (tree: {a,b,c})
 * R3: select (a,g)=10 (tree: {a,b,c,g})
 * R4: select (g,f)=8 (tree: {a,b,c,g,f})
 * R5: select (f,e)=15 (tree: {a,b,c,g,f,e})
 * R6: select (e,d)=10 (tree: {a,b,c,g,f,e,d})
 * Total MST weight = 6 + 2 + 10 + 8 + 15 + 10 = 51
 *
 * Kruskal sorted: bc(2), ab(6), fg(8), ag(10), ed(10), ef(15), df(22), cd(30), eg(50)
 * Selects: bc(2), ab(6), fg(8), ag(10), ed(10), ef(15) -> Total = 51.
 */
export const mst7NodeExample: GraphData = {
  id: 'mst-7node-lecture',
  title: "MST Example 1 — 7 Nodes (Prim & Kruskal สไลด์หน้า 53-60, 69-76)",
  description: "ตัวอย่างหลัก MST 7 โหนด a-g แสดงการทำงานของทั้ง Prim's (เริ่ม a) และ Kruskal's Algorithm",
  directed: false,
  weighted: true,
  vertices: [
    { id: 'a', label: 'a', x: 260, y: 70 },
    { id: 'b', label: 'b', x: 360, y: 150 },
    { id: 'c', label: 'c', x: 340, y: 280 },
    { id: 'd', label: 'd', x: 220, y: 310 },
    { id: 'e', label: 'e', x: 240, y: 200 },
    { id: 'f', label: 'f', x: 130, y: 200 },
    { id: 'g', label: 'g', x: 170, y: 90 },
  ],
  edges: [
    { id: 'e-bc', source: 'b', target: 'c', weight: 2, directed: false },
    { id: 'e-ab', source: 'a', target: 'b', weight: 6, directed: false },
    { id: 'e-fg', source: 'f', target: 'g', weight: 8, directed: false },
    { id: 'e-ag', source: 'a', target: 'g', weight: 10, directed: false },
    { id: 'e-ed', source: 'e', target: 'd', weight: 10, directed: false },
    { id: 'e-ef', source: 'e', target: 'f', weight: 15, directed: false },
    { id: 'e-df', source: 'd', target: 'f', weight: 22, directed: false },
    { id: 'e-cd', source: 'c', target: 'd', weight: 30, directed: false },
    { id: 'e-eg', source: 'e', target: 'g', weight: 50, directed: false },
  ],
  defaultStartVertex: 'a',
};

/**
 * 7. Minimum Spanning Tree Example 2: 7-Node Complex Graph (PDF p. 61-67, 77-84)
 * Vertices: A, B, C, D, E, F, G (Note: p.61 shows A,B,C,D,E,F with 6 nodes, p.77 shows A,B,C,D,E,F,G with 7 nodes)
 * p.77 Kruskal sorted list:
 * AD(5), CE(5), DF(6), AB(7), BE(7), BC(8), EF(8), BD(9), EG(9), FG(11), DE(15)
 * Vertices: A, B, C, D, E, F, G
 */
export const mst7NodeExample2: GraphData = {
  id: 'mst-7node-kruskal2',
  title: 'MST Example 2 — 7 Nodes with Cycles (สไลด์หน้า 77-84)',
  description: 'ตัวอย่าง Kruskal แสดงการ Reject เส้นที่ทำให้เกิด Loop เช่น BD, BC, DE, EF',
  directed: false,
  weighted: true,
  vertices: [
    { id: 'A', label: 'A', x: 100, y: 70 },
    { id: 'B', label: 'B', x: 240, y: 110 },
    { id: 'C', label: 'C', x: 380, y: 70 },
    { id: 'D', label: 'D', x: 80, y: 240 },
    { id: 'E', label: 'E', x: 360, y: 220 },
    { id: 'F', label: 'F', x: 240, y: 300 },
    { id: 'G', label: 'G', x: 380, y: 350 },
  ],
  edges: [
    { id: 'e-AD', source: 'A', target: 'D', weight: 5, directed: false },
    { id: 'e-CE', source: 'C', target: 'E', weight: 5, directed: false },
    { id: 'e-DF', source: 'D', target: 'F', weight: 6, directed: false },
    { id: 'e-AB', source: 'A', target: 'B', weight: 7, directed: false },
    { id: 'e-BE', source: 'B', target: 'E', weight: 7, directed: false },
    { id: 'e-BC', source: 'B', target: 'C', weight: 8, directed: false },
    { id: 'e-EF', source: 'E', target: 'F', weight: 8, directed: false },
    { id: 'e-BD', source: 'B', target: 'D', weight: 9, directed: false },
    { id: 'e-EG', source: 'E', target: 'G', weight: 9, directed: false },
    { id: 'e-FG', source: 'F', target: 'G', weight: 11, directed: false },
    { id: 'e-DE', source: 'D', target: 'E', weight: 15, directed: false },
  ],
  defaultStartVertex: 'A',
};

/**
 * 8. Prim 6-Node Example (PDF p. 61-67)
 * Vertices: A, B, C, D, E, F
 * Edges: (A,B)=6, (A,C)=3, (B,C)=2, (B,D)=5, (C,D)=3, (C,E)=4, (D,E)=2, (D,F)=3, (E,F)=5
 * Prim from A:
 * R1: AC (3)
 * R2: BC (2)
 * R3: CD (3)
 * R4: DE (2)
 * R5: DF (3)
 * Total weight = 3 + 2 + 3 + 2 + 3 = 13
 */
export const prim6NodeExample: GraphData = {
  id: 'prim-6node-lecture',
  title: "Prim's Algorithm 6-Node Graph (สไลด์หน้า 61-67)",
  description: 'ตัวอย่าง Prim 6 โหนด {A, B, C, D, E, F} เริ่มจากโหนด A',
  directed: false,
  weighted: true,
  vertices: [
    { id: 'A', label: 'A', x: 80, y: 180 },
    { id: 'B', label: 'B', x: 180, y: 80 },
    { id: 'C', label: 'C', x: 180, y: 280 },
    { id: 'D', label: 'D', x: 300, y: 80 },
    { id: 'E', label: 'E', x: 300, y: 280 },
    { id: 'F', label: 'F', x: 400, y: 180 },
  ],
  edges: [
    { id: 'e-AB', source: 'A', target: 'B', weight: 6, directed: false },
    { id: 'e-AC', source: 'A', target: 'C', weight: 3, directed: false },
    { id: 'e-BC', source: 'B', target: 'C', weight: 2, directed: false },
    { id: 'e-BD', source: 'B', target: 'D', weight: 5, directed: false },
    { id: 'e-CD', source: 'C', target: 'D', weight: 3, directed: false },
    { id: 'e-CE', source: 'C', target: 'E', weight: 4, directed: false },
    { id: 'e-DE', source: 'D', target: 'E', weight: 2, directed: false },
    { id: 'e-DF', source: 'D', target: 'F', weight: 3, directed: false },
    { id: 'e-EF', source: 'E', target: 'F', weight: 5, directed: false },
  ],
  defaultStartVertex: 'A',
};

/**
 * 9. Dijkstra Shortest Path 4-Node Tie Example (PDF p. 87-91)
 * Vertices: a, b, c, d
 * Edges: (b,a)=1, (b,c)=2, (a,c)=5, (a,d)=4, (c,d)=3
 * Start from b:
 * Step 1: b (T=0). Neighbors: a (T=1), c (T=2). Select a (T=1).
 * Step 2: From {b, a}, candidates: c (via b=2, via a=1+5=6), d (via a=1+4=5). Select c (T=2).
 * Step 3: From {b, a, c}, candidates for d: via a = 1+4=5, via c = 2+3=5. (Tie: T=5 for both routes!)
 */
export const dijkstra4NodeTieExample: GraphData = {
  id: 'dijkstra-4node-tie-lecture',
  title: 'Dijkstra 4-Node Tie Example (สไลด์หน้า 87-91)',
  description: 'ตัวอย่าง Shortest Path เริ่มจาก b แสดงกรณีเส้นทางคำนวณสะสมเท่ากัน (T=5 ทั้งจาก a และ c)',
  directed: false,
  weighted: true,
  vertices: [
    { id: 'b', label: 'b', x: 80, y: 180 },
    { id: 'c', label: 'c', x: 220, y: 70 },
    { id: 'a', label: 'a', x: 220, y: 290 },
    { id: 'd', label: 'd', x: 360, y: 180 },
  ],
  edges: [
    { id: 'e-ba', source: 'b', target: 'a', weight: 1, directed: false },
    { id: 'e-bc', source: 'b', target: 'c', weight: 2, directed: false },
    { id: 'e-ac', source: 'a', target: 'c', weight: 5, directed: false },
    { id: 'e-ad', source: 'a', target: 'd', weight: 4, directed: false },
    { id: 'e-cd', source: 'c', target: 'd', weight: 3, directed: false },
  ],
  defaultStartVertex: 'b',
};

/**
 * 10. Dijkstra Shortest Path 6-Node Graph (PDF p. 92-97)
 * Vertices: A, B, C, D, E, F
 * Edges: (A,B)=6, (A,C)=3, (B,C)=2, (B,D)=5, (C,D)=3, (C,E)=4, (D,E)=2, (D,F)=3, (E,F)=5
 * Start from A (T=0):
 * Round 1: Candidates B(6), C(3). Select C (T=3). Tree: {A, C}.
 * Round 2: Candidates B (via A=6, via C=3+2=5), D (via C=3+3=6), E (via C=3+4=7). Select B (T=5). Tree: {A, C, B}.
 * Round 3: Candidates D (via B=5+5=10, via C=3+3=6), E (via C=3+4=7). Select D (T=6). Tree: {A, C, B, D}.
 * Round 4: Candidates E (via C=3+4=7, via D=6+2=8), F (via D=6+3=9). Select E (T=7 via C). Tree: {A, C, B, D, E}.
 * Round 5: Candidates F (via D=6+3=9, via E=7+5=12). Select F (T=9 via D). Tree: {A, C, B, D, E, F}.
 */
export const dijkstra6NodeExample: GraphData = {
  id: 'dijkstra-6node-lecture',
  title: 'Dijkstra 6-Node Full Example (สไลด์หน้า 92-97)',
  description: 'ตัวอย่าง Shortest Path 6 โหนด เริ่มจากโหนด A หาทางเดินที่สั้นที่สุดไปยังทุกโหนด',
  directed: false,
  weighted: true,
  vertices: [
    { id: 'A', label: 'A', x: 80, y: 180 },
    { id: 'B', label: 'B', x: 180, y: 80 },
    { id: 'C', label: 'C', x: 180, y: 280 },
    { id: 'D', label: 'D', x: 300, y: 80 },
    { id: 'E', label: 'E', x: 300, y: 280 },
    { id: 'F', label: 'F', x: 400, y: 180 },
  ],
  edges: [
    { id: 'e-AB', source: 'A', target: 'B', weight: 6, directed: false },
    { id: 'e-AC', source: 'A', target: 'C', weight: 3, directed: false },
    { id: 'e-BC', source: 'B', target: 'C', weight: 2, directed: false },
    { id: 'e-BD', source: 'B', target: 'D', weight: 5, directed: false },
    { id: 'e-CD', source: 'C', target: 'D', weight: 3, directed: false },
    { id: 'e-CE', source: 'C', target: 'E', weight: 4, directed: false },
    { id: 'e-DE', source: 'D', target: 'E', weight: 2, directed: false },
    { id: 'e-DF', source: 'D', target: 'F', weight: 3, directed: false },
    { id: 'e-EF', source: 'E', target: 'F', weight: 5, directed: false },
  ],
  defaultStartVertex: 'A',
};

export const allLectureExamples: GraphData[] = [
  undirectedGraphExample,
  directedCycleExample,
  directedMatrixListExample,
  directedWeightedExample,
  traversal5NodeExample,
  traversal7NodeExample,
  mst7NodeExample,
  mst7NodeExample2,
  prim6NodeExample,
  dijkstra4NodeTieExample,
  dijkstra6NodeExample,
];
