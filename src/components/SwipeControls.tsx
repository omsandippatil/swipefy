
import React from 'react';
import { SkipBack, SkipForward, ThumbsDown, ThumbsUp } from 'lucide-react';

interface SwipeControlsProps {
  onPrevious: () => void;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onNext: () => void;
}

const SwipeControls: React.FC<SwipeControlsProps> = ({ 
  onPrevious, 
  onSwipeLeft, 
  onSwipeRight, 
  onNext 
}) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-2 glass rounded-full py-2 px-4">
      <button
        onClick={onPrevious}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition-colors"
        aria-label="Previous"
      >
        <SkipBack size={16} className="text-white" />
      </button>
      
      <button
        onClick={onSwipeLeft}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition-colors"
        aria-label="Dislike"
      >
        <ThumbsDown size={20} className="text-red-500" />
      </button>
      
      <button
        onClick={onSwipeRight}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition-colors"
        aria-label="Like"
      >
        <ThumbsUp size={20} className="text-primary" />
      </button>
      
      <button
        onClick={onNext}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition-colors"
        aria-label="Next"
      >
        <SkipForward size={16} className="text-white" />
      </button>
    </div>
  );
};

export default SwipeControls;
