import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronLeft, Disc, Heart, SkipBack, SkipForward, Play, Pause } from 'lucide-react';
import { formatTime } from '@/utils/formatTime';
import { Song } from '@/data/songs';
import { motion } from 'framer-motion';

const NowPlaying: React.FC = () => {
  const location = useLocation();
  const { currentSong, isPlaying: initialPlayState } = location.state || {};
  const [isPlaying, setIsPlaying] = useState(initialPlayState || false);
  const [currentTime, setCurrentTime] = useState(0);
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentSong) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= currentSong.duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, currentSong]);
  
  if (!currentSong) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-black flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <div className="glass rounded-full p-6 mb-4 mx-auto w-fit">
            <Disc size={40} className="text-primary animate-spin-slow" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-3">No song playing</h2>
          <p className="text-white/60 max-w-xs mx-auto mb-6">
            Return to the home screen to select a song to play
          </p>
          <Link 
            to="/" 
            className="px-6 py-2.5 bg-primary text-black rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            Back to Discover
          </Link>
        </div>
      </div>
    );
  }
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const progress = (currentTime / currentSong.duration) * 100;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-black flex flex-col">
      <header className="pt-4 pb-2 px-4 glass border-b border-white/10">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-white/70 hover:text-primary transition-colors">
              <ChevronLeft size={18} />
            </Link>
            <h1 className="text-xl font-bold text-white">
              <span className="text-gradient">Now</span>
              <span className="text-white"> Playing</span>
            </h1>
          </div>
        </div>
      </header>
      
      <main className="flex-1 px-4 pt-8 pb-20 flex flex-col items-center justify-center">
        <div className="max-w-xs w-full mx-auto">
          <div className="aspect-square relative mb-8 music-card-shadow">
            <img 
              src={currentSong.coverArt} 
              alt={currentSong.title} 
              className="w-full h-full object-cover rounded-2xl"
            />
            
            {/* Vinyl disc overlay */}
            <div className={`absolute inset-0 flex items-center justify-center ${isPlaying ? 'opacity-100' : 'opacity-60'}`}>
              <div className="vinyl-container">
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
            
            <div className={`absolute inset-0 flex items-center justify-center rounded-2xl ${isPlaying ? 'backdrop-blur-sm bg-black/30' : 'opacity-0'}`}>
              <div className={`relative w-16 h-16 ${isPlaying ? 'animate-pulse-glow' : ''}`}>
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
                <div className="absolute inset-2 rounded-full bg-primary/40"></div>
                <div className="absolute inset-4 rounded-full bg-primary/60"></div>
                <div className="absolute inset-6 rounded-full bg-primary"></div>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-1">{currentSong.title}</h2>
            <p className="text-gray-400">{currentSong.artist}</p>
          </div>
          
          <div className="mb-8">
            <div className="relative h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-primary rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(currentSong.duration)}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-10">
            <button 
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Previous"
            >
              <SkipBack size={24} />
            </button>
            
            <button 
              onClick={togglePlayPause}
              className="bg-primary text-black p-4 rounded-full hover:bg-primary/90 transition-colors shadow-lg"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-0.5" />}
            </button>
            
            <button 
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Next"
            >
              <SkipForward size={24} />
            </button>
          </div>
          
          <div className="flex justify-center mt-8">
            <button className="flex items-center gap-2 text-primary">
              <Heart size={18} fill="currentColor" />
              <span className="text-sm font-medium">Added to Favorites</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NowPlaying;
