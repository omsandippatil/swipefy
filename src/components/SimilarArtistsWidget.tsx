
import React from 'react';
import { Radio, Headphones } from 'lucide-react';

const SimilarArtistsWidget: React.FC = () => {
  return (
    <div className="glass rounded-lg border border-white/10 p-4 h-full max-h-[40vh]">
      <div className="flex items-center gap-2 mb-4">
        <Radio size={18} className="text-primary" />
        <h3 className="text-white text-lg font-medium">Similar Artists</h3>
      </div>
      
      <div className="space-y-3">
        {['Cosmic Drift', 'Lunar Echo', 'The Drift', 'Urban Souls', 'Neon Pulse'].map((artist) => (
          <div key={artist} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-md transition-colors">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Headphones size={16} className="text-primary" />
            </div>
            <div>
              <p className="text-white text-sm">{artist}</p>
              <p className="text-white/50 text-xs">Artist</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarArtistsWidget;
