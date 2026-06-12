import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F5F5F0]/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button
            onClick={() => scrollToSection('hero')}
            className="font-['Space_Grotesk'] font-bold text-lg md:text-xl tracking-tight text-[#1A1A18]"
          >
            Belitra
          </button>

          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Home', id: 'hero' },
              { label: 'About', id: 'about' },
              { label: 'Services', id: 'services' },
              { label: 'Projects', id: 'stats' },
              { label: 'Contact', id: 'cta' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium text-[#1A1A18]/70 hover:text-[#0C4A6E] transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollToSection('cta')}
            className="hidden md:inline-flex items-center px-5 py-2.5 bg-[#0C4A6E] text-[#F5F5F0] text-sm font-medium rounded-md hover:scale-[1.02] hover:shadow-lg transition-all duration-200"
          >
            Get a Quote
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
