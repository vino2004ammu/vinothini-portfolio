import { PORTFOLIO_CONFIG } from '../data/portfolioData';
import { Calendar, Building2, CheckCircle2 } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function Experience() {
  const { internships } = PORTFOLIO_CONFIG;

  return (
    <section id="experience" className="relative min-h-screen overflow-hidden bg-noir-bg px-6 py-24">
      {/* Ambient background glow in Warm Mustard */}
      <div
        className="pointer-events-none absolute -left-24 top-1/4 h-[420px] w-[420px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #eab308, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl w-full">
        {/* Header Reveal */}
        <ScrollReveal direction="up" distance={30} duration={600}>
          <p className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-noir-cream/75">
            Career Path & Industry Exposure
          </p>

          <h2 className="mb-12 font-sans text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[0.95] tracking-tight text-white">
            Experience <span className="text-[#eab308]">& Internships</span>
          </h2>
        </ScrollReveal>

        {/* Timeline Stack with Scroll Reveal per item */}
        <div className="space-y-8">
          {internships.map((item, idx) => (
            <ScrollReveal
              key={idx}
              direction="up"
              distance={35}
              delay={idx * 140}
              duration={750}
            >
              <article className="group relative rounded-3xl border border-white/10 bg-[#050505]/40 p-8 sm:p-9 transition-all duration-300 hover:border-[#eab308]/40 hover:bg-white/[0.02]">
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/10 pb-6 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="rounded-full border border-[#eab308]/20 bg-[#eab308]/10 px-3 py-0.5 font-sans text-xs font-semibold text-[#eab308]">
                        Internship
                      </span>
                      <span className="text-noir-muted text-xs">· Verified Industry Experience</span>
                    </div>
                    <h3 className="font-sans text-2xl font-bold text-white group-hover:text-[#fef08a] transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5 font-sans text-sm text-[#f2efe8]/80">
                      <Building2 className="h-4 w-4 text-[#eab308]" />
                      <span className="font-semibold text-white">{item.institution}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 font-mono text-xs text-white shrink-0 self-start">
                    <Calendar className="h-3.5 w-3.5 text-[#eab308]" />
                    <span>{item.period}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="font-sans text-sm sm:text-base leading-relaxed text-noir-muted mb-5">
                  {item.description}
                </p>

                {/* Bullet Points */}
                <div className="space-y-2.5 mb-6">
                  {item.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2.5 font-sans text-xs sm:text-sm text-[#f2efe8]/85">
                      <CheckCircle2 className="h-4 w-4 text-[#eab308] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Tech tags */}
                {item.technologies && (
                  <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/5">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-sans text-xs font-medium text-noir-cream"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
