import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const awards = [
  { name: 'AWWWARDS SITE OF THE DAY', category: 'EXCELLENCE', year: '2024' },
  { name: 'CSS DESIGN AWARDS', category: 'BEST UI DESIGN', year: '2023' },
  { name: 'FWA OF THE DAY', category: 'INNOVATION', year: '2023' },
  { name: 'WEBBY AWARDS', category: 'BEST VISUAL DESIGN', year: '2022' },
  { name: 'COMMUNICATION ARTS', category: 'INTERACTIVE ANNUAL', year: '2022' },
  { name: 'D&AD PENCIL', category: 'DIGITAL DESIGN', year: '2021' },
];

const AwardsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const counterRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section id="awards" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <motion.div 
        className="absolute top-1/2 right-0 -translate-y-1/2 text-[30rem] font-display text-primary/5 leading-none pointer-events-none select-none"
        style={{ rotate: counterRotate }}
      >
        ★
      </motion.div>

      <div className="container-editorial relative z-10">
        {/* Section header */}
        <motion.div 
          ref={headerRef}
          className="mb-16 md:mb-24"
        >
          <motion.span 
            className="text-meta text-primary mb-4 block"
            initial={{ opacity: 0, x: -50 }}
            animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            ★ RECOGNITION ★
          </motion.span>
          <div className="overflow-hidden">
            <motion.h2 
              className="heading-section font-display text-foreground glow-primary"
              initial={{ y: 150, skewY: 10 }}
              animate={isHeaderInView ? { y: 0, skewY: 0 } : {}}
              transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
            >
              AWARD HIGHLIGHTS
            </motion.h2>
          </div>
        </motion.div>

        {/* Awards list */}
        <div className="border-t-4 border-primary">
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
      className="border-b-2 border-foreground/20 py-6 md:py-8 group cursor-pointer overflow-hidden relative"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      whileHover={{ backgroundColor: "hsl(var(--primary) / 0.1)" }}
    >
      {/* Hover background sweep */}
      <motion.div 
        className="absolute inset-0 bg-primary"
        initial={{ x: '-100%' }}
        whileHover={{ x: 0 }}
        transition={{ duration: 0.4 }}
      />

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-baseline relative z-10"
        initial={{ x: -100, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ 
          duration: 0.8, 
          delay: index * 0.1,
          ease: [0.25, 0.4, 0.25, 1]
        }}
      >
        <div className="md:col-span-1">
          <motion.span 
            className="text-2xl md:text-3xl font-display text-primary group-hover:text-primary-foreground transition-colors"
            whileHover={{ scale: 1.2 }}
          >
            0{index + 1}
          </motion.span>
        </div>
        <div className="md:col-span-5">
          <motion.span 
            className="text-lg md:text-2xl font-display text-foreground uppercase inline-block group-hover:text-primary-foreground transition-colors"
            whileHover={{ x: 20 }}
            transition={{ duration: 0.3 }}
          >
            {award.name}
          </motion.span>
        </div>
        <div className="md:col-span-4">
          <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground group-hover:text-primary-foreground/80 transition-colors">
            {award.category}
          </span>
        </div>
        <div className="md:col-span-2 md:text-right">
          <span className="text-sm font-bold uppercase tracking-widest text-primary group-hover:text-primary-foreground transition-colors">
            {award.year}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AwardsSection;
