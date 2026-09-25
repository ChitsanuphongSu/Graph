import React, { useState } from 'react';
import {
  Boxes,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { GraphCanvas } from '../components/GraphCanvas';
import {
  traversal5NodeExample,
  mst7NodeExample,
  dijkstra6NodeExample,
} from '../data/examplesLibrary';
import { GraphData } from '../types';

interface TraceChallenge {
  id: string;
  title: string;
  algo: 'DFS' | 'BFS' | 'Prim' | 'Kruskal' | 'Dijkstra';
  graph: GraphData;
  startVertex?: string;
  scenario: string;
  question: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  explanation: string;
}

const traceChallenges: TraceChallenge[] = [
  {
    id: 'trace-dfs-1',
    title: 'DFS Traversal: ขั้นตอนการเลือกโหนดถัดไป',
    algo: 'DFS',
    graph: traversal5NodeExample,
    startVertex: 'S',
    scenario: 'เริ่มต้นที่โหนด S แล้วเยี่ยมชม A จากนั้นเยี่ยมชม D (Stack ปัจจุบันคือ [S, A, D])',
    question: 'ตามกฎ DFS Rule 1 และการเลือกตามลำดับตัวอักษร ควรเลือกเยี่ยมชมโหนดใดต่อไป?',
    options: [
      { id: 'b', text: 'เลือกโหนด B (เพราะยังไม่เคยเยี่ยมชม และมาก่อน C ตามลำดับตัวอักษร)' },
      { id: 'c', text: 'เลือกโหนด C' },
      { id: 's', text: 'ย้อนกลับไป S' },
      { id: 'pop', text: 'Pop โหนด D ทันที' },
    ],
    correctAnswer: 'b',
    explanation: 'สไลด์หน้า 24: โหนด D มีโหนดข้างเคียงที่ยังไม่เคยแวะคือ B และ C ซึ่งเลือกตามลำดับตัวอักษรคือ B',
  },
  {
    id: 'trace-bfs-1',
    title: 'BFS Traversal: การจัดการคิวและ Dequeue',
    algo: 'BFS',
    graph: traversal5NodeExample,
    startVertex: 'S',
    scenario: 'เริ่มต้นที่ S ทำการ Enqueue โหนดข้างเคียง [A, B, C] เข้าสู่ Queue แล้ว',
    question: 'เมื่อโหนด S ไม่มี Adjacent vertex ที่ยังไม่ได้เยี่ยมชมเหลือแล้ว ตามกฎ Rule 2 ต้องทำอย่างไรต่อไป?',
    options: [
      { id: 'deq-a', text: 'Dequeue โหนดแรกออกจาก Queue ซึ่งคือโหนด A' },
      { id: 'deq-c', text: 'Dequeue โหนด C ออกจากท้ายคิว' },
      { id: 'push-d', text: 'นำ D เข้าคิวทันที' },
      { id: 'stop', text: 'จบการทำงานทันที' },
    ],
    correctAnswer: 'deq-a',
    explanation: 'สไลด์หน้า 39: Rule 2 — เมื่อ S ไม่มีโหนดข้างเคียงแล้ว จึง Dequeue โหนดแรกคือ A ออกมาเพื่อเป็นโหนดตรวจสอบถัดไป',
  },
  {
    id: 'trace-prim-1',
    title: "Prim's MST: การขยายกิ่งก้านต้นไม้ครอบคลุม",
    algo: 'Prim',
    graph: mst7NodeExample,
    startVertex: 'a',
    scenario: 'ปัจจุบันต้นไม้ครอบคลุมมีโหนด Tree = {a, b, c} โดยเส้นที่เลือกไปแล้วคือ (a-b: 6) และ (b-c: 2)',
    question: 'ในรอบที่ 3 ควรเลือกเส้นเชื่อมใดเข้าสู่ Spanning Tree?',
    options: [
      { id: 'ag', text: 'เส้น (a, g) น้ำหนัก 10' },
      { id: 'cd', text: 'เส้น (c, d) น้ำหนัก 30' },
      { id: 'df', text: 'เส้น (d, f) น้ำหนัก 22' },
      { id: 'eg', text: 'เส้น (e, g) น้ำหนัก 50' },
    ],
    correctAnswer: 'ag',
    explanation: 'สไลด์หน้า 56: พิจารณาโหนดข้างเคียงของ {a, b, c} ทั้งหมด เส้นที่เชื่อมไปยังโหนดนอก Tree ที่มีค่าน้อยสุดคือ (a, g) น้ำหนัก 10',
  },
  {
    id: 'trace-kruskal-1',
    title: "Kruskal's MST: การตรวจจับและข้าม Cycle",
    algo: 'Kruskal',
    graph: mst7NodeExample,
    scenario: 'เรียงเส้นเชื่อมตามน้ำหนัก: bc(2), ab(6), fg(8), ag(10), ed(10), ef(15)... เลือกเส้นครบ 6 เส้นจนเชื่อมทุกโหนดแล้ว',
    question: 'หากพิจารณาเส้นเชื่อมถัดไป df(22) หรือ cd(30) จะต้องทำอย่างไร?',
    options: [
      { id: 'reject', text: 'ข้าม / Reject เพราะทำให้เกิดวงจร (Cycle) หรือทุกโหนดเชื่อมต่อครบแล้ว' },
      { id: 'select', text: 'เลือกเข้ามาเพิ่มเพื่อความปลอดภัย' },
      { id: 'replace', text: 'นำมาแทนที่เส้น ef(15)' },
    ],
    correctAnswer: 'reject',
    explanation: 'สไลด์หน้า 75-76: เมื่อมีเส้นทางไปยังทุกโหนดครบแล้วจะหยุดการทำงาน และเส้นที่ทำให้เกิดวงจรจะถูก Reject ทั้งหมด',
  },
  {
    id: 'trace-dijkstra-1',
    title: "Dijkstra: การคำนวณค่าน้ำหนักสะสม (Accumulated T)",
    algo: 'Dijkstra',
    graph: dijkstra6NodeExample,
    startVertex: 'A',
    scenario: 'เริ่มต้นที่ A (T=0) -> เลือก C (T=3) -> เลือก B (T=5 via C) ปัจจุบัน Tree = {A, C, B}',
    question: 'ในรอบถัดไป เส้นทางไปยังโหนด D คำนวณค่าน้ำหนักสะสมได้เท่าใด?',
    options: [
      { id: 't6', text: 'T = 6 (ผ่านโหนด C: 3 + 3 = 6)' },
      { id: 't10', text: 'T = 10 (ผ่านโหนด B: 5 + 5 = 10)' },
      { id: 't3', text: 'T = 3' },
      { id: 't9', text: 'T = 9' },
    ],
    correctAnswer: 't6',
    explanation: 'สไลด์หน้า 95: เปรียบเทียบเส้นทางไป D พบว่าผ่าน C ได้ T=3+3=6 ส่วนผ่าน B ได้ T=5+5=10 ดังนั้นค่าน้อยที่สุดคือ T=6',
  },
];

export const TracePractice: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAns, setSelectedAns] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const challenge = traceChallenges[currentIdx];
  const isCorrect = selectedAns === challenge.correctAnswer;

  const handleNext = () => {
    setSelectedAns(null);
    setIsSubmitted(false);
    setCurrentIdx((prev) => (prev + 1) % traceChallenges.length);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-2">
          <Boxes className="w-3.5 h-3.5" /> Interactive Algorithm Tracing
        </div>
        <h2 className="text-2xl font-bold text-text-main">
          ฝึกจำลองการทำงานของอัลกอริทึม (Trace Practice)
        </h2>
        <p className="text-sm text-muted mt-1">
          ฝึกคิดและตัดสินใจเลือกขั้นตอนถัดไปของอัลกอริทึมเหมือนกำลังสอบข้อสอบอัตนัย/ปรนัยจริง
        </p>
      </div>

      {/* Challenge Card */}
      <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-primary/10 text-primary font-mono font-bold text-xs rounded-lg">
              โจทย์ข้อที่ {currentIdx + 1} / {traceChallenges.length}
            </span>
            <span className="text-xs font-semibold text-muted uppercase">[{challenge.algo}]</span>
          </div>
          <button
            onClick={handleNext}
            className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
          >
            เปลี่ยนข้อ <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Graph Preview */}
        <div className="flex justify-center">
          <GraphCanvas graph={challenge.graph} width={400} height={280} />
        </div>

        {/* Scenario & Question */}
        <div className="p-4 bg-surface-elevated rounded-xl border border-border space-y-2">
          <div className="text-xs font-semibold text-primary uppercase">สถานการณ์ปัจจุบัน:</div>
          <p className="text-xs md:text-sm text-text-main leading-relaxed font-medium">
            {challenge.scenario}
          </p>
          <div className="pt-2 border-t border-border/70 text-xs md:text-sm font-bold text-text-main">
            คำถาม: {challenge.question}
          </div>
        </div>

        {/* Options */}
        <div className="space-y-2.5">
          {challenge.options.map((opt) => {
            const isSelected = selectedAns === opt.id;
            let style =
              'bg-surface-elevated/70 text-text-main hover:bg-surface-elevated border-border';

            if (isSubmitted) {
              if (opt.id === challenge.correctAnswer) {
                style = 'bg-primary/10 border-primary text-primary font-semibold';
              } else if (isSelected && !isCorrect) {
                style = 'bg-red-500/10 border-red-500 text-red-500';
              }
            } else if (isSelected) {
              style = 'bg-primary/15 border-primary text-primary font-semibold shadow-xs';
            }

            return (
              <button
                key={opt.id}
                disabled={isSubmitted}
                onClick={() => setSelectedAns(opt.id)}
                className={`w-full p-3.5 rounded-xl border text-xs md:text-sm text-left transition flex items-center justify-between ${style}`}
              >
                <span>{opt.text}</span>
                {isSubmitted && opt.id === challenge.correctAnswer && (
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Submission & Explanation */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-border">
          {!isSubmitted ? (
            <button
              disabled={!selectedAns}
              onClick={() => setIsSubmitted(true)}
              className="px-5 py-2.5 bg-primary text-white font-semibold text-xs rounded-xl hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm"
            >
              ตรวจคำตอบ Tracing
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-5 py-2.5 bg-primary text-white font-semibold text-xs rounded-xl hover:bg-primary-hover transition flex items-center gap-1.5 shadow-sm"
            >
              ข้อถัดไป <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {isSubmitted && (
            <div className="w-full p-4 bg-surface-elevated rounded-xl border border-border text-xs text-text-main leading-relaxed space-y-1">
              <div className="font-semibold text-primary flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> เฉลยและเหตุผลทางอัลกอริทึม:
              </div>
              <div>{challenge.explanation}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
