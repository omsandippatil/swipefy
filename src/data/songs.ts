
export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverArt: string;
  audioSrc: string;
  duration: number;
}

export const songs: Song[] = [
  {
    id: "1",
    title: "Midnight Vibes",
    artist: "Lunar Echo",
    album: "Neon Dreams",
    coverArt: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&auto=format&fit=crop",
    audioSrc: "/song1.mp3", // This would be a real audio file in a production app
    duration: 210, // Duration in seconds
  },
  {
    id: "2",
    title: "Ocean Waves",
    artist: "The Drift",
    album: "Coastal",
    coverArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=500&auto=format&fit=crop",
    audioSrc: "/song2.mp3",
    duration: 195,
  },
  {
    id: "3",
    title: "City Lights",
    artist: "Urban Souls",
    album: "Metropolis",
    coverArt: "https://images.unsplash.com/photo-1513829596324-4bb2800c5efb?q=80&w=500&auto=format&fit=crop",
    audioSrc: "/song3.mp3",
    duration: 240,
  },
  {
    id: "4",
    title: "Desert Wind",
    artist: "Mirage",
    album: "Oasis",
    coverArt: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&auto=format&fit=crop",
    audioSrc: "/song4.mp3",
    duration: 225,
  },
  {
    id: "5",
    title: "Stellar",
    artist: "Cosmic Drift",
    album: "Interstellar",
    coverArt: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=500&auto=format&fit=crop",
    audioSrc: "/song5.mp3",
    duration: 198,
  },
  {
    id: "6",
    title: "Mountain High",
    artist: "Peak Climbers",
    album: "Summit",
    coverArt: "https://images.unsplash.com/photo-1482442120256-9c4cf5da2734?q=80&w=500&auto=format&fit=crop",
    audioSrc: "/song6.mp3",
    duration: 183,
  },
  {
    id: "7",
    title: "Electric Dreams",
    artist: "Neon Pulse",
    album: "Synthwave",
    coverArt: "https://images.unsplash.com/photo-1517230878791-4d28214057c2?q=80&w=500&auto=format&fit=crop",
    audioSrc: "/song7.mp3",
    duration: 217,
  }
];
