import { motion } from 'framer-motion';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  animation?: 'wave' | 'fade' | 'slide' | 'rotate';
}

const SplitText = ({ 
  text, 
  className = '', 
  delay = 0,
  staggerDelay = 0.03,
  animation = 'wave'
}: SplitTextProps) => {
  const letters = text.split('');

  const animations = {
    wave: {
      hidden: { y: 50, opacity: 0, rotateX: -90 },
      visible: (i: number) => ({
        y: 0,
        opacity: 1,
        rotateX: 0,
        transition: {
          duration: 0.5,
          delay: delay + i * staggerDelay,
          ease: [0.25, 0.4, 0.25, 1] as const,
        },
      }),
    },
    fade: {
      hidden: { opacity: 0, filter: 'blur(10px)' },
      visible: (i: number) => ({
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
          duration: 0.4,
          delay: delay + i * staggerDelay,
        },
      }),
    },
    slide: {
      hidden: { x: 50, opacity: 0 },
      visible: (i: number) => ({
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.4,
          delay: delay + i * staggerDelay,
          ease: [0.25, 0.4, 0.25, 1] as const,
        },
      }),
    },
    rotate: {
      hidden: { rotateY: 90, opacity: 0 },
      visible: (i: number) => ({
        rotateY: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          delay: delay + i * staggerDelay,
          ease: [0.25, 0.4, 0.25, 1] as const,
        },
      }),
    },
  };

  return (
    <span className={`inline-flex flex-wrap ${className}`} style={{ perspective: 1000 }}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={animations[animation]}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="inline-block"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  );
};

export default SplitText;
