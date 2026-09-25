import React, { useState } from 'react';
import { Network, Sparkles, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { GraphCanvas } from '../components/GraphCanvas';
import { TracePanel } from '../components/TracePanel';
import {
  mst7NodeExample,
  mst7NodeExample2,
  prim6NodeExample,
} from '../data/examplesLibrary';
import { runPrim } from '../algorithms/prim';
import { runKruskal } from '../algorithms/kruskal';
import { GraphData } from '../types';

interface MinimumSpanningTreeProps {
  onComplete?: () => void;
}

export const MinimumSpanningTree: React.FC<MinimumSpanningTreeProps> = ({ onComplete }) => {
  const [algoMode, setAlgoMode] = useState<'prim' | 'kruskal'>('prim');
  const [selectedExampleId, setSelectedExampleId] = useState<'mst7' | 'mst7_2' | 'prim6'>('mst7');
  const [startVertex, setStartVertex] = useState<string>('a');
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1000);

  const currentGraph: GraphData =
    selectedExampleId === 'mst7'
      ? mst7NodeExample
      : selectedExampleId === 'mst7_2'
      ? mst7NodeExample2
      : prim6NodeExample;

  const primResult = runPrim(currentGraph, startVertex);
  const kruskalResult = runKruskal(currentGraph);

  const totalSteps =
    algoMode === 'prim' ? primResult.steps.length : kruskalResult.steps.length;

  const currentStep =
    algoMode === 'prim'
      ? primResult.steps[Math.min(stepIndex, primResult.steps.length - 1)] || primResult.steps[0]
      : kruskalResult.steps[Math.min(stepIndex, kruskalResult.steps.length - 1)] ||
        kruskalResult.steps[0];

  const handleModeChange = (mode: 'prim' | 'kruskal') => {
    setAlgoMode(mode);
    setStepIndex(0);
    setIsPlaying(false);
  };

  const handleExampleChange = (ex: 'mst7' | 'mst7_2' | 'prim6') => {
    setSelectedExampleId(ex);
    setStartVertex(ex === 'mst7' ? 'a' : 'A');
    setStepIndex(0);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-2">
          <Network className="w-3.5 h-3.5" /> บทเรียนที่ 4 (สไลด์หน้า 46 - 84)
        </div>
        <h2 className="text-2xl font-bold text-text-main">
          Minimum Spanning Tree (MST): Prim's vs Kruskal's Algorithm
        </h2>
        <p className="text-sm text-muted mt-1">
          ต้นไม้ครอบคลุมที่น้อยที่สุด เชื่อมต่อครบทุกโหนดโดยไม่มีวงจร (No Loop/Cycle) และมุ่งเน้นผลรวมค่าน้ำหนักน้อยที่สุด
        </p>
      </div>

      {/* Practical Applications Callout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-surface rounded-2xl border border-border space-y-1.5 shadow-sm">
          <span className="text-xs font-bold text-primary">1. เครือข่ายคอมพิวเตอร์</span>
          <p className="text-xs text-muted leading-relaxed">
            เชื่อมโยงเครื่องคอมพิวเตอร์ทั้งหมดเข้าด้วยกันด้วยค่าใช้จ่ายและสายสัญญาณต่ำที่สุด (สไลด์หน้า 48-49)
          </p>
        </div>
        <div className="p-4 bg-surface rounded-2xl border border-border space-y-1.5 shadow-sm">
          <span className="text-xs font-bold text-primary">2. การวางระบบท่อและสายไฟ</span>
          <p className="text-xs text-muted leading-relaxed">
            เชื่อมต่อโครงสร้างพื้นฐาน ท่อส่ง หรือสายไฟฟ้าไปยังทุกบ้านในเมืองด้วยต้นทุนต่ำสุด (สไลด์หน้า 48-49)
          </p>
        </div>
        <div className="p-4 bg-surface rounded-2xl border border-border space-y-1.5 shadow-sm">
          <span className="text-xs font-bold text-primary">3. วางแผนเส้นทางขนส่ง</span>
          <p className="text-xs text-muted leading-relaxed">
            วิเคราะห์และเพิ่มประสิทธิภาพการกระจายสินค้าและเส้นทางคมนาคมระหว่างจุดต่างๆ (สไลด์หน้า 48-49)
          </p>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-surface rounded-2xl border border-border shadow-sm">
        {/* Mode Toggle */}
        <div className="flex items-center bg-surface-elevated p-1 rounded-xl border border-border">
          <button
            onClick={() => handleModeChange('prim')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              algoMode === 'prim'
                ? 'bg-primary text-white shadow-sm'
                : 'text-muted hover:text-text-main'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Prim's Algorithm
          </button>
          <button
            onClick={() => handleModeChange('kruskal')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              algoMode === 'kruskal'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-muted hover:text-text-main'
            }`}
          >
            <Network className="w-3.5 h-3.5" /> Kruskal's Algorithm
          </button>
        </div>

        {/* Example Selector */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted font-medium">ตัวอย่างจากสไลด์:</span>
          <button
            onClick={() => handleExampleChange('mst7')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              selectedExampleId === 'mst7'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface-elevated text-muted border border-border'
            }`}
          >
            7-Node Main (หน้า 53, 69)
          </button>
          <button
            onClick={() => handleExampleChange('mst7_2')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              selectedExampleId === 'mst7_2'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface-elevated text-muted border border-border'
            }`}
          >
            7-Node Cycle Check (หน้า 77)
          </button>
          <button
            onClick={() => handleExampleChange('prim6')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              selectedExampleId === 'prim6'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface-elevated text-muted border border-border'
            }`}
          >
            6-Node Prim (หน้า 61)
          </button>
        </div>

        {/* Start vertex for Prim */}
        {algoMode === 'prim' && (
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
        )}
      </div>

      {/* Visualizer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Canvas */}
        <div className="lg:col-span-6 flex flex-col space-y-3">
          <GraphCanvas
            graph={currentGraph}
            treeVertices={
              algoMode === 'prim'
                ? (currentStep as any).currentTreeVertices
                : undefined
            }
            selectedEdges={
              algoMode === 'prim'
                ? (currentStep as any).mstEdges
                : (currentStep as any).mstEdges
            }
            candidateEdges={
              algoMode === 'prim'
                ? (currentStep as any).candidateEdges
                : undefined
            }
            rejectedEdge={
              algoMode === 'kruskal' && (currentStep as any).action === 'reject'
                ? (currentStep as any).currentEdge
                : null
            }
            width={440}
            height={360}
          />

          {/* MST Total Weight Banner */}
          <div className="p-4 bg-surface rounded-xl border border-border flex items-center justify-between shadow-sm">
            <span className="text-xs text-muted font-semibold">น้ำหนักรวมของ Spanning Tree:</span>
            <span className="text-lg font-mono font-bold text-primary">
              Weight = {currentStep.totalWeight}
            </span>
          </div>
        </div>

        {/* Right Step Controller & Edge Inspection */}
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
            ruleTag={
              algoMode === 'prim'
                ? `Round ${(currentStep as any).round}`
                : `Action: ${(currentStep as any).action?.toUpperCase()}`
            }
            playbackSpeed={speed}
            onSpeedChange={setSpeed}
            extraStateNode={
              algoMode === 'kruskal' ? (
                /* Kruskal Sorted Edge Evaluation Table */
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-semibold text-muted flex items-center justify-between">
                    <span>ตารางเส้นเชื่อมเรียงตามน้ำหนัก (สไลด์หน้า 69, 77):</span>
                    { (currentStep as any).cycleDetected && (
                      <span className="text-red-500 flex items-center gap-1 font-bold text-[11px]">
                        <ShieldAlert className="w-3.5 h-3.5" /> ตรวจพบวงจร!
                      </span>
                    )}
                  </div>
                  <div className="overflow-x-auto p-2 bg-surface-elevated rounded-xl border border-border">
                    <table className="w-full text-xs font-mono text-center border-collapse">
                      <thead>
                        <tr className="border-b border-border text-muted">
                          <th className="p-1.5">เส้น</th>
                          {(currentStep as any).allEdgesSorted?.map((e: any, idx: number) => (
                            <th key={idx} className="p-1.5 font-bold text-text-main">
                              {e.source}
                              {e.target}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border/50">
                          <td className="p-1.5 text-muted font-bold">น้ำหนัก</td>
                          {(currentStep as any).allEdgesSorted?.map((e: any, idx: number) => (
                            <td key={idx} className="p-1.5 font-semibold text-primary">
                              {e.weight}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="p-1.5 text-muted font-bold">สถานะ</td>
                          {(currentStep as any).allEdgesSorted?.map((e: any, idx: number) => {
                            const isCurrent = (currentStep as any).currentEdgeIndex === idx;
                            return (
                              <td key={idx} className="p-1.5">
                                {e.status === 'selected' ? (
                                  <span className="text-primary font-bold">✓</span>
                                ) : e.status === 'rejected' ? (
                                  <span className="text-red-500 font-bold">✕</span>
                                ) : isCurrent ? (
                                  <span className="text-amber-500 font-bold">●</span>
                                ) : (
                                  <span className="text-muted/40">-</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                /* Prim Candidate Edge Inspector */
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-semibold text-muted">
                    โหนดใน Tree ปัจจุบัน:
                  </div>
                  <div className="font-mono text-sm font-bold text-primary">
                    &#123;{(currentStep as any).currentTreeVertices?.join(', ')}&#125;
                  </div>
                  <div className="text-xs font-semibold text-muted mt-2">
                    เส้นทางเชื่อมต่อที่เป็นไปได้ (Candidate Edges):
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(currentStep as any).candidateEdges?.length > 0 ? (
                      (currentStep as any).candidateEdges.map((cand: any, idx: number) => {
                        const isChosen =
                          (currentStep as any).selectedEdge?.source === cand.source &&
                          (currentStep as any).selectedEdge?.target === cand.target;
                        return (
                          <span
                            key={idx}
                            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold border ${
                              isChosen
                                ? 'bg-primary text-white border-primary shadow-xs'
                                : 'bg-surface-elevated text-text-main border-border'
                            }`}
                          >
                            ({cand.source}-{cand.target}, W:{cand.weight})
                          </span>
                        );
                      })
                    ) : (
                      <span className="text-xs text-muted italic">ไม่มีเส้นเชื่อมต่อเพิ่ม</span>
                    )}
                  </div>
                </div>
              )
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
          <CheckCircle2 className="w-4 h-4" /> บันทึกว่าเข้าใจ Prim & Kruskal แล้ว
        </button>
      </div>
    </div>
  );
};
