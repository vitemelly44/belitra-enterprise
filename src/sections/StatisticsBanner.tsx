import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import SlotNumber from './SlotNumber';

const stats = [
  { value: 15, suffix: '+', label: 'Years of Experience' },
  { value: 50, suffix: '+', label: 'Projects Completed' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
  { value: 24, suffix: '/7', label: 'Support & Supply' },
];

export default function StatisticsBanner() {
  const { ref, inView } = useInView(0.3);

  return (
    <section id="stats" className="py-20 md:py-28 bg-[#F5F5F0]">
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-medium tracking-widest uppercase text-[#0C4A6E]/70 mb-4 block">
            Our Track Record
          </span>
          <h2 className="font-['Space_Grotesk'] text-3xl md:text-4xl font-medium text-[#1A1A18]">
            Numbers That Speak
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * index }}
              className="text-center"
            >
              <div className="font-['Space_Grotesk'] text-5xl md:text-6xl lg:text-7xl font-medium text-[#0C4A6E] mb-2">
                <SlotNumber value={stat.value} inView={inView} />
                <span>{stat.suffix}</span>
              </div>
              <p className="text-sm text-[#1A1A18]/60">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
