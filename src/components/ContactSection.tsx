import { useScrollReveal } from '@/hooks/useScrollReveal';

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
  const { ref, isVisible } = useScrollReveal();
  const { ref: footerRef, isVisible: footerVisible } = useScrollReveal(0.1);

  return (
    <section id="contact" className="section-padding">
      <div className="container-editorial">
        {/* CTA */}
        <div 
          ref={ref}
          className={`text-center mb-20 md:mb-32 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <h2 className="heading-section font-semibold text-foreground mb-8">
            Let's talk about<br />your next project.
          </h2>
          <a 
            href="mailto:hello@johnliore.com"
            className="inline-block text-lg md:text-xl text-foreground link-underline"
          >
            Email Me
          </a>
        </div>

        {/* Footer */}
        <footer 
          ref={footerRef}
          className={`border-t border-divider pt-12 md:pt-16 transition-all duration-700 ${
            footerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16 md:mb-24">
            {/* Navigation */}
            <div>
              <h4 className="text-meta mb-4">Navigation</h4>
              <ul className="space-y-2">
                {footerLinks.navigation.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-muted-foreground link-subtle">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-meta mb-4">Follow</h4>
              <ul className="space-y-2">
                {footerLinks.social.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-muted-foreground link-subtle">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-meta mb-4">Legal</h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-muted-foreground link-subtle">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location */}
            <div>
              <h4 className="text-meta mb-4">Location</h4>
              <p className="text-sm text-muted-foreground">
                Amsterdam, Netherlands<br />
                Available Worldwide
              </p>
            </div>
          </div>

          {/* Giant skill words */}
          <div className="overflow-hidden py-8 md:py-12 border-t border-divider">
            <div className="flex flex-wrap justify-center gap-x-6 md:gap-x-12 gap-y-2">
              {skillWords.map((word, index) => (
                <span 
                  key={word}
                  className="text-3xl md:text-5xl lg:text-7xl font-semibold text-muted-foreground/20"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    opacity: footerVisible ? 1 : 0,
                    transition: `opacity 0.6s ease ${index * 100}ms`
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center py-8 border-t border-divider">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} John Lioré. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default ContactSection;
