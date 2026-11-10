import { useEffect } from 'react';
import { X, Download, Printer, Mail, Phone, MapPin } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const { personal, projects, education, certifications, internships } = PORTFOLIO_CONFIG;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[99900] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#050505] border border-white/15 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden my-auto max-h-[92vh] flex flex-col text-noir-cream"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-6 border-b border-white/10 bg-white/[0.02] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
            <h2 className="font-sans text-lg sm:text-xl font-bold text-white tracking-wide">
              Resume — {personal.name}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-white/[0.06] hover:bg-white/[0.12] text-noir-cream transition-colors"
              title="Print / Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-[#eab308]" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-noir-muted hover:text-white rounded-full bg-white/[0.05] hover:bg-white/[0.1] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Container */}
        <div className="p-6 sm:p-10 space-y-8 overflow-y-auto custom-scrollbar font-sans bg-[#050505] text-noir-cream">
          {/* Header */}
          <div className="border-b border-white/10 pb-6 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4">
            <div>
              <h1 className="text-3xl font-sans font-extrabold text-white tracking-tight">
                {personal.name}
              </h1>
              <p className="text-base text-[#eab308] font-semibold mt-1">
                {personal.role}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-noir-muted mt-2 font-mono">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#eab308]" />
                  {personal.location}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#eab308]" />
                  {personal.phone}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#eab308]" />
                  {personal.email}
                </span>
              </div>
            </div>

            <div className="text-right text-xs font-mono space-y-1">
              <div>
                <a href={personal.github} target="_blank" rel="noreferrer" className="text-[#eab308] hover:underline">
                  github.com/{personal.githubUsername}
                </a>
              </div>
              <div className="text-noir-muted">
                Anna University B.E. (CGPA: 8.49)
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h3 className="text-xs font-mono text-[#eab308] uppercase tracking-widest font-bold mb-2">
              Professional Summary
            </h3>
            <p className="text-sm text-noir-muted leading-relaxed">
              Dedicated Full Stack Python Developer with a Bachelor of Engineering in Computer Science (Anna University, 8.49 CGPA, First Class with Distinction). Comprehensive hands-on training at Pyspiders in advanced Python OOP, Django (MVT, ORM, CBVs), relational SQL, and modern frontend styling. Practical project experience in machine learning computer vision (CNN) and full-stack web platforms. Immediate joiner ready to contribute to engineering teams.
            </p>
          </div>

          {/* Technical Skills Summary */}
          <div>
            <h3 className="text-xs font-mono text-[#eab308] uppercase tracking-widest font-bold mb-3">
              Technical Core Competencies
            </h3>
            <div className="space-y-2 text-xs sm:text-sm font-mono">
              <div className="flex items-start">
                <span className="w-32 font-semibold text-white shrink-0">Languages:</span>
                <span className="text-noir-muted">Python 3 (OOP, Decorators), JavaScript (ES6+), SQL</span>
              </div>
              <div className="flex items-start">
                <span className="w-32 font-semibold text-white shrink-0">Backend:</span>
                <span className="text-noir-muted">Django Framework (MVT, ORM, CBVs), FastAPI, RESTful APIs</span>
              </div>
              <div className="flex items-start">
                <span className="w-32 font-semibold text-white shrink-0">Frontend:</span>
                <span className="text-noir-muted">HTML5, CSS3, Bootstrap 5, Tailwind CSS, React.js basics</span>
              </div>
              <div className="flex items-start">
                <span className="w-32 font-semibold text-white shrink-0">Databases:</span>
                <span className="text-noir-muted">MySQL, SQLite, Oracle SQL (Relational Schemas, Normalization)</span>
              </div>
              <div className="flex items-start">
                <span className="w-32 font-semibold text-white shrink-0">Tools & Env:</span>
                <span className="text-noir-muted">Git, GitHub, VS Code, Postman, Linux / Bash</span>
              </div>
            </div>
          </div>

          {/* Key Projects */}
          <div>
            <h3 className="text-xs font-mono text-[#eab308] uppercase tracking-widest font-bold mb-4">
              Featured Software Projects
            </h3>
            <div className="space-y-4">
              {projects.map((p) => (
                <div key={p.id} className="border-l-2 border-white/10 pl-4 py-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                    <span className="font-bold text-white">
                      {p.title}
                    </span>
                    <span className="text-xs font-mono text-[#eab308]">
                      {p.technologies.slice(0, 4).join(', ')}
                    </span>
                  </div>
                  <p className="text-xs text-noir-muted mt-1 leading-relaxed">
                    {p.description}
                  </p>
                  <div className="text-[11px] font-mono text-emerald-400 mt-1">
                    Key Highlight: {p.accuracyOrHighlight || 'Complete CRUD architecture'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Internships & Training */}
          <div>
            <h3 className="text-xs font-mono text-[#eab308] uppercase tracking-widest font-bold mb-4">
              Internships & Professional Training
            </h3>
            <div className="space-y-4">
              {internships.map((intern, idx) => (
                <div key={idx} className="border-l-2 border-white/10 pl-4 py-1">
                  <div className="flex justify-between items-baseline text-sm">
                    <span className="font-bold text-white">
                      {intern.title} — {intern.institution}
                    </span>
                    <span className="text-xs font-mono text-noir-muted">
                      {intern.period}
                    </span>
                  </div>
                  <p className="text-xs text-noir-muted mt-1">
                    {intern.description}
                  </p>
                </div>
              ))}

              {certifications.map((cert, idx) => (
                <div key={idx} className="border-l-2 border-[#eab308]/40 pl-4 py-1">
                  <div className="flex justify-between items-baseline text-sm">
                    <span className="font-bold text-white">
                      {cert.title} — {cert.institution}
                    </span>
                    <span className="text-xs font-mono text-[#eab308]">
                      {cert.period}
                    </span>
                  </div>
                  <p className="text-xs text-noir-muted mt-1">
                    {cert.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xs font-mono text-[#eab308] uppercase tracking-widest font-bold mb-2">
              Education
            </h3>
            {education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-baseline text-sm">
                <div>
                  <span className="font-bold text-white">{edu.title}</span>
                  <span className="text-noir-muted block text-xs">{edu.institution}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-noir-muted">{edu.period}</span>
                  <span className="text-xs font-mono text-[#eab308] block font-bold">{edu.gradeOrBadge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-white/[0.02] border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs font-mono text-noir-muted">
            Available for immediate full-time employment & joining
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="py-2.5 px-5 rounded-full text-xs font-bold bg-gradient-to-r from-[#eab308] to-[#ca8a04] text-noir-bg transition-colors flex items-center gap-1.5 hover:brightness-110"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download / Print Resume</span>
            </button>

            <button
              onClick={onClose}
              className="py-2.5 px-5 rounded-full text-xs font-semibold bg-white/[0.06] hover:bg-white/[0.12] text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
