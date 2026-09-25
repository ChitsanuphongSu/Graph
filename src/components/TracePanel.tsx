import React, { useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, FastForward } from 'lucide-react';

interface TracePanelProps {
  stepIndex: number;
  totalSteps: number;
  isPlaying: boolean;
  onNext: () => void;
  onPrev: () => void;
  onPlayToggle: () => void;
  onReset: () => void;
  explanation: string;
  ruleTag?: string;
  playbackSpeed?: number;
  onSpeedChange?: (speed: number) => void;
  extraStateNode?: React.ReactNode;
}

export const TracePanel: React.FC<TracePanelProps> = ({
  stepIndex,
  totalSteps,
  isPlaying,
  onNext,
  onPrev,
  onPlayToggle,
  onReset,
  explanation,
  ruleTag,
  playbackSpeed = 1000,
  onSpeedChange,
  extraStateNode,
}) => {
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        if (stepIndex < totalSteps - 1) {
          onNext();
        } else {
          onPlayToggle();
        }
      }, playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, stepIndex, totalSteps, playbackSpeed, onNext, onPlayToggle]);

  return (
    <div className="flex flex-col bg-surface rounded-2xl border border-border p-5 shadow-sm space-y-4">
      {/* Top Header: Step Counter & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-primary/10 text-primary font-bold rounded-lg text-sm font-mono border border-primary/20">
            Step {stepIndex} / {Math.max(0, totalSteps - 1)}
          </span>
          {ruleTag && (
            <span className="px-2.5 py-1 bg-surface-elevated text-muted font-semibold rounded-lg text-xs border border-border">
              {ruleTag}
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onReset}
            title="Reset"
            className="p-2 rounded-xl text-muted hover:text-text-main hover:bg-surface-elevated border border-border transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onPrev}
            disabled={stepIndex <= 0 || isPlaying}
            title="Previous Step"
            className="p-2 rounded-xl text-muted hover:text-text-main hover:bg-surface-elevated border border-border disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={onPlayToggle}
            title={isPlaying ? 'Pause' : 'Auto Play'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-medium text-sm transition shadow-sm"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-white" /> พัก
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" /> เล่นอัตโนมัติ
              </>
            )}
          </button>
          <button
            onClick={onNext}
            disabled={stepIndex >= totalSteps - 1 || isPlaying}
            title="Next Step"
            className="p-2 rounded-xl text-muted hover:text-text-main hover:bg-surface-elevated border border-border disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          {onSpeedChange && (
            <div className="flex items-center ml-2 text-xs text-muted">
              <FastForward className="w-3.5 h-3.5 mr-1" />
              <select
                value={playbackSpeed}
                onChange={(e) => onSpeedChange(Number(e.target.value))}
                className="bg-surface-elevated border border-border rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-primary text-text-main"
              >
                <option value={1500}>0.7x (ช้า)</option>
                <option value={1000}>1.0x (ปกติ)</option>
                <option value={500}>2.0x (เร็ว)</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Explanation Box */}
      <div className="p-4 bg-surface-elevated rounded-xl border border-border/80 text-sm leading-relaxed text-text-main">
        <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
          คำอธิบายขั้นตอนปัจจุบัน
        </div>
        <div className="font-normal">{explanation}</div>
      </div>

      {/* Custom algorithm state container (Stack, Queue, Candidates, etc.) */}
      {extraStateNode && <div className="pt-2">{extraStateNode}</div>}
    </div>
  );
};
