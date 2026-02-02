import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const awards = [
  { name: 'Awwwards Site of the Day', category: 'Excellence', year: '2024' },
  { name: 'CSS Design Awards', category: 'Best UI Design', year: '2023' },
  { name: 'FWA of the Day', category: 'Innovation', year: '2023' },
  { name: 'Webby Awards', category: 'Best Visual Design', year: '2022' },
  { name: 'Communication Arts', category: 'Interactive Annual', year: '2022' },
  { name: 'D&AD Pencil', category: 'Digital Design', year: '2021' },
];

const AwardsSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="awards" className="section-padding">
      <div className="container-editorial">
        {/* Section header */}
        <motion.div 
          ref={headerRef}
          className="mb-12 md:mb-20"
        >
          <motion.span 
            className="text-meta mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Recognition
          </motion.span>
          <div className="overflow-hidden">
            <motion.h2 
              className="heading-section font-semibold text-foreground"
              initial={{ y: 100 }}
              animate={isHeaderInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            >
              Award Highlights
            </motion.h2>
          </div>
        </motion.div>

        {/* Awards list */}
        <div className="border-t border-divider">
          {awards.map((award, index) => (
            <AwardRow key={index} award={award} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface AwardRowProps {
  award: { name: string; category: string; year: string };
  index: number;
}

const AwardRow = ({ award, index }: AwardRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rowRef, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={rowRef}
      className="border-b border-divider py-5 md:py-6 group cursor-pointer overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
    >
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-4 items-baseline"
        initial={{ y: 40 }}
        animate={isInView ? { y: 0 } : {}}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.08,
          ease: [0.25, 0.4, 0.25, 1]
        }}
      >
        <div className="md:col-span-5">
          <motion.span 
            className="text-base md:text-lg text-foreground inline-block"
            whileHover={{ x: 10 }}
            transition={{ duration: 0.3 }}
          >
            {award.name}
          </motion.span>
        </div>
        <div className="md:col-span-4">
          <span className="text-sm text-muted-foreground">
            {award.category}
          </span>
        </div>
        <div className="md:col-span-3 md:text-right">
          <span className="text-sm text-muted-foreground">
            {award.year}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AwardsSection;
