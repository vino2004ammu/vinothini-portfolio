import { useEffect } from 'react';
import { X, Github, ExternalLink, CheckCircle, ShieldAlert, Sparkles, Layers } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[99900] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#050505] border border-white/15 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-6 sm:p-8 border-b border-white/10 bg-white/[0.02] flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3 text-xs font-mono text-[#eab308]">
              <span>PROJECT {project.number}</span>
              <span className="text-white/20">/</span>
              <span>{project.category}</span>
              {project.accuracyOrHighlight && (
                <>
                  <span className="text-white/20">/</span>
                  <span className="text-emerald-300 font-semibold">{project.accuracyOrHighlight}</span>
                </>
              )}
            </div>
            <h2 className="font-sans text-2xl sm:text-3xl font-bold text-white">
              {project.title}
            </h2>
            <p className="text-sm text-noir-muted font-medium">
              {project.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-noir-muted hover:text-white rounded-full bg-white/[0.05] hover:bg-white/[0.1] transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto custom-scrollbar font-sans text-noir-cream text-sm">
          {/* Action Links Bar */}
          <div className="flex flex-wrap items-center gap-3 pb-4 border-b border-white/10">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold bg-white/[0.04] border border-white/10 hover:border-[#eab308]/50 text-white hover:text-[#eab308] transition-all"
            >
              <Github className="w-4 h-4 text-[#eab308]" />
              <span>Source Repository</span>
            </a>

            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#eab308] to-[#ca8a04] text-noir-bg transition-all shadow-sm font-bold hover:brightness-110"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Repository / Demo</span>
              </a>
            )}

            <div className="ml-auto text-xs font-mono text-noir-muted flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Verified Fresh Graduate Project</span>
            </div>
          </div>

          {/* Video Walkthrough Player (if available) */}
          {project.videoUrl && (
            <div className="space-y-3 rounded-2xl border border-[#eab308]/30 bg-gradient-to-b from-[#eab308]/[0.06] to-transparent p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white font-semibold font-sans text-base">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#eab308] animate-pulse" />
                  <span className="text-[#fef08a]">Live Platform Video Walkthrough</span>
                </div>
                <span className="font-mono text-[11px] text-[#eab308] uppercase tracking-wider rounded-full border border-[#eab308]/30 bg-[#eab308]/10 px-2.5 py-0.5">
                  Screen Demo
                </span>
              </div>
              <div className="overflow-hidden rounded-xl border border-white/15 bg-black shadow-2xl">
                <video
                  controls
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/assets/aistudio/demo_poster.webp"
                  className="w-full h-auto aspect-video object-cover"
                >
                  <source src={project.videoUrl} type="video/mp4" />
                  <source src="/assets/aistudio/demo_optimized.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="text-xs text-noir-muted font-sans flex items-center gap-1.5">
                <span className="text-[#eab308]">ℹ</span> Demonstrating the interactive marketplace, guided appointment booking workflow, simulated payment processing, and multi-portal dashboards.
              </p>
            </div>
          )}

          {/* Overview & Problem / Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-white font-semibold font-sans text-base">
                <ShieldAlert className="w-4 h-4 text-[#eab308]" />
                <span>The Problem</span>
              </div>
              <p className="text-noir-muted text-xs sm:text-sm leading-relaxed">
                {project.caseStudy.problem}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-white font-semibold font-sans text-base">
                <Sparkles className="w-4 h-4 text-[#eab308]" />
                <span>The Engineering Solution</span>
              </div>
              <p className="text-noir-muted text-xs sm:text-sm leading-relaxed">
                {project.caseStudy.solution}
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-3">
            <h3 className="font-sans text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#eab308]" />
              <span>Key Features & Functional Highlights</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.caseStudy.features.map((feature, fIdx) => (
                <div
                  key={fIdx}
                  className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-xs sm:text-sm text-noir-cream"
                >
                  <CheckCircle className="w-4 h-4 text-[#eab308] shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture & Pipeline */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-white font-semibold font-sans text-base">
              <Layers className="w-4 h-4 text-[#eab308]" />
              <span>Architecture & Data Flow</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              {project.caseStudy.architecture.map((step, sIdx) => (
                <div key={sIdx} className="flex items-center gap-2">
                  <span className="py-1 px-2.5 rounded-md bg-white/[0.05] border border-white/10 text-noir-cream">
                    {step}
                  </span>
                  {sIdx < project.caseStudy.architecture.length - 1 && (
                    <span className="text-[#eab308]">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Role, Challenges & Outcome */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <span className="text-[11px] font-mono text-[#eab308] uppercase tracking-wider block mb-1">
                My Role
              </span>
              <p className="text-noir-muted leading-relaxed">{project.caseStudy.role}</p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <span className="text-[11px] font-mono text-[#eab308] uppercase tracking-wider block mb-1">
                Key Challenge
              </span>
              <p className="text-noir-muted leading-relaxed">{project.caseStudy.challenges}</p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <span className="text-[11px] font-mono text-[#eab308] uppercase tracking-wider block mb-1">
                Verifiable Outcome
              </span>
              <p className="text-noir-muted leading-relaxed">{project.caseStudy.outcome}</p>
            </div>
          </div>

          {/* Technologies Used */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs font-mono text-noir-muted">
            <span className="text-[#eab308] font-semibold">Technologies:</span>
            {project.technologies.map((t, idx) => (
              <span key={idx} className="flex items-center gap-2">
                <span className="text-noir-cream">{t}</span>
                {idx < project.technologies.length - 1 && (
                  <span className="text-white/20" aria-hidden="true">·</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 sm:p-6 bg-white/[0.02] border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-5 rounded-full text-xs font-semibold bg-white/[0.06] hover:bg-white/[0.12] text-white transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
