import { GraphData, BFSStep } from '../types';
import { getSortedNeighbors } from './graphUtils';

/**
 * Breadth First Search (BFS) Implementation based strictly on Chapter 11 rules:
 * Rule 1: Visit adjacent unvisited vertex. Mark it as visited. Display it. Insert it in a queue.
 * Rule 2: If no adjacent vertex is found, remove the first vertex from the queue.
 * Rule 3: Repeat Rule 1 and Rule 2 until queue is empty.
 *
 * Alphabetical order for neighbors.
 */
export function runBFS(
  graph: GraphData,
  startVertexId?: string
): {
  traversalOrder: string[];
  steps: BFSStep[];
} {
  const steps: BFSStep[] = [];
  const start = startVertexId || graph.defaultStartVertex || (graph.vertices[0]?.id ?? 'S');
  const visited: string[] = [];
  const queue: string[] = [];
  const path: string[] = [];

  // Step 0: Initialize Queue
  steps.push({
    stepIndex: 0,
    round: 0,
    type: 'start',
    currentVertex: null,
    visitedVertices: [],
    queue: [],
    activeEdge: null,
    path: [],
    explanation: 'เริ่มต้นการทำงาน: สร้างและกำหนดค่าเริ่มต้นให้ Queue ว่างเปล่า',
    ruleApplied: 'Initialize Queue',
  });

  // Start node
  visited.push(start);
  path.push(start);

  steps.push({
    stepIndex: 1,
    round: 1,
    type: 'visit',
    currentVertex: start,
    visitedVertices: [...visited],
    queue: [...queue],
    activeEdge: null,
    path: [...path],
    explanation: `เริ่มต้นเยี่ยมชมโหนดเริ่มต้น '${start}' ทำเครื่องหมาย visited และแสดงผล (Path: ${path.join('-')})`,
    ruleApplied: 'Rule 1',
  });

  let stepCounter = 2;
  let roundCounter = 1;

  // First, find all unvisited adjacent of start node and enqueue them
  let currentExamining = start;

  while (true) {
    // Find unvisited neighbors of currentExamining
    const neighbors = getSortedNeighbors(graph, currentExamining);
    const unvisitedNeighbors = neighbors.filter((n) => !visited.includes(n.targetId));

    if (unvisitedNeighbors.length > 0) {
      // Rule 1: For each unvisited adjacent vertex, mark visited, display/path, enqueue
      for (const neighbor of unvisitedNeighbors) {
        const nextNode = neighbor.targetId;
        visited.push(nextNode);
        queue.push(nextNode);

        steps.push({
          stepIndex: stepCounter++,
          round: roundCounter,
          type: 'enqueue',
          currentVertex: currentExamining,
          visitedVertices: [...visited],
          queue: [...queue],
          activeEdge: { source: currentExamining, target: nextNode },
          path: [...path],
          explanation: `Rule 1: จาก '${currentExamining}' พบโหนดข้างเคียง '${nextNode}' (เรียงตามตัวอักษร) -> Mark Visited และ Enqueue เข้า Queue`,
          ruleApplied: 'Rule 1',
        });
      }
    }

    // Rule 2: If no adjacent vertex is found (or after enqueuing all neighbors), remove first from queue
    if (queue.length === 0) {
      break;
    }

    const dequeued = queue.shift()!;
    path.push(dequeued);
    roundCounter++;

    steps.push({
      stepIndex: stepCounter++,
      round: roundCounter,
      type: 'dequeue',
      currentVertex: dequeued,
      visitedVertices: [...visited],
      queue: [...queue],
      activeEdge: null,
      path: [...path],
      explanation: `Rule 2: Dequeue โหนด '${dequeued}' ออกจากหัวคิวเพื่อเป็นโหนดตรวจสอบลำดับถัดไป (Path: ${path.join('-')})`,
      ruleApplied: 'Rule 2',
    });

    currentExamining = dequeued;
  }

  // Complete
  steps.push({
    stepIndex: stepCounter,
    round: roundCounter,
    type: 'complete',
    currentVertex: null,
    visitedVertices: [...visited],
    queue: [],
    activeEdge: null,
    path: [...path],
    explanation: `Rule 3: Queue ว่างเปล่าแล้ว การทำงานของ BFS สิ้นสุด ลำดับการ Traversal ที่ได้คือ: ${path.join(' -> ')}`,
    ruleApplied: 'Rule 3 (Complete)',
  });

  return {
    traversalOrder: path,
    steps,
  };
}
