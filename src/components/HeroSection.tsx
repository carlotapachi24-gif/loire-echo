import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import MagneticButton from './MagneticButton';

const socialLinks = [
  { label: 'TW', href: '#' },
  { label: 'LI', href: '#' },
  { label: 'DR', href: '#' },
  { label: 'IG', href: '#' },
];

interface HeroSectionProps {
  portraitImage: string;
}

const HeroSection = ({ portraitImage }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX - innerWidth / 2) / 30);
      mouseY.set((clientY - innerHeight / 2) / 30);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const letterAnimation = {
    hidden: { y: 200, opacity: 0, rotateX: -90 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 1,
        delay: i * 0.08,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    }),
  };

  const name = "JOHN";
  const lastName = "LIORÉ";

  return (
    <section 
      id="hero" 
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden relative"
    >
      {/* Background animated shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 -left-20 w-96 h-96 rounded-full opacity-20"
          style={{ 
            background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
            x: springX,
            y: springY,
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full opacity-15"
          style={{ 
            background: 'radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)',
            x: useTransform(springX, v => -v),
            y: useTransform(springY, v => -v),
          }}
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container-editorial relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* Left content */}
          <motion.div 
            className="lg:col-span-7 order-2 lg:order-1"
            style={{ y, opacity, scale }}
          >
            {/* Name with letter animation */}
            <h1 className="heading-hero font-display text-foreground mb-8 md:mb-12 overflow-hidden" style={{ perspective: 1000 }}>
              <span className="block overflow-hidden">
                {name.split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterAnimation}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    className="inline-block"
                    style={{ transformStyle: 'preserve-3d' }}
                    whileHover={{ 
                      scale: 1.2, 
                      color: 'hsl(var(--primary))',
                      textShadow: '0 0 60px hsl(var(--primary))',
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
              <span className="block overflow-hidden gradient-text">
                {lastName.split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    custom={i + name.length}
                    variants={letterAnimation}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    className="inline-block"
                    style={{ transformStyle: 'preserve-3d' }}
                    whileHover={{ 
                      scale: 1.2,
                      rotate: [0, -10, 10, 0],
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Meta info */}
            <motion.div 
              className="flex flex-col md:flex-row md:items-end justify-between gap-6"
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <div>
                <motion.p 
                  className="text-lg md:text-xl font-bold uppercase tracking-widest text-primary mb-2"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  AMSTERDAM
                </motion.p>
                <p className="text-sm md:text-base text-muted-foreground uppercase tracking-wider">
                  Available for freelance
                </p>
              </div>

              {/* Social links */}
              <div className="flex gap-3">
                {socialLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={isVisible ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                    transition={{ 
                      duration: 0.8, 
                      delay: 1 + index * 0.15,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <MagneticButton
                      href={link.href}
                      className="w-12 h-12 flex items-center justify-center text-xs font-black text-foreground border-2 border-primary bg-background transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-110"
                      strength={0.5}
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
            style={{ y: imageY, rotate }}
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={isVisible ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="relative w-[300px] md:w-[360px] lg:w-[420px] aspect-[3/4]">
              {/* Decorative frame */}
              <motion.div 
                className="absolute -inset-4 border-4 border-primary"
                animate={{ 
                  rotate: [0, 2, -2, 0],
                  scale: [1, 1.02, 1],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <motion.div 
                className="absolute -inset-8 border-2 border-accent opacity-50"
                animate={{ 
                  rotate: [0, -3, 3, 0],
                  scale: [1.02, 1, 1.02],
                }}
                transition={{ duration: 7, repeat: Infinity }}
              />
              
              {/* Main image */}
              <motion.div 
                className="absolute inset-0 overflow-hidden box-glow"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              >
                <motion.img
                  src={portraitImage}
                  alt="John Lioré portrait"
                  className="w-full h-full object-cover"
                  style={{ 
                    filter: 'grayscale(100%) contrast(1.2)',
                    x: springX,
                    y: springY,
                  }}
                  whileHover={{ filter: 'grayscale(0%) contrast(1.1)' }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Color overlay on hover */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/30 mix-blend-overlay"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              </motion.div>
              
              {/* Glitch slice overlay 1 */}
              <motion.div 
                className="absolute left-0 right-0 h-[18%] top-[28%] overflow-hidden mix-blend-difference"
                animate={{ 
                  x: [0, 20, -15, 25, 0],
                  opacity: [1, 0.8, 1, 0.9, 1],
                }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              >
                <img
                  src={portraitImage}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{ 
                    filter: 'grayscale(100%) contrast(1.2) invert(1)',
                    objectPosition: 'center 28%',
                    marginTop: '-28%',
                    height: '555%'
                  }}
                />
              </motion.div>
              
              {/* Glitch slice overlay 2 */}
              <motion.div 
                className="absolute left-0 right-0 h-[15%] top-[55%] overflow-hidden"
                animate={{ 
                  x: [0, -25, 20, -15, 0],
                  skewX: [0, 5, -5, 0],
                }}
                transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 0.3 }}
              >
                <img
                  src={portraitImage}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{ 
                    filter: 'grayscale(100%) contrast(1.2) hue-rotate(180deg)',
                    objectPosition: 'center 55%',
                    marginTop: '-366%',
                    height: '666%'
                  }}
                />
              </motion.div>

              {/* Floating label */}
              <motion.div
                className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground px-4 py-2 font-black uppercase text-sm tracking-wider"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 3, 0],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                CREATIVE DEV
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <motion.div 
          className="w-6 h-10 border-2 border-primary rounded-full flex justify-center pt-2"
          whileHover={{ scale: 1.2, borderColor: 'hsl(var(--accent))' }}
        >
          <motion.div 
            className="w-1.5 h-1.5 bg-primary rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
