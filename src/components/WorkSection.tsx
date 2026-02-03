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
    <section id="work" className="section-padding">
      <div className="container-editorial">
        {/* Section header */}
        <motion.div 
          ref={headerRef}
          className="flex items-baseline justify-between mb-12 md:mb-20"
        >
          <div>
            <motion.span 
              className="text-meta mb-4 block"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Selected Projects
            </motion.span>
            <div className="overflow-hidden">
              <motion.h2 
                className="heading-section font-semibold text-foreground"
                initial={{ y: 100 }}
                animate={isHeaderInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              >
                Work
              </motion.h2>
            </div>
          </div>
          <motion.span 
            className="text-sm text-muted-foreground hidden md:block"
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            @21—25
          </motion.span>
        </motion.div>

        {/* Projects grid */}
        <div className="space-y-24 md:space-y-32">
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
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <motion.article
      ref={cardRef}
      className="group cursor-pointer"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      {/* Image container with 3D tilt */}
      <TiltCard 
        className="relative aspect-[16/10] mb-6 md:mb-8 bg-secondary"
        tiltAmount={8}
        glareEnabled={true}
      >
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={isInView ? { clipPath: "inset(0% 0 0 0)" } : {}}
          transition={{ 
            duration: 1.2, 
            delay: index * 0.1,
            ease: [0.25, 0.4, 0.25, 1]
          }}
          data-cursor="View"
        >
          <motion.div
            className="absolute inset-0"
            style={{ y: imageY, scale: imageScale }}
          >
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            />
          </motion.div>
          
          {/* Overlay on hover */}
          <motion.div 
            className="absolute inset-0 bg-background/20"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />

          {/* Project number */}
          <motion.div
            className="absolute bottom-4 right-4 md:bottom-6 md:right-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.6 }}
          >
            <span className="text-xs text-foreground/60 font-medium">
              0{index + 1}
            </span>
          </motion.div>
        </motion.div>
      </TiltCard>

      {/* Project info */}
      <motion.div 
        className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
      >
        <motion.h3 
          className="text-xl md:text-2xl font-medium text-foreground inline-block relative overflow-hidden"
          whileHover={{ x: 10 }}
          transition={{ duration: 0.3 }}
        >
          <span className="relative">
            {project.title}
            <motion.span 
              className="absolute bottom-0 left-0 w-full h-px bg-foreground"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              style={{ originX: 0 }}
            />
          </span>
        </motion.h3>
        <motion.p 
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.6 }}
        >
          {project.categories.join(', ')}
        </motion.p>
      </motion.div>
    </motion.article>
  );
};

export default WorkSection;
