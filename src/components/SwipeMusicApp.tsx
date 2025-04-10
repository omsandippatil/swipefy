
import React, { useState, useEffect } from 'react';
import SongCard from './SongCard';
import MusicPlayer from './MusicPlayer';
import { songs, Song } from '@/data/songs';
import { useToast } from '@/components/ui/use-toast';

const SwipeMusicApp: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedSongs, setLikedSongs] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right' | null>(null);
  const { toast } = useToast();
  
  const currentSong = songs[currentIndex];
  
  const handleSwipeLeft = () => {
    setTransitionDirection('left');
    setTimeout(() => {
      goToNextSong();
      setTransitionDirection(null);
      toast({
        title: "Song skipped",
        description: `You skipped "${currentSong.title}" by ${currentSong.artist}`,
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
        title: "Song liked!",
        description: `You liked "${currentSong.title}" by ${currentSong.artist}`,
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
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex flex-col">
      <header className="pt-6 pb-4 px-4">
        <h1 className="text-3xl font-bold text-center text-white">Music<span className="text-primary">Swipe</span></h1>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-28 pt-4 overflow-hidden">
        <div className="w-full max-w-md aspect-[3/4] relative">
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
          Swipe right to like a song, or left to skip. Liked songs will be saved to your library.
        </p>
      </main>
      
      <MusicPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlayPause={togglePlayPause}
        onNext={handleSwipeLeft}
        onPrevious={goToPreviousSong}
      />
    </div>
  );
};

export default SwipeMusicApp;
