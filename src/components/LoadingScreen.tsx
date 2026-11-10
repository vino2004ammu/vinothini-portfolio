import { useEffect, useState } from 'react';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [percent, setPercent] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Check if user visited recently in this session to allow immediate entrance
    const hasVisited = sessionStorage.getItem('vino_portfolio_visited');
    if (hasVisited) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          sessionStorage.setItem('vino_portfolio_visited', 'true');
          setIsFadingOut(true);
          setTimeout(onComplete, 450);
          return 100;
        }
        // Organic accelerated counter jumps: 0 -> 12 -> 28 -> 54 -> 78 -> 92 -> 100
        const step = Math.floor(Math.random() * 14) + 8;
        return Math.min(100, prev + step);
      });
    }, 90);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem('vino_portfolio_visited', 'true');
    setIsFadingOut(true);
    setTimeout(onComplete, 200);
  };

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col justify-between p-8 md:p-14 bg-[#060a12] text-slate-100 transition-all duration-500 ease-out select-none ${
        isFadingOut ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
      }`}
    >
      {/* Top Header / Skip */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
          <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
            System Initializing
          </span>
        </div>
        <button
          onClick={handleSkip}
          className="text-xs font-mono text-slate-400 hover:text-[#d4af37] transition-colors py-1 px-3 border border-slate-800 rounded hover:border-[#d4af37]/40"
          data-cursor="SKIP"
        >
          Skip [ESC]
        </button>
      </div>

      {/* Center Branding & Progress */}
      <div className="max-w-xl mx-auto w-full my-auto">
        <div className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold mb-2">
          Portfolio Archive 2026
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-3">
          {PORTFOLIO_CONFIG.personal.name}
        </h1>
        <p className="text-sm sm:text-base font-mono uppercase tracking-wider text-slate-400 mb-8">
          {PORTFOLIO_CONFIG.personal.role}
        </p>

        {/* Progress Bar Container */}
        <div className="space-y-3">
          <div className="flex justify-between items-baseline text-xs font-mono">
            <span className="text-slate-400">Compiling Environment</span>
            <span className="text-[#d4af37] text-lg font-bold tabular-nums">
              {percent.toString().padStart(3, '0')}%
            </span>
          </div>
          <div className="w-full h-1 bg-slate-800/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#d4af37] to-[#f3ca68] transition-all duration-150 ease-out shadow-[0_0_12px_#d4af37]"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-400 gap-2 border-t border-slate-900/80 pt-6">
        <div>Python 3 · Django · FastAPI · SQL · Modern Web</div>
        <div className="text-[#d4af37]/70">Anna University CSE Graduate</div>
      </div>
    </div>
  );
}
