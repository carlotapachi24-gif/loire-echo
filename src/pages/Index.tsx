import { useState } from 'react';
import Header from '@/components/Header';
import MenuOverlay from '@/components/MenuOverlay';
import HeroSection from '@/components/HeroSection';
import PitchSection from '@/components/PitchSection';
import ExperienceSection from '@/components/ExperienceSection';
import AwardsSection from '@/components/AwardsSection';
import WorkSection from '@/components/WorkSection';
import ContactSection from '@/components/ContactSection';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';

import portraitImage from '@/assets/portrait.jpg';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';
import project4 from '@/assets/project-4.jpg';

const projects = [
  {
    id: 1,
    title: 'Nebula Studios',
    categories: ['Web Design', 'Development'],
    image: project1,
  },
  {
    id: 2,
    title: 'Midler Cosmetics',
    categories: ['Brand Identity', 'Packaging'],
    image: project2,
  },
  {
    id: 3,
    title: 'Type Foundry',
    categories: ['Typography', 'Art Direction'],
    image: project3,
  },
  {
    id: 4,
    title: 'Concrete Gallery',
    categories: ['Architecture', 'Photography'],
    image: project4,
  },
];

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background cursor-none md:cursor-none">
      <CustomCursor />
      <ScrollProgress />
      <Header onMenuClick={() => setIsMenuOpen(true)} />
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      <main>
        <HeroSection portraitImage={portraitImage} />
        <PitchSection />
        <ExperienceSection />
        <AwardsSection />
        <WorkSection projects={projects} />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
