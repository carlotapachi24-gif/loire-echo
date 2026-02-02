import { useEffect } from 'react';
import { X } from 'lucide-react';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#pitch' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Awards', href: '#awards' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { label: 'Twitter', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Dribbble', href: '#' },
  { label: 'Instagram', href: '#' },
];

const MenuOverlay = ({ isOpen, onClose }: MenuOverlayProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background animate-fade-in">
      <div className="container-editorial h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between py-6 md:py-8">
          <span className="text-sm md:text-base font-medium text-foreground">
            Loire's Portfolio
          </span>
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-sm font-medium text-foreground link-subtle group"
          >
            <span className="hidden md:inline">Close</span>
            <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col justify-center">
          <ul className="space-y-4 md:space-y-6">
            {navLinks.map((link, index) => (
              <li 
                key={link.label}
                className="overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <a
                  href={link.href}
                  onClick={handleLinkClick}
                  className="block text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground link-underline animate-fade-in-up"
                  style={{ animationDelay: `${index * 50 + 100}ms` }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="py-8 md:py-12 border-t border-divider">
          <div className="flex flex-wrap gap-6 md:gap-10">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground link-underline"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuOverlay;
