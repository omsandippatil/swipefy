
import React from 'react';
import { Button } from '@/components/ui/button';

const FilterWidget: React.FC = () => {
  return (
    <div className="w-full h-full max-h-[70vh] overflow-y-auto glass rounded-lg border border-white/10 p-4 hidden md:block">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-lg font-medium">Filters</h2>
        <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
          Reset
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-white text-sm mb-2">Genre</label>
          <div className="flex flex-wrap gap-2">
            {['Pop', 'Rock', 'Hip-Hop', 'Electronic', 'R&B'].map(genre => (
              <div key={genre} className="bg-white/10 hover:bg-white/20 rounded-full px-3 py-1 text-xs text-white cursor-pointer">
                {genre}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-white text-sm mb-2">Mood</label>
          <div className="flex flex-wrap gap-2">
            {['Energetic', 'Chill', 'Happy', 'Sad', 'Focused'].map(mood => (
              <div key={mood} className="bg-white/10 hover:bg-white/20 rounded-full px-3 py-1 text-xs text-white cursor-pointer">
                {mood}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-white text-sm mb-2">Release Date</label>
          <input
            type="range"
            min="1980"
            max="2025"
            defaultValue="2025"
            className="w-full h-1 accent-primary bg-white/20 rounded-full"
          />
          <div className="flex justify-between text-xs text-white/60 mt-1">
            <span>1980</span>
            <span>2025</span>
          </div>
        </div>
        
        <Button className="w-full mt-2">Apply Filters</Button>
      </div>
    </div>
  );
};

export default FilterWidget;
