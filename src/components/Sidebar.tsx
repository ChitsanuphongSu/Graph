import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Boxes,
  Grid,
  GitFork,
  Network,
  Milestone,
  FlaskConical,
  GraduationCap,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  FileText,
  Sun,
  Moon,
  Laptop,
} from 'lucide-react';
import { StudySection } from '../types';

interface SidebarProps {
  currentSection: StudySection;
  onSelectSection: (section: StudySection) => void;
  theme: 'light' | 'dark' | 'system';
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void;
}

const navItems: { id: StudySection; label: string; labelEn: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'dashboard', label: 'ภาพรวมการเรียน', labelEn: 'Dashboard', icon: LayoutDashboard },
  { id: 'quick-review', label: 'สรุปด่วนเตรียมสอบ', labelEn: 'Quick Review', icon: Sparkles },
  { id: 'fundamentals', label: 'พื้นฐานกราฟ', labelEn: 'Graph Fundamentals', icon: BookOpen },
  { id: 'representation', label: 'Matrix & List', labelEn: 'Graph Representation', icon: Grid },
  { id: 'traversal', label: 'การท่องกราฟ (DFS / BFS)', labelEn: 'Graph Traversal', icon: GitFork },
  { id: 'mst', label: 'Minimum Spanning Tree', labelEn: 'Prim & Kruskal', icon: Network },
  { id: 'shortest-path', label: 'เส้นทางสั้นสุด (Dijkstra)', labelEn: 'Shortest Path', icon: Milestone },
  { id: 'graph-lab', label: 'Interactive Graph Lab', labelEn: 'Graph Builder', icon: FlaskConical },
  { id: 'practice', label: 'แบบฝึกหัดทบทวน', labelEn: 'Practice System', icon: GraduationCap },
  { id: 'trace-practice', label: 'ฝึก Trace อัลกอริทึม', labelEn: 'Trace Practice', icon: Boxes },
  { id: 'quiz', label: 'แบบทดสอบประเมินผล', labelEn: 'Mixed Quiz & Mock', icon: HelpCircle },
  { id: 'weakness', label: 'วิเคราะห์จุดอ่อน', labelEn: 'Weakness Radar', icon: LayoutDashboard },
  { id: 'common-mistakes', label: 'ข้อผิดพลาดที่พบบ่อย', labelEn: 'Common Mistakes', icon: AlertTriangle },
  { id: 'reference', label: 'แหล่งอ้างอิง & นิยาม', labelEn: 'Reference & Cheatsheet', icon: FileText },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  onSelectSection,
  theme,
  onThemeChange,
}) => {
  return (
    <aside className="w-64 md:w-72 bg-surface border-r border-border flex flex-col h-full flex-shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-border flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold shadow-sm">
          <Network className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-bold text-text-main text-base leading-tight">
            Chapter 11 — Graph
          </h1>
          <p className="text-xs text-muted">Data Structures • KKU</p>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                isActive
                  ? 'bg-primary text-white font-semibold shadow-sm'
                  : 'text-muted hover:text-text-main hover:bg-surface-elevated font-medium'
              }`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-primary'}`} />
              <div className="flex flex-col min-w-0">
                <span className="text-xs md:text-sm truncate leading-snug">{item.label}</span>
                <span className={`text-[10px] truncate ${isActive ? 'text-white/80' : 'text-muted'}`}>
                  {item.labelEn}
                </span>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer / Theme Selector */}
      <div className="p-4 border-t border-border flex items-center justify-between text-xs text-muted bg-surface-elevated/40">
        <span>ธีมการแสดงผล</span>
        <div className="flex items-center gap-1 bg-surface border border-border p-1 rounded-lg">
          <button
            onClick={() => onThemeChange('light')}
            className={`p-1.5 rounded ${theme === 'light' ? 'bg-primary text-white' : 'hover:text-text-main'}`}
            title="Light Theme"
          >
            <Sun className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onThemeChange('dark')}
            className={`p-1.5 rounded ${theme === 'dark' ? 'bg-primary text-white' : 'hover:text-text-main'}`}
            title="Dark Theme"
          >
            <Moon className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onThemeChange('system')}
            className={`p-1.5 rounded ${theme === 'system' ? 'bg-primary text-white' : 'hover:text-text-main'}`}
            title="System Theme"
          >
            <Laptop className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
