
import React from 'react';
import { Home, Search, Heart, Mic2 } from 'lucide-react';

interface MobileNavProps {
  handleNavigation: (path: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ handleNavigation }) => {
  return (
    <nav className="fixed bottom-20 left-0 right-0 glass border-t border-white/10 py-2 px-4 z-10">
      <div className="flex justify-around items-center">
        <button 
          onClick={() => handleNavigation('/')}
          className="flex flex-col items-center text-white hover:text-primary transition-colors"
        >
          <Home size={18} />
          <span className="text-xs mt-0.5">Home</span>
        </button>
        <button 
          onClick={() => handleNavigation('/search')}
          className="flex flex-col items-center text-white/70 hover:text-primary transition-colors"
        >
          <Search size={18} />
          <span className="text-xs mt-0.5">Search</span>
        </button>
        <button 
          onClick={() => handleNavigation('/favorites')}
          className="flex flex-col items-center text-white/70 hover:text-primary transition-colors"
        >
          <Heart size={18} />
          <span className="text-xs mt-0.5">Liked</span>
        </button>
        <button 
          onClick={() => handleNavigation('/now-playing')}
          className="flex flex-col items-center text-white/70 hover:text-primary transition-colors"
        >
          <Mic2 size={18} />
          <span className="text-xs mt-0.5">Now Playing</span>
        </button>
      </div>
    </nav>
  );
};

export default MobileNav;
