import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Trophy,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { practiceQuestionsBank } from '../data/practiceQuestions';
import { PracticeQuestion } from '../types';

interface QuizProps {
  onRecordQuiz: (attempt: {
    quizId: string;
    score: number;
    total: number;
    percentage: number;
    categoryBreakdown: Record<string, { correct: number; total: number }>;
  }) => void;
}

export const Quiz: React.FC<QuizProps> = ({ onRecordQuiz }) => {
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [quizMode, setQuizMode] = useState<'mixed' | 'mock'>('mixed');
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // 25 questions for Mixed, full 30 for Mock
  const quizQuestions: PracticeQuestion[] =
    quizMode === 'mixed'
      ? practiceQuestionsBank.slice(0, 25)
      : practiceQuestionsBank;

  const currentQ = quizQuestions[currentQIndex];

  const handleStart = (mode: 'mixed' | 'mock') => {
    setQuizMode(mode);
    setIsStarted(true);
    setCurrentQIndex(0);
    setAnswers({});
    setIsFinished(false);
  };

  const handleSelectOption = (optId: string) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: optId }));
  };

  const handleNext = () => {
    if (currentQIndex < quizQuestions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    let score = 0;
    const categoryBreakdown: Record<string, { correct: number; total: number }> = {};

    for (const q of quizQuestions) {
      if (!categoryBreakdown[q.category]) {
        categoryBreakdown[q.category] = { correct: 0, total: 0 };
      }
      categoryBreakdown[q.category].total += 1;

      if (answers[q.id] === q.correctAnswer) {
        score += 1;
        categoryBreakdown[q.category].correct += 1;
      }
    }

    const percentage = Math.round((score / quizQuestions.length) * 100);

    onRecordQuiz({
      quizId: `${quizMode}-${Date.now()}`,
      score,
      total: quizQuestions.length,
      percentage,
      categoryBreakdown,
    });

    setIsFinished(true);

    if (percentage >= 80) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {}
    }
  };

  // 1. Start Screen
  if (!isStarted) {
    return (
      <div className="space-y-8 max-w-4xl mx-auto">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-2">
            <HelpCircle className="w-3.5 h-3.5" /> Exam Evaluation System
          </div>
          <h2 className="text-2xl font-bold text-text-main">
            แบบทดสอบวัดผลและจำลองการสอบ (Mixed Quiz & Mock Exam)
          </h2>
          <p className="text-sm text-muted mt-1">
            ทดสอบความพร้อมก่อนสอบวิชาโครงสร้างข้อมูล บทที่ 11 กราฟ ด้วยชุดข้อสอบมาตรฐาน
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mixed Quiz Card */}
          <div className="bg-surface p-6 rounded-3xl border border-border shadow-sm space-y-4 hover:border-primary transition">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-text-main">Mixed Quiz (25 ข้อ)</h3>
            <p className="text-xs text-muted leading-relaxed">
              แบบทดสอบคละทุกหัวข้อ ครอบคลุมนิยาม, เมทริกซ์, ลิสต์, DFS, BFS, Prim, Kruskal และ Dijkstra
            </p>
            <ul className="text-xs text-text-main space-y-1.5 pt-2">
              <li className="flex items-center gap-2">✓ สุ่มตรวจความจำและความเข้าใจรวดเร็ว</li>
              <li className="flex items-center gap-2">✓ ตรวจคำตอบและวิเคราะห์จุดอ่อนอัตโนมัติ</li>
            </ul>
            <button
              onClick={() => handleStart('mixed')}
              className="w-full py-3 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary-hover transition shadow-sm"
            >
              เริ่มทำ Mixed Quiz (25 ข้อ)
            </button>
          </div>

          {/* Mock Exam Card */}
          <div className="bg-surface p-6 rounded-3xl border border-border shadow-sm space-y-4 hover:border-primary transition">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-text-main">Mock Exam จำลองสอบจริง (30+ ข้อ)</h3>
            <p className="text-xs text-muted leading-relaxed">
              ชุดข้อสอบระดับข้อสอบกลางภาค/ปลายภาค ครบทุกมิติ ทั้งทฤษฎีและการไล่สเต็ปอัลกอริทึม
            </p>
            <ul className="text-xs text-text-main space-y-1.5 pt-2">
              <li className="flex items-center gap-2">✓ ข้อสอบแบบไม่เฉลยระหว่างทำเพื่อจำลองสอบ</li>
              <li className="flex items-center gap-2">✓ รายงานผลและเฉลยละเอียดเมื่อส่งข้อสอบ</li>
            </ul>
            <button
              onClick={() => handleStart('mock')}
              className="w-full py-3 bg-primary-dark text-white font-bold text-sm rounded-xl hover:bg-primary transition shadow-sm"
            >
              เริ่มทำ Mock Exam (ชุดสมบูรณ์)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Results Screen
  if (isFinished) {
    let score = 0;
    const categoryBreakdown: Record<string, { correct: number; total: number }> = {};
    for (const q of quizQuestions) {
      if (!categoryBreakdown[q.category]) {
        categoryBreakdown[q.category] = { correct: 0, total: 0 };
      }
      categoryBreakdown[q.category].total += 1;
      if (answers[q.id] === q.correctAnswer) {
        score += 1;
        categoryBreakdown[q.category].correct += 1;
      }
    }
    const percentage = Math.round((score / quizQuestions.length) * 100);

    return (
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Result Header */}
        <div className="bg-surface p-8 rounded-3xl border border-border text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center">
            <Trophy className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-text-main">ผลการทดสอบของคุณ</h2>
          <div className="text-5xl font-black text-primary font-mono">{percentage}%</div>
          <p className="text-sm text-muted">
            คุณทำได้ <strong className="text-text-main">{score}</strong> จากทั้งหมด{' '}
            <strong className="text-text-main">{quizQuestions.length}</strong> ข้อ
          </p>

          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={() => setIsStarted(false)}
              className="px-5 py-2.5 bg-primary text-white font-semibold rounded-xl text-xs hover:bg-primary-hover transition shadow-sm flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" /> ทำแบบทดสอบอีกครั้ง
            </button>
          </div>
        </div>

        {/* Detailed Breakdown by Topic */}
        <div className="bg-surface p-6 rounded-3xl border border-border shadow-sm space-y-4">
          <h3 className="font-bold text-base text-text-main">คะแนนแยกตามหัวข้อ</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(categoryBreakdown).map(([cat, val]) => {
              const catPct = Math.round((val.correct / val.total) * 100);
              return (
                <div
                  key={cat}
                  className="p-3.5 bg-surface-elevated rounded-2xl border border-border space-y-1"
                >
                  <div className="text-xs text-muted uppercase font-semibold">{cat}</div>
                  <div className="flex items-center justify-between text-sm font-bold text-text-main">
                    <span>
                      {val.correct} / {val.total} ข้อ
                    </span>
                    <span className={catPct >= 70 ? 'text-primary' : 'text-amber-500'}>
                      {catPct}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Answer Review */}
        <div className="space-y-4">
          <h3 className="font-bold text-base text-text-main">เฉลยและทบทวนข้อที่ทำ</h3>
          {quizQuestions.map((q, idx) => {
            const userAns = answers[q.id];
            const isCorrect = userAns === q.correctAnswer;
            return (
              <div
                key={q.id}
                className={`p-5 bg-surface rounded-2xl border ${
                  isCorrect ? 'border-primary/40' : 'border-red-500/40'
                } space-y-3 shadow-sm`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-primary">ข้อ {idx + 1}</span>
                    <h4 className="font-bold text-sm text-text-main">{q.prompt}</h4>
                  </div>
                  {isCorrect ? (
                    <span className="text-xs font-bold text-primary flex items-center gap-1 bg-primary/10 px-2.5 py-1 rounded-lg">
                      <CheckCircle2 className="w-3.5 h-3.5" /> ถูก
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-red-500 flex items-center gap-1 bg-red-500/10 px-2.5 py-1 rounded-lg">
                      <XCircle className="w-3.5 h-3.5" /> ผิด
                    </span>
                  )}
                </div>

                <div className="p-3 bg-surface-elevated rounded-xl border border-border text-xs leading-relaxed space-y-1">
                  <div className="text-muted">
                    คำตอบของคุณ:{' '}
                    <strong className="text-text-main font-mono">
                      {userAns?.toUpperCase() || '(ไม่ได้เลือก)'}
                    </strong>{' '}
                    | คำตอบที่ถูกต้อง:{' '}
                    <strong className="text-primary font-mono">{q.correctAnswer.toUpperCase()}</strong>
                  </div>
                  <div className="pt-1 text-text-main font-medium">{q.explanation}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 3. In-Progress Exam Question
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Progress Header */}
      <div className="flex items-center justify-between text-xs text-muted">
        <span className="font-semibold text-primary">
          {quizMode === 'mixed' ? 'Mixed Quiz' : 'Mock Exam'}
        </span>
        <span>
          ข้อที่ <strong className="text-text-main font-mono">{currentQIndex + 1}</strong> /{' '}
          {quizQuestions.length}
        </span>
      </div>

      <div className="w-full bg-surface-elevated rounded-full h-2 overflow-hidden border border-border">
        <div
          className="bg-primary h-full transition-all duration-300"
          style={{ width: `${((currentQIndex + 1) / quizQuestions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="p-6 md:p-8 bg-surface rounded-3xl border border-border shadow-sm space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase text-primary tracking-wider">
            {currentQ.category}
          </span>
          <h3 className="font-bold text-base md:text-lg text-text-main leading-snug">
            {currentQ.prompt}
          </h3>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options?.map((opt) => {
            const isSelected = answers[currentQ.id] === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full p-4 rounded-2xl border text-xs md:text-sm text-left transition flex items-center justify-between ${
                  isSelected
                    ? 'bg-primary text-white border-primary font-semibold shadow-xs'
                    : 'bg-surface-elevated/70 text-text-main hover:bg-surface-elevated border-border'
                }`}
              >
                <span>{opt.text}</span>
                <span
                  className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-mono flex-shrink-0 ml-2 ${
                    isSelected ? 'border-white text-white' : 'border-border text-muted'
                  }`}
                >
                  {opt.id.toUpperCase()}
                </span>
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <div className="pt-4 flex justify-end border-t border-border">
          <button
            disabled={!answers[currentQ.id]}
            onClick={handleNext}
            className="px-6 py-3 bg-primary text-white font-bold text-xs md:text-sm rounded-xl hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1.5 shadow-sm"
          >
            {currentQIndex === quizQuestions.length - 1 ? 'ส่งข้อสอบประเมินผล' : 'ข้อถัดไป'}{' '}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
