import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-4 bg-background/80 backdrop-blur-md' : 'py-6 md:py-8'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="container-editorial flex items-center justify-between">
        <motion.a 
          href="#hero" 
          className="text-sm md:text-base font-black uppercase tracking-widest text-foreground"
          whileHover={{ scale: 1.05, color: 'hsl(var(--primary))' }}
        >
          LIORÉ
          <motion.span 
            className="inline-block w-2 h-2 bg-primary rounded-full ml-1"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.a>
        
        <motion.button
          onClick={onMenuClick}
          className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-foreground group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="hidden md:inline group-hover:text-primary transition-colors">MENU</span>
          <motion.div 
            className="w-10 h-10 border-2 border-foreground flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all"
            whileHover={{ rotate: 90 }}
          >
            <Menu className="w-5 h-5 group-hover:text-primary-foreground transition-colors" />
          </motion.div>
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;
