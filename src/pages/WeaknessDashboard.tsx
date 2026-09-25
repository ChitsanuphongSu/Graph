import React from 'react';
import { LayoutDashboard, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { UserStats, StudySection } from '../types';
import { practiceQuestionsBank } from '../data/practiceQuestions';

interface WeaknessDashboardProps {
  stats: UserStats;
  onNavigate: (section: StudySection) => void;
}

export const WeaknessDashboard: React.FC<WeaknessDashboardProps> = ({ stats, onNavigate }) => {
  const attempts = Object.entries(stats.practiceAttempts);

  if (attempts.length === 0 && stats.quizHistory.length === 0) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <div>
          <h2 className="text-2xl font-bold text-text-main flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-primary" /> วิเคราะห์จุดอ่อน (Weakness Radar)
          </h2>
          <p className="text-sm text-muted">
            ระบบติดตามหัวข้อที่มักตอบผิดเพื่อช่วยให้ผู้เรียนเน้นทบทวนได้ตรงจุด
          </p>
        </div>

        <div className="p-10 bg-surface rounded-3xl border border-border text-center space-y-3 shadow-sm">
          <AlertCircle className="w-10 h-10 text-muted mx-auto" />
          <h3 className="font-bold text-base text-text-main">
            ยังมีข้อมูลไม่เพียงพอสำหรับวิเคราะห์จุดอ่อน
          </h3>
          <p className="text-xs text-muted max-w-md mx-auto leading-relaxed">
            กรุณาทำแบบฝึกหัดทบทวนใน Practice หรือทำแบบทดสอบ Quiz ก่อน ระบบจะนำสถิติการตอบผิดมาประมวลผลเป็นคำแนะนำเฉพาะบุคคล
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('practice')}
              className="px-4 py-2 bg-primary text-white font-semibold rounded-xl text-xs hover:bg-primary-hover transition shadow-sm"
            >
              ไปทำแบบฝึกหัด
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate category stats
  const catStats: Record<string, { correct: number; total: number }> = {};

  for (const [qId, att] of attempts) {
    const q = practiceQuestionsBank.find((item) => item.id === qId);
    if (q) {
      if (!catStats[q.category]) {
        catStats[q.category] = { correct: 0, total: 0 };
      }
      catStats[q.category].total += 1;
      if (att.isCorrect) {
        catStats[q.category].correct += 1;
      }
    }
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-text-main flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 text-primary" /> วิเคราะห์จุดอ่อนและความเชี่ยวชาญ
        </h2>
        <p className="text-sm text-muted">
          รายงานสถิติความเข้าใจรายหัวข้อตามข้อมูลการฝึกฝนจริงของคุณ
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(catStats).map(([cat, data]) => {
          const pct = Math.round((data.correct / data.total) * 100);
          const isWeak = pct < 65;

          return (
            <div
              key={cat}
              className={`p-5 rounded-2xl border bg-surface shadow-sm space-y-3 ${
                isWeak ? 'border-red-500/40' : 'border-primary/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-muted">{cat}</span>
                {isWeak ? (
                  <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded">
                    Needs Practice
                  </span>
                ) : (
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                    Strong Area
                  </span>
                )}
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-text-main font-mono">{pct}%</span>
                <span className="text-xs text-muted">
                  ถูกต้อง {data.correct} / {data.total} ครั้ง
                </span>
              </div>

              <div className="w-full bg-surface-elevated rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isWeak ? 'bg-red-500' : 'bg-primary'
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
