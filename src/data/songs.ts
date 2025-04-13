
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
    coverArt: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=500&auto=format&fit=crop",
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
  },
  {
    id: "8",
    title: "Sunset Memories",
    artist: "Golden Hour",
    album: "Horizon",
    coverArt: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=500&auto=format&fit=crop",
    audioSrc: "/song8.mp3",
    duration: 205,
  },
  {
    id: "9",
    title: "Urban Jungle",
    artist: "Street Beats",
    album: "Concrete",
    coverArt: "https://images.unsplash.com/photo-1501761095094-94d36f57edbb?q=80&w=500&auto=format&fit=crop",
    audioSrc: "/song9.mp3",
    duration: 192,
  },
  {
    id: "10",
    title: "Neon Lights",
    artist: "Cyber Beat",
    album: "Digital Dreams",
    coverArt: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=500&auto=format&fit=crop",
    audioSrc: "/song10.mp3",
    duration: 230,
  },
  {
    id: "11",
    title: "Rainy Day",
    artist: "Cloudy Skies",
    album: "Monsoon",
    coverArt: "https://images.unsplash.com/photo-1501999635878-71cb5379c2d8?q=80&w=500&auto=format&fit=crop",
    audioSrc: "/song11.mp3",
    duration: 185,
  },
  {
    id: "12",
    title: "Starlight",
    artist: "Astral Projection",
    album: "Celestial",
    coverArt: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=500&auto=format&fit=crop",
    audioSrc: "/song12.mp3",
    duration: 215,
  },
  {
    id: "13",
    title: "Tropical Paradise",
    artist: "Island Vibes",
    album: "Palm Trees",
    coverArt: "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?q=80&w=500&auto=format&fit=crop",
    audioSrc: "/song13.mp3",
    duration: 200,
  },
  {
    id: "14",
    title: "Winter Wonderland",
    artist: "Frozen Echoes",
    album: "Ice Kingdom",
    coverArt: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?q=80&w=500&auto=format&fit=crop",
    audioSrc: "/song14.mp3",
    duration: 228,
  },
  {
    id: "15",
    title: "Autumn Leaves",
    artist: "Fall Breeze",
    album: "Seasons",
    coverArt: "https://images.unsplash.com/photo-1541789094913-f3809a8f3ba5?q=80&w=500&auto=format&fit=crop",
    audioSrc: "/song15.mp3",
    duration: 210,
  }
];
