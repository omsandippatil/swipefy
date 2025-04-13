
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronLeft, Heart } from 'lucide-react';
import { songs, Song } from '@/data/songs';

interface FavoritesProps {
  likedSongs?: string[];
}

const Favorites: React.FC<FavoritesProps> = ({ likedSongs = [] }) => {
  const location = useLocation();
  const likedSongsList = location.state?.likedSongs || likedSongs;
  const likedSongsData = songs.filter(song => likedSongsList.includes(song.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-black flex flex-col">
      <header className="pt-4 pb-2 px-4 glass border-b border-white/10">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-white/70 hover:text-primary transition-colors">
              <ChevronLeft size={18} />
            </Link>
            <h1 className="text-xl font-bold text-white">
              <span className="text-gradient">Your</span>
              <span className="text-white"> Favorites</span>
            </h1>
          </div>
        </div>
      </header>
      
      <main className="flex-1 p-4 overflow-auto">
        {likedSongsData.length > 0 ? (
          <div className="max-w-md mx-auto">
            <div className="grid gap-3">
              {likedSongsData.map((song) => (
                <FavoriteCard key={song.id} song={song} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
            <div className="glass rounded-full p-6 opacity-80">
              <Heart size={40} className="text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-white">No favorites yet</h2>
            <p className="text-white/60 max-w-xs">
              Swipe right on songs you love to add them to your favorites
            </p>
            <Link 
              to="/" 
              className="mt-4 px-6 py-2.5 bg-primary text-black rounded-full font-medium hover:bg-primary/90 transition-colors"
            >
              Discover Music
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

const FavoriteCard: React.FC<{ song: Song }> = ({ song }) => {
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
        <Heart size={16} className="text-primary fill-primary" />
      </div>
    </div>
  );
};

export default Favorites;
