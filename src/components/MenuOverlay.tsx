import { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#pitch' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Awards', href: '#awards' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { label: 'Twitter', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Dribbble', href: '#' },
  { label: 'Instagram', href: '#' },
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
    closed: { y: 50, opacity: 0 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3 + i * 0.08,
        duration: 0.6,
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
          <div className="container-editorial h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between py-6 md:py-8">
              <motion.span 
                className="text-sm md:text-base font-medium text-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Loire's Portfolio
              </motion.span>
              <motion.button
                onClick={onClose}
                className="flex items-center gap-2 text-sm font-medium text-foreground group"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="hidden md:inline">Close</span>
                <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
              </motion.button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 flex flex-col justify-center">
              <ul className="space-y-4 md:space-y-6">
                {navLinks.map((link, index) => (
                  <li 
                    key={link.label}
                    className="overflow-hidden"
                  >
                    <motion.a
                      href={link.href}
                      onClick={handleLinkClick}
                      className="block text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground relative group"
                      custom={index}
                      variants={linkVariants}
                      initial="closed"
                      animate="open"
                      whileHover={{ x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="relative inline-block">
                        {link.label}
                        <motion.span 
                          className="absolute bottom-0 left-0 w-full h-[2px] bg-foreground origin-left"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </span>
                      <motion.span
                        className="absolute left-0 top-1/2 -translate-y-1/2 -ml-8 text-sm text-muted-foreground opacity-0 group-hover:opacity-100"
                        initial={{ x: -10 }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        0{index + 1}
                      </motion.span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Footer */}
            <motion.div 
              className="py-8 md:py-12 border-t border-divider"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <div className="flex flex-wrap gap-6 md:gap-10">
                {socialLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-muted-foreground relative group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + i * 0.05 }}
                    whileHover={{ color: "hsl(0 0% 100%)" }}
                  >
                    {link.label}
                    <motion.span 
                      className="absolute bottom-0 left-0 w-full h-px bg-foreground origin-left"
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
