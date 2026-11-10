import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 h-11 w-11 rounded-full bg-[#050505]/90 border border-white/15 text-[#eab308] hover:border-[#eab308]/60 hover:bg-[#eab308]/10 hover:text-white shadow-[0_4px_24px_rgba(0,0,0,0.8)] backdrop-blur-md flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 group focus:outline-none"
      aria-label="Back to Top"
    >
      <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
