import React, { useState } from 'react';
import { Grid, ArrowRightLeft, Info, CheckCircle2 } from 'lucide-react';
import { GraphCanvas } from '../components/GraphCanvas';
import {
  undirectedGraphExample,
  directedMatrixListExample,
  directedWeightedExample,
} from '../data/examplesLibrary';
import {
  graphToAdjacencyMatrix,
  matrixToGraph,
  graphToAdjacencyList,
} from '../algorithms/graphUtils';
import { GraphData } from '../types';

interface GraphRepresentationProps {
  onComplete?: () => void;
}

export const GraphRepresentation: React.FC<GraphRepresentationProps> = ({ onComplete }) => {
  const [selectedExampleId, setSelectedExampleId] = useState<'undirected' | 'directed' | 'weighted'>('undirected');
  const [highlightedEdge, setHighlightedEdge] = useState<{ source: string; target: string } | null>(null);
  const [hoverCell, setHoverCell] = useState<{ row: number; col: number } | null>(null);

  const baseGraph: GraphData =
    selectedExampleId === 'undirected'
      ? undirectedGraphExample
      : selectedExampleId === 'directed'
      ? directedMatrixListExample
      : directedWeightedExample;

  const [currentGraph, setCurrentGraph] = useState<GraphData>(baseGraph);

  // Switch example
  const handleSelectExample = (type: 'undirected' | 'directed' | 'weighted') => {
    setSelectedExampleId(type);
    const g =
      type === 'undirected'
        ? undirectedGraphExample
        : type === 'directed'
        ? directedMatrixListExample
        : directedWeightedExample;
    setCurrentGraph(g);
    setHighlightedEdge(null);
    setHoverCell(null);
  };

  const { matrix, labels } = graphToAdjacencyMatrix(currentGraph);
  const { list, totalLength } = graphToAdjacencyList(currentGraph);

  // Matrix cell edit (Matrix -> Graph bidirectional interactive editing)
  const handleCellChange = (rowIdx: number, colIdx: number, valStr: string) => {
    const val = parseInt(valStr) || 0;
    const newMatrix = matrix.map((row) => [...row]);
    newMatrix[rowIdx][colIdx] = val;
    if (!currentGraph.directed) {
      newMatrix[colIdx][rowIdx] = val;
    }
    const updatedGraph = matrixToGraph(
      newMatrix,
      labels,
      currentGraph.directed,
      currentGraph.weighted
    );
    setCurrentGraph(updatedGraph);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-2">
          <Grid className="w-3.5 h-3.5" /> บทเรียนที่ 2 (สไลด์หน้า 8 - 17)
        </div>
        <h2 className="text-2xl font-bold text-text-main">
          การแทนกราฟในหน่วยความจำ (Graph Representation)
        </h2>
        <p className="text-sm text-muted mt-1">
          เปรียบเทียบการจัดเก็บกราฟด้วย <strong>Adjacency Matrix (NxN)</strong> และ <strong>Adjacency List (Linked List)</strong> พร้อมระบบแปลง Graph ↔ Matrix แบบ Real-time
        </p>
      </div>

      {/* Preset Example Picker */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-surface rounded-2xl border border-border shadow-sm">
        <div className="flex items-center gap-2 text-sm font-semibold text-text-main">
          <span>เลือกตัวอย่างจากสไลด์:</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSelectExample('undirected')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              selectedExampleId === 'undirected'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface-elevated text-muted hover:text-text-main border border-border'
            }`}
          >
            Undirected (หน้า 10, 15)
          </button>
          <button
            onClick={() => handleSelectExample('directed')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              selectedExampleId === 'directed'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface-elevated text-muted hover:text-text-main border border-border'
            }`}
          >
            Directed (หน้า 11, 16)
          </button>
          <button
            onClick={() => handleSelectExample('weighted')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              selectedExampleId === 'weighted'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface-elevated text-muted hover:text-text-main border border-border'
            }`}
          >
            Weighted (หน้า 12, 17)
          </button>
        </div>
      </div>

      {/* Section 1: Adjacency Matrix Visualizer */}
      <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <Grid className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-base text-text-main">
              1. Adjacency Matrix (เมทริกซ์ประชิด ขนาด N × N)
            </h3>
          </div>
          <span className="text-xs text-muted flex items-center gap-1">
            <ArrowRightLeft className="w-3.5 h-3.5 text-primary" /> แก้ไขค่าใน Matrix เพื่ออัปเดตกราฟได้ทันที
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Visual Graph Canvas */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <GraphCanvas
              graph={currentGraph}
              activeEdge={highlightedEdge}
              onEdgeClick={(e) => setHighlightedEdge({ source: e.source, target: e.target })}
              width={380}
              height={300}
            />
            <p className="text-xs text-muted mt-2 text-center">
              คลิกที่เส้นเชื่อมในกราฟ หรือนำเมาส์ไปชี้ในช่อง Matrix เพื่อดูการเชื่อมโยง
            </p>
          </div>

          {/* Matrix Table */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-3">
            <div className="text-xs font-semibold text-muted flex items-center justify-between w-full max-w-[340px]">
              <span>From (แถว) \ To (คอลัมน์)</span>
              <span className="text-primary font-mono font-bold">
                ขนาด {labels.length} × {labels.length}
              </span>
            </div>

            <div className="overflow-x-auto p-3 bg-surface-elevated rounded-2xl border border-border">
              <table className="border-collapse font-mono text-xs text-center">
                <thead>
                  <tr>
                    <th className="p-2 text-muted font-bold"></th>
                    {labels.map((l) => (
                      <th
                        key={l}
                        className="p-2 font-bold text-primary w-10 h-10 border-b border-border"
                      >
                        {l}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matrix.map((row, rIdx) => {
                    const rowLabel = labels[rIdx];
                    return (
                      <tr key={rowLabel}>
                        <th className="p-2 font-bold text-primary border-r border-border">
                          {rowLabel}
                        </th>
                        {row.map((val, cIdx) => {
                          const colLabel = labels[cIdx];
                          const isHighlighted =
                            (highlightedEdge?.source === rowLabel &&
                              highlightedEdge?.target === colLabel) ||
                            (!currentGraph.directed &&
                              highlightedEdge?.source === colLabel &&
                              highlightedEdge?.target === rowLabel);

                          const isHovered =
                            hoverCell?.row === rIdx && hoverCell?.col === cIdx;

                          return (
                            <td
                              key={colLabel}
                              onMouseEnter={() => {
                                setHoverCell({ row: rIdx, col: cIdx });
                                if (val > 0) {
                                  setHighlightedEdge({ source: rowLabel, target: colLabel });
                                }
                              }}
                              onMouseLeave={() => {
                                setHoverCell(null);
                                setHighlightedEdge(null);
                              }}
                              className={`p-1 border border-border transition-colors ${
                                isHighlighted || isHovered
                                  ? 'bg-primary/20 text-primary font-bold'
                                  : val > 0
                                  ? 'bg-surface text-text-main font-semibold'
                                  : 'text-muted/60'
                              }`}
                            >
                              <input
                                type="number"
                                min="0"
                                max="99"
                                value={val}
                                onChange={(e) => handleCellChange(rIdx, cIdx, e.target.value)}
                                className="w-8 h-8 text-center bg-transparent focus:outline-none focus:ring-1 focus:ring-primary rounded font-mono font-bold"
                              />
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-primary/5 rounded-xl border border-primary/20 text-xs text-text-main leading-relaxed max-w-[340px]">
              <Info className="w-4 h-4 text-primary inline mr-1" />
              {currentGraph.directed
                ? 'ใน Directed Graph: M[A][B] = 1 หมายถึงมีเส้น A → B แต่ M[B][A] = 0 เพราะไม่มีเส้น B → A'
                : 'ใน Undirected Graph: ตารางจะสมมาตร (Symmetric) เสมอ เพราะเส้น AB จะถูกบันทึกทั้ง M[A][B] และ M[B][A]'}
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Adjacency List Visualizer */}
      <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-base text-text-main">
              2. Adjacency List (รายการโยงประชิด / Linked List)
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-primary px-2.5 py-1 bg-primary/10 rounded-lg">
            ความยาวรวมของ List = {totalLength}
          </span>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-surface-elevated rounded-xl border border-border text-xs leading-relaxed space-y-1">
            <p className="font-semibold text-primary">
              กฎสำคัญเรื่องความยาวของ Adjacency List จากสไลด์หน้า 15-16:
            </p>
            <p className="text-muted">
              • <strong>Undirected Graph (หน้า 15):</strong> กราฟมี 6 Edges แต่ละเส้นปรากฏ 2 ครั้งใน List ทำให้ความยาวรวม = 2 × 6 = <strong>12 (Twice the number of edges)</strong>
            </p>
            <p className="text-muted">
              • <strong>Directed Graph (หน้า 16):</strong> ความยาวรวมของ List = <strong>จำนวน Edges พอดี (Equal to the number of edges)</strong>
            </p>
          </div>

          {/* Linked List Visual Nodes */}
          <div className="space-y-3 pt-2">
            {labels.map((vId) => {
              const neighbors = list[vId] || [];
              return (
                <div key={vId} className="flex items-center gap-2 overflow-x-auto py-1">
                  {/* Array Head Node */}
                  <div className="w-10 h-10 rounded-xl bg-primary text-white font-bold font-mono flex items-center justify-center flex-shrink-0 shadow-sm">
                    {vId}
                  </div>
                  <span className="text-primary font-bold">→</span>

                  {/* Linked List chain */}
                  {neighbors.length > 0 ? (
                    neighbors.map((item, idx) => (
                      <React.Fragment key={idx}>
                        <div className="flex items-center bg-surface-elevated border border-border rounded-xl px-3 py-1.5 font-mono text-xs flex-shrink-0 shadow-sm">
                          <span className="font-bold text-text-main">{item.target}</span>
                          {item.weight !== undefined && (
                            <span className="ml-1.5 px-1.5 py-0.5 bg-primary/10 text-primary rounded font-bold">
                              W:{item.weight}
                            </span>
                          )}
                        </div>
                        <span className="text-muted text-xs">→</span>
                      </React.Fragment>
                    ))
                  ) : (
                    <span className="text-xs text-muted italic">ไม่มีโหนดข้างเคียง →</span>
                  )}

                  {/* End NULL marker */}
                  <div className="px-2.5 py-1 bg-red-500/10 text-red-500 font-mono text-xs font-bold rounded-lg border border-red-500/20 flex-shrink-0">
                    NULL ✕
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Completion */}
      <div className="flex justify-end">
        <button
          onClick={onComplete}
          className="px-5 py-2.5 bg-primary text-white font-semibold rounded-xl text-sm hover:bg-primary-hover transition shadow-sm flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" /> บันทึกว่าเข้าใจ Graph Representation แล้ว
        </button>
      </div>
    </div>
  );
};
