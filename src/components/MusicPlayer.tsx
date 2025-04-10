
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { formatTime } from '@/utils/formatTime';
import { Song } from '@/data/songs';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface MusicPlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  currentSong,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Playback failed:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 neo-blur border-t border-white/10 p-3 sm:p-4">
      {currentSong && (
        <>
          <audio
            ref={audioRef}
            src={currentSong.audioSrc}
            onTimeUpdate={handleTimeUpdate}
            onEnded={onNext}
          />
          
          {/* Progress bar */}
          <div className="w-full mb-3">
            <input
              type="range"
              min="0"
              max={currentSong.duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 rounded-lg bg-gray-700 appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(currentSong.duration)}</span>
            </div>
          </div>
          
          {/* Controls */}
          <div className={cn(
            "flex items-center",
            isMobile ? "justify-between" : "justify-between"
          )}>
            <div className={cn(
              "flex items-center gap-2",
              isMobile ? "w-1/3 max-w-[120px]" : "w-1/3"
            )}>
              <img 
                src={currentSong.coverArt} 
                alt={currentSong.title} 
                className="w-10 h-10 rounded-md object-cover"
              />
              <div className="truncate">
                <p className="text-sm font-medium truncate">{currentSong.title}</p>
                <p className="text-xs text-gray-400 truncate">{currentSong.artist}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <button 
                onClick={onPrevious}
                className="text-white/80 hover:text-white/100 transition-colors"
              >
                <SkipBack size={isMobile ? 18 : 22} />
              </button>
              
              <button 
                onClick={onPlayPause}
                className="bg-primary hover:bg-primary/90 text-white p-2 sm:p-3 rounded-full transition-colors"
              >
                {isPlaying ? <Pause size={isMobile ? 18 : 20} /> : <Play size={isMobile ? 18 : 20} />}
              </button>
              
              <button 
                onClick={onNext}
                className="text-white/80 hover:text-white/100 transition-colors"
              >
                <SkipForward size={isMobile ? 18 : 22} />
              </button>
            </div>
            
            {!isMobile && (
              <div className="flex items-center gap-2 w-1/3 justify-end">
                <Volume2 size={18} className="text-gray-400" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-24 h-1 rounded-lg bg-gray-700 appearance-none cursor-pointer accent-primary"
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MusicPlayer;
