import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import MagneticButton from './MagneticButton';

const socialLinks = [
  { label: 'Tw', href: '#' },
  { label: 'Li', href: '#' },
  { label: 'Dr', href: '#' },
  { label: 'Ig', href: '#' },
];

interface HeroSectionProps {
  portraitImage: string;
}

const HeroSection = ({ portraitImage }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const letterAnimation = {
    hidden: { y: 100, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: i * 0.05,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    }),
  };

  const name = "John";
  const lastName = "Lioré";

  return (
    <section 
      id="hero" 
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden"
    >
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* Left content */}
          <motion.div 
            className="lg:col-span-7 order-2 lg:order-1"
            style={{ y, opacity, scale }}
          >
            {/* Name with letter animation */}
            <h1 className="heading-hero font-semibold text-foreground mb-8 md:mb-12 overflow-hidden">
              <span className="block overflow-hidden">
                {name.split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterAnimation}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
              <span className="block overflow-hidden">
                {lastName.split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    custom={i + name.length}
                    variants={letterAnimation}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Meta info */}
            <motion.div 
              className="flex flex-col md:flex-row md:items-end justify-between gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <p className="text-sm md:text-base text-muted-foreground max-w-xs leading-relaxed">
                Based in Amsterdam.<br />
                Available for freelance work.
              </p>

              {/* Social links */}
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  >
                    <MagneticButton
                      href={link.href}
                      className="w-10 h-10 flex items-center justify-center text-xs font-medium text-muted-foreground border border-divider rounded-full transition-all duration-300 hover:text-foreground hover:border-foreground"
                      strength={0.4}
                    >
                      {link.label}
                    </MagneticButton>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right content - Portrait */}
          <motion.div 
            className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end"
            style={{ y: imageY }}
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="relative w-[280px] md:w-[320px] lg:w-[380px] aspect-[3/4]">
              {/* Main image */}
              <motion.div 
                className="absolute inset-0 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={portraitImage}
                  alt="John Lioré portrait"
                  className="w-full h-full object-cover grayscale"
                />
              </motion.div>
              
              {/* Glitch slice overlay 1 */}
              <motion.div 
                className="absolute left-0 right-0 h-[15%] top-[30%] overflow-hidden"
                animate={{ x: [0, 10, 0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              >
                <img
                  src={portraitImage}
                  alt=""
                  className="w-full h-full object-cover grayscale"
                  style={{ 
                    objectPosition: 'center 30%',
                    marginTop: '-30%',
                    height: '666%'
                  }}
                />
              </motion.div>
              
              {/* Glitch slice overlay 2 */}
              <motion.div 
                className="absolute left-0 right-0 h-[12%] top-[52%] overflow-hidden"
                animate={{ x: [0, -8, 0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.5 }}
              >
                <img
                  src={portraitImage}
                  alt=""
                  className="w-full h-full object-cover grayscale"
                  style={{ 
                    objectPosition: 'center 52%',
                    marginTop: '-433%',
                    height: '833%'
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
