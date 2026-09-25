import React, { useState } from 'react';
import { Milestone, Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { GraphCanvas } from '../components/GraphCanvas';
import { TracePanel } from '../components/TracePanel';
import {
  dijkstra4NodeTieExample,
  dijkstra6NodeExample,
} from '../data/examplesLibrary';
import { runDijkstra } from '../algorithms/dijkstra';
import { GraphData } from '../types';

interface ShortestPathProps {
  onComplete?: () => void;
}

export const ShortestPath: React.FC<ShortestPathProps> = ({ onComplete }) => {
  const [selectedExampleId, setSelectedExampleId] = useState<'6node' | '4tie'>('6node');
  const [startVertex, setStartVertex] = useState<string>('A');
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1000);

  const currentGraph: GraphData =
    selectedExampleId === '6node' ? dijkstra6NodeExample : dijkstra4NodeTieExample;

  const dijkstraResult = runDijkstra(currentGraph, startVertex);
  const totalSteps = dijkstraResult.steps.length;
  const currentStep =
    dijkstraResult.steps[Math.min(stepIndex, totalSteps - 1)] || dijkstraResult.steps[0];

  const handleExampleChange = (ex: '6node' | '4tie') => {
    setSelectedExampleId(ex);
    setStartVertex(ex === '6node' ? 'A' : 'b');
    setStepIndex(0);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-2">
          <Milestone className="w-3.5 h-3.5" /> บทเรียนที่ 5 (สไลด์หน้า 85 - 97)
        </div>
        <h2 className="text-2xl font-bold text-text-main">
          เส้นทางที่สั้นที่สุด (Shortest Path Algorithm — Dijkstra)
        </h2>
        <p className="text-sm text-muted mt-1">
          การหาเส้นทางการส่งข้อมูลจากต้นทางไปยังปลายทางโดยให้มีระยะทางสั้นที่สุด (ค่าน้ำหนักสะสม T น้อยที่สุด)
        </p>
      </div>

      {/* Concept Callout */}
      <div className="p-4 bg-surface-elevated rounded-2xl border border-border text-xs leading-relaxed space-y-1.5">
        <h4 className="font-bold text-primary flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" /> ขั้นตอนการทำงานของ Dijkstra ตามสไลด์หน้า 86:
        </h4>
        <ol className="list-decimal list-inside text-muted space-y-1">
          <li>
            <strong>แทรก Vertex เริ่มต้นใน Tree:</strong> กำหนดโหนดเริ่มต้นในการทำงาน โดยมีน้ำหนักสะสมเริ่มต้น <strong>T = 0</strong>
          </li>
          <li>
            <strong>เลือก Edge จาก Adjacent Vertex ใน Tree ไปยัง Vertex ที่ยังไม่อยู่ใน Tree:</strong> และมีผลรวมของ Weight น้อยที่สุด <strong>(ผลรวมนี้เป็นผลรวมสะสม T)</strong> แล้วแทรกใน Tree
          </li>
          <li>
            <strong>ทำซ้ำข้อ 2:</strong> จนกว่าจะครบทุก Vertex ที่ปรากฏใน Tree
          </li>
        </ol>
      </div>

      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-surface rounded-2xl border border-border shadow-sm">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted font-medium">ตัวอย่างจากสไลด์:</span>
          <button
            onClick={() => handleExampleChange('6node')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              selectedExampleId === '6node'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface-elevated text-muted border border-border'
            }`}
          >
            6-Node Full Example (หน้า 92-97)
          </button>
          <button
            onClick={() => handleExampleChange('4tie')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              selectedExampleId === '4tie'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface-elevated text-muted border border-border'
            }`}
          >
            4-Node Tie Example (หน้า 87-91)
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

      {/* Visualizer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Canvas */}
        <div className="lg:col-span-6 flex flex-col space-y-3">
          <GraphCanvas
            graph={currentGraph}
            treeVertices={currentStep.treeVertices}
            selectedEdges={currentStep.treeEdges}
            distances={currentStep.distances}
            width={440}
            height={360}
          />

          {/* Current Accumulated Distances Table */}
          <div className="p-4 bg-surface rounded-xl border border-border space-y-2 shadow-sm">
            <div className="text-xs font-semibold text-muted flex items-center justify-between">
              <span>ค่าน้ำหนักสะสม (Accumulated T) จากจุด '{startVertex}':</span>
              <span className="text-primary font-mono font-bold">Tree: &#123;{currentStep.treeVertices.join(', ')}&#125;</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {currentGraph.vertices.map((v) => {
                const dist = currentStep.distances[v.id];
                const inTree = currentStep.treeVertices.includes(v.id);
                return (
                  <div
                    key={v.id}
                    className={`p-2 rounded-xl text-center border font-mono ${
                      inTree
                        ? 'bg-primary/10 border-primary text-primary font-bold shadow-xs'
                        : 'bg-surface-elevated border-border text-muted'
                    }`}
                  >
                    <div className="text-xs">{v.label}</div>
                    <div className="text-sm font-bold">
                      {dist === Infinity ? '∞' : `T=${dist}`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Step Controller & Candidates Evaluation */}
        <div className="lg:col-span-6 space-y-4">
          <TracePanel
            stepIndex={stepIndex}
            totalSteps={totalSteps}
            isPlaying={isPlaying}
            onNext={() => setStepIndex((prev) => Math.min(prev + 1, totalSteps - 1))}
            onPrev={() => setStepIndex((prev) => Math.max(prev - 1, 0))}
            onPlayToggle={() => setIsPlaying(!isPlaying)}
            onReset={() => {
              setStepIndex(0);
              setIsPlaying(false);
            }}
            explanation={currentStep.explanation}
            ruleTag={`Round ${currentStep.round}`}
            playbackSpeed={speed}
            onSpeedChange={setSpeed}
            extraStateNode={
              <div className="space-y-4 pt-2">
                {/* Tie Note if present */}
                {currentStep.tieNote && (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-600 dark:text-amber-400 space-y-1">
                    <div className="font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> ข้อสังเกตจากสไลด์หน้า 90-91 (Tie Detection):
                    </div>
                    <div>{currentStep.tieNote}</div>
                  </div>
                )}

                {/* Candidate Paths List */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-muted">
                    เส้นทางที่เป็นไปได้และค่าน้ำหนักสะสม (Possible Paths Calculation):
                  </div>
                  <div className="space-y-1.5">
                    {currentStep.candidatePaths.length > 0 ? (
                      currentStep.candidatePaths.map((cand, idx) => {
                        const isSelected =
                          currentStep.selectedCandidate?.source === cand.source &&
                          currentStep.selectedCandidate?.target === cand.target;
                        return (
                          <div
                            key={idx}
                            className={`p-2.5 rounded-xl border text-xs font-mono flex items-center justify-between transition ${
                              isSelected
                                ? 'bg-primary text-white border-primary font-bold shadow-xs'
                                : 'bg-surface-elevated text-text-main border-border'
                            }`}
                          >
                            <span>{cand.pathString}</span>
                            {isSelected && (
                              <span className="text-[10px] uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded font-sans">
                                เลือก (Min T)
                              </span>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-xs text-muted italic p-2">
                        {currentStep.isComplete
                          ? 'คำนวณ Shortest Path ครบทุกโหนดแล้ว'
                          : 'กำลังเริ่มต้นคำนวณ'}
                      </div>
                    )}
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
          <CheckCircle2 className="w-4 h-4" /> บันทึกว่าเข้าใจ Dijkstra Shortest Path แล้ว
        </button>
      </div>
    </div>
  );
};
