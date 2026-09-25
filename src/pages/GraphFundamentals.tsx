import React, { useState } from 'react';
import { BookOpen, Layers, CheckCircle2, Info } from 'lucide-react';
import { GraphCanvas } from '../components/GraphCanvas';
import {
  undirectedGraphExample,
  directedCycleExample,
  directedWeightedExample,
} from '../data/examplesLibrary';
import { Vertex, Edge, GraphData } from '../types';

interface GraphFundamentalsProps {
  onComplete?: () => void;
}

export const GraphFundamentals: React.FC<GraphFundamentalsProps> = ({ onComplete }) => {
  const [activeTab, setActiveTab] = useState<'undirected' | 'directed' | 'weighted'>('undirected');
  const [selectedVertex, setSelectedVertex] = useState<Vertex | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);

  const currentGraph: GraphData =
    activeTab === 'undirected'
      ? undirectedGraphExample
      : activeTab === 'directed'
      ? directedCycleExample
      : directedWeightedExample;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5" /> บทเรียนที่ 1 (สไลด์หน้า 2 - 7)
        </div>
        <h2 className="text-2xl font-bold text-text-main">
          พื้นฐานกราฟและประเภทของกราฟ (Graph Fundamentals & Types)
        </h2>
        <p className="text-sm text-muted mt-1">
          ทำความเข้าใจนิยามของ Vertex, Edge, และสำรวจความแตกต่างระหว่าง Undirected, Directed, Cyclic และ Weighted Graph
        </p>
      </div>

      {/* Concept Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-2">
          <div className="text-xs font-semibold text-primary uppercase">นิยามหลัก (Definition)</div>
          <h3 className="font-bold text-text-main text-base">Graph G = (V, E)</h3>
          <p className="text-xs text-muted leading-relaxed">
            โครงสร้างข้อมูลกราฟใช้แทนระบบเครือข่ายเชื่อมต่อจุดต่างๆ โดย <strong>V (Vertices)</strong> คือเซตของจุดยอด และ <strong>E (Edges)</strong> คือเส้นเชื่อมระหว่างจุดยอด
          </p>
        </div>

        <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-2">
          <div className="text-xs font-semibold text-primary uppercase">Dependency Graphs</div>
          <h3 className="font-bold text-text-main text-base">การวิเคราะห์ความสัมพันธ์</h3>
          <p className="text-xs text-muted leading-relaxed">
            นำไปใช้สร้างแบบจำลองการพึ่งพากันในซอฟต์แวร์ (Software architecture dependencies) ช่วยในการวิเคราะห์และดีบักโปรแกรม (Analyzing & Debugging)
          </p>
        </div>

        <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-2">
          <div className="text-xs font-semibold text-primary uppercase">การประยุกต์ใช้งาน</div>
          <h3 className="font-bold text-text-main text-base">Network Modeling</h3>
          <p className="text-xs text-muted leading-relaxed">
            ใช้แทนระบบเครือข่ายคอมพิวเตอร์ (Computer networks), เครือข่ายสังคม (Social networks) และระบบขนส่งเส้นทาง
          </p>
        </div>
      </div>

      {/* Interactive Explorer Tabs */}
      <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-base text-text-main">
              สำรวจประเภทของกราฟแบบ Interactive (Graph Type Explorer)
            </h3>
          </div>

          <div className="flex items-center bg-surface-elevated p-1 rounded-xl border border-border">
            <button
              onClick={() => {
                setActiveTab('undirected');
                setSelectedVertex(null);
                setSelectedEdge(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'undirected'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-muted hover:text-text-main'
              }`}
            >
              Undirected (หน้า 4)
            </button>
            <button
              onClick={() => {
                setActiveTab('directed');
                setSelectedVertex(null);
                setSelectedEdge(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'directed'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-muted hover:text-text-main'
              }`}
            >
              Directed & Cyclic (หน้า 5-6)
            </button>
            <button
              onClick={() => {
                setActiveTab('weighted');
                setSelectedVertex(null);
                setSelectedEdge(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'weighted'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-muted hover:text-text-main'
              }`}
            >
              Weighted (หน้า 7, 12)
            </button>
          </div>
        </div>

        {/* Canvas & Inspector Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Canvas */}
          <div className="lg:col-span-7 flex justify-center">
            <GraphCanvas
              graph={currentGraph}
              activeVertex={selectedVertex?.id}
              activeEdge={
                selectedEdge ? { source: selectedEdge.source, target: selectedEdge.target } : null
              }
              onVertexClick={(v) => {
                setSelectedVertex(v);
                setSelectedEdge(null);
              }}
              onEdgeClick={(e) => {
                setSelectedEdge(e);
                setSelectedVertex(null);
              }}
              width={440}
              height={320}
            />
          </div>

          {/* Details / Inspector Panel */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 bg-surface-elevated rounded-xl border border-border space-y-3">
              <h4 className="font-bold text-sm text-text-main flex items-center gap-2">
                <Info className="w-4 h-4 text-primary" /> {currentGraph.title}
              </h4>
              <p className="text-xs text-muted leading-relaxed">{currentGraph.description}</p>

              <div className="pt-2 border-t border-border/70 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted">Vertices Set (V):</span>
                  <span className="font-mono font-semibold text-text-main">
                    &#123;{currentGraph.vertices.map((v) => v.id).join(', ')}&#125; (
                    {currentGraph.vertices.length})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Edges Set (E):</span>
                  <span className="font-mono font-semibold text-text-main">
                    &#123;
                    {currentGraph.edges
                      .map((e) =>
                        currentGraph.directed
                          ? `${e.source}→${e.target}`
                          : `${e.source}${e.target}`
                      )
                      .join(', ')}
                    &#125; ({currentGraph.edges.length})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">คุณลักษณะ:</span>
                  <span className="font-semibold text-primary">
                    {currentGraph.directed ? 'Directed (มีทิศทาง)' : 'Undirected (ไม่มีทิศทาง)'}{' '}
                    {currentGraph.weighted && '• มีน้ำหนัก (Weighted)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Click Inspector */}
            <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 text-xs">
              <span className="font-semibold text-primary block mb-1">
                ผลการคลิกเลือกโหนด / เส้นเชื่อม:
              </span>
              {selectedVertex ? (
                <div>
                  เลือกโหนด: <strong className="text-base text-primary font-mono">{selectedVertex.label}</strong>
                  <p className="text-muted mt-0.5">
                    เป็นจุดยอดหนึ่งในกราฟ เชื่อมต่อกับโหนดข้างเคียงตามเส้นเชื่อม
                  </p>
                </div>
              ) : selectedEdge ? (
                <div>
                  เลือกเส้นเชื่อม:{' '}
                  <strong className="text-base text-primary font-mono">
                    {selectedEdge.source} {currentGraph.directed ? '→' : '—'} {selectedEdge.target}
                  </strong>
                  {selectedEdge.weight !== undefined && (
                    <span className="ml-2 font-mono font-bold text-amber-500">
                      (Weight = {selectedEdge.weight})
                    </span>
                  )}
                  <p className="text-muted mt-0.5">
                    {currentGraph.directed
                      ? `เชื่อมจากต้นทาง '${selectedEdge.source}' ไปยังปลายทาง '${selectedEdge.target}' (ไม่เท่ากับทิศทางกลับกัน)`
                      : `เชื่อมระหว่างโหนด '${selectedEdge.source}' และ '${selectedEdge.target}' แบบสองทิศทาง`}
                  </p>
                </div>
              ) : (
                <span className="text-muted italic">
                  คลิกที่จุดยอด (Vertex) หรือเส้นเชื่อม (Edge) ในกราฟด้านซ้ายเพื่อดูรายละเอียด
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Completion Action */}
      <div className="flex justify-end">
        <button
          onClick={onComplete}
          className="px-5 py-2.5 bg-primary text-white font-semibold rounded-xl text-sm hover:bg-primary-hover transition shadow-sm flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" /> บันทึกว่าอ่านจบหัวข้อนี้แล้ว
        </button>
      </div>
    </div>
  );
};
