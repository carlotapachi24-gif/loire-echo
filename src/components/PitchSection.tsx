import { useScrollReveal } from '@/hooks/useScrollReveal';

const PitchSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="pitch" className="section-padding">
      <div className="container-editorial">
        <div 
          ref={ref}
          className={`max-w-4xl transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-medium text-foreground leading-[1.2] md:leading-[1.15]">
            Design-driven creative developer, working with brands and agencies worldwide to create memorable digital experiences that stand out.
          </h2>
          
          <a 
            href="#contact" 
            className="inline-block mt-10 md:mt-16 text-sm text-muted-foreground link-underline"
          >
            Learn more about me →
          </a>
        </div>
      </div>
    </section>
  );
};

export default PitchSection;
