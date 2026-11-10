import { PORTFOLIO_CONFIG } from '../data/portfolioData';
import { GraduationCap, Award, Calendar, CheckCircle2, Sparkles } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function Education() {
  const { education, certifications } = PORTFOLIO_CONFIG;

  return (
    <section id="education" className="relative min-h-screen overflow-hidden bg-noir-bg px-6 py-24">
      {/* Ambient background glow in Warm Mustard */}
      <div
        className="pointer-events-none absolute -left-20 bottom-1/4 h-[360px] w-[360px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #eab308, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl w-full">
        {/* Header Reveal */}
        <ScrollReveal direction="up" distance={30} duration={600}>
          <p className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-noir-cream/75">
            Academic Background & Training
          </p>

          <h2 className="mb-12 font-sans text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[0.95] tracking-tight text-white">
            Education <span className="text-[#eab308]">& Certifications</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-8">
          {/* Main Degree Card Reveal */}
          {education.map((item, idx) => (
            <ScrollReveal key={idx} direction="up" distance={35} delay={100} duration={700}>
              <article
                className="group relative rounded-3xl border border-white/10 bg-[#050505]/40 p-8 sm:p-9 transition-all duration-300 hover:border-[#eab308]/40 hover:bg-white/[0.02]"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/10 pb-6 mb-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-0.5 font-sans text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                        <Sparkles className="h-3 w-3" />
                        <span>{item.gradeOrBadge}</span>
                      </span>
                      <span className="text-noir-muted text-xs">· First Class with Distinction</span>
                    </div>
                    <h3 className="font-sans text-2xl sm:text-3xl font-bold text-white group-hover:text-[#fef08a] transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5 font-sans text-sm text-[#f2efe8]/80">
                      <GraduationCap className="h-4 w-4 text-[#eab308]" />
                      <span className="font-semibold text-white">{item.institution}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 font-mono text-xs text-white shrink-0 self-start">
                    <Calendar className="h-3.5 w-3.5 text-[#eab308]" />
                    <span>{item.period}</span>
                  </div>
                </div>

                <p className="font-sans text-sm sm:text-base leading-relaxed text-noir-muted mb-5">
                  {item.description}
                </p>

                <div className="space-y-2.5 mb-6">
                  {item.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2.5 font-sans text-xs sm:text-sm text-[#f2efe8]/85">
                      <CheckCircle2 className="h-4 w-4 text-[#eab308] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {item.technologies && (
                  <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/5">
                    <span className="text-xs font-sans text-noir-muted mr-1">Core Subjects:</span>
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

          {/* Professional Training & Certifications Sub-heading */}
          <div className="pt-4">
            <ScrollReveal direction="up" distance={25} delay={120} duration={600}>
              <h3 className="font-sans text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Award className="h-5 w-5 text-[#eab308]" />
                <span>Professional Full-Stack Training & Certifications</span>
              </h3>
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {certifications.map((cert, cIdx) => (
                <ScrollReveal
                  key={cIdx}
                  direction="up"
                  distance={30}
                  delay={150 + cIdx * 120}
                  duration={700}
                >
                  <div
                    className="h-full rounded-3xl border border-white/10 bg-[#050505]/40 p-7 transition-all duration-300 hover:border-[#eab308]/40 hover:bg-white/[0.02] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <span className="rounded-full border border-[#eab308]/20 bg-[#eab308]/10 px-3 py-0.5 font-sans text-xs font-semibold text-[#eab308]">
                          {cert.gradeOrBadge}
                        </span>
                        <span className="font-mono text-xs text-noir-muted">{cert.period}</span>
                      </div>

                      <h4 className="font-sans text-lg font-bold text-white mb-1">{cert.title}</h4>
                      <p className="font-sans text-xs text-[#eab308] font-semibold mb-3">{cert.institution}</p>
                      <p className="font-sans text-xs sm:text-sm leading-relaxed text-noir-muted mb-4">
                        {cert.description}
                      </p>

                      <div className="space-y-1.5 mb-4">
                        {cert.bullets.map((b, bIndex) => (
                          <div key={bIndex} className="flex items-start gap-2 font-sans text-xs text-[#f2efe8]/80">
                            <span className="text-[#eab308]">▸</span>
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {cert.technologies && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-white/5">
                        {cert.technologies.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-white/10 bg-white/[0.02] px-2.5 py-0.5 font-sans text-[11px] text-noir-cream"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
