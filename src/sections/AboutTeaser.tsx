import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

export default function AboutTeaser() {
  const { ref, inView } = useInView(0.2);

  return (
    <section id="about" className="py-24 md:py-32 lg:py-40 bg-[#F5F5F0]">
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src="/about-team.jpg"
                alt="Belitra Enterprises construction team"
                className="w-full h-auto object-cover aspect-[3/2]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C4A6E]/20 to-transparent" />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <span className="text-xs font-medium tracking-widest uppercase text-[#0C4A6E] mb-4 block">
              About Us
            </span>
            <h2 className="font-['Space_Grotesk'] text-3xl md:text-4xl lg:text-5xl font-medium text-[#1A1A18] mb-6 leading-tight">
              Who We Are
            </h2>
            <p className="text-base md:text-lg text-[#1A1A18]/70 leading-relaxed mb-6">
              Belitra Enterprises Limited is a Kenyan company delivering quality
              construction services. We focus on professionalism, innovation,
              reliability, and customer satisfaction.
            </p>
            <p className="text-base text-[#1A1A18]/60 leading-relaxed mb-8">
              Based in Nairobi and operating across Kenya, we specialize in
              building construction, civil works, renovations, and construction
              material supply. Our team brings together experienced professionals
              committed to excellence on every project.
            </p>
            <button
              onClick={() => {
                const el = document.getElementById('services');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center text-sm font-medium text-[#0C4A6E] hover:underline underline-offset-4"
            >
              Learn More
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
