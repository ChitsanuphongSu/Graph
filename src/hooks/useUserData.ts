import { useState, useEffect } from 'react';
import { UserStats } from '../types';

const STORAGE_KEY = 'graph-study-app:v1';

const defaultStats: UserStats = {
  completedLessons: [],
  practiceAttempts: {},
  quizHistory: [],
  theme: 'light',
};

export function useUserData() {
  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const item = localStorage.getItem(STORAGE_KEY);
      if (item) {
        return JSON.parse(item);
      }
    } catch (e) {
      console.error('Failed to load user stats from localStorage', e);
    }
    return defaultStats;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch (e) {
      console.error('Failed to save user stats to localStorage', e);
    }
  }, [stats]);

  // Apply theme class to document element
  useEffect(() => {
    const root = document.documentElement;
    if (stats.theme === 'dark') {
      root.classList.add('dark');
      return;
    }
    if (stats.theme === 'light') {
      root.classList.remove('dark');
      return;
    }

    // System theme: apply current match and listen for OS theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const applySystemTheme = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    applySystemTheme(mediaQuery);

    const handler = (e: MediaQueryListEvent) => applySystemTheme(e);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else if ('addListener' in mediaQuery) {
      // Fallback for older browsers
      (mediaQuery as any).addListener(handler);
      return () => (mediaQuery as any).removeListener(handler);
    }
  }, [stats.theme]);

  const markLessonComplete = (lessonId: string) => {
    setStats((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
      };
    });
  };

  const recordPracticeAnswer = (questionId: string, answered: any, isCorrect: boolean) => {
    setStats((prev) => ({
      ...prev,
      practiceAttempts: {
        ...prev.practiceAttempts,
        [questionId]: {
          answered,
          isCorrect,
          timestamp: Date.now(),
        },
      },
    }));
  };

  const recordQuizAttempt = (attempt: {
    quizId: string;
    score: number;
    total: number;
    percentage: number;
    categoryBreakdown: Record<string, { correct: number; total: number }>;
  }) => {
    setStats((prev) => ({
      ...prev,
      quizHistory: [
        ...prev.quizHistory,
        {
          ...attempt,
          timestamp: Date.now(),
        },
      ],
    }));
  };

  const setTheme = (theme: 'light' | 'dark' | 'system') => {
    setStats((prev) => ({ ...prev, theme }));
  };

  const resetAllProgress = () => {
    setStats({ ...defaultStats, theme: stats.theme });
  };

  return {
    stats,
    markLessonComplete,
    recordPracticeAnswer,
    recordQuizAttempt,
    setTheme,
    resetAllProgress,
  };
}
