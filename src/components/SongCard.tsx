import React from 'react';
import { Song } from '@/data/songs';
import { formatTime } from '@/utils/formatTime';
import { Heart, X, Play, Music3, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SongCardProps {
  song: Song;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  isActive: boolean;
  isPlaying?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const SongCard: React.FC<SongCardProps> = ({ 
  song, 
  onSwipeLeft, 
  onSwipeRight, 
  isActive,
  isPlaying = false,
  className,
  children
}) => {
  const [direction, setDirection] = React.useState<'left' | 'right' | null>(null);
  const [startX, setStartX] = React.useState(0);
  const [offsetX, setOffsetX] = React.useState(0);
  const cardRef = React.useRef<HTMLDivElement>(null);
  
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isActive) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - startX;
    setOffsetX(diff);
    
    if (diff > 30) {
      setDirection('right');
    } else if (diff < -30) {
      setDirection('left');
    } else {
      setDirection(null);
    }
    
    if (cardRef.current) {
      const rotate = diff * 0.05;
      cardRef.current.style.transform = `translateX(${diff}px) rotate(${rotate}deg)`;
    }
  };
  
  const handleTouchEnd = () => {
    if (!isActive) return;
    
    if (offsetX > 100) {
      onSwipeRight();
    } else if (offsetX < -100) {
      onSwipeLeft();
    } else {
      if (cardRef.current) {
        cardRef.current.style.transform = 'translateX(0) rotate(0deg)';
      }
    }
    
    setDirection(null);
    setOffsetX(0);
  };
  
  const handleActionButton = (action: 'left' | 'right') => {
    if (action === 'left') {
      onSwipeLeft();
    } else {
      onSwipeRight();
    }
  };

  return (
    <div 
      ref={cardRef}
      className={cn(
        'w-full relative rounded-3xl overflow-hidden transition-all duration-300 music-card-shadow depth-shadow',
        className,
        isActive ? 'z-10' : 'z-0'
      )}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
    >
      <div 
        className={`swipe-indicator left-4 ${direction === 'left' ? 'opacity-100' : ''}`}
        style={{ opacity: direction === 'left' ? Math.min(Math.abs(offsetX) / 100, 1) : 0 }}
      >
        <X className="text-white" size={28} />
      </div>
      
      <div 
        className={`swipe-indicator right-4 ${direction === 'right' ? 'opacity-100' : ''}`}
        style={{ opacity: direction === 'right' ? Math.min(Math.abs(offsetX) / 100, 1) : 0 }}
      >
        <Heart className="text-primary" fill="currentColor" size={28} />
      </div>
      
      <div className="w-full aspect-square bg-black overflow-hidden relative">
        <img 
          src={song.coverArt} 
          alt={`${song.title} cover`} 
          className={`w-full h-full object-cover ${isPlaying ? 'scale-[1.05] transition-all duration-1000' : ''} ${isActive ? 'brightness-110' : 'brightness-100'}`}
        />
        <div className="album-overlay"></div>
        
        {isActive && (
          <div className="absolute bottom-4 right-4">
            <div className={`rounded-full p-2 shadow-xl hover:scale-105 transition-transform ${isPlaying ? 'bg-white text-black glow' : 'bg-primary subtle-glow'}`}>
              {isPlaying ? (
                <Pause size={20} className="text-black ml-0.5" />
              ) : (
                <Play fill="black" size={20} className="text-black ml-0.5" />
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 neo-blur backdrop-blur-xl">
        <div className="flex items-center justify-between mb-1">
          <div className="flex-1 pr-4">
            <h2 className="text-lg font-bold text-white mb-0.5 truncate">{song.title}</h2>
            <p className="text-sm text-gray-300 mb-0.5 truncate">{song.artist}</p>
            <div className="flex items-center mt-0.5">
              <Music3 size={12} className="text-primary mr-1" />
              <span className="text-xs text-gray-400 truncate">{song.album}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-400 block">{formatTime(song.duration)}</span>
            {isPlaying && (
              <span className="text-xs text-primary block mt-1 pulse-subtle">Now Playing</span>
            )}
          </div>
        </div>
        
        <div className="mt-2 w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-primary/80 rounded-full"></div>
        </div>
      </div>
      
      {isActive && (
        <div className="absolute -bottom-16 md:-bottom-14 left-0 right-0 flex justify-center space-x-8 py-2">
          <button 
            onClick={() => handleActionButton('left')}
            className="glass hover:bg-white/10 text-white p-2.5 rounded-full transition-colors shadow-lg hover-scale"
            aria-label="Skip"
          >
            <X size={22} />
          </button>
          
          <button 
            onClick={() => handleActionButton('right')}
            className="glass hover:bg-white/10 text-primary p-2.5 rounded-full transition-colors shadow-lg hover-scale"
            aria-label="Like"
          >
            <Heart size={22} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SongCard;
