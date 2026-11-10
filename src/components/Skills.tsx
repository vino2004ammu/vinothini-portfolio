import { Server, Database, Layout, Cpu, CheckCircle } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const SKILL_GROUPS = [
  {
    title: 'Backend Engineering',
    category: 'Core Specialty',
    icon: Server,
    chips: [
      { name: 'Python (OOP)', detail: 'Decorators, generators, modular design' },
      { name: 'Django Framework', detail: 'MVT, ORM, Auth, Admin & CBVs' },
      { name: 'FastAPI', detail: 'REST API endpoints & async handling' },
      { name: 'REST Architecture', detail: 'CRUD pipelines & JSON serialization' },
    ],
  },
  {
    title: 'Database Management',
    category: 'Data Layer',
    icon: Database,
    chips: [
      { name: 'SQL & Queries', detail: 'Subqueries, joins, grouping & aggregations' },
      { name: 'Schema Design', detail: 'Normalization (1NF-3NF) & constraints' },
      { name: 'Oracle SQL', detail: 'Relational query design & integrity' },
    ],
  },
  {
    title: 'Frontend Development',
    category: 'User Interface',
    icon: Layout,
    chips: [
      { name: 'HTML5 & CSS3', detail: 'Semantic markup & responsive layouts' },
      { name: 'Bootstrap 5', detail: 'Grid system & responsive components' },
      { name: 'JavaScript (ES6+)', detail: 'DOM manipulation & async fetch' },
      { name: 'Tailwind CSS', detail: 'Modern utility styling & dark mode' },
      { name: 'React.js', detail: 'Components & hooks (currently learning)' },
    ],
  },
  {
    title: 'Tools & Applied Tech',
    category: 'Engineering Tooling',
    icon: Cpu,
    chips: [
      { name: 'Git & GitHub', detail: 'Version control, repositories & branching' },
      { name: 'Postman', detail: 'API testing, request collections & validation' },
      { name: 'AI Tools', detail: 'Prompt engineering, ChatGPT & AI development tools' },
      { name: 'Python Automation', detail: 'File I/O, CSV parsing & scripts' },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative min-h-screen overflow-hidden bg-noir-bg px-6 py-24">
      {/* Ambient background glow in Warm Mustard */}
      <div
        className="pointer-events-none absolute -left-28 top-1/3 h-[450px] w-[450px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #eab308, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl w-full">
        {/* Header Reveal */}
        <ScrollReveal direction="up" distance={30} duration={600}>
          <p className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-noir-cream/75">
            Technical Arsenal
          </p>

          <h2 className="mb-12 font-sans text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[0.95] tracking-tight text-white">
            Skills <span className="text-[#eab308]">& Capabilities</span>
          </h2>
        </ScrollReveal>

        {/* 2x2 Grid of Cards with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {SKILL_GROUPS.map((group, idx) => {
            const Icon = group.icon;
            return (
              <ScrollReveal
                key={group.title}
                direction="up"
                distance={35}
                delay={idx * 120}
                duration={700}
              >
                <div className="group relative h-full rounded-3xl border border-white/10 bg-[#050505]/40 p-8 transition-all duration-300 hover:border-[#eab308]/40 hover:bg-white/[0.02]">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-[#eab308] transition-colors group-hover:border-[#eab308]/30 group-hover:bg-[#eab308]/10">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-sans text-xl font-bold text-white transition-colors group-hover:text-[#fef08a]">
                          {group.title}
                        </h3>
                        <span className="font-sans text-xs text-noir-muted">{group.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {group.chips.map((chip) => (
                      <div
                        key={chip.name}
                        className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5 transition-all duration-200 hover:border-[#eab308]/30 hover:bg-[#eab308]/[0.04]"
                      >
                        <div className="flex items-center gap-1.5">
                          <CheckCircle className="h-3.5 w-3.5 text-[#eab308] shrink-0" />
                          <h4 className="font-sans text-sm font-semibold text-noir-cream">{chip.name}</h4>
                        </div>
                        <p className="mt-1 font-sans text-xs text-noir-muted leading-relaxed pl-5">
                          {chip.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
