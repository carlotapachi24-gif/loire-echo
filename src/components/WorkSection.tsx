import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Project {
  id: number;
  title: string;
  categories: string[];
  image: string;
}

interface WorkSectionProps {
  projects: Project[];
}

const WorkSection = ({ projects }: WorkSectionProps) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="work" className="section-padding">
      <div className="container-editorial">
        {/* Section header */}
        <div 
          ref={ref}
          className={`flex items-baseline justify-between mb-12 md:mb-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div>
            <span className="text-meta mb-4 block">Selected Projects</span>
            <h2 className="heading-section font-semibold text-foreground">
              Work
            </h2>
          </div>
          <span className="text-sm text-muted-foreground hidden md:block">
            @21—25
          </span>
        </div>

        {/* Projects grid */}
        <div className="space-y-16 md:space-y-24">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <article
      ref={ref}
      className={`group cursor-pointer transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Image container */}
      <div className="relative aspect-[16/10] overflow-hidden mb-6 md:mb-8 bg-secondary">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-background/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* Project info */}
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
        <h3 className="text-xl md:text-2xl font-medium text-foreground link-underline inline-block">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {project.categories.join(', ')}
        </p>
      </div>
    </article>
  );
};

export default WorkSection;
