import React, { useState } from 'react';
import {
  GraduationCap,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { practiceQuestionsBank } from '../data/practiceQuestions';
import { PracticeQuestion } from '../types';

interface PracticeProps {
  onRecordAnswer: (questionId: string, answered: any, isCorrect: boolean) => void;
  savedAttempts: Record<string, { answered: any; isCorrect: boolean; timestamp: number }>;
}

export const Practice: React.FC<PracticeProps> = ({ onRecordAnswer, savedAttempts }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

  const [resetQuestions, setResetQuestions] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: 'ทั้งหมด (All Topics)' },
    { id: 'fundamentals', label: '1. พื้นฐานกราฟ (Fundamentals)' },
    { id: 'types', label: '2. ประเภทกราฟ (Graph Types)' },
    { id: 'matrix', label: '3. Adjacency Matrix' },
    { id: 'list', label: '4. Adjacency List' },
    { id: 'dfs', label: '5. DFS (Stack)' },
    { id: 'bfs', label: '6. BFS (Queue)' },
    { id: 'prim', label: "7. Prim's Algorithm" },
    { id: 'kruskal', label: "8. Kruskal's Algorithm" },
    { id: 'dijkstra', label: "9. Dijkstra's Algorithm" },
  ];

  const filteredQuestions =
    selectedCategory === 'all'
      ? practiceQuestionsBank
      : practiceQuestionsBank.filter((q) => q.category === selectedCategory);

  const handleSelectOption = (qId: string, optionId: string) => {
    const isRetried = !!resetQuestions[qId];
    const isSubmitted = submitted[qId] !== undefined ? submitted[qId] : !isRetried && savedAttempts[qId] !== undefined;
    if (isSubmitted) return; // Already submitted
    setUserAnswers((prev) => ({ ...prev, [qId]: optionId }));
  };

  const handleSubmitQuestion = (q: PracticeQuestion) => {
    const ans = userAnswers[q.id];
    if (!ans) return;

    const isCorrect = ans === q.correctAnswer;
    setSubmitted((prev) => ({ ...prev, [q.id]: true }));
    setResetQuestions((prev) => {
      const next = { ...prev };
      delete next[q.id];
      return next;
    });
    onRecordAnswer(q.id, ans, isCorrect);
  };

  const handleResetQuestion = (qId: string) => {
    setResetQuestions((prev) => ({ ...prev, [qId]: true }));
    setSubmitted((prev) => {
      const next = { ...prev };
      delete next[qId];
      return next;
    });
    setUserAnswers((prev) => {
      const next = { ...prev };
      delete next[qId];
      return next;
    });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-2">
          <GraduationCap className="w-3.5 h-3.5" /> Practice System (30+ Questions)
        </div>
        <h2 className="text-2xl font-bold text-text-main">
          แบบฝึกหัดทบทวนรายหัวข้อ (Chapter 11 Practice Bank)
        </h2>
        <p className="text-sm text-muted mt-1">
          ฝึกตอบคำถาม ตรวจสอบความเข้าใจ และดูคำอธิบายเฉลยที่อ้างอิงตรงกับสไลด์การสอน
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === cat.id
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface text-muted hover:text-text-main border border-border'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.map((q, qIndex) => {
          const isRetried = !!resetQuestions[q.id];
          const isDone = submitted[q.id] !== undefined ? submitted[q.id] : !isRetried && savedAttempts[q.id] !== undefined;
          const currentAns = userAnswers[q.id] || (!isRetried ? savedAttempts[q.id]?.answered : undefined);
          const isCorrect = currentAns === q.correctAnswer;

          return (
            <div
              key={q.id}
              className={`p-6 bg-surface rounded-2xl border transition-all shadow-sm space-y-4 ${
                isDone
                  ? isCorrect
                    ? 'border-primary/50'
                    : 'border-red-500/50'
                  : 'border-border'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-surface-elevated font-mono font-bold text-xs text-primary rounded-md border border-border">
                      ข้อ {qIndex + 1}
                    </span>
                    <span className="text-xs text-muted uppercase font-medium">{q.title}</span>
                  </div>
                  <h3 className="font-bold text-sm md:text-base text-text-main leading-snug pt-1">
                    {q.prompt}
                  </h3>
                </div>

                {isDone && (
                  <div className="flex-shrink-0">
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
                        <CheckCircle2 className="w-4 h-4" /> ถูกต้อง
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-red-500 bg-red-500/10 px-2.5 py-1 rounded-lg">
                        <XCircle className="w-4 h-4" /> ไม่ถูกต้อง
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2 pt-1">
                {q.options?.map((opt) => {
                  const isSelected = currentAns === opt.id;
                  let optStyle =
                    'bg-surface-elevated/60 text-text-main hover:bg-surface-elevated border-border';

                  if (isDone) {
                    if (opt.id === q.correctAnswer) {
                      optStyle = 'bg-primary/10 border-primary text-primary font-semibold';
                    } else if (isSelected && !isCorrect) {
                      optStyle = 'bg-red-500/10 border-red-500 text-red-500';
                    }
                  } else if (isSelected) {
                    optStyle = 'bg-primary/15 border-primary text-primary font-semibold shadow-xs';
                  }

                  return (
                    <button
                      key={opt.id}
                      disabled={isDone}
                      onClick={() => handleSelectOption(q.id, opt.id)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm transition flex items-center justify-between ${optStyle}`}
                    >
                      <span>{opt.text}</span>
                      <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-mono flex-shrink-0 ml-2">
                        {opt.id.toUpperCase()}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Actions & Explanation */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-border">
                {!isDone ? (
                  <button
                    disabled={!currentAns}
                    onClick={() => handleSubmitQuestion(q)}
                    className="px-4 py-2 bg-primary text-white font-semibold text-xs rounded-xl hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1 shadow-sm"
                  >
                    ตรวจคำตอบ <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleResetQuestion(q.id)}
                    className="px-3 py-1.5 bg-surface-elevated text-muted hover:text-text-main border border-border font-medium text-xs rounded-lg transition flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> ทำข้อนี้ใหม่
                  </button>
                )}

                {isDone && (
                  <div className="w-full p-4 bg-surface-elevated rounded-xl border border-border text-xs text-text-main leading-relaxed space-y-1">
                    <div className="font-semibold text-primary flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> คำอธิบายเฉลย:
                    </div>
                    <div>{q.explanation}</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
