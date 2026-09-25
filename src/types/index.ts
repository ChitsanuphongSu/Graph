export interface Vertex {
  id: string;
  label: string;
  x?: number;
  y?: number;
}

export interface Edge {
  id: string;
  source: string;
  target: string;
  weight?: number;
  directed: boolean;
}

export interface GraphData {
  id?: string;
  title?: string;
  description?: string;
  vertices: Vertex[];
  edges: Edge[];
  directed: boolean;
  weighted: boolean;
  defaultStartVertex?: string;
  defaultTargetVertex?: string;
}

export type TraversalStepType =
  | 'start'
  | 'visit'
  | 'explore_adjacent'
  | 'push_stack'
  | 'pop_stack'
  | 'enqueue'
  | 'dequeue'
  | 'dead_end'
  | 'complete';

export interface DFSStep {
  stepIndex: number;
  type: TraversalStepType;
  currentVertex: string | null;
  visitedVertices: string[];
  stack: string[];
  activeEdge: { source: string; target: string } | null;
  path: string[];
  explanation: string;
  ruleApplied?: 'Rule 1' | 'Rule 2' | 'Rule 3' | string;
}

export interface BFSStep {
  stepIndex: number;
  round?: number;
  type: TraversalStepType;
  currentVertex: string | null;
  visitedVertices: string[];
  queue: string[];
  activeEdge: { source: string; target: string } | null;
  path: string[];
  explanation: string;
  ruleApplied?: 'Rule 1' | 'Rule 2' | 'Rule 3' | string;
}

export interface PrimCandidateEdge {
  source: string;
  target: string;
  weight: number;
}

export interface PrimStep {
  stepIndex: number;
  round: number;
  currentTreeVertices: string[];
  candidateEdges: PrimCandidateEdge[];
  selectedEdge: PrimCandidateEdge | null;
  totalWeight: number;
  mstEdges: PrimCandidateEdge[];
  explanation: string;
  isComplete: boolean;
}

export interface KruskalEdgeEvaluation {
  source: string;
  target: string;
  weight: number;
  status: 'pending' | 'selected' | 'rejected';
  reason?: string;
}

export interface KruskalStep {
  stepIndex: number;
  round: number;
  allEdgesSorted: KruskalEdgeEvaluation[];
  currentEdgeIndex: number;
  currentEdge: KruskalEdgeEvaluation | null;
  action: 'examine' | 'select' | 'reject' | 'complete';
  cycleDetected: boolean;
  mstEdges: KruskalEdgeEvaluation[];
  totalWeight: number;
  explanation: string;
  isComplete: boolean;
}

export interface DijkstraCandidatePath {
  source: string;
  target: string;
  edgeWeight: number;
  totalAccumulatedWeight: number;
  pathString: string;
}

export interface DijkstraStep {
  stepIndex: number;
  round: number;
  treeVertices: string[];
  distances: Record<string, number>;
  previousNodes: Record<string, string | null>;
  candidatePaths: DijkstraCandidatePath[];
  selectedCandidate: DijkstraCandidatePath | null;
  treeEdges: { source: string; target: string; weight: number }[];
  explanation: string;
  tieNote?: string;
  isComplete: boolean;
}

export type StudySection =
  | 'dashboard'
  | 'quick-review'
  | 'fundamentals'
  | 'representation'
  | 'traversal'
  | 'mst'
  | 'shortest-path'
  | 'graph-lab'
  | 'practice'
  | 'trace-practice'
  | 'quiz'
  | 'mock-exam'
  | 'weakness'
  | 'common-mistakes'
  | 'reference';

export interface PracticeQuestion {
  id: string;
  category:
    | 'fundamentals'
    | 'types'
    | 'matrix'
    | 'list'
    | 'dfs'
    | 'bfs'
    | 'prim'
    | 'kruskal'
    | 'dijkstra';
  title: string;
  prompt: string;
  type: 'single-choice' | 'multiple-choice' | 'matrix-entry' | 'trace-order' | 'true-false';
  graphData?: GraphData;
  startVertex?: string;
  options?: { id: string; text: string }[];
  correctAnswer: any; // string, string[], or matrix 2D array
  explanation: string;
  lectureNote?: string;
}

export interface UserStats {
  completedLessons: string[];
  practiceAttempts: Record<string, { answered: any; isCorrect: boolean; timestamp: number }>;
  quizHistory: {
    quizId: string;
    score: number;
    total: number;
    percentage: number;
    categoryBreakdown: Record<string, { correct: number; total: number }>;
    timestamp: number;
  }[];
  theme: 'light' | 'dark' | 'system';
}
