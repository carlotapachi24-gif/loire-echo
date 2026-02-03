import { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { label: 'HOME', href: '#hero' },
  { label: 'ABOUT', href: '#pitch' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'WORK', href: '#work' },
  { label: 'AWARDS', href: '#awards' },
  { label: 'CONTACT', href: '#contact' },
];

const socialLinks = [
  { label: 'TWITTER', href: '#' },
  { label: 'LINKEDIN', href: '#' },
  { label: 'DRIBBBLE', href: '#' },
  { label: 'INSTAGRAM', href: '#' },
];

const MenuOverlay = ({ isOpen, onClose }: MenuOverlayProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    onClose();
  };

  const menuVariants = {
    closed: {
      clipPath: "circle(0% at calc(100% - 40px) 40px)",
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1] as const,
      }
    },
    open: {
      clipPath: "circle(150% at calc(100% - 40px) 40px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1] as const,
      }
    }
  };

  const linkVariants = {
    closed: { y: 100, opacity: 0, rotateX: -60 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1] as const,
      }
    })
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-[100] bg-background"
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
        >
          {/* Background decoration */}
          <motion.div 
            className="absolute inset-0 striped-bg opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.3 }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40rem] font-display text-primary/5 leading-none pointer-events-none select-none"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            ★
          </motion.div>

          <div className="container-editorial h-full flex flex-col relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between py-6 md:py-8">
              <motion.span 
                className="text-sm md:text-base font-black uppercase tracking-widest text-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                LIORÉ
                <motion.span 
                  className="inline-block w-2 h-2 bg-primary rounded-full ml-1"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.span>
              <motion.button
                onClick={onClose}
                className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-foreground group"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="hidden md:inline group-hover:text-primary transition-colors">CLOSE</span>
                <motion.div 
                  className="w-10 h-10 border-2 border-foreground flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all"
                  whileHover={{ rotate: 90 }}
                >
                  <X className="w-5 h-5 group-hover:text-primary-foreground transition-colors" />
                </motion.div>
              </motion.button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 flex flex-col justify-center" style={{ perspective: 1000 }}>
              <ul className="space-y-2 md:space-y-4">
                {navLinks.map((link, index) => (
                  <li 
                    key={link.label}
                    className="overflow-hidden"
                  >
                    <motion.a
                      href={link.href}
                      onClick={handleLinkClick}
                      className="block text-5xl md:text-7xl lg:text-8xl font-display text-foreground relative group uppercase"
                      custom={index}
                      variants={linkVariants}
                      initial="closed"
                      animate="open"
                      whileHover={{ x: 30, color: 'hsl(var(--primary))' }}
                      transition={{ duration: 0.3 }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <motion.span 
                        className="absolute left-0 top-1/2 -translate-y-1/2 -ml-16 text-2xl font-display text-primary opacity-0 group-hover:opacity-100"
                        initial={{ x: -20 }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        0{index + 1}
                      </motion.span>
                      <span className="relative inline-block">
                        {link.label}
                        <motion.span 
                          className="absolute bottom-0 left-0 w-full h-1 bg-primary origin-left"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </span>
                      <motion.span
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-4xl opacity-0 group-hover:opacity-100"
                        initial={{ x: 20 }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        →
                      </motion.span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Footer */}
            <motion.div 
              className="py-8 md:py-12 border-t-2 border-primary"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="flex flex-wrap gap-6 md:gap-10">
                {socialLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className="text-sm font-bold uppercase tracking-widest text-muted-foreground relative group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 + i * 0.08 }}
                    whileHover={{ color: "hsl(var(--primary))", y: -5 }}
                  >
                    {link.label}
                    <motion.span 
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuOverlay;
