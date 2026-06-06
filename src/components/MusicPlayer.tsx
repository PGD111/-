import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music as MusicIcon } from 'lucide-react';
import { Music } from '../data/musics';

interface MusicPlayerProps {
  musics: Music[];
  currentMusic: Music;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSelectMusic: (music: Music) => void;
}

export default function MusicPlayer({
  musics,
  currentMusic,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  onSelectMusic
}: MusicPlayerProps) {
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={currentMusic.url}
        autoPlay={isPlaying}
        loop
      />
      
      <div className="absolute left-6 bottom-8 z-10">
        <div className="glass-panel px-6 py-4 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl min-w-[320px]">
          {/* 当前播放音乐信息 */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
              {currentMusic.cover}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-['Inter'] font-semibold text-white truncate">
                {currentMusic.title}
              </h3>
              <p className="font-['Inter'] text-sm text-white/70 truncate">
                {currentMusic.artist}
              </p>
            </div>
          </div>

          {/* 控制按钮 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={onPrevious}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white"
              >
                <SkipBack size={20} />
              </button>
              <button
                onClick={onPlayPause}
                className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all text-white shadow-lg hover:scale-105"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              <button
                onClick={onNext}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white"
              >
                <SkipForward size={20} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              />
            </div>
          </div>

          {/* 播放列表按钮 */}
          <button
            onClick={() => setShowPlaylist(!showPlaylist)}
            className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/40 hover:to-pink-500/40 border border-purple-500/30 text-white font-medium transition-all flex items-center justify-center gap-2"
          >
            <MusicIcon size={18} />
            <span className="font-['Inter']">播放列表 ({musics.length})</span>
          </button>

          {/* 播放列表 */}
          {showPlaylist && (
            <div className="mt-4 max-h-60 overflow-y-auto space-y-2">
              {musics.map((music) => (
                <button
                  key={music.id}
                  onClick={() => {
                    onSelectMusic(music);
                    setShowPlaylist(false);
                  }}
                  className={`w-full p-3 rounded-lg transition-all flex items-center gap-3 ${
                    music.id === currentMusic.id
                      ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-500/50'
                      : 'bg-white/5 hover:bg-white/10 border border-transparent'
                  }`}
                >
                  <span className="text-xl">{music.cover}</span>
                  <div className="flex-1 text-left">
                    <p className="font-['Inter'] text-sm font-medium text-white truncate">
                      {music.title}
                    </p>
                    <p className="font-['Inter'] text-xs text-white/60 truncate">
                      {music.artist}
                    </p>
                  </div>
                  <span className="px-2 py-1 rounded text-xs bg-white/10 text-white/80 font-['Inter']">
                    {music.genre}
                  </span>
                  {music.id === currentMusic.id && isPlaying && (
                    <div className="flex items-center gap-0.5">
                      <div className="w-1 h-3 bg-purple-500 rounded animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1 h-4 bg-pink-500 rounded animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1 h-2 bg-purple-500 rounded animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
