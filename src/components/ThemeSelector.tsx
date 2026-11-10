import { useState, useEffect } from 'react';
import { Palette, Check, Image as ImageIcon, Sliders } from 'lucide-react';

export type ThemeKey = 'gold' | 'cyan' | 'emerald' | 'violet' | 'rose' | 'blue' | 'sunset' | 'silver';

interface ThemeOption {
  id: ThemeKey;
  name: string;
  accentHex: string;
}

export interface BgOption {
  id: string;
  name: string;
  src: string;
  desc: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  { id: 'gold', name: 'Imperial Amber', accentHex: '#f59e0b' },
  { id: 'cyan', name: 'Electric Cyan', accentHex: '#06b6d4' },
  { id: 'emerald', name: 'Neo Emerald', accentHex: '#10b981' },
  { id: 'violet', name: 'Royal Violet', accentHex: '#a855f7' },
  { id: 'rose', name: 'Rose Bronze', accentHex: '#f43f5e' },
  { id: 'blue', name: 'Ocean Cobalt', accentHex: '#3b82f6' },
  { id: 'sunset', name: 'Sunset Coral', accentHex: '#ea580c' },
  { id: 'silver', name: 'Titanium Silver', accentHex: '#e2e8f0' },
];

export const BG_OPTIONS: BgOption[] = [
  { id: 'workspace', name: 'Developer Desk', src: '/images/hero_workspace.jpg', desc: 'MacBook, code & workstation' },
  { id: 'codescreen', name: 'Code Screen IDE', src: '/images/code_screen.jpg', desc: 'Dark theme programming IDE' },
  { id: 'laptop', name: 'Clean Laptop Setup', src: '/images/desk_laptop.jpg', desc: 'Minimal developer workspace' },
  { id: 'server', name: 'Datacenter Server', src: '/images/system_server.jpg', desc: 'High-tech server rack network' },
  { id: 'matrix', name: 'Matrix Tech Stream', src: '/images/matrix_code.jpg', desc: 'Digital system data streams' },
];

