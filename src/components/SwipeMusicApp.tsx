
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MusicPlayer from './MusicPlayer';
import { songs } from '@/data/songs';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

// Import all the new modular components
import MainHeader from './MainHeader';
import SongStack from './SongStack';
import SwipeControls from './SwipeControls';
import PlayerControls from './PlayerControls';
import NowPlayingWidget from './NowPlayingWidget';
import SimilarArtistsWidget from './SimilarArtistsWidget';
import PlaylistWidget from './PlaylistWidget';
import FilterWidget from './FilterWidget';
import MobileNav from './MobileNav';

const SwipeMusicApp: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedSongs, setLikedSongs] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right' | null>(null);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [isRepeatOn, setIsRepeatOn] = useState(false);
  const [volume, setVolume] = useState(75);
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
    setLikedSongs((prev) => {
      if (!prev.includes(currentSong.id)) {
        return [...prev, currentSong.id];
      }
      return prev;
    });
    
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
    setTransitionDirection('left');
    setTimeout(() => {
      if (isShuffleOn) {
        const randomIndex = Math.floor(Math.random() * songs.length);
        setCurrentIndex(randomIndex);
      } else {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % songs.length);
      }
      setTransitionDirection(null);
      toast({
        title: "Skipped",
        description: `"${currentSong.title}" by ${currentSong.artist}`,
        variant: "destructive",
        className: "neo-blur border border-white/10",
      });
    }, 300);
  };
  
  const goToPreviousSong = () => {
    setTransitionDirection('right');
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
      setTransitionDirection(null);
    }, 300);
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

  const toggleFilter = () => {
    setFilterActive(!filterActive);
  };

  const toggleShuffle = () => {
    setIsShuffleOn(!isShuffleOn);
    toast({
      title: isShuffleOn ? "Shuffle Off" : "Shuffle On",
      className: "neo-blur border border-white/10",
    });
  };

  const toggleRepeat = () => {
    setIsRepeatOn(!isRepeatOn);
    toast({
      title: isRepeatOn ? "Repeat Off" : "Repeat On",
      className: "neo-blur border border-white/10",
    });
  };

  const selectSong = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(e.target.value));
  };

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
        case 's':
          toggleShuffle();
          break;
        case 'r':
          toggleRepeat();
          break;
        case 'p':
          togglePlaylist();
          break;
        case 'f':
          handleSwipeRight();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isShuffleOn, isRepeatOn]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-black flex flex-col">
      <MainHeader 
        likedSongs={likedSongs}
        toggleFilter={toggleFilter}
        togglePlaylist={togglePlaylist}
        filterActive={filterActive}
        showPlaylist={showPlaylist}
      />
      
      <main className="flex-1 flex flex-col md:flex-row md:items-start items-center justify-center px-4 pb-16 pt-4 overflow-hidden">
        {!isMobile && (
          <div className="w-1/6 h-full max-h-[85vh] hidden md:block mr-4">
            <PlaylistWidget 
              songs={songs}
              currentIndex={currentIndex}
              isPlaying={isPlaying}
              likedSongs={likedSongs}
              isShuffleOn={isShuffleOn}
              selectSong={selectSong}
            />
          </div>
        )}
        
        <div className={`${isMobile ? 'w-full' : 'w-2/4'} flex flex-col items-center justify-center ${isMobile ? '' : 'px-4'}`}>
          <SongStack 
            songs={songs}
            currentIndex={currentIndex}
            transitionDirection={transitionDirection}
            isPlaying={isPlaying}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
          />
          
          <SwipeControls 
            onPrevious={goToPreviousSong}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
            onNext={goToNextSong}
          />
          
          <PlayerControls 
            isShuffleOn={isShuffleOn}
            isRepeatOn={isRepeatOn}
            volume={volume}
            toggleShuffle={toggleShuffle}
            toggleRepeat={toggleRepeat}
            handleVolumeChange={handleVolumeChange}
          />
          
          <div className="text-white/60 text-xs mt-4 text-center max-w-xs flex items-center justify-center gap-1">
            <div className="h-0.5 w-4 bg-primary/50 rounded-full"></div>
            <p>Swipe or tap buttons to like or skip | F: Like | S: Shuffle | R: Repeat</p>
            <div className="h-0.5 w-4 bg-primary/50 rounded-full"></div>
          </div>
        </div>
        
        <div className={`${isMobile ? 'hidden' : 'w-1/4 flex flex-col gap-4'}`}>
          {!showPlaylist && !filterActive && !isMobile && (
            <>
              <NowPlayingWidget currentSong={currentSong} isPlaying={isPlaying} />
              <SimilarArtistsWidget />
            </>
          )}
          
          {showPlaylist && (
            <PlaylistWidget 
              songs={songs}
              currentIndex={currentIndex}
              isPlaying={isPlaying}
              likedSongs={likedSongs}
              isShuffleOn={isShuffleOn}
              selectSong={selectSong}
            />
          )}
          
          {filterActive && (
            <FilterWidget />
          )}
        </div>
      </main>
      
      <MusicPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlayPause={togglePlayPause}
        onNext={goToNextSong}
        onPrevious={goToPreviousSong}
      />

      {isMobile && (
        <MobileNav handleNavigation={handleNavigation} />
      )}
    </div>
  );
};

export default SwipeMusicApp;
