
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlayCircle, AlignJustify } from 'lucide-react';
import { Song } from '@/data/songs';
import { motion } from 'framer-motion';

interface NowPlayingWidgetProps {
  currentSong: Song;
  isPlaying?: boolean;
}

const NowPlayingWidget: React.FC<NowPlayingWidgetProps> = ({ currentSong, isPlaying = false }) => {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="glass rounded-lg border border-white/10 p-4 h-full max-h-[35vh]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <PlayCircle size={18} className="text-primary" />
          <h3 className="text-white text-lg font-medium">Now Playing</h3>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <AlignJustify size={16} />
        </Button>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="relative w-28 h-28 mb-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="vinyl-container scale-[0.6]">
              <motion.div 
                className="vinyl-disc"
                animate={{ 
                  rotate: isPlaying ? 360 : 0 
                }}
                transition={{ 
                  duration: 4, 
                  repeat: isPlaying ? Infinity : 0, 
                  ease: "linear" 
                }}
              >
                <div className="vinyl-grooves"></div>
                <div 
                  className="vinyl-img" 
                  style={{ backgroundImage: `url(${currentSong.coverArt})` }}
                ></div>
                <div className="vinyl-label">
                  <div className="vinyl-hole"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        <h4 className="text-white font-medium text-lg">{currentSong.title}</h4>
        <p className="text-white/70 text-sm">{currentSong.artist}</p>
        <p className="text-white/50 text-xs">{currentSong.album}</p>
        
        <div className="w-full mt-4">
          <div className="flex justify-between text-xs text-white/60 mb-1">
            <span>1:24</span>
            <span>{formatDuration(currentSong.duration)}</span>
          </div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-[30%] bg-primary rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NowPlayingWidget;
