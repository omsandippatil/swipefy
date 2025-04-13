
import React from 'react';
import { Music, TrendingUp, BarChart } from 'lucide-react';

const SidebarLibrary: React.FC = () => {
  return (
    <div className="w-1/6 h-full max-h-[85vh] hidden md:block mr-4">
      <div className="glass rounded-lg border border-white/10 p-4 mb-4">
        <div className="flex items-center gap-2 mb-6">
          <Music size={18} className="text-primary" />
          <h3 className="text-white text-lg font-medium">Your Library</h3>
        </div>
        <ul className="space-y-3">
          {['Recent Plays', 'Downloaded', 'Local Files', 'Artists', 'Albums', 'Podcasts'].map((item) => (
            <li key={item} className="flex items-center gap-2 text-white/70 hover:text-white cursor-pointer transition-colors">
              <div className="w-1 h-6 rounded-full bg-gradient-to-b from-primary/30 to-transparent"></div>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        
        <div className="mt-6 pt-4 border-t border-white/10">
          <h4 className="text-white/60 text-xs mb-3 uppercase">Quick Access</h4>
          <div className="grid grid-cols-2 gap-2">
            {['Liked Songs', 'Discover', 'New Releases', 'Trending'].map((item) => (
              <div key={item} className="glass p-2 rounded-md text-xs text-white/80 hover:text-white cursor-pointer transition-colors text-center">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="glass rounded-lg border border-white/10 p-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={18} className="text-primary" />
          <h3 className="text-white text-sm font-medium">Song Analytics</h3>
        </div>
        
        <div className="flex flex-col gap-3">
          <div className="flex justify-between text-xs">
            <span className="text-white/60">Your top genre</span>
            <span className="text-white">Electronic</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-gradient-to-r from-primary to-primary/50 rounded-full"></div>
          </div>
          
          <div className="flex justify-between text-xs mt-2">
            <span className="text-white/60">Weekly plays</span>
            <span className="text-white">43 songs</span>
          </div>
          <div className="flex items-end h-12 gap-1">
            {[3, 5, 8, 7, 9, 6, 4].map((height, i) => (
              <div 
                key={i}
                className="flex-1 bg-white/10 hover:bg-primary/30 transition-colors rounded-t"
                style={{ height: `${height * 10}%` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarLibrary;
