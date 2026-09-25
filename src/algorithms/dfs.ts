import { GraphData, DFSStep } from '../types';
import { getSortedNeighbors } from './graphUtils';

/**
 * Depth First Search (DFS) Implementation based strictly on Chapter 11 rules:
 * Rule 1: Visit adjacent unvisited vertex. Mark it as visited. Display it. Push it in a stack.
 * Rule 2: If no adjacent vertex is found, pop up a vertex from the stack.
 * Rule 3: Repeat Rule 1 and Rule 2 until the stack is empty.
 *
 * Tie-breaking: Alphabetical order (as specified in lecture slides).
 */
export function runDFS(
  graph: GraphData,
  startVertexId?: string
): {
  traversalOrder: string[];
  steps: DFSStep[];
} {
  const steps: DFSStep[] = [];
  const start = startVertexId || graph.defaultStartVertex || (graph.vertices[0]?.id ?? 'A');
  const visited: string[] = [];
  const stack: string[] = [];
  const path: string[] = [];

  // Initial step - Stack initialized
  steps.push({
    stepIndex: 0,
    type: 'start',
    currentVertex: null,
    visitedVertices: [],
    stack: [],
    activeEdge: null,
    path: [],
    explanation: 'เริ่มต้นการทำงาน: สร้างและกำหนดค่าเริ่มต้นให้ Stack ว่างเปล่า',
    ruleApplied: 'Initialize Stack',
  });

  // Start with startVertex
  visited.push(start);
  stack.push(start);
  path.push(start);

  steps.push({
    stepIndex: 1,
    type: 'visit',
    currentVertex: start,
    visitedVertices: [...visited],
    stack: [...stack],
    activeEdge: null,
    path: [...path],
    explanation: `Rule 1: เยี่ยมชมโหนดเริ่มต้น '${start}' ทำเครื่องหมาย visited, แสดงผล และ Push ลง Stack`,
    ruleApplied: 'Rule 1',
  });

  let stepCounter = 2;

  while (stack.length > 0) {
    const current = stack[stack.length - 1]; // Top of stack
    const neighbors = getSortedNeighbors(graph, current);
    const unvisitedNeighbor = neighbors.find((n) => !visited.includes(n.targetId));

    if (unvisitedNeighbor) {
      // Rule 1: Visit adjacent unvisited vertex
      const nextNode = unvisitedNeighbor.targetId;
      visited.push(nextNode);
      stack.push(nextNode);
      path.push(nextNode);

      steps.push({
        stepIndex: stepCounter++,
        type: 'visit',
        currentVertex: nextNode,
        visitedVertices: [...visited],
        stack: [...stack],
        activeEdge: { source: current, target: nextNode },
        path: [...path],
        explanation: `Rule 1: จาก '${current}' พบโหนดข้างเคียงที่ยังไม่เคยแวะคือ '${nextNode}' (เลือกตามลำดับตัวอักษร) -> Mark Visited, แสดงผล และ Push ลง Stack`,
        ruleApplied: 'Rule 1',
      });
    } else {
      // Rule 2: If no adjacent vertex found, pop from stack
      const popped = stack.pop();

      steps.push({
        stepIndex: stepCounter++,
        type: 'pop_stack',
        currentVertex: stack.length > 0 ? stack[stack.length - 1] : null,
        visitedVertices: [...visited],
        stack: [...stack],
        activeEdge: null,
        path: [...path],
        explanation: `Rule 2: โหนด '${popped}' ไม่มี Adjacent Vertex ที่ยังไม่ได้เยี่ยมชมแล้ว -> Pop '${popped}' ออกจาก Stack เพื่อย้อนกลับไปตรวจสอบโหนดก่อนหน้า`,
        ruleApplied: 'Rule 2',
      });
    }
  }

  // Rule 3 Complete
  steps.push({
    stepIndex: stepCounter,
    type: 'complete',
    currentVertex: null,
    visitedVertices: [...visited],
    stack: [],
    activeEdge: null,
    path: [...path],
    explanation: `Rule 3: Stack ว่างเปล่าแล้ว การทำงานของ DFS สิ้นสุด ลำดับการ Traversal ที่ได้คือ: ${path.join(' -> ')}`,
    ruleApplied: 'Rule 3 (Complete)',
  });

  return {
    traversalOrder: path,
    steps,
  };
}
