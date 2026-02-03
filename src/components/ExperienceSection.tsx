import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const experiences = [
  { role: 'Senior Creative Developer', company: 'Fictional Studio', period: '2022 — Present' },
  { role: 'Lead Designer', company: 'Digital Dreams Agency', period: '2019 — 2022' },
  { role: 'Frontend Developer', company: 'TechVision Labs', period: '2017 — 2019' },
  { role: 'UI/UX Designer', company: 'StartUp Inc.', period: '2015 — 2017' },
  { role: 'Junior Developer', company: 'Code Factory', period: '2013 — 2015' },
];

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.5], [80, 0]);

  return (
    <section id="experience" ref={sectionRef} className="section-padding">
      <div className="container-editorial">
        {/* Section header */}
        <motion.div 
          ref={headerRef}
          className="mb-12 md:mb-20"
          style={{ y: headerY }}
        >
          <motion.span 
            className="text-meta mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Experience
          </motion.span>
          <motion.h2 
            className="heading-section font-semibold text-foreground overflow-hidden"
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
          >
            {"Work History".split('').map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ y: 100, opacity: 0 }}
                animate={isHeaderInView ? { y: 0, opacity: 1 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: i * 0.03,
                  ease: [0.25, 0.4, 0.25, 1]
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h2>
        </motion.div>

        {/* Experience table */}
        <div className="border-t border-divider">
          {experiences.map((exp, index) => (
            <ExperienceRow key={index} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ExperienceRowProps {
  exp: { role: string; company: string; period: string };
  index: number;
}

const ExperienceRow = ({ exp, index }: ExperienceRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rowRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={rowRef}
      className="border-b border-divider py-6 md:py-8 group cursor-pointer"
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.02)" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-baseline">
        <motion.div 
          className="md:col-span-5"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.2 }}
        >
          <span className="text-base md:text-lg text-foreground font-medium group-hover:text-muted-foreground transition-colors duration-300">
            {exp.role}
          </span>
        </motion.div>
        <motion.div 
          className="md:col-span-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <span className="text-sm md:text-base text-muted-foreground">
            {exp.company}
          </span>
        </motion.div>
        <motion.div 
          className="md:col-span-3 md:text-right"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.4 }}
        >
          <span className="text-sm text-muted-foreground">
            {exp.period}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ExperienceSection;
