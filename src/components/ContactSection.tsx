import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import MagneticButton from './MagneticButton';
import TextScramble from './TextScramble';

const footerLinks = {
  navigation: [
    { label: 'WORK', href: '#work' },
    { label: 'ABOUT', href: '#pitch' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'AWARDS', href: '#awards' },
  ],
  social: [
    { label: 'TWITTER', href: '#' },
    { label: 'LINKEDIN', href: '#' },
    { label: 'DRIBBBLE', href: '#' },
    { label: 'INSTAGRAM', href: '#' },
  ],
  legal: [
    { label: 'STYLE GUIDE', href: '#' },
    { label: 'LICENSING', href: '#' },
  ],
};

const skillWords = ['ANIMATION', 'WEB DESIGN', 'DEVELOPMENT', 'BRANDING', 'MOTION', 'UI/UX', 'CREATIVE'];

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-100px" });
  const isFooterInView = useInView(footerRef, { once: true, margin: "-50px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"]
  });

  return (
    <section id="contact" ref={sectionRef} className="section-padding overflow-hidden relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/10 pointer-events-none" />
      
      <div className="container-editorial relative z-10">
        {/* CTA */}
        <motion.div 
          ref={ctaRef}
          className="text-center mb-24 md:mb-40"
        >
          <motion.span 
            className="text-meta text-primary mb-8 block"
            initial={{ opacity: 0, y: 20 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
          >
            ★ GET IN TOUCH ★
          </motion.span>
          
          <div className="overflow-hidden mb-4">
            <motion.h2 
              className="heading-section font-display text-foreground"
              initial={{ y: 150, rotateX: -60 }}
              animate={isCtaInView ? { y: 0, rotateX: 0 } : {}}
              transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
              style={{ perspective: 1000 }}
            >
              LET'S TALK
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-4">
            <motion.h2 
              className="heading-section font-display text-foreground"
              initial={{ y: 150, rotateX: -60 }}
              animate={isCtaInView ? { y: 0, rotateX: 0 } : {}}
              transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
            >
              ABOUT YOUR
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-12">
            <motion.h2 
              className="heading-section font-display gradient-text animate-pulse-glow"
              initial={{ y: 150, rotateX: -60 }}
              animate={isCtaInView ? { y: 0, rotateX: 0 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            >
              NEXT PROJECT
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isCtaInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
          >
            <MagneticButton
              href="mailto:hello@johnliore.com"
              className="inline-block text-xl md:text-2xl font-bold uppercase tracking-widest text-primary-foreground bg-primary px-8 py-4 relative group overflow-hidden"
              strength={0.4}
            >
              <motion.span 
                className="absolute inset-0 bg-accent"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">
                <TextScramble text="EMAIL ME NOW" className="font-bold" />
              </span>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <footer 
          ref={footerRef}
          className="border-t-4 border-primary pt-16 md:pt-24"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-20 md:mb-32">
            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isFooterInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h4 className="text-meta text-primary mb-6">NAVIGATION</h4>
              <ul className="space-y-3">
                {footerLinks.navigation.map((link, i) => (
                  <motion.li 
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isFooterInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    <motion.a 
                      href={link.href} 
                      className="text-sm font-bold uppercase tracking-wider text-muted-foreground inline-block"
                      whileHover={{ x: 10, color: 'hsl(var(--primary))' }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.label}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isFooterInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h4 className="text-meta text-primary mb-6">FOLLOW</h4>
              <ul className="space-y-3">
                {footerLinks.social.map((link, i) => (
                  <motion.li 
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isFooterInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                  >
                    <motion.a 
                      href={link.href} 
                      className="text-sm font-bold uppercase tracking-wider text-muted-foreground inline-block"
                      whileHover={{ x: 10, color: 'hsl(var(--primary))' }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.label}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Legal */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isFooterInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h4 className="text-meta text-primary mb-6">LEGAL</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, i) => (
                  <motion.li 
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isFooterInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  >
                    <motion.a 
                      href={link.href} 
                      className="text-sm font-bold uppercase tracking-wider text-muted-foreground inline-block"
                      whileHover={{ x: 10, color: 'hsl(var(--primary))' }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.label}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isFooterInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h4 className="text-meta text-primary mb-6">LOCATION</h4>
              <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                AMSTERDAM, NL<br />
                <span className="text-primary">AVAILABLE WORLDWIDE</span>
              </p>
            </motion.div>
          </div>

          {/* Giant skill words - infinite scroll ticker */}
          <div className="overflow-hidden py-12 md:py-16 border-t-2 border-primary/30">
            <motion.div 
              className="flex gap-x-12 md:gap-x-20 whitespace-nowrap"
              animate={{ x: [0, "-50%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 15,
                  ease: "linear",
                },
              }}
            >
              {[...skillWords, ...skillWords, ...skillWords, ...skillWords].map((word, index) => (
                <motion.span 
                  key={index}
                  className="text-6xl md:text-8xl lg:text-[10rem] font-display text-foreground/10 select-none uppercase"
                  whileHover={{ 
                    color: "hsl(var(--primary))",
                    scale: 1.1,
                    textShadow: "0 0 60px hsl(var(--primary))",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Second ticker - opposite direction */}
          <div className="overflow-hidden py-8 md:py-12 border-b-2 border-primary/30">
            <motion.div 
              className="flex gap-x-12 md:gap-x-20 whitespace-nowrap"
              animate={{ x: ["-50%", "0%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {[...skillWords, ...skillWords, ...skillWords, ...skillWords].reverse().map((word, index) => (
                <motion.span 
                  key={index}
                  className="text-4xl md:text-6xl lg:text-8xl font-display text-accent/20 select-none uppercase"
                  whileHover={{ 
                    color: "hsl(var(--accent))",
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Copyright */}
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={isFooterInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              © {new Date().getFullYear()} JOHN LIORÉ. <span className="text-primary">ALL RIGHTS RESERVED.</span>
            </p>
          </motion.div>
        </footer>
      </div>
    </section>
  );
};

export default ContactSection;
