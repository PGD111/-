import { Play, Pause, X } from 'lucide-react';
import { Photo } from '../types';

interface ControlPanelProps {
  autoRotate: boolean;
  setAutoRotate: (value: boolean) => void;
  selectedPhoto: Photo | null;
  onClosePhoto: () => void;
}

export default function ControlPanel({ autoRotate, setAutoRotate, selectedPhoto, onClosePhoto }: ControlPanelProps) {
  return (
    <>
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
        <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 drop-shadow-lg">
          3D 照片画廊
        </h1>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="glass-panel px-6 py-4 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-500/20 to-pink-500/20 hover:from-yellow-500/40 hover:to-pink-500/40 border border-yellow-500/30 text-white transition-all duration-300 hover:scale-105"
            >
              {autoRotate ? <Pause size={20} /> : <Play size={20} />}
              <span className="font-['Inter'] font-medium">{autoRotate ? '暂停' : '播放'}</span>
            </button>
            <div className="h-8 w-px bg-white/20" />
            <p className="font-['Inter'] text-white/80 text-sm">
              拖拽旋转 • 滚轮缩放 • 点击查看详情
            </p>
          </div>
        </div>
      </div>

      {selectedPhoto && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="glass-panel max-w-2xl w-full mx-4 p-6 rounded-3xl bg-black/70 border border-white/20 shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-white">
                  {selectedPhoto.title}
                </h2>
                <p className="font-['Inter'] text-yellow-400 mt-1">
                  by {selectedPhoto.author}
                </p>
              </div>
              <button
                onClick={onClosePhoto}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X size={24} className="text-white" />
              </button>
            </div>
            <div className="rounded-xl overflow-hidden mb-4">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="w-full h-70 object-cover"
              />
            </div>
            <p className="font-['Inter'] text-white/80 text-lg leading-relaxed">
              {selectedPhoto.description}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