export default function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('gold');
  const [currentBg, setCurrentBg] = useState<string>('/images/hero_workspace.jpg');
  const [bgOpacity, setBgOpacity] = useState<number>(0.65);
  const [activeTab, setActiveTab] = useState<'colors' | 'backgrounds'>('colors');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio_theme') as ThemeKey | null;
    if (savedTheme && THEME_OPTIONS.some((t) => t.id === savedTheme)) {
      setTheme(savedTheme);
    } else {
      setTheme('gold');
    }

    const savedBg = localStorage.getItem('portfolio_bg_image');
    if (savedBg) {
      setCurrentBg(savedBg);
    }

    const savedOpacity = localStorage.getItem('portfolio_bg_opacity');
    if (savedOpacity) {
      setBgOpacity(parseFloat(savedOpacity));
    }
  }, []);

  const setTheme = (theme: ThemeKey) => {
    setCurrentTheme(theme);
    localStorage.setItem('portfolio_theme', theme);

    if (theme === 'gold') {
      document.body.removeAttribute('data-theme');
    } else {
      document.body.setAttribute('data-theme', theme);
    }
  };

  const setBackground = (src: string) => {
    setCurrentBg(src);
    localStorage.setItem('portfolio_bg_image', src);
    window.dispatchEvent(new Event('portfolio_bg_change'));
  };

  const updateOpacity = (opacity: number) => {
    setBgOpacity(opacity);
    localStorage.setItem('portfolio_bg_opacity', opacity.toString());
    window.dispatchEvent(new Event('portfolio_bg_change'));
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg text-xs font-mono text-slate-300 border border-slate-700/80 hover:border-[var(--accent-color)] hover:text-white bg-[#0a1124]/90 transition-all transform hover:scale-105 active:scale-95 shadow-sm"
        title="Customize Theme & Background Visuals"
        data-cursor="THEME"
      >
        <Palette className="w-3.5 h-3.5 text-[var(--accent-color)]" />
        <span className="hidden sm:inline">Visuals</span>
        <span
          className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]"
          style={{ backgroundColor: 'var(--accent-color)' }}
        />
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-72 p-2.5 rounded-2xl bg-[#090f20]/98 border border-slate-700/90 shadow-[0_15px_40px_rgba(0,0,0,0.85)] backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150 space-y-2">
            {/* Tabs Header */}
            <div className="flex items-center p-1 bg-slate-900/90 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab('colors')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-mono rounded-lg transition-all ${
                  activeTab === 'colors'
                    ? 'bg-[var(--card-color)] text-white font-semibold shadow-sm border border-slate-700/60'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Palette className="w-3 h-3 text-[var(--accent-color)]" />
                <span>Colors</span>
              </button>
              <button
                onClick={() => setActiveTab('backgrounds')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-mono rounded-lg transition-all ${
                  activeTab === 'backgrounds'
                    ? 'bg-[var(--card-color)] text-white font-semibold shadow-sm border border-slate-700/60'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3 h-3 text-[var(--accent-color)]" />
                <span>Wallpapers</span>
              </button>
            </div>

            {/* Color Themes Tab */}
            {activeTab === 'colors' && (
              <div className="space-y-1">
                <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800 flex justify-between items-center">
                  <span>Accent Color Themes</span>
                  <span className="text-[9px] text-[var(--accent-color)]">8 Styles</span>
                </div>
                <div className="max-h-56 overflow-y-auto custom-scrollbar space-y-1 pr-1">
                  {THEME_OPTIONS.map((theme) => {
                    const isActive = currentTheme === theme.id;
                    return (
                      <button
                        key={theme.id}
                        onClick={() => {
                          setTheme(theme.id);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-slate-800/90 text-white font-semibold'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                        }`}
                        data-cursor="COLOR"
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/40 shadow-sm"
                            style={{ backgroundColor: theme.accentHex }}
                          />
                          <span>{theme.name}</span>
                        </div>
                        {isActive && <Check className="w-3.5 h-3.5 text-[var(--accent-color)]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Background Wallpapers Tab */}
            {activeTab === 'backgrounds' && (
              <div className="space-y-2">
                <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800 flex justify-between items-center">
                  <span>System Wallpapers</span>
                  <span className="text-[9px] text-[var(--accent-color)]">5 Photos</span>
                </div>
                <div className="max-h-56 overflow-y-auto custom-scrollbar space-y-1.5 pr-1">
                  {BG_OPTIONS.map((bg) => {
                    const isActive = currentBg === bg.src;
                    return (
                      <button
                        key={bg.id}
                        onClick={() => setBackground(bg.src)}
                        className={`w-full flex items-center gap-2.5 p-1.5 rounded-xl text-left transition-all ${
                          isActive
                            ? 'bg-slate-800/90 border border-[var(--accent-color)]/60 text-white'
                            : 'border border-slate-800/60 hover:border-slate-700 text-slate-300 hover:bg-slate-800/40'
                        }`}
                      >
                        <img
                          src={bg.src}
                          alt={bg.name}
                          className="w-12 h-9 object-cover rounded-lg border border-slate-700 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold truncate text-white">{bg.name}</span>
                            {isActive && <Check className="w-3 h-3 text-[var(--accent-color)]" />}
                          </div>
                          <p className="text-[10px] text-slate-400 truncate">{bg.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Opacity Controls */}
                <div className="pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1.5">
                    <span className="flex items-center gap-1">
                      <Sliders className="w-3 h-3 text-[var(--accent-color)]" />
                      <span>Photo Visibility</span>
                    </span>
                    <span className="text-white font-semibold">{Math.round(bgOpacity * 100)}%</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {[
                      { label: 'Subtle', val: 0.4 },
                      { label: 'Balanced', val: 0.65 },
                      { label: 'Vibrant', val: 0.85 },
                    ].map((lvl) => (
                      <button
                        key={lvl.label}
                        onClick={() => updateOpacity(lvl.val)}
                        className={`py-1 text-[11px] font-mono rounded-lg transition-all ${
                          Math.abs(bgOpacity - lvl.val) < 0.05
                            ? 'bg-[var(--accent-color)] text-[#060a12] font-bold shadow-sm'
                            : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        {lvl.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
