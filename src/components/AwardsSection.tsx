import { useScrollReveal } from '@/hooks/useScrollReveal';

const awards = [
  { name: 'Awwwards Site of the Day', category: 'Excellence', year: '2024' },
  { name: 'CSS Design Awards', category: 'Best UI Design', year: '2023' },
  { name: 'FWA of the Day', category: 'Innovation', year: '2023' },
  { name: 'Webby Awards', category: 'Best Visual Design', year: '2022' },
  { name: 'Communication Arts', category: 'Interactive Annual', year: '2022' },
  { name: 'D&AD Pencil', category: 'Digital Design', year: '2021' },
];

const AwardsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="awards" className="section-padding">
      <div className="container-editorial">
        {/* Section header */}
        <div 
          ref={ref}
          className={`mb-12 md:mb-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-meta mb-4 block">Recognition</span>
          <h2 className="heading-section font-semibold text-foreground">
            Award Highlights
          </h2>
        </div>

        {/* Awards list */}
        <div className="border-t border-divider">
          {awards.map((award, index) => (
            <div
              key={index}
              className={`border-b border-divider py-5 md:py-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 80 + 200}ms` }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-4 items-baseline">
                <div className="md:col-span-5">
                  <span className="text-base md:text-lg text-foreground">
                    {award.name}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <span className="text-sm text-muted-foreground">
                    {award.category}
                  </span>
                </div>
                <div className="md:col-span-3 md:text-right">
                  <span className="text-sm text-muted-foreground">
                    {award.year}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
