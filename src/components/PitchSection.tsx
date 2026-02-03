import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const PitchSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(textRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);

  const text = "DESIGN-DRIVEN CREATIVE DEVELOPER, WORKING WITH BRANDS AND AGENCIES WORLDWIDE TO CREATE MEMORABLE DIGITAL EXPERIENCES THAT STAND OUT.";
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 80,
      rotateX: -90,
      filter: "blur(20px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    },
  };

  return (
    <section id="pitch" ref={sectionRef} className="section-padding overflow-hidden relative">
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-1/4 left-0 text-[20rem] font-display text-primary/5 leading-none pointer-events-none select-none"
        style={{ y, rotate }}
      >
        ★
      </motion.div>
      <motion.div 
        className="absolute bottom-1/4 right-0 text-[20rem] font-display text-accent/5 leading-none pointer-events-none select-none"
        style={{ y: useTransform(y, v => -v), rotate: useTransform(rotate, v => -v) }}
      >
        ★
      </motion.div>

      <div className="container-editorial relative z-10">
        <motion.div 
          className="max-w-5xl"
          style={{ y }}
        >
          <motion.h2 
            ref={textRef}
            className="text-3xl md:text-5xl lg:text-6xl font-display text-foreground leading-[1.1] md:leading-[1.05] uppercase"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ perspective: 1000 }}
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className={`inline-block mr-[0.3em] ${
                  word === 'CREATIVE' || word === 'MEMORABLE' || word === 'STAND' 
                    ? 'text-primary glow-primary' 
                    : ''
                }`}
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={{ 
                  scale: 1.1, 
                  color: 'hsl(var(--primary))',
                  textShadow: '0 0 40px hsl(var(--primary))',
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>
          
          <motion.a 
            href="#contact" 
            className="inline-flex items-center gap-4 mt-12 md:mt-20 text-lg font-bold uppercase tracking-widest text-primary group"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.5 }}
            whileHover={{ x: 20 }}
          >
            <motion.span
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
            LEARN MORE ABOUT ME
            <motion.span
              className="w-3 h-3 bg-primary rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default PitchSection;
