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
      {/* 标题 */}
      <div className="absolute top-4 md:top-8 left-1/2 -translate-x-1/2 z-10">
        <h1 className="font-['Playfair_Display'] text-2xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 drop-shadow-lg whitespace-nowrap">
          3D 照片画廊
        </h1>
      </div>

      {/* 底部控制栏 - PC */}
      <div className="absolute bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block">
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
              拖拽旋转 · 滚轮缩放 · 点击查看详情
            </p>
          </div>
        </div>
      </div>

      {/* 手机端：顶部右上角自动旋转按钮 */}
      <div className="absolute top-4 right-4 md:hidden z-30">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 text-white text-sm font-['Inter'] font-medium transition-all active:scale-95 shadow-lg shadow-black/30"
        >
          {autoRotate ? <Pause size={16} /> : <Play size={16} />}
          <span>{autoRotate ? '暂停' : '旋转'}</span>
        </button>
      </div>

      {/* 照片详情弹窗 */}
      {selectedPhoto && (
        <div 
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm cursor-pointer p-0 md:p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClosePhoto();
            }
          }}
        >
          <div className="glass-panel w-full h-full md:max-w-2xl md:w-full md:h-auto mx-0 md:mx-4 p-4 md:p-6 rounded-none md:rounded-3xl bg-black/70 border border-white/20 shadow-2xl cursor-default flex flex-col overflow-y-auto">
            <div className="flex justify-between items-start mb-3 md:mb-4">
              <div>
                <h2 className="font-['Playfair_Display'] text-xl md:text-3xl font-bold text-white">
                  {selectedPhoto.title}
                </h2>
                <p className="font-['Inter'] text-yellow-400 text-sm md:text-base mt-1">
                  by {selectedPhoto.author}
                </p>
              </div>
              <button
                onClick={onClosePhoto}
                className="p-2 rounded-full hover:bg-white/10 transition-colors -mr-1 -mt-1"
              >
                <X size={28} className="text-white" />
              </button>
            </div>
            <div className="rounded-xl overflow-hidden mb-3 md:mb-4 flex-shrink-0">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="w-full max-h-[50vh] md:max-h-[60vh] object-contain bg-black/30"
              />
            </div>
            <p className="font-['Inter'] text-white/80 text-sm md:text-lg leading-relaxed">
              {selectedPhoto.description}
            </p>
          </div>
        </div>
      )}
    </>
  );
}