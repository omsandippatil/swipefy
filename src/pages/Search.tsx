
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Search as SearchIcon, Music3, PlayCircle } from 'lucide-react';
import { songs, Song } from '@/data/songs';

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.album.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="bg-black min-h-screen text-white p-6">
      <div className="flex items-center mb-8">
        <Link to="/" className="mr-4">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold">Search</h1>
      </div>
      
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-3 flex items-center">
          <SearchIcon size={20} className="text-white/60" />
        </div>
        <input
          type="text"
          placeholder="Songs, artists, or albums"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>
      
      <div className="mt-6">
        {searchTerm ? (
          <div>
            <p className="mb-3 text-white/60">Found {filteredSongs.length} results</p>
            {filteredSongs.length > 0 ? (
              <div className="grid gap-4">
                {filteredSongs.map((song) => (
                  <SearchResultCard key={song.id} song={song} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <Music3 size={48} className="mb-4 text-white/40" />
                <h3 className="text-xl font-semibold mb-2">No results found</h3>
                <p className="text-white/60">Try searching for something else</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-4">Suggested</h2>
            <div className="grid gap-4">
              {songs.slice(0, 6).map((song) => (
                <SearchResultCard key={song.id} song={song} />
              ))}
            </div>
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Recently Added</h2>
              <div className="grid gap-4">
                {songs.slice(7, 11).map((song) => (
                  <SearchResultCard key={song.id} song={song} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SearchResultCard: React.FC<{ song: Song }> = ({ song }) => {
  return (
    <div className="flex items-center bg-white/5 rounded-lg p-3 hover:bg-white/10 transition">
      <div className="w-12 h-12 bg-gray-700 rounded-md mr-4 flex-shrink-0 flex items-center justify-center overflow-hidden">
        {song.coverArt ? (
          <img src={song.coverArt} alt={song.title} className="w-full h-full object-cover" />
        ) : (
          <Music3 size={20} className="text-white/60" />
        )}
      </div>
      <div className="flex-grow">
        <h3 className="font-medium">{song.title}</h3>
        <p className="text-sm text-white/60">{song.artist}</p>
      </div>
      <button className="ml-2 p-2 rounded-full hover:bg-white/10">
        <PlayCircle size={24} className="text-white" />
      </button>
    </div>
  );
};

export default Search;
