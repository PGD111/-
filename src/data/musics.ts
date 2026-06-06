export interface Music {
  id: string;
  title: string;
  artist: string;
  url: string;
  cover: string;
  genre: string;
}

// 使用更稳定的免费音乐资源
export const musics: Music[] = [
  {
    id: '1',
    title: 'Morning Coffee',
    artist: 'Chillhop',
    url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a2f5379e.mp3?filename=morning-coffee-117140.mp3',
    cover: '☕',
    genre: 'Chill'
  },
  {
    id: '2',
    title: 'Summer Breeze',
    artist: 'Lo-Fi Beats',
    url: 'https://cdn.pixabay.com/download/audio/2022/07/31/audio_0fe1651424.mp3?filename=summer-breeze-122778.mp3',
    cover: '🌬️',
    genre: 'Lo-Fi'
  },
  {
    id: '3',
    title: 'Ambient Dreams',
    artist: 'Nature Sounds',
    url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_6eb0c8781c.mp3?filename=ambient-dreams-10837.mp3',
    cover: '🌙',
    genre: 'Ambient'
  },
  {
    id: '4',
    title: 'Calm Piano',
    artist: 'Relaxing Music',
    url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_cf82612b7c.mp3?filename=calm-piano-117139.mp3',
    cover: '🎹',
    genre: 'Piano'
  },
  {
    id: '5',
    title: 'Acoustic Breeze',
    artist: 'Benjamin Tissot',
    url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_103473e063.mp3?filename=acoustic-breeze-6526.mp3',
    cover: '🎸',
    genre: 'Acoustic'
  }
];
