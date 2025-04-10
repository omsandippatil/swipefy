
import React from 'react';
import { Song } from '@/data/songs';
import { formatTime } from '@/utils/formatTime';
import { Heart, X, Play, Music3 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SongCardProps {
  song: Song;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  isActive: boolean;
  className?: string;
}

const SongCard: React.FC<SongCardProps> = ({ 
  song, 
  onSwipeLeft, 
  onSwipeRight, 
  isActive,
  className
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
    
    // Determine direction for visual indicators
    if (diff > 30) {
      setDirection('right');
    } else if (diff < -30) {
      setDirection('left');
    } else {
      setDirection(null);
    }
    
    if (cardRef.current) {
      // Apply rotation based on swipe distance
      const rotate = diff * 0.05; // Adjust rotation sensitivity
      cardRef.current.style.transform = `translateX(${diff}px) rotate(${rotate}deg)`;
    }
  };
  
  const handleTouchEnd = () => {
    if (!isActive) return;
    
    // If swiped far enough, trigger the appropriate action
    if (offsetX > 100) {
      onSwipeRight();
    } else if (offsetX < -100) {
      onSwipeLeft();
    } else {
      // Reset to center if not swiped far enough
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
        'w-full relative rounded-3xl overflow-hidden transition-all duration-300 music-card-shadow',
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
      {/* Swipe indicators */}
      <div 
        className={`swipe-indicator left-4 ${direction === 'left' ? 'opacity-100' : ''}`}
        style={{ opacity: direction === 'left' ? Math.min(Math.abs(offsetX) / 100, 1) : 0 }}
      >
        <X className="text-white" size={32} />
      </div>
      
      <div 
        className={`swipe-indicator right-4 ${direction === 'right' ? 'opacity-100' : ''}`}
        style={{ opacity: direction === 'right' ? Math.min(Math.abs(offsetX) / 100, 1) : 0 }}
      >
        <Heart className="text-primary" fill="currentColor" size={32} />
      </div>
      
      {/* Album artwork */}
      <div className="w-full aspect-square bg-black overflow-hidden relative">
        <img 
          src={song.coverArt} 
          alt={`${song.title} cover`} 
          className="w-full h-full object-cover"
        />
        <div className="album-overlay"></div>
        
        {/* Spotify-like play button overlay */}
        {isActive && (
          <div className="absolute bottom-6 right-6">
            <div className="bg-primary rounded-full p-3 shadow-xl hover:scale-105 transition-transform">
              <Play fill="black" size={24} className="text-black ml-0.5" />
            </div>
          </div>
        )}
      </div>
      
      {/* Song info */}
      <div className="absolute bottom-0 left-0 right-0 p-5 neo-blur">
        <div className="flex items-center justify-between mb-2">
          <div className="flex-1 pr-4">
            <h2 className="text-xl font-bold text-white mb-1 truncate">{song.title}</h2>
            <p className="text-base text-gray-300 mb-1 truncate">{song.artist}</p>
            <div className="flex items-center mt-1">
              <Music3 size={14} className="text-primary mr-2" />
              <span className="text-xs text-gray-400 truncate">{song.album}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-400 block">{formatTime(song.duration)}</span>
          </div>
        </div>
      </div>
      
      {/* Action buttons */}
      {isActive && (
        <div className="absolute top-1/2 left-0 right-0 flex justify-center space-x-12 py-4">
          <button 
            onClick={() => handleActionButton('left')}
            className="glass hover:bg-white/10 text-white p-4 rounded-full transition-colors shadow-lg"
            aria-label="Skip"
          >
            <X size={28} />
          </button>
          
          <button 
            onClick={() => handleActionButton('right')}
            className="glass hover:bg-white/10 text-primary p-4 rounded-full transition-colors shadow-lg"
            aria-label="Like"
          >
            <Heart size={28} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SongCard;
