
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, Heart } from 'lucide-react';
import { Song } from '@/data/songs';

interface PlaylistWidgetProps {
  songs: Song[];
  currentIndex: number;
  isPlaying: boolean;
  likedSongs: string[];
  isShuffleOn: boolean;
  selectSong: (index: number) => void;
}

const PlaylistWidget: React.FC<PlaylistWidgetProps> = ({
  songs,
  currentIndex,
  isPlaying,
  likedSongs,
  isShuffleOn,
  selectSong
}) => {
  const formatTotalDuration = (songs: Song[]) => {
    const totalSeconds = songs.reduce((total, song) => {
      return total + song.duration;
    }, 0);
    
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  return (
    <div className="w-full h-full max-h-[70vh] overflow-y-auto glass rounded-lg border border-white/10 p-4 hidden md:block">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-lg font-medium">Up Next</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
            <Clock size={14} className="mr-1" /> Recent
          </Button>
        </div>
      </div>
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
            <div className="flex items-center gap-1">
              {likedSongs.includes(song.id) && (
                <Heart size={14} className="text-primary" fill="currentColor" />
              )}
              {index === currentIndex && isPlaying && (
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex justify-between text-xs text-white/60">
          <div>
            <p className="mb-1">Total songs: {songs.length}</p>
            <p>Liked songs: {likedSongs.length}</p>
          </div>
          <div className="text-right">
            <p className="mb-1">Total duration: {formatTotalDuration(songs)}</p>
            <p>{isShuffleOn ? 'Shuffle: On' : 'Shuffle: Off'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistWidget;
