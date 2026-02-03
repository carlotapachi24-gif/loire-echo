import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import MagneticButton from './MagneticButton';
import TextScramble from './TextScramble';

const footerLinks = {
  navigation: [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#pitch' },
    { label: 'Experience', href: '#experience' },
    { label: 'Awards', href: '#awards' },
  ],
  social: [
    { label: 'Twitter', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Dribbble', href: '#' },
    { label: 'Instagram', href: '#' },
  ],
  legal: [
    { label: 'Style Guide', href: '#' },
    { label: 'Licensing', href: '#' },
  ],
};

const skillWords = ['Animation', 'Web Design', 'Development', 'Branding', 'Motion'];

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

  const skillsX = useTransform(scrollYProgress, [0.5, 1], ["0%", "-20%"]);

  return (
    <section id="contact" ref={sectionRef} className="section-padding overflow-hidden">
      <div className="container-editorial">
        {/* CTA */}
        <motion.div 
          ref={ctaRef}
          className="text-center mb-20 md:mb-32"
        >
          <div className="overflow-hidden mb-8">
            <motion.h2 
              className="heading-section font-semibold text-foreground"
              initial={{ y: 100 }}
              animate={isCtaInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            >
              Let's talk about
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h2 
              className="heading-section font-semibold text-foreground"
              initial={{ y: 100 }}
              animate={isCtaInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
            >
              your next project.
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <MagneticButton
              href="mailto:hello@johnliore.com"
              className="inline-block text-lg md:text-xl text-foreground relative group"
              strength={0.3}
            >
              <TextScramble text="Email Me" className="font-normal" />
              <motion.span 
                className="absolute bottom-0 left-0 w-full h-px bg-foreground"
                initial={{ scaleX: 1 }}
                whileHover={{ scaleX: 0 }}
                transition={{ duration: 0.3 }}
              />
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <footer 
          ref={footerRef}
          className="border-t border-divider pt-12 md:pt-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16 md:mb-24">
            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isFooterInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h4 className="text-meta mb-4">Navigation</h4>
              <ul className="space-y-2">
                {footerLinks.navigation.map((link, i) => (
                  <motion.li 
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isFooterInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <motion.a 
                      href={link.href} 
                      className="text-sm text-muted-foreground inline-block"
                      whileHover={{ x: 5, color: "hsl(0 0% 100%)" }}
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
              initial={{ opacity: 0, y: 30 }}
              animate={isFooterInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-meta mb-4">Follow</h4>
              <ul className="space-y-2">
                {footerLinks.social.map((link, i) => (
                  <motion.li 
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isFooterInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                  >
                    <motion.a 
                      href={link.href} 
                      className="text-sm text-muted-foreground inline-block"
                      whileHover={{ x: 5, color: "hsl(0 0% 100%)" }}
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
              initial={{ opacity: 0, y: 30 }}
              animate={isFooterInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-meta mb-4">Legal</h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link, i) => (
                  <motion.li 
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isFooterInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
                  >
                    <motion.a 
                      href={link.href} 
                      className="text-sm text-muted-foreground inline-block"
                      whileHover={{ x: 5, color: "hsl(0 0% 100%)" }}
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
              initial={{ opacity: 0, y: 30 }}
              animate={isFooterInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-meta mb-4">Location</h4>
              <p className="text-sm text-muted-foreground">
                Amsterdam, Netherlands<br />
                Available Worldwide
              </p>
            </motion.div>
          </div>

          {/* Giant skill words - infinite scroll ticker */}
          <div className="overflow-hidden py-8 md:py-12 border-t border-divider">
            <motion.div 
              className="flex gap-x-8 md:gap-x-16 whitespace-nowrap"
              animate={{ x: [0, "-50%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {[...skillWords, ...skillWords, ...skillWords, ...skillWords].map((word, index) => (
                <motion.span 
                  key={index}
                  className="text-4xl md:text-6xl lg:text-8xl font-semibold text-muted-foreground/15 select-none"
                  whileHover={{ 
                    color: "rgba(255,255,255,0.5)",
                    scale: 1.05,
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
            className="text-center py-8 border-t border-divider"
            initial={{ opacity: 0 }}
            animate={isFooterInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} John Lioré. All rights reserved.
            </p>
          </motion.div>
        </footer>
      </div>
    </section>
  );
};

export default ContactSection;
