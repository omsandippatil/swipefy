
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shuffle, Repeat, Volume1 } from 'lucide-react';

interface PlayerControlsProps {
  isShuffleOn: boolean;
  isRepeatOn: boolean;
  volume: number;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  isShuffleOn,
  isRepeatOn,
  volume,
  toggleShuffle,
  toggleRepeat,
  handleVolumeChange
}) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-4">
      <Button 
        onClick={toggleShuffle}
        variant="ghost" 
        className={`p-2 h-9 ${isShuffleOn ? 'text-primary' : 'text-white/60'}`}
      >
        <Shuffle size={16} />
      </Button>
      <Button 
        onClick={toggleRepeat}
        variant="ghost" 
        className={`p-2 h-9 ${isRepeatOn ? 'text-primary' : 'text-white/60'}`}
      >
        <Repeat size={16} />
      </Button>
      <div className="flex items-center gap-2">
        <Volume1 size={16} className="text-white/60" />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="w-20 h-1 accent-primary bg-white/20 rounded-full"
        />
      </div>
    </div>
  );
};

export default PlayerControls;
