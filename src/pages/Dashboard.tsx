import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  HelpCircle,
  GraduationCap,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react';
import { UserStats, StudySection } from '../types';
import { practiceQuestionsBank } from '../data/practiceQuestions';

interface DashboardProps {
  stats: UserStats;
  onNavigate: (section: StudySection) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ stats, onNavigate }) => {
  const totalLessons = 6;
  const completedCount = stats.completedLessons.length;
  const practiceAnswered = Object.keys(stats.practiceAttempts).length;
  const practiceCorrect = Object.values(stats.practiceAttempts).filter((a) => a.isCorrect).length;
  const quizCount = stats.quizHistory.length;
  const latestQuiz = quizCount > 0 ? stats.quizHistory[quizCount - 1] : null;

  const hasActivity = completedCount > 0 || practiceAnswered > 0 || quizCount > 0;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-dark via-primary to-primary-hover rounded-3xl p-6 md:p-8 text-white shadow-md">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 rounded-full text-xs font-semibold backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" /> Data Structures Chapter 11
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            ระบบเรียนรู้และจำลองอัลกอริทึม Graph แบบปฏิสัมพันธ์
          </h2>
          <p className="text-white/90 text-sm md:text-base leading-relaxed">
            อ้างอิงเนื้อหาอย่างเคร่งครัดตามสไลด์การสอนวิชาโครงสร้างข้อมูล มหาวิทยาลัยขอนแก่น (ผศ.ดร.สิลดา อินทรโสธรฉันท์)
            พร้อมระบบจำลองการทำงานจริง Step-by-Step ของ DFS, BFS, Prim, Kruskal และ Dijkstra
          </p>

          <div className="pt-3 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('fundamentals')}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-primary-dark font-bold rounded-xl text-sm hover:bg-white/90 transition shadow-sm"
            >
              เริ่มต้นเรียนรู้ <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('quick-review')}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl text-sm transition"
            >
              สรุปด่วนก่อนสอบ
            </button>
            <button
              onClick={() => onNavigate('quiz')}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl text-sm transition"
            >
              ทำแบบทดสอบรวม
            </button>
          </div>
        </div>
      </div>

      {/* Learning Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Lesson Progress */}
        <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-2">
          <div className="flex items-center justify-between text-muted">
            <span className="text-xs font-semibold uppercase">บทเรียนที่เรียนแล้ว</span>
            <BookOpen className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-bold text-text-main">
            {completedCount} <span className="text-sm font-normal text-muted">/ {totalLessons} หัวข้อ</span>
          </div>
          <div className="w-full bg-surface-elevated rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-500 rounded-full"
              style={{ width: `${(completedCount / totalLessons) * 100}%` }}
            />
          </div>
        </div>

        {/* Practice Questions */}
        <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-2">
          <div className="flex items-center justify-between text-muted">
            <span className="text-xs font-semibold uppercase">แบบฝึกหัดที่ทำ</span>
            <GraduationCap className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-bold text-text-main">
            {practiceAnswered}{' '}
            <span className="text-sm font-normal text-muted">/ {practiceQuestionsBank.length} ข้อ</span>
          </div>
          <p className="text-xs text-muted">
            ตอบถูกต้อง: <span className="font-semibold text-primary">{practiceCorrect}</span> ข้อ
          </p>
        </div>

        {/* Quiz Attempts */}
        <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-2">
          <div className="flex items-center justify-between text-muted">
            <span className="text-xs font-semibold uppercase">การทำแบบทดสอบ</span>
            <HelpCircle className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-bold text-text-main">
            {quizCount} <span className="text-sm font-normal text-muted">ครั้ง</span>
          </div>
          <p className="text-xs text-muted">
            ล่าสุด:{' '}
            {latestQuiz ? (
              <span className="font-semibold text-primary">{latestQuiz.percentage}%</span>
            ) : (
              'ยังไม่มีประวัติ'
            )}
          </p>
        </div>

        {/* Overall Status */}
        <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-2">
          <div className="flex items-center justify-between text-muted">
            <span className="text-xs font-semibold uppercase">สถานะความพร้อม</span>
            <CheckCircle2 className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-bold text-text-main">
            {hasActivity ? (
              <span className="text-primary font-bold">
                {Math.round(((completedCount + practiceCorrect / 3) / 10) * 100)}%
              </span>
            ) : (
              <span className="text-muted text-base font-medium">ยังไม่มีข้อมูลการเรียน</span>
            )}
          </div>
          <p className="text-xs text-muted">
            {hasActivity ? 'บันทึกลง LocalStorage อัตโนมัติ' : 'เริ่มทำโจทย์เพื่อประเมินผล'}
          </p>
        </div>
      </div>

      {/* Core Topics Navigator */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-text-main flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" /> หัวข้อหลักประจำบทที่ 11
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            onClick={() => onNavigate('fundamentals')}
            className="group bg-surface p-5 rounded-2xl border border-border hover:border-primary cursor-pointer transition shadow-sm space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-text-main group-hover:text-primary transition">
              1. Graph Fundamentals
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              ความหมายของ Vertex, Edge, นิยาม G = V + E และประเภทของกราฟ (Undirected, Directed, Weighted, Cyclic)
            </p>
          </div>

          <div
            onClick={() => onNavigate('representation')}
            className="group bg-surface p-5 rounded-2xl border border-border hover:border-primary cursor-pointer transition shadow-sm space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-text-main group-hover:text-primary transition">
              2. Graph Representation
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              Adjacency Matrix (NxN) และ Adjacency List (Linked List) พร้อมคุณสมบัติความยาว 2E และ E
            </p>
          </div>

          <div
            onClick={() => onNavigate('traversal')}
            className="group bg-surface p-5 rounded-2xl border border-border hover:border-primary cursor-pointer transition shadow-sm space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-text-main group-hover:text-primary transition">
              3. Graph Traversal (DFS & BFS)
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              กฎ 3 ข้อของ Depth First Search (Stack) และ Breadth First Search (Queue) พร้อมลำดับตัวอักษร
            </p>
          </div>

          <div
            onClick={() => onNavigate('mst')}
            className="group bg-surface p-5 rounded-2xl border border-border hover:border-primary cursor-pointer transition shadow-sm space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-text-main group-hover:text-primary transition">
              4. Minimum Spanning Tree (MST)
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              เปรียบเทียบและการทำงานของ Prim's Algorithm (ขยายจาก Node) และ Kruskal's Algorithm (เรียงเส้นเชื่อม & Cycle Check)
            </p>
          </div>

          <div
            onClick={() => onNavigate('shortest-path')}
            className="group bg-surface p-5 rounded-2xl border border-border hover:border-primary cursor-pointer transition shadow-sm space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-text-main group-hover:text-primary transition">
              5. Shortest Path (Dijkstra)
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              การคำนวณค่าน้ำหนักสะสม (Accumulated Weight T) และการจัดการกรณีเส้นทางมีระยะทางเท่ากันตามสไลด์
            </p>
          </div>

          <div
            onClick={() => onNavigate('graph-lab')}
            className="group bg-surface p-5 rounded-2xl border border-border hover:border-primary cursor-pointer transition shadow-sm space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-text-main group-hover:text-primary transition">
              6. Interactive Graph Lab
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              ห้องทดลองสร้างกราฟของคุณเอง ปรับเปลี่ยนจุดยอด เส้นเชื่อม น้ำหนัก ทิศทาง และทดสอบรันทุกอัลกอริทึม
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
