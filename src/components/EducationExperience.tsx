import { useState } from 'react';
import { PORTFOLIO_CONFIG, TimelineItem } from '../data/portfolioData';
import { GraduationCap, Briefcase, Award, Calendar, CheckCircle } from 'lucide-react';

export default function EducationExperience() {
  const { education, certifications, internships } = PORTFOLIO_CONFIG;
  const [activeTab, setActiveTab] = useState<'all' | 'education' | 'internships'>('all');

  const allItems: TimelineItem[] = [
    ...certifications,
    ...education,
    ...internships,
  ];

  const getFilteredItems = () => {
    if (activeTab === 'education') {
      return [...education, ...certifications];
    }
    if (activeTab === 'internships') {
      return internships;
    }
    return allItems;
  };

  const items = getFilteredItems();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Education':
        return <GraduationCap className="w-4 h-4 text-[#060a12]" />;
      case 'Training':
        return <Award className="w-4 h-4 text-[#060a12]" />;
      case 'Internship':
        return <Briefcase className="w-4 h-4 text-[#060a12]" />;
      default:
        return <GraduationCap className="w-4 h-4 text-[#060a12]" />;
    }
  };

  return (
    <section id="experience" className="py-24 bg-[var(--background-alt)] relative border-t border-slate-900 transition-colors duration-400 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-color)] uppercase tracking-widest mb-2">
              <span>05</span>
              <span className="w-8 h-[1px] bg-[var(--accent-color)]" />
              <span>Career Foundation</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
              Education & <span className="text-gold-gradient">Practical Experience</span>
            </h2>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              Verifiable academic record, specialized full-stack Python training programs, and genuine internship experiences.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-1.5 p-1.5 bg-[var(--card-color)] border border-slate-800 rounded-xl shadow-md">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'all'
                  ? 'text-[#060a12] font-semibold shadow-md transform scale-105'
                  : 'text-slate-400 hover:text-white'
              }`}
              style={{
                backgroundColor: activeTab === 'all' ? 'var(--accent-color)' : 'transparent',
              }}
              data-cursor="TAB"
            >
              All Milestones
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'education'
                  ? 'text-[#060a12] font-semibold shadow-md transform scale-105'
                  : 'text-slate-400 hover:text-white'
              }`}
              style={{
                backgroundColor: activeTab === 'education' ? 'var(--accent-color)' : 'transparent',
              }}
              data-cursor="TAB"
            >
              Education & Training
            </button>
            <button
              onClick={() => setActiveTab('internships')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'internships'
                  ? 'text-[#060a12] font-semibold shadow-md transform scale-105'
                  : 'text-slate-400 hover:text-white'
              }`}
              style={{
                backgroundColor: activeTab === 'internships' ? 'var(--accent-color)' : 'transparent',
              }}
              data-cursor="TAB"
            >
              Internships
            </button>
          </div>
        </div>

        {/* Timeline Container with Dynamic Accent Line */}
        <div
          className="relative pl-6 sm:pl-10 border-l-2 space-y-12 max-w-4xl mx-auto"
          style={{ borderColor: 'var(--card-border)' }}
        >
          {items.map((item, index) => (
            <div key={index} className="relative group">
              {/* Animated Timeline Node with Glow */}
              <div
                className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-4 flex items-center justify-center transition-all duration-300 group-hover:scale-125"
                style={{
                  backgroundColor: 'var(--accent-color)',
                  borderColor: 'var(--background-alt)',
                  boxShadow: '0 0 16px var(--accent-color)',
                }}
              >
                {getTypeIcon(item.type)}
              </div>

              {/* Timeline Card with Hover Glow */}
              <div
                className="card-hover-glow p-6 sm:p-8 rounded-2xl shadow-xl"
                data-cursor="TIMELINE"
              >
                {/* Meta Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4 mb-4">
                  <div className="space-y-1">
                    <span
                      className="text-[11px] font-mono uppercase tracking-wider font-semibold"
                      style={{ color: 'var(--accent-color)' }}
                    >
                      {item.type}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[var(--accent-hover)] transition-colors">
                      {item.title}
                    </h3>
                    <div className="text-sm font-medium text-slate-300">
                      <span>{item.institution}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-200 bg-[var(--background-color)] py-1 px-3 rounded-md border border-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-[var(--accent-color)]" />
                      <span>{item.period}</span>
                    </div>
                    {item.gradeOrBadge && (
                      <span className="text-xs font-mono font-semibold text-emerald-400">
                        {item.gradeOrBadge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Bullets */}
                <div className="space-y-2 mb-4">
                  {item.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-[var(--accent-color)] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies used */}
                {item.technologies && item.technologies.length > 0 && (
                  <div className="border-t border-slate-800/80 pt-3 flex flex-wrap items-center gap-1.5 text-xs font-mono text-slate-400">
                    <span className="text-slate-500">Focus Areas:</span>
                    {item.technologies.map((tech, tIdx) => (
                      <span key={tIdx} className="flex items-center gap-1.5">
                        <span className="text-slate-300 group-hover:text-white transition-colors">{tech}</span>
                        {tIdx < item.technologies!.length - 1 && (
                          <span className="text-slate-600" aria-hidden="true">·</span>
                        )}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
