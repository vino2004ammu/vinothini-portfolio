import { useState } from 'react';
import { FileText, Download, ArrowRight, CheckCircle2, Eye, Check } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';

interface ResumeSectionProps {
  onOpenResume: () => void;
  onNavigateToContact: () => void;
}

export default function ResumeSection({ onOpenResume, onNavigateToContact }: ResumeSectionProps) {
  const { personal, projects, internships, certifications } = PORTFOLIO_CONFIG;
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadResume = () => {
    const resumeText = `=======================================================
${personal.name.toUpperCase()}
${personal.role}
=======================================================
Email: ${personal.email}
Phone: ${personal.phone}
Location: ${personal.location}
GitHub: ${personal.github}
LinkedIn: ${personal.linkedin}

-------------------------------------------------------
CAREER OBJECTIVE & PROFILE
-------------------------------------------------------
An enthusiastic and dedicated Computer Science and Engineering graduate with solid hands-on training in Python Full-Stack Development. Grounded in object-oriented programming, relational databases, clean coding principles, and web frameworks. Eager to contribute with diligence, learn from experienced mentors, and add genuine value to engineering teams.

-------------------------------------------------------
CORE SKILLS & TECHNOLOGIES
-------------------------------------------------------
- Languages: Python, JavaScript, SQL, HTML5, CSS3
- Web Frameworks: Django, FastAPI, REST APIs
- Frontend: React, Bootstrap, Tailwind CSS, Responsive Design
- Databases: PostgreSQL, MySQL, SQLite
- Developer Tools: Git, GitHub, VS Code, Postman, Linux Basics
- Core Competencies: OOP, Data Structures, Relational Database Modeling, Problem Solving

-------------------------------------------------------
FEATURED PROJECTS
-------------------------------------------------------
${projects.map((p) => `• ${p.title} (${p.category})
  Tech Stack: ${p.technologies.join(', ')}
  Description: ${p.description}
  Key Highlight: ${p.accuracyOrHighlight}
`).join('\n')}

-------------------------------------------------------
INTERNSHIPS & PRACTICAL EXPERIENCE
-------------------------------------------------------
${internships.map((i) => `• ${i.title} — ${i.institution} (${i.period})
  ${i.description}
`).join('\n')}

-------------------------------------------------------
EDUCATION & CERTIFICATIONS
-------------------------------------------------------
• B.E. in Computer Science and Engineering — Anna University (2021 - 2025)
• Higher Secondary Certificate (HSC) — 86.6% (2021)

Certifications & Professional Training:
${certifications.map((c) => `• ${c.title} — ${c.institution} (${c.period})`).join('\n')}

-------------------------------------------------------
AVAILABILITY
-------------------------------------------------------
Available for immediate joining in full-time entry-level / junior software engineering roles.
`;

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${personal.name.replace(/\s+/g, '_')}_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <section className="py-20 bg-[var(--background-color)] relative overflow-hidden transition-colors duration-400">
      {/* Background ambient gradient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(ellipse at center, var(--accent-color) 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="card-hover-glow p-8 sm:p-12 md:p-14 rounded-3xl relative overflow-hidden shadow-2xl bg-[var(--card-color)] border border-slate-800">
          {/* Subtle grid accent inside */}
          <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl text-left">
              <div
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-semibold"
                style={{ color: 'var(--accent-color)' }}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Curriculum Vitae & Summary</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Eager to Learn, Adapt, and <span className="text-gold-gradient">Contribute</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                As an aspiring software developer stepping into the technology landscape, I bring a sincere passion for continuous learning, solid fundamentals in Python full-stack technologies, and a deep commitment to writing clean, maintainable code.
              </p>

              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                I am eager to learn under experienced mentors, contribute with dedication to everyday development challenges, and grow alongside a supportive engineering team.
              </p>

              {/* Humble Trust Checks */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300 pt-2">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-color)]" />
                  <span>Grounded Fundamentals & Quick Learner</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-color)]" />
                  <span>Open to Mentorship & Constructive Feedback</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-color)]" />
                  <span>Available for Immediate Joining</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-3.5 w-full md:w-auto shrink-0">
              {/* View Resume Button */}
              <button
                onClick={onOpenResume}
                className="btn-shimmer py-3.5 px-6 rounded-xl text-sm font-bold text-[#060a12] shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
                style={{ backgroundColor: 'var(--accent-color)' }}
                data-cursor="RESUME"
              >
                <Eye className="w-4 h-4" />
                <span>View Resume</span>
              </button>

              {/* Download Resume Button */}
              <button
                onClick={handleDownloadResume}
                className="py-3.5 px-6 rounded-xl text-sm font-semibold text-slate-200 bg-[var(--background-alt)] border border-slate-700/80 hover:border-[var(--accent-color)] hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer hover:bg-slate-800/80 transform hover:-translate-y-0.5"
                data-cursor="DOWNLOAD"
              >
                {downloaded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Resume Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-[var(--accent-color)]" />
                    <span>Download Resume</span>
                  </>
                )}
              </button>

              {/* Secondary Contact link */}
              <button
                onClick={onNavigateToContact}
                className="py-2.5 px-5 text-xs font-medium text-slate-400 hover:text-[var(--accent-hover)] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                data-cursor="CONTACT"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
