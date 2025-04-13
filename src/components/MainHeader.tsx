
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Search, User, Filter, List } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainHeaderProps {
  likedSongs: string[];
  toggleFilter: () => void;
  togglePlaylist: () => void;
  filterActive: boolean;
  showPlaylist: boolean;
}

const MainHeader: React.FC<MainHeaderProps> = ({ 
  likedSongs, 
  toggleFilter, 
  togglePlaylist, 
  filterActive, 
  showPlaylist 
}) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  
  return (
    <header className="pt-4 pb-2 px-4 glass border-b border-white/10">
      <div className="flex items-center justify-between max-w-6xl mx-auto w-full">
        <h1 className="text-xl font-bold text-white">
          <span className="text-gradient">Swipe</span>
          <span className="text-white">fy</span>
        </h1>
        <div className="flex gap-4">
          <button 
            onClick={() => handleNavigation('/search')} 
            className="text-white/70 hover:text-primary transition-colors"
          >
            <Search size={18} />
          </button>
          <button 
            onClick={() => handleNavigation('/favorites')} 
            className="text-white/70 hover:text-primary transition-colors"
          >
            <Heart size={18} className={likedSongs.length > 0 ? "text-primary" : ""} />
          </button>
          <button 
            onClick={() => handleNavigation('/now-playing')} 
            className="text-white/70 hover:text-primary transition-colors"
          >
            <User size={18} />
          </button>
          {!isMobile && (
            <>
              <button 
                onClick={toggleFilter} 
                className={`text-white/70 hover:text-primary transition-colors ${filterActive ? 'text-primary' : ''}`}
              >
                <Filter size={18} />
              </button>
              <button 
                onClick={togglePlaylist} 
                className={`text-white/70 hover:text-primary transition-colors ${showPlaylist ? 'text-primary' : ''}`}
              >
                <List size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
