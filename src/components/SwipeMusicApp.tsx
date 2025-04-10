
import React, { useState, useEffect } from 'react';
import SongCard from './SongCard';
import MusicPlayer from './MusicPlayer';
import { songs, Song } from '@/data/songs';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Heart, User, LayoutGrid, Settings } from 'lucide-react';

const SwipeMusicApp: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedSongs, setLikedSongs] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right' | null>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const currentSong = songs[currentIndex];
  
  const handleSwipeLeft = () => {
    setTransitionDirection('left');
    setTimeout(() => {
      goToNextSong();
      setTransitionDirection(null);
      toast({
        title: "Skipped",
        description: `"${currentSong.title}" by ${currentSong.artist}`,
        variant: "destructive"
      });
    }, 300);
  };
  
  const handleSwipeRight = () => {
    setTransitionDirection('right');
    setLikedSongs((prev) => [...prev, currentSong.id]);
    
    setTimeout(() => {
      goToNextSong();
      setTransitionDirection(null);
      toast({
        title: "Added to favorites",
        description: `"${currentSong.title}" by ${currentSong.artist}`,
      });
    }, 300);
  };
  
  const goToNextSong = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };
  
  const goToPreviousSong = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
  };
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex flex-col">
      <header className="pt-6 pb-4 px-4 glass border-b border-white/10">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-white">
            <span className="text-gradient">Swipe</span>
            <span className="text-primary">fy</span>
          </h1>
          <div className="flex gap-4">
            <button className="text-white/70 hover:text-white transition-colors">
              <Heart size={20} />
            </button>
            <button className="text-white/70 hover:text-white transition-colors">
              <User size={20} />
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-28 pt-6 overflow-hidden">
        <div className={`w-full ${isMobile ? 'max-w-[90vw]' : 'max-w-md'} aspect-[3/4] relative`}>
          {songs.map((song, index) => {
            // Only render current card and next one for performance
            if (index < currentIndex || index > currentIndex + 1) return null;
            
            return (
              <div 
                key={song.id}
                className={`absolute top-0 left-0 right-0 w-full ${
                  index === currentIndex 
                    ? transitionDirection === 'left'
                      ? 'card-rotate-left'
                      : transitionDirection === 'right'
                        ? 'card-rotate-right'
                        : ''
                    : 'scale-95 -translate-y-4 opacity-80'
                }`}
              >
                <SongCard
                  song={song}
                  onSwipeLeft={handleSwipeLeft}
                  onSwipeRight={handleSwipeRight}
                  isActive={index === currentIndex}
                  className={`animate-${index === currentIndex ? 'slide-up' : ''}`}
                />
              </div>
            );
          })}
        </div>
        
        <p className="text-white/60 text-sm mt-8 text-center max-w-xs">
          Swipe right to add to favorites, or left to skip
        </p>
      </main>
      
      <MusicPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlayPause={togglePlayPause}
        onNext={handleSwipeLeft}
        onPrevious={goToPreviousSong}
      />

      {isMobile && (
        <nav className="fixed bottom-20 left-0 right-0 glass border-t border-white/10 py-3 px-6 z-10">
          <div className="flex justify-around items-center">
            <button className="flex flex-col items-center text-white/70 hover:text-primary transition-colors">
              <Heart size={20} />
              <span className="text-xs mt-1">Favorites</span>
            </button>
            <button className="flex flex-col items-center text-white/70 hover:text-primary transition-colors">
              <LayoutGrid size={20} />
              <span className="text-xs mt-1">Library</span>
            </button>
            <button className="flex flex-col items-center text-white/70 hover:text-primary transition-colors">
              <Settings size={20} />
              <span className="text-xs mt-1">Settings</span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
};

export default SwipeMusicApp;
