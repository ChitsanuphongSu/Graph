import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { QuickReview } from './pages/QuickReview';
import { GraphFundamentals } from './pages/GraphFundamentals';
import { GraphRepresentation } from './pages/GraphRepresentation';
import { GraphTraversal } from './pages/GraphTraversal';
import { MinimumSpanningTree } from './pages/MinimumSpanningTree';
import { ShortestPath } from './pages/ShortestPath';
import { InteractiveGraphLab } from './pages/InteractiveGraphLab';
import { Practice } from './pages/Practice';
import { TracePractice } from './pages/TracePractice';
import { Quiz } from './pages/Quiz';
import { WeaknessDashboard } from './pages/WeaknessDashboard';
import { CommonMistakes } from './pages/CommonMistakes';
import { Reference } from './pages/Reference';
import { useUserData } from './hooks/useUserData';
import { StudySection } from './types';
import { Menu, X } from 'lucide-react';

export const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<StudySection>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const {
    stats,
    markLessonComplete,
    recordPracticeAnswer,
    recordQuizAttempt,
    setTheme,
  } = useUserData();

  const handleNavigate = (section: StudySection) => {
    setCurrentSection(section);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex h-screen w-full bg-bg text-text-main overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-full">
        <Sidebar
          currentSection={currentSection}
          onSelectSection={handleNavigate}
          theme={stats.theme}
          onThemeChange={setTheme}
        />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-72 h-full bg-surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 flex justify-end border-b border-border">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-muted hover:text-text-main"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <Sidebar
              currentSection={currentSection}
              onSelectSection={handleNavigate}
              theme={stats.theme}
              onThemeChange={setTheme}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden p-3.5 bg-surface border-b border-border flex items-center justify-between shadow-xs">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-xl border border-border text-muted hover:text-text-main"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="font-bold text-sm text-text-main">
            Chapter 11 — Graph
          </div>
          <div className="w-8" />
        </header>

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          {currentSection === 'dashboard' && (
            <Dashboard stats={stats} onNavigate={handleNavigate} />
          )}
          {currentSection === 'quick-review' && (
            <QuickReview onNavigate={handleNavigate} />
          )}
          {currentSection === 'fundamentals' && (
            <GraphFundamentals
              onComplete={() => markLessonComplete('fundamentals')}
            />
          )}
          {currentSection === 'representation' && (
            <GraphRepresentation
              onComplete={() => markLessonComplete('representation')}
            />
          )}
          {currentSection === 'traversal' && (
            <GraphTraversal onComplete={() => markLessonComplete('traversal')} />
          )}
          {currentSection === 'mst' && (
            <MinimumSpanningTree onComplete={() => markLessonComplete('mst')} />
          )}
          {currentSection === 'shortest-path' && (
            <ShortestPath
              onComplete={() => markLessonComplete('shortest-path')}
            />
          )}
          {currentSection === 'graph-lab' && <InteractiveGraphLab />}
          {currentSection === 'practice' && (
            <Practice
              onRecordAnswer={recordPracticeAnswer}
              savedAttempts={stats.practiceAttempts}
            />
          )}
          {currentSection === 'trace-practice' && <TracePractice />}
          {currentSection === 'quiz' && (
            <Quiz onRecordQuiz={recordQuizAttempt} />
          )}
          {currentSection === 'weakness' && (
            <WeaknessDashboard stats={stats} onNavigate={handleNavigate} />
          )}
          {currentSection === 'common-mistakes' && <CommonMistakes />}
          {currentSection === 'reference' && <Reference />}
        </main>
      </div>
    </div>
  );
};
