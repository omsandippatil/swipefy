
import React from 'react';
import SongCard from './SongCard';
import { Song } from '@/data/songs';

interface SongStackProps {
  songs: Song[];
  currentIndex: number;
  transitionDirection: 'left' | 'right' | null;
  isPlaying: boolean;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const SongStack: React.FC<SongStackProps> = ({
  songs,
  currentIndex,
  transitionDirection,
  isPlaying,
  onSwipeLeft,
  onSwipeRight
}) => {
  return (
    <div className="w-full max-w-md aspect-[4/5] relative mb-4">
      {songs.map((song, index) => {
        if (index < currentIndex || index > currentIndex + 4) return null;
        
        const isNext = index === currentIndex + 1;
        const isNextAfter = index === currentIndex + 2;
        const isThirdNext = index === currentIndex + 3;
        const isFourthNext = index === currentIndex + 4;
        
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
                  ? 'scale-[0.98] -translate-y-2 opacity-95'
                  : isNextAfter
                    ? 'scale-[0.96] -translate-y-4 opacity-90'
                    : isThirdNext
                      ? 'scale-[0.94] -translate-y-6 opacity-85'
                      : isFourthNext
                        ? 'scale-[0.92] -translate-y-8 opacity-80'
                        : ''
            }`}
            style={{
              zIndex: songs.length - index
            }}
          >
            <SongCard
              song={song}
              onSwipeLeft={onSwipeLeft}
              onSwipeRight={onSwipeRight}
              isActive={index === currentIndex}
              isPlaying={isPlaying && index === currentIndex}
              className={`animate-${index === currentIndex ? 'slide-up' : ''}`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SongStack;
