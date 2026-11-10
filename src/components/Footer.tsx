import { Github, Linkedin, Mail } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';

interface FooterProps {
  onNavigate?: (sectionId: string) => void;
  onOpenResume?: () => void;
}

export default function Footer({ onNavigate, onOpenResume }: FooterProps) {
  // onNavigate and onOpenResume kept as optional props for backward compatibility
  void onNavigate;
  void onOpenResume;
  const { personal } = PORTFOLIO_CONFIG;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050810] border-t border-slate-900 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900/80">
          {/* Brand */}
          <div className="text-center md:text-left">
            <span className="font-name font-bold text-xl text-white tracking-wide">
              {personal.name}
            </span>
            <span className="text-slate-500 font-mono block mt-0.5">
              Full Stack Python Developer · Anna University CSE Graduate
            </span>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-[#d4af37] transition-colors"
              aria-label="GitHub"
              data-cursor="GITHUB"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-[#d4af37] transition-colors"
              aria-label="LinkedIn"
              data-cursor="LINKEDIN"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-[#d4af37] transition-colors"
              aria-label="Email"
              data-cursor="EMAIL"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 font-mono text-[11px]">
          <div>
            © {currentYear} {personal.name} · All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Built with precision & dedication</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
