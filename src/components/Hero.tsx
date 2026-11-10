import { useState, useEffect, useRef } from 'react';
import { ArrowDown, Github, Linkedin, Mail, FileText, ArrowRight } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';

interface HeroProps {
  onNavigateToProjects: () => void;
  onNavigateToContact: () => void;
  onOpenResume?: () => void;
}

const ROLES = [
  'Full Stack Python Developer',
  'Backend & Django Developer',
  'Python & REST API Developer',
  'Web Developer',
];

export default function Hero({ onNavigateToProjects, onNavigateToContact, onOpenResume }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];
    const speed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === current) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      } else {
        setDisplayText(
          isDeleting ? current.slice(0, displayText.length - 1) : current.slice(0, displayText.length + 1)
        );
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setMousePos({
      x: Math.max(-1, Math.min(1, x)) * 10,
      y: Math.max(-1, Math.min(1, y)) * -10,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const socialLinks = [
    { icon: Github, href: PORTFOLIO_CONFIG.personal.github, label: 'GitHub' },
    { icon: Linkedin, href: PORTFOLIO_CONFIG.personal.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${PORTFOLIO_CONFIG.personal.email}`, label: 'Email' },
  ];

  return (
    <section
      ref={containerRef}
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-screen items-center overflow-hidden bg-noir-bg pt-24 pb-16"
    >
      {/* Warm Mustard Ambient Background Glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 55% 50% at 75% 42%, rgba(234, 179, 8, 0.12), transparent 60%), radial-gradient(ellipse 35% 30% at 18% 72%, rgba(202, 138, 4, 0.08), transparent 55%)',
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 py-12 md:grid-cols-12 md:gap-6 lg:gap-8 lg:px-8">
        {/* Left Column: Headlines & Bio */}
        <div className="order-2 md:order-1 md:col-span-7 space-y-5">
          {/* Top Pill: Available for Full Stack Roles */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3.5 py-1.5 shadow-[0_0_20px_rgba(52,211,153,0.25)]">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
            </span>
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Available for Full Stack & Python Roles
            </span>
          </div>

          {/* Intro line & Full Straight Name on One Line */}
          <div className="space-y-1">
            <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.28em] font-semibold text-[#eab308]">
              Hello, I am
            </p>
            <h1 className="font-display-name text-[clamp(2.4rem,5.2vw,4.4rem)] font-extrabold tracking-tight text-white leading-tight">
              Vinothini <span className="text-[#eab308]">I</span>
            </h1>
          </div>

          {/* Typewriter Dynamic Developer Role Heading */}
          <h2
            className="flex min-h-[2.5rem] items-center font-sans text-[clamp(1.25rem,2.8vw,1.95rem)] font-bold leading-[1.2] tracking-tight text-[#eab308] sm:min-h-[3rem]"
            aria-live="polite"
          >
            <span>{displayText}</span>
            <span
              className="ml-1 inline-block h-[0.9em] w-[3px] shrink-0 animate-pulse bg-[#eab308]"
              aria-hidden="true"
            />
          </h2>

          {/* Clean 3-Line Summary: What I Do & What I Know (No bullet points) */}
          <div className="max-w-xl font-sans text-sm sm:text-base leading-relaxed text-[#f2efe8]/85 space-y-2">
            <p>
              I build responsive web applications and scalable backend systems using Python, Django, and relational SQL databases. From designing normalized database schemas and clean REST APIs to crafting intuitive user interfaces with HTML, CSS, and modern JavaScript, I create dependable web solutions with clean, maintainable code.
            </p>
          </div>

          {/* Action Buttons in Warm Mustard */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              type="button"
              onClick={onNavigateToProjects}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#eab308] to-[#ca8a04] px-6 py-3.5 font-sans text-sm font-semibold tracking-wide text-noir-bg shadow-[0_0_28px_rgba(234,179,8,0.30)] transition hover:brightness-110 active:scale-95"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onNavigateToContact}
              className="rounded-full border border-[#eab308]/35 px-6 py-3.5 font-sans text-sm font-medium tracking-wide text-noir-cream transition hover:border-[#eab308]/80 hover:bg-[#eab308]/10 active:scale-95"
            >
              Contact Me
            </button>

            {onOpenResume && (
              <button
                type="button"
                onClick={onOpenResume}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3.5 font-sans text-sm font-medium text-white transition hover:bg-white/[0.08] hover:border-white/20 active:scale-95"
              >
                <FileText className="w-4 h-4 text-[#eab308]" />
                <span>Resume</span>
              </button>
            )}
          </div>

          {/* Social Icons Row */}
          <div className="flex items-center gap-5 pt-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto:') || href.startsWith('tel:') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-full border border-white/10 bg-white/[0.03] p-2.5 text-[#b8b4ae] transition hover:border-[#eab308]/50 hover:bg-[#eab308]/10 hover:text-[#eab308]"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Right Column: 3D Interactive Conic Orb Showcase */}
        <div className="order-1 flex justify-center md:order-2 md:col-span-5 md:justify-center lg:justify-end lg:pr-2">
          <div
            ref={cardRef}
            className="relative h-64 w-64 sm:h-72 sm:w-72 md:h-[22rem] md:w-[22rem] lg:h-[25rem] lg:w-[25rem] transition-transform duration-300 ease-out"
            style={{
              transform: `perspective(900px) rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Ambient Background Mustard Blur */}
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-full bg-gradient-to-br from-[#eab308]/35 via-[#ca8a04]/20 to-[#facc15]/25 blur-3xl opacity-60 animate-pulse"
            />

            {/* Revolving Conic Gradient Border Ring in Mustard Gold */}
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-full animate-[spin_24s_linear_infinite]"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 0%, rgba(234,179,8,0.75) 14%, transparent 30%, rgba(202,138,4,0.55) 58%, transparent 72%, rgba(254,240,138,0.4) 90%, transparent 100%)',
                maskImage: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
                WebkitMaskImage:
                  'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
              }}
            />

            {/* Circular Profile Frame */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#eab308]/60 via-white/10 to-[#ca8a04]/50 p-[2px] shadow-[0_15px_50px_rgba(0,0,0,0.8)] group select-none">
              <div className="h-full w-full overflow-hidden rounded-full bg-[#050505] relative flex items-center justify-center">
                <img
                  src={PORTFOLIO_CONFIG.personal.profileImage}
                  alt="Vinothini I"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.indexOf('profile_user.jpg') === -1) {
                      target.src = '/images/profile_user.jpg';
                    }
                  }}
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Button */}
      <button
        type="button"
        onClick={() => {
          const el = document.getElementById('about');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 font-sans text-[11px] uppercase tracking-[0.28em] text-noir-muted transition hover:text-[#eab308]"
        aria-label="Scroll to about"
      >
        <span>Scroll</span>
        <ArrowDown className="w-3.5 h-3.5 text-[#eab308] animate-bounce" />
      </button>
    </section>
  );
}
