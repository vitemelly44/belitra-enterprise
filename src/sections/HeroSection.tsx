import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTextScramble } from '../hooks/useTextScramble';
import BlueprintEngine from './BlueprintEngine';

export default function HeroSection() {
  const [isActive, setIsActive] = useState(false);
  const displayTitle = useTextScramble('Quality Construction & Supply', isActive, 1200);

  useEffect(() => {
    const timer = setTimeout(() => setIsActive(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-[#F5F5F0] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-screen py-24">
          {/* Left: Text Content */}
          <div className="relative z-10 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium tracking-widest uppercase text-[#0C4A6E] bg-[#0C4A6E]/10 rounded-full">
                Building Kenya&apos;s Future
              </span>
            </motion.div>

            <h1 className="font-['Space_Grotesk'] text-4xl md:text-5xl lg:text-6xl font-medium text-[#1A1A18] leading-tight mb-6">
              {displayTitle}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base md:text-lg text-[#1A1A18]/70 max-w-lg mb-8 leading-relaxed"
            >
              Delivering reliable construction solutions and materials across
              Kenya with integrity and excellence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => scrollToSection('stats')}
                className="inline-flex items-center px-6 py-3 bg-[#0C4A6E] text-[#F5F5F0] text-sm font-medium rounded-md hover:scale-[1.02] hover:shadow-lg transition-all duration-200"
              >
                Our Projects
              </button>
              <button
                onClick={() => scrollToSection('cta')}
                className="inline-flex items-center px-6 py-3 border-2 border-[#1A1A18]/20 text-[#1A1A18] text-sm font-medium rounded-md hover:border-[#0C4A6E] hover:text-[#0C4A6E] transition-all duration-200"
              >
                Contact Us
              </button>
            </motion.div>
          </div>

          {/* Right: Blueprint Engine */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative order-1 lg:order-2 w-full aspect-square max-w-[500px] mx-auto lg:max-w-none"
          >
            <BlueprintEngine />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
