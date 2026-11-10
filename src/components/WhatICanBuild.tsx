import { useState } from 'react';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';
import { ArrowUpRight } from 'lucide-react';

export default function WhatICanBuild() {
  const { whatICanBuild } = PORTFOLIO_CONFIG;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-[var(--background-alt)] relative border-t border-slate-900 transition-colors duration-400 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-color)] uppercase tracking-widest mb-2">
            <span>03</span>
            <span className="w-8 h-[1px] bg-[var(--accent-color)]" />
            <span>Core Deliverables</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
            What I Can <span className="text-gold-gradient">Build</span>
          </h2>
        </div>

        {/* 4 Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whatICanBuild.map((item, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="card-hover-glow p-8 rounded-2xl flex flex-col justify-between overflow-hidden cursor-pointer group"
                data-cursor="BUILD"
              >
                {/* Luminous corner flare on hover */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-bl-full pointer-events-none transition-transform duration-500 opacity-20 group-hover:scale-150 group-hover:opacity-40"
                  style={{ backgroundColor: 'var(--accent-color)' }}
                />

                <div>
                  {/* Header with Number and Expanding Accent Line */}
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="font-display text-3xl sm:text-4xl font-extrabold transition-all duration-300 transform group-hover:translate-x-2 tabular-nums"
                      style={{
                        color: isHovered ? 'var(--accent-color)' : 'rgba(255,255,255,0.2)',
                      }}
                    >
                      {item.number}
                    </span>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-45"
                      style={{
                        backgroundColor: isHovered ? 'var(--accent-color)' : '#1e293b',
                        color: isHovered ? '#060a12' : '#94a3b8',
                        boxShadow: isHovered ? '0 0 15px var(--accent-color)' : 'none',
                      }}
                    >
                      <ArrowUpRight className="w-4 h-4 font-bold" />
                    </div>
                  </div>

                  {/* Expanding Accent Line with Glowing Beam */}
                  <div className="h-[2px] bg-slate-800 rounded-full mb-6 overflow-hidden relative">
                    <div
                      className="h-full rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: isHovered ? '100%' : '2rem',
                        background: 'var(--gradient-text)',
                        boxShadow: isHovered ? '0 0 10px var(--accent-color)' : 'none',
                      }}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-[var(--accent-hover)] transition-colors mb-3">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Technologies with clean typography */}
                <div className="border-t border-slate-800/80 pt-4 flex flex-wrap items-center gap-1.5 text-xs text-slate-400 font-mono">
                  {item.techStack.map((tech, tIdx) => (
                    <span key={tIdx} className="flex items-center gap-1.5">
                      <span className="text-slate-300 group-hover:text-white transition-colors">{tech}</span>
                      {tIdx < item.techStack.length - 1 && (
                        <span className="text-slate-600" aria-hidden="true">·</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
