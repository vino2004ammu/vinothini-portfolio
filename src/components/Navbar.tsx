import { useState, useEffect } from 'react';
import { Menu, X, FileText, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
  onOpenExportGuide?: () => void;
}

export default function Navbar({ activeSection, onNavigate, onOpenResume }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050505]/90 backdrop-blur-md border-b border-white/5 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="relative z-[71] mx-auto flex max-w-6xl items-center justify-between px-6">
        {/* Brand: Exclusive Alex Brush Calligraphy Wordmark */}
        <button
          type="button"
          onClick={() => handleLinkClick('home')}
          className="group shrink-0 text-left transition focus:outline-none flex items-center gap-1.5"
          aria-label="Vinothini I — Home"
        >
          <span className="font-alex-brush text-3xl sm:text-[2.25rem] text-white transition-colors group-hover:text-[#fef08a] leading-none tracking-wide">
            Vinothini <span className="text-[#eab308]">I</span>
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => handleLinkClick(link.id)}
                className={`relative px-3.5 py-1.5 font-sans text-sm font-medium tracking-wide transition-colors ${
                  isActive ? 'text-white' : 'text-[#b8b4ae] hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-[#eab308] via-[#facc15] to-[#ca8a04] shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={onOpenResume}
            className="flex items-center gap-2 rounded-full border border-[#eab308]/35 px-4 py-2 font-sans text-xs font-semibold tracking-wide text-[#f2efe8] transition hover:border-[#eab308]/80 hover:bg-[#eab308]/10 hover:text-white"
          >
            <FileText className="w-3.5 h-3.5 text-[#eab308]" />
            <span>Resume</span>
          </button>

          <button
            type="button"
            onClick={() => handleLinkClick('contact')}
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#eab308] to-[#ca8a04] px-4.5 py-2 font-sans text-xs font-bold text-[#050505] shadow-[0_0_18px_rgba(234,179,8,0.30)] transition hover:brightness-110 active:scale-98"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#f2efe8] hover:text-[#eab308] transition rounded-lg"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#eab308]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="relative z-[71] overflow-hidden border-t border-white/5 bg-[#050505]/98 px-6 py-6 backdrop-blur-xl md:hidden shadow-2xl animate-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleLinkClick(link.id)}
                  className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-left font-sans text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-white/[0.06] text-[#eab308]'
                      : 'text-[#b8b4ae] hover:bg-white/[0.03] hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#eab308] shadow-[0_0_8px_#eab308]" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#eab308]/35 py-3 font-sans text-xs font-semibold text-white"
            >
              <FileText className="w-4 h-4 text-[#eab308]" />
              <span>View Resume</span>
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('contact')}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#eab308] to-[#ca8a04] py-3 font-sans text-xs font-bold text-[#050505]"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
