import React, { useState } from 'react';
import {
  FlaskConical,
  Plus,
  Trash2,
  Play,
  RotateCcw,
  Sparkles,
  AlertCircle,
  Network,
  GitFork,
  Milestone,
} from 'lucide-react';
import { GraphCanvas } from '../components/GraphCanvas';
import { TracePanel } from '../components/TracePanel';
import { GraphData, Vertex, Edge } from '../types';
import { allLectureExamples, traversal5NodeExample } from '../data/examplesLibrary';
import { runDFS } from '../algorithms/dfs';
import { runBFS } from '../algorithms/bfs';
import { runPrim } from '../algorithms/prim';
import { runKruskal } from '../algorithms/kruskal';
import { runDijkstra } from '../algorithms/dijkstra';

export const InteractiveGraphLab: React.FC = () => {
  const [graph, setGraph] = useState<GraphData>(traversal5NodeExample);
  const [activeAlgorithm, setActiveAlgorithm] = useState<
    'none' | 'DFS' | 'BFS' | 'Prim' | 'Kruskal' | 'Dijkstra'
  >('none');
  const [startVertex, setStartVertex] = useState<string>('S');
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1000);

  // New Node / Edge Inputs
  const [newVertexLabel, setNewVertexLabel] = useState<string>('');
  const [newEdgeSource, setNewEdgeSource] = useState<string>('');
  const [newEdgeTarget, setNewEdgeTarget] = useState<string>('');
  const [newEdgeWeight, setNewEdgeWeight] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Add Vertex
  const handleAddVertex = () => {
    const label = newVertexLabel.trim().toUpperCase();
    if (!label) {
      setErrorMessage('กรุณาระบุชื่อโหนด');
      return;
    }
    if (graph.vertices.some((v) => v.id === label)) {
      setErrorMessage(`โหนด '${label}' มีอยู่ในกราฟแล้ว`);
      return;
    }

    const newV: Vertex = {
      id: label,
      label,
    };

    setGraph((prev) => ({
      ...prev,
      vertices: [...prev.vertices, newV],
    }));
    setNewVertexLabel('');
    setErrorMessage(null);
    resetAlgorithmState();
  };

  // Remove Vertex
  const handleRemoveVertex = (id: string) => {
    setGraph((prev) => ({
      ...prev,
      vertices: prev.vertices.filter((v) => v.id !== id),
      edges: prev.edges.filter((e) => e.source !== id && e.target !== id),
    }));
    if (startVertex === id) {
      const remaining = graph.vertices.filter((v) => v.id !== id);
      setStartVertex(remaining[0]?.id || '');
    }
    resetAlgorithmState();
  };

  // Add Edge
  const handleAddEdge = () => {
    if (!newEdgeSource || !newEdgeTarget) {
      setErrorMessage('กรุณาเลือกโหนดต้นทางและปลายทาง');
      return;
    }
    if (newEdgeSource === newEdgeTarget) {
      setErrorMessage('ตามสไลด์ Spanning Tree และตัวอย่างทั่วไป ไม่มี Self-loop');
      return;
    }

    const edgeExists = graph.edges.some(
      (e) =>
        (e.source === newEdgeSource && e.target === newEdgeTarget) ||
        (!graph.directed && e.source === newEdgeTarget && e.target === newEdgeSource)
    );

    if (edgeExists) {
      setErrorMessage('มีเส้นเชื่อมนี้อยู่ในกราฟแล้ว');
      return;
    }

    // Validate Edge Weight
    let finalWeight: number | undefined = undefined;
    if (graph.weighted) {
      if (typeof newEdgeWeight !== 'number' || isNaN(newEdgeWeight) || !isFinite(newEdgeWeight)) {
        setErrorMessage('ค่าน้ำหนักต้องเป็นตัวเลขที่ถูกต้อง');
        return;
      }
      if (newEdgeWeight <= 0) {
        setErrorMessage('ค่าน้ำหนักต้องเป็นจำนวนบวก (Weight > 0)');
        return;
      }
      finalWeight = Math.round(newEdgeWeight);
    }

    const newE: Edge = {
      id: `e-${newEdgeSource}-${newEdgeTarget}`,
      source: newEdgeSource,
      target: newEdgeTarget,
      weight: finalWeight,
      directed: graph.directed,
    };

    setGraph((prev) => ({
      ...prev,
      edges: [...prev.edges, newE],
    }));
    setErrorMessage(null);
    resetAlgorithmState();
  };

  // Remove Edge
  const handleRemoveEdge = (edgeId: string) => {
    setGraph((prev) => ({
      ...prev,
      edges: prev.edges.filter((e) => e.id !== edgeId),
    }));
    resetAlgorithmState();
  };

  const resetAlgorithmState = () => {
    setActiveAlgorithm('none');
    setStepIndex(0);
    setIsPlaying(false);
  };

  // Algorithm Execution
  const hasNegativeWeights = graph.edges.some((e) => (e.weight ?? 0) < 0);
  const dfsData = runDFS(graph, startVertex);
  const bfsData = runBFS(graph, startVertex);
  const primData = graph.weighted && !graph.directed ? runPrim(graph, startVertex) : null;
  const kruskalData = graph.weighted && !graph.directed ? runKruskal(graph) : null;
  const dijkstraData = graph.weighted && !hasNegativeWeights ? runDijkstra(graph, startVertex) : null;

  let currentSteps: any[] = [];
  let explanation = '';
  let ruleTag = '';

  if (activeAlgorithm === 'DFS') {
    currentSteps = dfsData.steps;
    explanation = currentSteps[stepIndex]?.explanation || '';
    ruleTag = currentSteps[stepIndex]?.ruleApplied || '';
  } else if (activeAlgorithm === 'BFS') {
    currentSteps = bfsData.steps;
    explanation = currentSteps[stepIndex]?.explanation || '';
    ruleTag = currentSteps[stepIndex]?.ruleApplied || '';
  } else if (activeAlgorithm === 'Prim' && primData) {
    currentSteps = primData.steps;
    explanation = currentSteps[stepIndex]?.explanation || '';
    ruleTag = `Round ${currentSteps[stepIndex]?.round}`;
  } else if (activeAlgorithm === 'Kruskal' && kruskalData) {
    currentSteps = kruskalData.steps;
    explanation = currentSteps[stepIndex]?.explanation || '';
    ruleTag = `Action: ${currentSteps[stepIndex]?.action?.toUpperCase()}`;
  } else if (activeAlgorithm === 'Dijkstra') {
    if (hasNegativeWeights) {
      currentSteps = [];
      explanation = 'Dijkstra ไม่สามารถทำงานกับกราฟที่มีค่าน้ำหนักติดลบ (Negative Weight) ได้ตามหลักการในบทเรียน';
      ruleTag = 'Error: Negative Weight';
    } else if (dijkstraData) {
      currentSteps = dijkstraData.steps;
      explanation = currentSteps[stepIndex]?.explanation || '';
      ruleTag = `Round ${currentSteps[stepIndex]?.round}`;
    }
  }

  const activeStep = currentSteps[Math.min(stepIndex, currentSteps.length - 1)];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-2">
          <FlaskConical className="w-3.5 h-3.5" /> Interactive Graph Lab & Multi-Algorithm Sandbox
        </div>
        <h2 className="text-2xl font-bold text-text-main">
          ห้องทดลองสร้างและจำลองกราฟ (Graph Builder & Sandbox)
        </h2>
        <p className="text-sm text-muted mt-1">
          สร้างกราฟอิสระ เพิ่ม/ลบโหนด และเส้นเชื่อม กำหนดทิศทางและน้ำหนัก หรือโหลดตัวอย่างจากบทเรียน เพื่อทดสอบรันทุกอัลกอริทึม
        </p>
      </div>

      {/* Preset Example Picker */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-surface rounded-2xl border border-border shadow-sm">
        <span className="text-xs font-semibold text-muted">โหลดกราฟตัวอย่างจากสไลด์:</span>
        <div className="flex flex-wrap gap-2">
          {allLectureExamples.map((ex) => (
            <button
              key={ex.id}
              onClick={() => {
                setGraph(ex);
                setStartVertex(ex.defaultStartVertex || ex.vertices[0]?.id || 'A');
                resetAlgorithmState();
              }}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-surface-elevated hover:bg-primary/10 hover:text-primary text-muted border border-border transition"
            >
              {ex.title?.split('(')[0] || ex.id}
            </button>
          ))}
        </div>
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Visual Canvas */}
        <div className="lg:col-span-7 space-y-4">
          <GraphCanvas
            graph={graph}
            activeVertex={activeStep?.currentVertex}
            visitedVertices={activeStep?.visitedVertices}
            treeVertices={
              activeAlgorithm === 'Prim'
                ? activeStep?.currentTreeVertices
                : activeAlgorithm === 'Dijkstra'
                ? activeStep?.treeVertices
                : undefined
            }
            activeEdge={activeStep?.activeEdge}
            selectedEdges={
              activeAlgorithm === 'Prim'
                ? activeStep?.mstEdges
                : activeAlgorithm === 'Kruskal'
                ? activeStep?.mstEdges
                : activeAlgorithm === 'Dijkstra'
                ? activeStep?.treeEdges
                : undefined
            }
            rejectedEdge={
              activeAlgorithm === 'Kruskal' && activeStep?.action === 'reject'
                ? activeStep?.currentEdge
                : null
            }
            candidateEdges={
              activeAlgorithm === 'Prim' ? activeStep?.candidateEdges : undefined
            }
            distances={activeAlgorithm === 'Dijkstra' ? activeStep?.distances : undefined}
            width={480}
            height={380}
          />

          {/* Algorithm Runner Toolbar */}
          <div className="p-4 bg-surface rounded-2xl border border-border shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-text-main">
                เลือกอัลกอริทึมที่ต้องการรันจำลอง:
              </span>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-muted">Start Node:</span>
                <select
                  value={startVertex}
                  onChange={(e) => {
                    setStartVertex(e.target.value);
                    setStepIndex(0);
                    setIsPlaying(false);
                  }}
                  className="bg-surface-elevated border border-border rounded px-2 py-1 font-mono font-bold text-primary"
                >
                  {graph.vertices.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setActiveAlgorithm('DFS');
                  setStepIndex(0);
                  setIsPlaying(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeAlgorithm === 'DFS'
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-surface-elevated text-muted hover:text-text-main border border-border'
                }`}
              >
                <GitFork className="w-3.5 h-3.5" /> DFS
              </button>
              <button
                onClick={() => {
                  setActiveAlgorithm('BFS');
                  setStepIndex(0);
                  setIsPlaying(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeAlgorithm === 'BFS'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-surface-elevated text-muted hover:text-text-main border border-border'
                }`}
              >
                <GitFork className="w-3.5 h-3.5" /> BFS
              </button>
              <button
                disabled={!graph.weighted || graph.directed}
                onClick={() => {
                  setActiveAlgorithm('Prim');
                  setStepIndex(0);
                  setIsPlaying(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed ${
                  activeAlgorithm === 'Prim'
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-surface-elevated text-muted hover:text-text-main border border-border'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" /> Prim
              </button>
              <button
                disabled={!graph.weighted || graph.directed}
                onClick={() => {
                  setActiveAlgorithm('Kruskal');
                  setStepIndex(0);
                  setIsPlaying(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed ${
                  activeAlgorithm === 'Kruskal'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-surface-elevated text-muted hover:text-text-main border border-border'
                }`}
              >
                <Network className="w-3.5 h-3.5" /> Kruskal
              </button>
              <button
                disabled={!graph.weighted}
                onClick={() => {
                  setActiveAlgorithm('Dijkstra');
                  setStepIndex(0);
                  setIsPlaying(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed ${
                  activeAlgorithm === 'Dijkstra'
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-surface-elevated text-muted hover:text-text-main border border-border'
                }`}
              >
                <Milestone className="w-3.5 h-3.5" /> Dijkstra
              </button>
            </div>
          </div>

          {/* Trace Panel when Algorithm is active */}
          {activeAlgorithm !== 'none' && currentSteps.length > 0 && (
            <TracePanel
              stepIndex={stepIndex}
              totalSteps={currentSteps.length}
              isPlaying={isPlaying}
              onNext={() => setStepIndex((prev) => Math.min(prev + 1, currentSteps.length - 1))}
              onPrev={() => setStepIndex((prev) => Math.max(prev - 1, 0))}
              onPlayToggle={() => setIsPlaying(!isPlaying)}
              onReset={() => {
                setStepIndex(0);
                setIsPlaying(false);
              }}
              explanation={explanation}
              ruleTag={ruleTag}
              playbackSpeed={speed}
              onSpeedChange={setSpeed}
            />
          )}
        </div>

        {/* Right Builder Controls */}
        <div className="lg:col-span-5 space-y-4">
          {/* Graph Config Settings */}
          <div className="p-4 bg-surface rounded-2xl border border-border shadow-sm space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-muted">
              ตั้งค่าคุณสมบัติกราฟ (Graph Properties)
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  setGraph((prev) => ({ ...prev, directed: !prev.directed }));
                  resetAlgorithmState();
                }}
                className={`p-2.5 rounded-xl border font-semibold transition ${
                  graph.directed
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'bg-surface-elevated border-border text-muted'
                }`}
              >
                {graph.directed ? '✓ Directed (มีทิศทาง)' : 'Undirected (ไม่มีทิศทาง)'}
              </button>
              <button
                onClick={() => {
                  setGraph((prev) => ({ ...prev, weighted: !prev.weighted }));
                  resetAlgorithmState();
                }}
                className={`p-2.5 rounded-xl border font-semibold transition ${
                  graph.weighted
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'bg-surface-elevated border-border text-muted'
                }`}
              >
                {graph.weighted ? '✓ Weighted (มีน้ำหนัก)' : 'Unweighted (ไม่มีน้ำหนัก)'}
              </button>
            </div>
          </div>

          {/* Add Vertex & Edge Forms */}
          <div className="p-4 bg-surface rounded-2xl border border-border shadow-sm space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-muted">
              สร้างจุดยอดและเส้นเชื่อม (Builder Tools)
            </h4>

            {errorMessage && (
              <div className="p-2.5 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-xs flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Add Node */}
            <div className="space-y-1.5">
              <label className="text-xs text-muted">เพิ่มจุดยอด (Vertex):</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={3}
                  placeholder="เช่น H, X, 1"
                  value={newVertexLabel}
                  onChange={(e) => setNewVertexLabel(e.target.value)}
                  className="flex-1 bg-surface-elevated border border-border rounded-xl px-3 py-1.5 text-xs font-mono uppercase focus:outline-none focus:border-primary text-text-main"
                />
                <button
                  onClick={handleAddVertex}
                  className="px-3 py-1.5 bg-primary text-white rounded-xl text-xs font-semibold hover:bg-primary-hover transition flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> เพิ่ม
                </button>
              </div>
            </div>

            {/* Add Edge */}
            <div className="space-y-1.5 pt-2 border-t border-border">
              <label className="text-xs text-muted">เพิ่มเส้นเชื่อม (Edge):</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <select
                  value={newEdgeSource}
                  onChange={(e) => setNewEdgeSource(e.target.value)}
                  className="bg-surface-elevated border border-border rounded-xl p-2 font-mono"
                >
                  <option value="">เลือกต้นทาง</option>
                  {graph.vertices.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.label}
                    </option>
                  ))}
                </select>
                <select
                  value={newEdgeTarget}
                  onChange={(e) => setNewEdgeTarget(e.target.value)}
                  className="bg-surface-elevated border border-border rounded-xl p-2 font-mono"
                >
                  <option value="">เลือกปลายทาง</option>
                  {graph.vertices.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </div>

              {graph.weighted && (
                <div className="flex items-center gap-2 pt-1 text-xs">
                  <span className="text-muted">Weight:</span>
                  <input
                    type="number"
                    min="1"
                    max="999"
                    value={newEdgeWeight}
                    onChange={(e) => setNewEdgeWeight(Number(e.target.value))}
                    className="w-20 bg-surface-elevated border border-border rounded-xl px-2.5 py-1 font-mono text-text-main"
                  />
                </div>
              )}

              <button
                onClick={handleAddEdge}
                className="w-full mt-2 py-2 bg-surface-elevated hover:bg-primary/10 hover:text-primary text-text-main border border-border rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> เชื่อม Edge
              </button>
            </div>
          </div>

          {/* Current Graph Elements List */}
          <div className="p-4 bg-surface rounded-2xl border border-border shadow-sm space-y-2 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-muted">
              รายการโหนด & เส้นเชื่อมปัจจุบัน
            </h4>
            <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pt-1">
              {graph.edges.map((e) => (
                <span
                  key={e.id}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface-elevated border border-border rounded-lg font-mono text-[11px]"
                >
                  {e.source}
                  {graph.directed ? '→' : '—'}
                  {e.target}
                  {e.weight !== undefined && `(${e.weight})`}
                  <button
                    onClick={() => handleRemoveEdge(e.id)}
                    className="text-muted hover:text-red-500"
                    title="ลบเส้น"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
