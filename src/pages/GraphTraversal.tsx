import React, { useState } from 'react';
import { GitFork, Layers, CheckCircle2 } from 'lucide-react';
import { GraphCanvas } from '../components/GraphCanvas';
import { TracePanel } from '../components/TracePanel';
import {
  traversal5NodeExample,
  traversal7NodeExample,
} from '../data/examplesLibrary';
import { runDFS } from '../algorithms/dfs';
import { runBFS } from '../algorithms/bfs';
import { GraphData } from '../types';

interface GraphTraversalProps {
  onComplete?: () => void;
}

export const GraphTraversal: React.FC<GraphTraversalProps> = ({ onComplete }) => {
  const [algoMode, setAlgoMode] = useState<'DFS' | 'BFS'>('DFS');
  const [selectedExampleId, setSelectedExampleId] = useState<'5node' | '7node'>('5node');
  const [startVertex, setStartVertex] = useState<string>('S');
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1000);

  const currentGraph: GraphData =
    selectedExampleId === '5node' ? traversal5NodeExample : traversal7NodeExample;

  // Run Real Algorithm
  const dfsResult = runDFS(currentGraph, startVertex);
  const bfsResult = runBFS(currentGraph, startVertex);

  const currentSteps = algoMode === 'DFS' ? dfsResult.steps : bfsResult.steps;
  const activeStep = currentSteps[Math.min(stepIndex, currentSteps.length - 1)] || currentSteps[0];

  const handleModeChange = (mode: 'DFS' | 'BFS') => {
    setAlgoMode(mode);
    setStepIndex(0);
    setIsPlaying(false);
  };

  const handleExampleChange = (ex: '5node' | '7node') => {
    setSelectedExampleId(ex);
    setStartVertex(ex === '5node' ? 'S' : 'S');
    setStepIndex(0);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-2">
          <GitFork className="w-3.5 h-3.5" /> บทเรียนที่ 3 (สไลด์หน้า 18 - 45)
        </div>
        <h2 className="text-2xl font-bold text-text-main">
          การท่องกราฟ (Graph Traversal): Depth First vs Breadth First
        </h2>
        <p className="text-sm text-muted mt-1">
          จำลองการทำงานจริง Step-by-Step ตามกฎ 3 ข้อของสไลด์ พร้อมตรวจสอบ Stack และ Queue แบบเรียลไทม์
        </p>
      </div>

      {/* Control Bar: Algorithm Mode & Example Selection */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-surface rounded-2xl border border-border shadow-sm">
        {/* Mode Toggle */}
        <div className="flex items-center bg-surface-elevated p-1 rounded-xl border border-border">
          <button
            onClick={() => handleModeChange('DFS')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              algoMode === 'DFS'
                ? 'bg-primary text-white shadow-sm'
                : 'text-muted hover:text-text-main'
            }`}
          >
            <GitFork className="w-3.5 h-3.5" /> DFS (Stack)
          </button>
          <button
            onClick={() => handleModeChange('BFS')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              algoMode === 'BFS'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-muted hover:text-text-main'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> BFS (Queue)
          </button>
        </div>

        {/* Example Selector */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted font-medium">ตัวอย่างกราฟ:</span>
          <button
            onClick={() => handleExampleChange('5node')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              selectedExampleId === '5node'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface-elevated text-muted border border-border'
            }`}
          >
            5-Node Graph (หน้า 21-28, 34-43)
          </button>
          <button
            onClick={() => handleExampleChange('7node')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              selectedExampleId === '7node'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface-elevated text-muted border border-border'
            }`}
          >
            7-Node Graph (หน้า 29-31, 44-45)
          </button>
        </div>

        {/* Start Vertex Picker */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted font-medium">จุดเริ่มต้น:</span>
          <select
            value={startVertex}
            onChange={(e) => {
              setStartVertex(e.target.value);
              setStepIndex(0);
              setIsPlaying(false);
            }}
            className="bg-surface-elevated border border-border rounded-lg px-2.5 py-1.5 font-mono font-bold text-primary focus:outline-none focus:border-primary"
          >
            {currentGraph.vertices.map((v) => (
              <option key={v.id} value={v.id}>
                โหนด {v.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Rules Callout Card */}
      <div className="p-4 bg-surface-elevated rounded-2xl border border-border text-xs leading-relaxed space-y-1">
        <h4 className="font-bold text-text-main flex items-center gap-1.5">
          {algoMode === 'DFS' ? (
            <span className="text-primary">กฎ 3 ข้อของ Depth First Search (DFS):</span>
          ) : (
            <span className="text-blue-500">กฎ 3 ข้อของ Breadth First Search (BFS):</span>
          )}
        </h4>
        {algoMode === 'DFS' ? (
          <ul className="list-disc list-inside text-muted space-y-0.5">
            <li>
              <strong>Rule 1:</strong> เยี่ยมชม Adjacent unvisited vertex ทำเครื่องหมาย Visited, แสดงผล และ <strong>Push ลง Stack</strong>
            </li>
            <li>
              <strong>Rule 2:</strong> หากไม่พบโหนดข้างเคียงที่ยังไม่ได้แวะ ให้ <strong>Pop vertex ออกจาก Stack</strong>
            </li>
            <li>
              <strong>Rule 3:</strong> ทำซ้ำ Rule 1 และ Rule 2 จนกว่า Stack จะว่างเปล่า
            </li>
          </ul>
        ) : (
          <ul className="list-disc list-inside text-muted space-y-0.5">
            <li>
              <strong>Rule 1:</strong> เยี่ยมชม Adjacent unvisited vertex ทำเครื่องหมาย Visited, แสดงผล และ <strong>Insert (Enqueue) เข้า Queue</strong>
            </li>
            <li>
              <strong>Rule 2:</strong> หากไม่พบโหนดข้างเคียงที่ยังไม่ได้แวะ ให้ <strong>Remove first vertex จาก Queue (Dequeue)</strong>
            </li>
            <li>
              <strong>Rule 3:</strong> ทำซ้ำ Rule 1 และ Rule 2 จนกว่า Queue จะว่างเปล่า
            </li>
          </ul>
        )}
      </div>

      {/* Visualizer & Step Tracing Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Canvas */}
        <div className="lg:col-span-6 flex flex-col space-y-3">
          <GraphCanvas
            graph={currentGraph}
            activeVertex={activeStep.currentVertex}
            visitedVertices={activeStep.visitedVertices}
            activeEdge={activeStep.activeEdge}
            width={440}
            height={360}
          />

          {/* Current Path Sequence */}
          <div className="p-3.5 bg-surface rounded-xl border border-border shadow-sm">
            <div className="text-xs font-semibold text-muted uppercase mb-1.5">
              ลำดับเส้นทางการท่องกราฟ (Traversal Path):
            </div>
            <div className="font-mono font-bold text-primary text-sm tracking-wide break-all">
              {activeStep.path.length > 0 ? activeStep.path.join('  →  ') : '(ยังไม่เริ่ม)'}
            </div>
          </div>
        </div>

        {/* Right Step Controller & Data Structure State */}
        <div className="lg:col-span-6 space-y-4">
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
            explanation={activeStep.explanation}
            ruleTag={activeStep.ruleApplied}
            playbackSpeed={speed}
            onSpeedChange={setSpeed}
            extraStateNode={
              <div className="space-y-4 pt-2">
                {/* Stack or Queue visualization */}
                {algoMode === 'DFS' ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-muted">
                      <span>สถานะ Stack (LIFO):</span>
                      <span className="text-primary font-mono font-bold">
                        Top = {(activeStep as any).stack.slice(-1)[0] || 'ว่าง'}
                      </span>
                    </div>
                    <div className="flex flex-col-reverse gap-1 p-3 bg-surface border border-border rounded-xl min-h-[90px] justify-start items-center">
                      {(activeStep as any).stack.length > 0 ? (
                        (activeStep as any).stack.map((item: string, idx: number) => {
                          const isTop = idx === (activeStep as any).stack.length - 1;
                          return (
                            <div
                              key={idx}
                              className={`w-32 py-1 text-center font-mono font-bold text-xs rounded-lg border shadow-xs transition-all ${
                                isTop
                                  ? 'bg-primary text-white border-primary'
                                  : 'bg-surface-elevated text-text-main border-border'
                              }`}
                            >
                              {item} {isTop && '← TOP'}
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-xs text-muted italic my-auto">Stack ว่างเปล่า</div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-muted">
                      <span>สถานะ Queue (FIFO):</span>
                      <span className="text-blue-500 font-mono font-bold">
                        Front = {(activeStep as any).queue[0] || 'ว่าง'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 p-3 bg-surface border border-border rounded-xl min-h-[60px] overflow-x-auto">
                      {(activeStep as any).queue.length > 0 ? (
                        (activeStep as any).queue.map((item: string, idx: number) => {
                          const isFront = idx === 0;
                          return (
                            <div
                              key={idx}
                              className={`px-3 py-1.5 font-mono font-bold text-xs rounded-lg border shadow-xs transition-all flex items-center gap-1 ${
                                isFront
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : 'bg-surface-elevated text-text-main border-border'
                              }`}
                            >
                              {isFront && <span className="text-[10px] opacity-80">Front:</span>}
                              {item}
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-xs text-muted italic my-auto">Queue ว่างเปล่า</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Visited Set */}
                <div className="p-3 bg-surface-elevated rounded-xl border border-border text-xs space-y-1">
                  <div className="text-muted font-semibold">โหนดที่เคยเยี่ยมชมแล้ว (Visited Set):</div>
                  <div className="font-mono text-text-main font-semibold">
                    &#123;{activeStep.visitedVertices.join(', ') || 'ว่าง'}&#125;
                  </div>
                </div>
              </div>
            }
          />
        </div>
      </div>

      {/* Completion */}
      <div className="flex justify-end">
        <button
          onClick={onComplete}
          className="px-5 py-2.5 bg-primary text-white font-semibold rounded-xl text-sm hover:bg-primary-hover transition shadow-sm flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" /> บันทึกว่าเข้าใจ DFS / BFS แล้ว
        </button>
      </div>
    </div>
  );
};
