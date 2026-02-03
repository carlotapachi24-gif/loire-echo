import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import TiltCard from './TiltCard';

interface Project {
  id: number;
  title: string;
  categories: string[];
  image: string;
}

interface WorkSectionProps {
  projects: Project[];
}

const WorkSection = ({ projects }: WorkSectionProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="work" className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 striped-bg pointer-events-none" />
      
      <div className="container-editorial relative z-10">
        {/* Section header */}
        <motion.div 
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-4"
        >
          <div>
            <motion.span 
              className="text-meta mb-4 block text-primary"
              initial={{ opacity: 0, x: -50 }}
              animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              ★ SELECTED PROJECTS ★
            </motion.span>
            <div className="overflow-hidden">
              <motion.h2 
                className="heading-section font-display text-foreground glow-primary"
                initial={{ y: 150, skewY: 10 }}
                animate={isHeaderInView ? { y: 0, skewY: 0 } : {}}
                transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
              >
                WORK
              </motion.h2>
            </div>
          </div>
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, scale: 0 }}
            animate={isHeaderInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
          >
            <span className="text-4xl md:text-6xl font-display text-primary">@21—25</span>
            <motion.div 
              className="w-3 h-3 bg-primary rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

        {/* Projects grid */}
        <div className="space-y-32 md:space-y-48">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-150px" });
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);
  const imageRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);
  const textX = useTransform(scrollYProgress, [0, 0.5, 1], [index % 2 === 0 ? -100 : 100, 0, index % 2 === 0 ? 100 : -100]);

  return (
    <motion.article
      ref={cardRef}
      className={`group cursor-pointer ${index % 2 === 1 ? 'md:flex md:flex-row-reverse' : ''}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1, delay: index * 0.2 }}
    >
      <div className={`md:w-full ${index % 2 === 1 ? 'md:ml-auto' : ''}`}>
        {/* Project number - large */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <span className="text-8xl md:text-[12rem] font-display text-primary/20 leading-none">
            0{index + 1}
          </span>
        </motion.div>

        {/* Image container with 3D tilt */}
        <TiltCard 
          className="relative aspect-[16/9] mb-8 md:mb-12"
          tiltAmount={12}
          glareEnabled={true}
        >
          <motion.div 
            className="absolute inset-0 overflow-hidden border-4 border-foreground/20"
            initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
            animate={isInView ? { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" } : {}}
            transition={{ 
              duration: 1.5, 
              delay: index * 0.15,
              ease: [0.25, 0.4, 0.25, 1]
            }}
            data-cursor="VIEW"
          >
            <motion.div
              className="absolute inset-0"
              style={{ y: imageY, scale: imageScale, rotate: imageRotate }}
            >
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1, filter: 'saturate(1.5) contrast(1.1)' }}
                transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              />
            </motion.div>
            
            {/* Overlay effects */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"
            />
            <motion.div 
              className="absolute inset-0 bg-primary/0 mix-blend-overlay"
              whileHover={{ backgroundColor: 'hsl(var(--primary) / 0.3)' }}
              transition={{ duration: 0.4 }}
            />

            {/* Hover label */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <motion.span 
                className="text-4xl md:text-6xl font-display text-foreground uppercase tracking-wider"
                initial={{ scale: 0.5, rotate: -10 }}
                whileHover={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                EXPLORE
              </motion.span>
            </motion.div>
          </motion.div>
        </TiltCard>

        {/* Project info */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4"
          style={{ x: textX }}
        >
          <motion.h3 
            className="text-3xl md:text-5xl lg:text-6xl font-display text-foreground uppercase inline-block relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
            whileHover={{ x: 20, color: 'hsl(var(--primary))' }}
          >
            <span className="relative">
              {project.title}
              <motion.span 
                className="absolute bottom-0 left-0 w-full h-1 bg-primary"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
                style={{ originX: 0 }}
              />
            </span>
          </motion.h3>
          <motion.div 
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            {project.categories.map((cat, i) => (
              <motion.span 
                key={cat}
                className="text-xs font-bold uppercase tracking-widest text-primary-foreground bg-primary px-3 py-1"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 + 0.6 + i * 0.1, type: "spring" }}
                whileHover={{ scale: 1.1, backgroundColor: 'hsl(var(--accent))' }}
              >
                {cat}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.article>
  );
};

export default WorkSection;
