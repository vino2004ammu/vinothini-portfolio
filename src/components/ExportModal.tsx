import { useState, useEffect } from 'react';
import { X, Copy, Check, Terminal, ExternalLink, Download, Code2, FolderGit2 } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportModal({ isOpen, onClose }: ExportModalProps) {
  const [activeTab, setActiveTab] = useState<'guide' | 'html' | 'css' | 'js'>('guide');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[99900] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#090e1a] border border-[#d4af37]/40 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden my-auto max-h-[92vh] flex flex-col text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-[#0b1222] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-[#d4af37]" />
            <div>
              <h2 className="font-display text-lg sm:text-xl font-bold text-white">
                VS Code & GitHub Pages Deployment Guide
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Deploying to https://vino2004ammu.github.io/My_Portfolio-/
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800/80 hover:bg-slate-700 transition-colors"
            data-cursor="CLOSE"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-slate-800 bg-[#080d17] px-6 gap-2 text-xs font-mono">
          <button
            onClick={() => setActiveTab('guide')}
            className={`py-3 px-4 font-semibold border-b-2 transition-all ${
              activeTab === 'guide'
                ? 'border-[#d4af37] text-[#d4af37]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            1. Deployment & Run Guide
          </button>
          <button
            onClick={() => setActiveTab('html')}
            className={`py-3 px-4 font-semibold border-b-2 transition-all ${
              activeTab === 'html'
                ? 'border-[#d4af37] text-[#d4af37]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            2. Standalone index.html
          </button>
          <button
            onClick={() => setActiveTab('css')}
            className={`py-3 px-4 font-semibold border-b-2 transition-all ${
              activeTab === 'css'
                ? 'border-[#d4af37] text-[#d4af37]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            3. Standalone style.css
          </button>
          <button
            onClick={() => setActiveTab('js')}
            className={`py-3 px-4 font-semibold border-b-2 transition-all ${
              activeTab === 'js'
                ? 'border-[#d4af37] text-[#d4af37]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            4. Standalone main.js
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto custom-scrollbar bg-[#080d17] text-slate-300 text-sm">
          {activeTab === 'guide' && (
            <div className="space-y-6">
              {/* GitHub Pages Update */}
              <div className="p-5 rounded-2xl bg-[#0d1527] border border-[#d4af37]/30 space-y-3">
                <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                  <span className="text-[#d4af37]">🚀</span>
                  <span>How to Update Your Live GitHub Pages Repository</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Your existing repository is at <code className="text-[#d4af37] font-mono">https://github.com/vino2004ammu/My_Portfolio-</code>. To replace the simple template with this premium portfolio:
                </p>
                <div className="p-4 rounded-xl bg-[#050810] border border-slate-800 text-xs font-mono text-slate-200 space-y-2">
                  <p className="text-slate-400"># 1. Clone your repo or open your existing local folder:</p>
                  <p className="text-[#d4af37]">git clone https://github.com/vino2004ammu/My_Portfolio-.git</p>
                  <p className="text-[#d4af37]">cd My_Portfolio-</p>
                  <p className="text-slate-400"># 2. Copy the files (index.html, style.css, main.js) into this folder</p>
                  <p className="text-slate-400"># 3. Commit and push to GitHub:</p>
                  <p className="text-[#d4af37]">git add .</p>
                  <p className="text-[#d4af37]">git commit -m "Upgrade to premium modern portfolio architecture"</p>
                  <p className="text-[#d4af37]">git push origin main</p>
                </div>
                <p className="text-xs text-emerald-400">
                  ✓ Within 60 seconds, your site at <a href="https://vino2004ammu.github.io/My_Portfolio-/" target="_blank" rel="noreferrer" className="underline font-mono">vino2004ammu.github.io/My_Portfolio-/</a> will automatically reflect the new premium design!
                </p>
              </div>

              {/* Running in VS Code */}
              <div className="p-5 rounded-2xl bg-[#0d1527] border border-slate-800 space-y-3">
                <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#d4af37]" />
                  <span>How to Run Locally in VS Code</span>
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-300">
                  <li>Open VS Code and choose <strong>File → Open Folder</strong>.</li>
                  <li>Install the popular free extension <strong>"Live Server"</strong> (by Ritwick Dey).</li>
                  <li>Right-click on <code className="text-[#d4af37] font-mono">index.html</code> and click <strong>"Open with Live Server"</strong>.</li>
                  <li>Your browser will immediately open at <code className="text-[#d4af37] font-mono">http://127.0.0.1:5500</code>.</li>
                </ol>
              </div>

              {/* Customizing Colors and Info */}
              <div className="p-5 rounded-2xl bg-[#0d1527] border border-slate-800 space-y-3">
                <h3 className="font-display text-base font-bold text-white">
                  How to Customize in 1 Minute
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  • <strong>Change Colors:</strong> Edit the CSS variables at the top of <code className="text-[#d4af37] font-mono">style.css</code> (<code className="text-slate-200">--primary-color</code>, <code className="text-slate-200">--accent-color</code>).<br />
                  • <strong>Update Projects or Skills:</strong> Edit the <code className="text-[#d4af37] font-mono">PORTFOLIO_DATA</code> object at the top of <code className="text-[#d4af37] font-mono">main.js</code>.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'html' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#d4af37]">index.html (Pure Standalone HTML5)</span>
                <span className="text-xs text-slate-400">Zero dependencies required</span>
              </div>
              <p className="text-xs text-slate-400">
                The full static code is also generated in the workspace at <code className="text-[#d4af37]">/portfolio/index.html</code>.
              </p>
            </div>
          )}

          {activeTab === 'css' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#d4af37]">css/style.css (Pure Standalone CSS3)</span>
                <span className="text-xs text-slate-400">Custom theme variables & animations</span>
              </div>
              <p className="text-xs text-slate-400">
                The full static code is generated in the workspace at <code className="text-[#d4af37]">/portfolio/css/style.css</code>.
              </p>
            </div>
          )}

          {activeTab === 'js' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#d4af37]">js/main.js (Pure Standalone JavaScript ES6)</span>
                <span className="text-xs text-slate-400">Custom cursor, micro-interactions, modal handlers</span>
              </div>
              <p className="text-xs text-slate-400">
                The full static code is generated in the workspace at <code className="text-[#d4af37]">/portfolio/js/main.js</code>.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-[#0b1222] border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-5 rounded-xl text-xs font-semibold bg-[#d4af37] text-[#060a12] hover:bg-[#f3ca68] transition-colors"
            data-cursor="CLOSE"
          >
            Got it, Let's Build!
          </button>
        </div>
      </div>
    </div>
  );
}
