import { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music as MusicIcon, ChevronUp, ChevronDown } from 'lucide-react';
import { Music, MusicGenre } from '../data/musics';
import { playMusic, stopMusic, setVolume } from '../utils/AmbientMusic';

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
  const [volume, setVolumeState] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);

  // 控制播放/停止
  useEffect(() => {
    if (isPlaying) {
      playMusic(currentMusic.genre as MusicGenre);
    } else {
      stopMusic();
    }
    return () => {
      stopMusic();
    };
  }, [isPlaying, currentMusic.genre]);

  // 控制音量
  useEffect(() => {
    setVolume(isMuted ? 0 : volume);
  }, [volume, isMuted]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolumeState(v);
    if (v > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // ===== PC 端完整播放器 =====
  const DesktopPlayer = (
    <div className="glass-panel px-6 py-4 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl min-w-[320px]">
      {/* 当前播放音乐信息 */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl shrink-0">
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
          <button onClick={onPrevious} className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white">
            <SkipBack size={20} />
          </button>
          <button onClick={onPlayPause} className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all text-white shadow-lg hover:scale-105">
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button onClick={onNext} className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white">
            <SkipForward size={20} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={toggleMute} className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white">
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <input type="range" min="0" max="1" step="0.01" value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white" />
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

      {showPlaylist && <Playlist musics={musics} currentMusic={currentMusic} isPlaying={isPlaying} onSelect={onSelectMusic} onClose={() => setShowPlaylist(false)} />}
    </div>
  );

  // ===== 手机端迷你播放器 =====
  const MobilePlayer = (
    <div className="w-full max-w-[380px] mx-auto">
      {/* 迷你控制条 */}
      <div className={`glass-panel backdrop-blur-xl bg-black/40 border border-white/20 shadow-2xl transition-all duration-300 ${mobileExpanded ? 'rounded-2xl p-3' : 'rounded-full px-4 py-2'}`}>
        <div className="flex items-center gap-3">
          {/* 播放/暂停 */}
          <button
            onClick={onPlayPause}
            className="p-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shrink-0 active:scale-90 transition-transform"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>

          {/* 音乐信息（点击展开） */}
          <button
            onClick={() => setMobileExpanded(!mobileExpanded)}
            className="flex-1 min-w-0 text-left"
          >
            <p className="font-['Inter'] text-xs font-medium text-white truncate">
              {currentMusic.title} - {currentMusic.artist}
            </p>
          </button>

          {/* 下一首 */}
          <button onClick={onNext} className="p-2 rounded-full text-white/70 active:text-white shrink-0">
            <SkipForward size={18} />
          </button>

          {/* 展开/收起 */}
          <button
            onClick={() => setMobileExpanded(!mobileExpanded)}
            className="p-1 rounded-full text-white/50 shrink-0"
          >
            {mobileExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </button>
        </div>

        {/* 展开的播放列表 */}
        {mobileExpanded && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <button onClick={onPrevious} className="p-1.5 rounded-lg text-white/60 active:text-white">
                <SkipBack size={16} />
              </button>
              <button onClick={toggleMute} className="p-1.5 rounded-lg text-white/60 active:text-white">
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <input type="range" min="0" max="1" step="0.01" value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer" />
            </div>
            <Playlist musics={musics} currentMusic={currentMusic} isPlaying={isPlaying} onSelect={(m) => { onSelectMusic(m); setMobileExpanded(false); }} onClose={() => {}} />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* PC 端：左侧面板 */}
      <div className="absolute left-6 bottom-8 z-10 hidden md:block">
        {DesktopPlayer}
      </div>

      {/* 手机端：底部浮动条 */}
      <div className="absolute bottom-[5.5rem] md:hidden left-0 right-0 z-10 px-4">
        {MobilePlayer}
      </div>
    </>
  );
}

// 播放列表组件（桌面和手机共用）
function Playlist({ musics, currentMusic, isPlaying, onSelect, onClose }: {
  musics: Music[];
  currentMusic: Music;
  isPlaying: boolean;
  onSelect: (m: Music) => void;
  onClose: () => void;
}) {
  return (
    <div className="mt-4 max-h-48 md:max-h-60 overflow-y-auto space-y-1.5 md:space-y-2">
      {musics.map((music) => (
        <button
          key={music.id}
          onClick={() => { onSelect(music); onClose(); }}
          className={`w-full p-2.5 md:p-3 rounded-lg transition-all flex items-center gap-2 md:gap-3 ${
            music.id === currentMusic.id
              ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-500/50'
              : 'bg-white/5 hover:bg-white/10 border border-transparent'
          }`}
        >
          <span className="text-base md:text-xl shrink-0">{music.cover}</span>
          <div className="flex-1 text-left min-w-0">
            <p className="font-['Inter'] text-xs md:text-sm font-medium text-white truncate">{music.title}</p>
            <p className="font-['Inter'] text-[10px] md:text-xs text-white/60 truncate">{music.artist}</p>
          </div>
          <span className="px-1.5 md:px-2 py-0.5 md:py-1 rounded text-[10px] md:text-xs bg-white/10 text-white/80 font-['Inter'] shrink-0">{music.genre}</span>
          {music.id === currentMusic.id && isPlaying && (
            <div className="flex items-center gap-px shrink-0">
              <div className="w-0.5 md:w-1 h-2 md:h-3 bg-purple-500 rounded animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-0.5 md:w-1 h-3 md:h-4 bg-pink-500 rounded animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-0.5 md:w-1 h-1.5 md:h-2 bg-purple-500 rounded animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          )}
        </button>
      ))}
    </div>
  );
}