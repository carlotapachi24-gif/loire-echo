import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface TextScrambleProps {
  text: string;
  className?: string;
  scrambleOnHover?: boolean;
  delay?: number;
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const TextScramble = ({ 
  text, 
  className = '', 
  scrambleOnHover = true,
  delay = 0
}: TextScrambleProps) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);

  const scramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);
    
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            if (char === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      
      if (iteration >= text.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }
      iteration += 1 / 2;
    }, 30);

    return () => clearInterval(interval);
  }, [text, isScrambling]);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(scramble, delay);
      return () => clearTimeout(timer);
    }
  }, [delay, scramble]);

  return (
    <motion.span
      className={`font-mono ${className}`}
      onMouseEnter={scrambleOnHover ? scramble : undefined}
      style={{ display: 'inline-block' }}
    >
      {displayText}
    </motion.span>
  );
};

export default TextScramble;
