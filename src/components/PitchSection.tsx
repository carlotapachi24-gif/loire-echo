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

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const text = "Design-driven creative developer, working with brands and agencies worldwide to create memorable digital experiences that stand out.";
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    },
  };

  return (
    <section id="pitch" ref={sectionRef} className="section-padding overflow-hidden">
      <div className="container-editorial">
        <motion.div 
          className="max-w-4xl"
          style={{ y }}
        >
          <motion.h2 
            ref={textRef}
            className="text-2xl md:text-4xl lg:text-5xl font-medium text-foreground leading-[1.2] md:leading-[1.15]"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>
          
          <motion.a 
            href="#contact" 
            className="inline-block mt-10 md:mt-16 text-sm text-muted-foreground link-underline"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            whileHover={{ x: 10 }}
          >
            Learn more about me →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default PitchSection;
