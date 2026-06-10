export type MusicGenre = 'Chill' | 'Lo-Fi' | 'Ambient' | 'Piano' | 'Acoustic';

export interface Music {
  id: string;
  title: string;
  artist: string;
  genre: MusicGenre;
  cover: string;
}

// 音乐数据 - 使用内置 Web Audio 合成器，无需外部文件
export const musics: Music[] = [
  {
    id: '1',
    title: 'Morning Coffee',
    artist: 'Chillhop',
    cover: '☕',
    genre: 'Chill'
  },
  {
    id: '2',
    title: 'Summer Breeze',
    artist: 'Lo-Fi Beats',
    cover: '🌬️',
    genre: 'Lo-Fi'
  },
  {
    id: '3',
    title: 'Ambient Dreams',
    artist: 'Nature Sounds',
    cover: '🌙',
    genre: 'Ambient'
  },
  {
    id: '4',
    title: 'Calm Piano',
    artist: 'Relaxing Music',
    cover: '🎹',
    genre: 'Piano'
  },
  {
    id: '5',
    title: 'Acoustic Breeze',
    artist: 'Benjamin Tissot',
    cover: '🎸',
    genre: 'Acoustic'
  }
];