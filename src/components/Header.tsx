import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-4' : 'py-6 md:py-8'
      }`}
    >
      <div className="container-editorial flex items-center justify-between">
        <a 
          href="#hero" 
          className="text-sm md:text-base font-medium text-foreground link-subtle"
        >
          Loire's Portfolio
        </a>
        
        <button
          onClick={onMenuClick}
          className="flex items-center gap-2 text-sm font-medium text-foreground link-subtle group"
        >
          <span className="hidden md:inline">Menu</span>
          <Menu className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
        </button>
      </div>
    </header>
  );
};

export default Header;
