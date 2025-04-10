
import React from 'react';
import { Song } from '@/data/songs';
import { formatTime } from '@/utils/formatTime';
import { Heart, X } from 'lucide-react';

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
      className={`w-full relative rounded-2xl overflow-hidden transition-all duration-300 ${className} ${isActive ? 'z-10' : 'z-0'}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
    >
      {/* Left indicator (Skip) */}
      <div 
        className={`swipe-indicator left-4 ${direction === 'left' ? 'opacity-100' : ''}`}
        style={{ opacity: direction === 'left' ? Math.min(Math.abs(offsetX) / 100, 1) : 0 }}
      >
        <X className="text-white" size={32} />
      </div>
      
      {/* Right indicator (Like) */}
      <div 
        className={`swipe-indicator right-4 ${direction === 'right' ? 'opacity-100' : ''}`}
        style={{ opacity: direction === 'right' ? Math.min(Math.abs(offsetX) / 100, 1) : 0 }}
      >
        <Heart className="text-accent" fill="#ff6b95" size={32} />
      </div>
      
      {/* Album artwork */}
      <div className="w-full aspect-square bg-gray-900 overflow-hidden music-card-shadow">
        <img 
          src={song.coverArt} 
          alt={`${song.title} cover`} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Song info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 glass">
        <h2 className="text-2xl font-bold text-white mb-1 truncate">{song.title}</h2>
        <p className="text-lg text-gray-300 mb-1">{song.artist}</p>
        <div className="flex justify-between items-center mt-2 text-gray-400">
          <span>{song.album}</span>
          <span>{formatTime(song.duration)}</span>
        </div>
      </div>
      
      {/* Action buttons */}
      {isActive && (
        <div className="absolute bottom-36 left-0 right-0 flex justify-center space-x-12 py-4">
          <button 
            onClick={() => handleActionButton('left')}
            className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-full backdrop-blur-lg transition-colors"
          >
            <X size={28} />
          </button>
          
          <button 
            onClick={() => handleActionButton('right')}
            className="bg-white/10 hover:bg-white/20 text-accent p-4 rounded-full backdrop-blur-lg transition-colors"
          >
            <Heart size={28} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SongCard;
