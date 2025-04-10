
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SongCard from './SongCard';
import MusicPlayer from './MusicPlayer';
import { songs, Song } from '@/data/songs';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Heart, User, Search, Mic2, Home } from 'lucide-react';

const SwipeMusicApp: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedSongs, setLikedSongs] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right' | null>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const currentSong = songs[currentIndex];
  
  const handleSwipeLeft = () => {
    setTransitionDirection('left');
    setTimeout(() => {
      goToNextSong();
      setTransitionDirection(null);
      toast({
        title: "Skipped",
        description: `"${currentSong.title}" by ${currentSong.artist}`,
        variant: "destructive",
        className: "neo-blur border border-white/10",
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
        className: "glass border border-white/10 bg-gradient-to-r from-primary/20 to-transparent",
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
  
  const handleNavigation = (path: string) => {
    switch (path) {
      case '/favorites':
        navigate('/favorites', { state: { likedSongs } });
        break;
      case '/search':
        navigate('/search');
        break;
      case '/now-playing':
        navigate('/now-playing', { state: { currentSong, isPlaying } });
        break;
      default:
        navigate(path);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-black flex flex-col">
      <header className="pt-4 pb-2 px-4 glass border-b border-white/10">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <h1 className="text-xl font-bold text-white">
            <span className="text-gradient">Swipe</span>
            <span className="text-white">fy</span>
          </h1>
          <div className="flex gap-4">
            <button 
              onClick={() => handleNavigation('/favorites')} 
              className="text-white/70 hover:text-primary transition-colors"
            >
              <Heart size={18} />
            </button>
            <button 
              onClick={() => handleNavigation('/now-playing')} 
              className="text-white/70 hover:text-primary transition-colors"
            >
              <User size={18} />
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-36 pt-6 overflow-hidden">
        <div className={`w-full ${isMobile ? 'max-w-[85vw]' : 'max-w-sm'} aspect-[3/4] relative mb-16`}>
          {songs.map((song, index) => {
            // Only render current card and next one for performance
            if (index < currentIndex || index > currentIndex + 2) return null;
            
            // Calculate staggered layout for stacked cards
            const isNext = index === currentIndex + 1;
            const isNextAfter = index === currentIndex + 2;
            
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
                    : isNext
                      ? 'scale-[0.95] -translate-y-3 opacity-90'
                      : isNextAfter
                        ? 'scale-[0.9] -translate-y-6 opacity-80'
                        : ''
                }`}
                style={{
                  zIndex: songs.length - index
                }}
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
        
        <div className="text-white/60 text-xs mt-4 text-center max-w-xs flex items-center justify-center gap-1">
          <div className="h-0.5 w-4 bg-primary/50 rounded-full"></div>
          <p>Swipe right to like, left to skip</p>
          <div className="h-0.5 w-4 bg-primary/50 rounded-full"></div>
        </div>
      </main>
      
      <MusicPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlayPause={togglePlayPause}
        onNext={handleSwipeLeft}
        onPrevious={goToPreviousSong}
      />

      {isMobile && (
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
      )}
    </div>
  );
};

export default SwipeMusicApp;
