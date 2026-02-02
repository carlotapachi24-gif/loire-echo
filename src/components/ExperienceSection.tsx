import { useScrollReveal } from '@/hooks/useScrollReveal';

const experiences = [
  { role: 'Senior Creative Developer', company: 'Fictional Studio', period: '2022 — Present' },
  { role: 'Lead Designer', company: 'Digital Dreams Agency', period: '2019 — 2022' },
  { role: 'Frontend Developer', company: 'TechVision Labs', period: '2017 — 2019' },
  { role: 'UI/UX Designer', company: 'StartUp Inc.', period: '2015 — 2017' },
  { role: 'Junior Developer', company: 'Code Factory', period: '2013 — 2015' },
];

const ExperienceSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="experience" className="section-padding">
      <div className="container-editorial">
        {/* Section header */}
        <div 
          ref={ref}
          className={`mb-12 md:mb-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-meta mb-4 block">Experience</span>
          <h2 className="heading-section font-semibold text-foreground">
            Work History
          </h2>
        </div>

        {/* Experience table */}
        <div className="border-t border-divider">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`border-b border-divider py-6 md:py-8 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-baseline">
                <div className="md:col-span-5">
                  <span className="text-base md:text-lg text-foreground font-medium">
                    {exp.role}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <span className="text-sm md:text-base text-muted-foreground">
                    {exp.company}
                  </span>
                </div>
                <div className="md:col-span-3 md:text-right">
                  <span className="text-sm text-muted-foreground">
                    {exp.period}
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

export default ExperienceSection;
