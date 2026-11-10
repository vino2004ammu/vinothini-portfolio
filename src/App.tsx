import { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import BackgroundGrid from './components/BackgroundGrid';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import BackToTop from './components/BackToTop';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // Scrollspy to update active section in navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'education', 'contact'];
      const scrollY = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#f2efe8] relative selection:bg-[#eab308]/30 selection:text-[#fef08a]">
      {/* Subtle Technical Architectural Square Grid */}
      <BackgroundGrid />

      {/* Desktop Custom Cursor with Follower Ring */}
      <CustomCursor />

      {/* Top Fixed Navbar with Script Brand Logo */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenResume={() => setIsResumeModalOpen(true)}
      />

      {/* Main Content Sections matching Reference Architecture */}
      <main className="relative">
        <Hero
          onNavigateToProjects={() => scrollToSection('projects')}
          onNavigateToContact={() => scrollToSection('contact')}
          onOpenResume={() => setIsResumeModalOpen(true)}
        />

        <About />

        <Skills />

        <Experience />

        <Projects />

        <Education />

        <Contact onOpenResume={() => setIsResumeModalOpen(true)} />
      </main>

      {/* Floating Back to Top Button */}
      <BackToTop />

      {/* Interactive Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
}
