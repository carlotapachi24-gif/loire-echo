import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  scale?: boolean;
}

const ParallaxImage = ({ 
  src, 
  alt, 
  className = '',
  speed = 0.5,
  scale = true
}: ParallaxImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const scaleValue = useTransform(scrollYProgress, [0, 0.5, 1], scale ? [1.2, 1, 1.2] : [1, 1, 1]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ y, scale: scaleValue }}
      />
    </div>
  );
};

export default ParallaxImage;
