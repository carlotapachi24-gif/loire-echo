import { useEffect, useRef, useState } from 'react';

const socialLinks = [
  { label: 'Tw', href: '#' },
  { label: 'Li', href: '#' },
  { label: 'Dr', href: '#' },
  { label: 'Ig', href: '#' },
];

interface HeroSectionProps {
  portraitImage: string;
}

const HeroSection = ({ portraitImage }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      id="hero" 
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center pt-24 pb-12 md:pt-32 md:pb-20"
    >
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* Left content */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            {/* Name */}
            <h1 
              className={`heading-hero font-semibold text-foreground mb-8 md:mb-12 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              John<br />
              Lioré
            </h1>

            {/* Meta info */}
            <div 
              className={`flex flex-col md:flex-row md:items-end justify-between gap-6 transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <p className="text-sm md:text-base text-muted-foreground max-w-xs leading-relaxed">
                Based in Amsterdam.<br />
                Available for freelance work.
              </p>

              {/* Social links */}
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="w-10 h-10 flex items-center justify-center text-xs font-medium text-muted-foreground border border-divider rounded-full transition-all duration-300 hover:text-foreground hover:border-foreground"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right content - Portrait */}
          <div 
            className={`lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end transition-all duration-1000 delay-150 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative w-[280px] md:w-[320px] lg:w-[380px] aspect-[3/4]">
              {/* Main image */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={portraitImage}
                  alt="John Lioré portrait"
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              
              {/* Glitch slice overlay 1 */}
              <div 
                className="absolute left-0 right-0 h-[15%] top-[30%] overflow-hidden"
                style={{ transform: 'translateX(10px)' }}
              >
                <img
                  src={portraitImage}
                  alt=""
                  className="w-full h-full object-cover grayscale"
                  style={{ 
                    objectPosition: 'center 30%',
                    marginTop: '-30%',
                    height: '666%'
                  }}
                />
              </div>
              
              {/* Glitch slice overlay 2 */}
              <div 
                className="absolute left-0 right-0 h-[12%] top-[52%] overflow-hidden"
                style={{ transform: 'translateX(-8px)' }}
              >
                <img
                  src={portraitImage}
                  alt=""
                  className="w-full h-full object-cover grayscale"
                  style={{ 
                    objectPosition: 'center 52%',
                    marginTop: '-433%',
                    height: '833%'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
