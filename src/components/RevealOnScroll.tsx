import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  distance?: number;
  blur?: boolean;
  scale?: boolean;
  rotate?: boolean;
}

const RevealOnScroll = ({ 
  children, 
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 60,
  blur = false,
  scale = false,
  rotate = false,
}: RevealOnScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const directionOffset = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        ...directionOffset[direction],
        filter: blur ? 'blur(20px)' : 'blur(0px)',
        scale: scale ? 0.8 : 1,
        rotate: rotate ? -5 : 0,
      }}
      animate={isInView ? {
        opacity: 1,
        x: 0,
        y: 0,
        filter: 'blur(0px)',
        scale: 1,
        rotate: 0,
      } : {}}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export default RevealOnScroll;
