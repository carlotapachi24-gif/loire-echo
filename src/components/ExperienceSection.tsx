import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const experiences = [
  {
    role: 'SENIOR CREATIVE DEVELOPER',
    company: 'STUDIO NORTH',
    period: '2022 — PRESENT',
  },
  {
    role: 'LEAD DESIGNER',
    company: 'DIGITAL AGENCY X',
    period: '2020 — 2022',
  },
  {
    role: 'FRONTEND DEVELOPER',
    company: 'TECH STARTUP',
    period: '2018 — 2020',
  },
  {
    role: 'JUNIOR DESIGNER',
    company: 'CREATIVE STUDIO',
    period: '2016 — 2018',
  },
];

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  return (
    <section id="experience" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <motion.div 
        className="absolute -left-40 top-1/3 text-[25rem] font-display text-accent/5 leading-none pointer-events-none select-none"
        style={{ rotate }}
      >
        EXP
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
            ★ CAREER PATH ★
          </motion.span>
          <div className="overflow-hidden">
            <motion.h2 
              className="heading-section font-display text-foreground"
              initial={{ y: 150, skewY: 10 }}
              animate={isHeaderInView ? { y: 0, skewY: 0 } : {}}
              transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
            >
              EXPERIENCE
            </motion.h2>
          </div>
        </motion.div>

        {/* Experience list */}
        <div className="border-t-4 border-primary">
          {experiences.map((exp, index) => (
            <ExperienceRow key={index} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ExperienceRowProps {
  experience: { role: string; company: string; period: string };
  index: number;
}

const ExperienceRow = ({ experience, index }: ExperienceRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rowRef, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={rowRef}
      className="border-b-2 border-foreground/20 py-8 md:py-10 group cursor-pointer overflow-hidden relative"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      whileHover={{ backgroundColor: "hsl(var(--accent) / 0.1)" }}
    >
      {/* Animated line on hover */}
      <motion.div 
        className="absolute bottom-0 left-0 h-1 bg-primary"
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.5 }}
      />

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-baseline"
        initial={{ y: 60, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ 
          duration: 0.8, 
          delay: index * 0.12,
          ease: [0.25, 0.4, 0.25, 1]
        }}
      >
        <div className="md:col-span-1">
          <motion.span 
            className="text-3xl md:text-4xl font-display text-primary"
            animate={isInView ? { rotate: [0, 360] } : {}}
            transition={{ duration: 1, delay: index * 0.15 }}
          >
            0{index + 1}
          </motion.span>
        </div>
        <div className="md:col-span-5">
          <motion.h3 
            className="text-xl md:text-3xl font-display text-foreground uppercase"
            whileHover={{ x: 20, color: 'hsl(var(--primary))' }}
            transition={{ duration: 0.3 }}
          >
            {experience.role}
          </motion.h3>
        </div>
        <div className="md:col-span-4">
          <span className="text-base md:text-lg font-bold uppercase tracking-wider text-muted-foreground">
            {experience.company}
          </span>
        </div>
        <div className="md:col-span-2 md:text-right">
          <motion.span 
            className="text-sm font-bold uppercase tracking-widest text-primary inline-flex items-center gap-2"
            whileHover={{ scale: 1.1 }}
          >
            <motion.span
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            {experience.period}
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ExperienceSection;
