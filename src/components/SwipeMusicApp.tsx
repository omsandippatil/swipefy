import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SongCard from './SongCard';
import MusicPlayer from './MusicPlayer';
import { songs, Song } from '@/data/songs';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Heart, User, Search, Mic2, Home, X, SkipForward, SkipBack, List } from 'lucide-react';

const SwipeMusicApp: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedSongs, setLikedSongs] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right' | null>(null);
  const [showPlaylist, setShowPlaylist] = useState(false);
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

  const togglePlaylist = () => {
    setShowPlaylist(!showPlaylist);
  };

  const selectSong = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  // Handle keyboard navigation for desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          goToPreviousSong();
          break;
        case 'ArrowRight':
          goToNextSong();
          break;
        case ' ':
          e.preventDefault();
          togglePlayPause();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-black flex flex-col">
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
              <Heart size={18} />
            </button>
            <button 
              onClick={() => handleNavigation('/now-playing')} 
              className="text-white/70 hover:text-primary transition-colors"
            >
              <User size={18} />
            </button>
            <button 
              onClick={togglePlaylist} 
              className="text-white/70 hover:text-primary transition-colors md:flex hidden"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col md:flex-row md:items-start items-center justify-center px-4 pb-16 pt-4 overflow-hidden">
        {/* Desktop layout modifications */}
        <div className={`${isMobile ? 'w-full' : 'w-2/3'} flex flex-col items-center justify-center ${isMobile ? '' : 'pr-4'}`}>
          <div className={`w-full ${isMobile ? 'max-w-[85vw]' : 'max-w-md'} aspect-[4/5] relative mb-1`}>
            {songs.map((song, index) => {
              // Only render current card and next one for performance
              if (index < currentIndex || index > currentIndex + 2) return null;
              
              // Reduced staggering for cards
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
                        ? 'scale-[0.99] -translate-y-1 opacity-95'
                        : isNextAfter
                          ? 'scale-[0.98] -translate-y-2 opacity-90'
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
          
          {/* Control buttons - enhanced for desktop */}
          <div className="flex items-center justify-center gap-8 mt-2">
            {/* Previous button - only visible on desktop */}
            {!isMobile && (
              <button
                onClick={goToPreviousSong}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition-colors"
                aria-label="Previous"
              >
                <SkipBack size={20} className="text-white" />
              </button>
            )}
            
            {/* Dislike button */}
            <button
              onClick={handleSwipeLeft}
              className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition-colors"
              aria-label="Dislike"
            >
              <X size={24} className="text-red-500" />
            </button>
            
            {/* Like button */}
            <button
              onClick={handleSwipeRight}
              className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition-colors"
              aria-label="Like"
            >
              <Heart size={24} className="text-green-500" />
            </button>
            
            {/* Next button - only visible on desktop */}
            {!isMobile && (
              <button
                onClick={goToNextSong}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition-colors"
                aria-label="Next"
              >
                <SkipForward size={20} className="text-white" />
              </button>
            )}
          </div>
          
          <div className="text-white/60 text-xs mt-1 text-center max-w-xs flex items-center justify-center gap-1">
            <div className="h-0.5 w-4 bg-primary/50 rounded-full"></div>
            {isMobile ? (
              <p>Swipe or tap buttons to like or skip</p>
            ) : (
              <p>Use arrow keys or buttons to navigate songs</p>
            )}
            <div className="h-0.5 w-4 bg-primary/50 rounded-full"></div>
          </div>
        </div>
        
        {/* Playlist section - only visible on desktop when toggled */}
        {!isMobile && showPlaylist && (
          <div className="w-1/3 h-full max-h-[70vh] overflow-y-auto glass rounded-lg border border-white/10 p-4 hidden md:block">
            <h2 className="text-white text-lg font-medium mb-4">Up Next</h2>
            <div className="space-y-2">
              {songs.map((song, index) => (
                <div 
                  key={song.id}
                  onClick={() => selectSong(index)}
                  className={`p-2 rounded-md flex items-center gap-3 cursor-pointer hover:bg-white/10 transition-colors ${index === currentIndex ? 'bg-white/20 border-l-2 border-primary' : ''}`}
                >
                  <div className="w-10 h-10 rounded overflow-hidden">
                    <img src={song.coverArt} alt={song.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{song.title}</p>
                    <p className="text-white/60 text-xs truncate">{song.artist}</p>
                  </div>
                  {index === currentIndex && isPlaying && (
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      
      <MusicPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlayPause={togglePlayPause}
        onNext={goToNextSong}
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