
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Search as SearchIcon, Music3 } from 'lucide-react';
import { songs, Song } from '@/data/songs';

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredSongs = songs.filter(song => 
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.album.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-black flex flex-col">
      <header className="pt-4 pb-2 px-4 glass border-b border-white/10">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-white/70 hover:text-primary transition-colors">
              <ChevronLeft size={18} />
            </Link>
            <h1 className="text-xl font-bold text-white">
              <span className="text-gradient">Search</span>
            </h1>
          </div>
        </div>
      </header>
      
      <div className="p-4">
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search songs, artists, or albums..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>
      
      <main className="flex-1 p-4 overflow-auto">
        {searchTerm ? (
          <div className="max-w-md mx-auto">
            {filteredSongs.length > 0 ? (
              <div className="grid gap-3">
                {filteredSongs.map((song) => (
                  <SearchResultCard key={song.id} song={song} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="glass rounded-full p-6 mx-auto w-fit mb-4">
                  <Music3 size={32} className="text-primary/80" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">No results found</h3>
                <p className="text-white/60 max-w-xs mx-auto">
                  Try searching for something else
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-white mb-3">Suggested</h2>
            <div className="grid gap-3">
              {songs.slice(0, 5).map((song) => (
                <SearchResultCard key={song.id} song={song} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const SearchResultCard: React.FC<{ song: Song }> = ({ song }) => {
  return (
    <div className="glass rounded-xl overflow-hidden flex items-center p-2 hover:bg-white/10 transition-colors">
      <img 
        src={song.coverArt} 
        alt={song.title} 
        className="w-14 h-14 rounded-lg object-cover"
      />
      <div className="ml-3 flex-1">
        <h3 className="text-white font-medium truncate">{song.title}</h3>
        <p className="text-sm text-gray-400 truncate">{song.artist}</p>
      </div>
      <div className="ml-2 flex items-center">
        <button className="p-2 text-white/70 hover:text-primary rounded-full transition-colors">
          <Play size={16} className="ml-0.5" />
        </button>
      </div>
    </div>
  );
};

export default Search;
