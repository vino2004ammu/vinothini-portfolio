import { PORTFOLIO_CONFIG } from '../data/portfolioData';
import { Award, Briefcase, Code, GraduationCap } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const CAPABILITY_PILLS = [
  { label: 'Python & Django', desc: 'Production-grade MVT & ORM' },
  { label: 'Relational SQL', desc: 'Optimized schemas & queries' },
  { label: 'REST APIs', desc: 'Modular endpoints & testing' },
  { label: 'Modern Web UI', desc: 'Responsive HTML5, CSS3 & JS' },
];

const STATS = [
  { value: '8.49', label: 'Anna University CGPA', desc: 'First Class with Distinction', icon: GraduationCap },
  { value: '02', label: 'Core Projects', desc: 'Full-Stack Django & AI Platform', icon: Code },
  { value: '10+', label: 'Core Technologies', desc: 'Python, Django, SQL & JS', icon: Award },
  { value: '02', label: 'Software Internships', desc: 'Techvolt & Srishti Innovation', icon: Briefcase },
];

export default function About() {
  return (
    <section id="about" className="relative min-h-screen overflow-hidden bg-noir-bg px-6 py-24">
      {/* Ambient background glow in Warm Mustard */}
      <div
        className="pointer-events-none absolute -top-32 right-0 h-[500px] w-[500px] rounded-full opacity-[0.07]"
        style={{ background: 'radial-gradient(circle, #eab308, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl w-full">
        {/* Header Reveal */}
        <ScrollReveal direction="up" distance={30} duration={600}>
          <p className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-noir-cream/75">
            Who I am
          </p>

          <h2 className="mb-10 font-sans text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[0.95] tracking-tight text-white">
            About <span className="text-[#eab308]">Me</span>
          </h2>
        </ScrollReveal>

        {/* Capability Badges Row Reveal */}
        <ScrollReveal direction="up" distance={25} delay={100} duration={650}>
          <div className="mb-10 flex flex-wrap gap-3">
            {CAPABILITY_PILLS.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 rounded-full border border-[#eab308]/25 px-4 py-2 transition hover:border-[#eab308]/60"
                style={{ background: 'rgba(234, 179, 8, 0.06)' }}
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#eab308] shadow-[0_0_6px_#eab308]" />
                <span className="font-sans text-sm font-semibold text-noir-cream">{item.label}</span>
                <span className="font-sans text-xs text-noir-muted">· {item.desc}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Editorial Story with Sleek Mustard Accent Line Reveal */}
        <ScrollReveal direction="up" distance={30} delay={180} duration={700}>
          <div className="mb-14 space-y-6 border-l-2 border-[#eab308]/30 pl-6 font-sans text-[1.05rem] leading-[1.85] text-noir-muted">
            <p>
              I am a{' '}
              <span className="font-semibold text-noir-cream">
                Computer Science & Engineering graduate from Anna University (8.49 CGPA, First Class with Distinction)
              </span>{' '}
              specializing in Full Stack Python Development. I build web applications and digital tools that bridge robust backend systems, reliable databases, and intuitive user experiences.
            </p>

            <p>
              On the engineering side, I have rigorous hands-on training from{' '}
              <span className="font-medium text-noir-cream">Pyspiders</span> in{' '}
              <span className="font-medium text-[#eab308]">
                Python, Django (MVT architecture, ORM, Class-Based Views), and REST APIs
              </span>
              . I model relational database schemas in{' '}
              <span className="font-medium text-noir-cream">SQL and Oracle SQL</span>, ensuring optimized queries, transaction safety, and clean data contracts.
            </p>

            <p>
              During my software internships across{' '}
              <span className="font-medium text-noir-cream">Techvolt Software and Srishti Innovation</span>
              , I gained practical exposure to UI/UX design workflows and Android mobile development fundamentals. I also engineered my capstone project, an{' '}
              <span className="font-medium text-[#eab308]">
                Advanced Marine Debris Detection System
              </span>{' '}
              using Convolutional Neural Networks and computer vision techniques.
            </p>

            <p>
              What drives me is writing{' '}
              <span className="font-medium text-noir-cream">
                clean, maintainable code with a humble attitude and relentless curiosity
              </span>
              . Grounded in solid Object-Oriented Programming (OOP) principles and algorithmic discipline, I am actively seeking an entry-level / junior role where I can contribute enthusiastically from day one while continuing to level up with seasoned engineers.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats Grid Reveal */}
        <ScrollReveal direction="up" distance={35} delay={250} duration={750}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-[#050505]/40 p-6 transition-all duration-300 hover:border-[#eab308]/40 hover:bg-white/[0.02]"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-sans text-3xl font-extrabold tracking-tight text-white">
                      {stat.value}
                    </span>
                    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-2 text-[#eab308]">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <h4 className="font-sans text-sm font-semibold text-noir-cream">{stat.label}</h4>
                  <p className="mt-1 font-sans text-xs text-noir-muted">{stat.desc}</p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
