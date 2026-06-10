import { useState } from 'react';
import { Sparkles } from 'lucide-react';

type LayoutType = 'spiral' | 'helix' | 'heart' | 'torus' | 'flower' | 'wave';

interface LayoutSwitcherProps {
  currentLayout: LayoutType;
  onLayoutChange: (layout: LayoutType) => void;
}

const layouts: { type: LayoutType; icon: string; name: string; description: string; animation: string; effect: string }[] = [
  { 
    type: 'spiral', 
    icon: '🌀', 
    name: '螺旋',
    description: '从下往上盘旋上升，像星系旋臂',
    animation: '上下浮动 + 径向脉动',
    effect: '🌟 星空轨道'
  },
  { 
    type: 'helix', 
    icon: '🧬', 
    name: '双螺旋',
    description: '完美的生命螺旋结构',
    animation: '交替起伏 + 呼吸缩放',
    effect: '💫 生命律动'
  },
  { 
    type: 'heart', 
    icon: '💖', 
    name: '心形',
    description: '浪漫的心形图案',
    animation: '心跳脉动 + 色彩变幻',
    effect: '💓 心动时刻'
  },
  { 
    type: 'torus', 
    icon: '💫', 
    name: '环形',
    description: '波动的环形轨迹',
    animation: '波浪起伏 + 能量脉冲',
    effect: '⚡ 能量波动'
  },
  { 
    type: 'flower', 
    icon: '🌸', 
    name: '花瓣',
    description: '绽放的花瓣形态',
    animation: '绽放呼吸 + 色彩流转',
    effect: '🌺 花瓣绽放'
  },
  { 
    type: 'wave', 
    icon: '🌊', 
    name: '波浪',
    description: '流动的波浪效果',
    animation: '海浪涌动 + 复合波纹',
    effect: '🌊 海浪律动'
  }
];

export default function LayoutSwitcher({ currentLayout, onLayoutChange }: LayoutSwitcherProps) {
  const [showLayouts, setShowLayouts] = useState(false);
  
  const currentLayoutInfo = layouts.find(l => l.type === currentLayout);

  return (
    <>
      {/* ===== PC 端：右侧面板 ===== */}
      <div className="absolute right-6 bottom-8 z-10 hidden md:block">
        <div className="glass-panel px-6 py-4 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">{currentLayoutInfo?.icon}</div>
            <div className="flex-1">
              <p className="font-['Inter'] text-white font-medium">
                {currentLayoutInfo?.name} 布局
              </p>
              <p className="font-['Inter'] text-xs text-white/60">
                {currentLayoutInfo?.description}
              </p>
              {currentLayoutInfo?.animation && (
                <p className="font-['Inter'] text-xs text-purple-400 mt-1 flex items-center gap-1">
                  <span>✨</span>
                  <span>{currentLayoutInfo.animation}</span>
                </p>
              )}
              {currentLayoutInfo?.effect && (
                <p className="font-['Inter'] text-xs text-pink-400 mt-1 flex items-center gap-1">
                  <span>{currentLayoutInfo.effect.split(' ')[0]}</span>
                  <span>{currentLayoutInfo.effect.split(' ')[1]}</span>
                </p>
              )}
            </div>
          </div>

          <button
            onClick={() => setShowLayouts(!showLayouts)}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/40 hover:to-pink-500/40 border border-purple-500/30 text-white font-medium transition-all flex items-center justify-center gap-2"
          >
            <Sparkles size={18} />
            <span className="font-['Inter']">切换布局</span>
          </button>

          {showLayouts && (
            <div className="mt-4 grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
              {layouts.map((layout) => (
                <button
                  key={layout.type}
                  onClick={() => {
                    onLayoutChange(layout.type);
                    setShowLayouts(false);
                  }}
                  className={`p-3 rounded-xl transition-all ${
                    layout.type === currentLayout
                      ? 'bg-gradient-to-br from-purple-500/40 to-pink-500/40 border-2 border-purple-500/60'
                      : 'bg-white/5 hover:bg-white/10 border border-transparent hover:border-purple-500/30'
                  }`}
                >
                  <div className="text-2xl mb-1">{layout.icon}</div>
                  <p className="font-['Inter'] text-sm font-medium text-white">
                    {layout.name}
                  </p>
                  <p className="font-['Inter'] text-xs text-white/50 mt-1 line-clamp-2">
                    {layout.description}
                  </p>
                  <p className="font-['Inter'] text-xs text-purple-400 mt-1">
                    ✨ {layout.animation}
                  </p>
                  <p className="font-['Inter'] text-xs text-pink-400 mt-1">
                    {layout.effect}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ===== 手机端：底部横向滚动条 ===== */}
      <div className="absolute bottom-36 md:hidden left-0 right-0 z-10">
        {/* 横向滚动布局选择器 */}
        <div className="flex gap-1.5 overflow-x-auto px-4 pb-1 scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] snap-x snap-mandatory">
          {layouts.map((layout) => (
            <button
              key={layout.type}
              onClick={() => onLayoutChange(layout.type)}
              className={`shrink-0 snap-start flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-['Inter'] font-medium whitespace-nowrap transition-all active:scale-95 ${
                layout.type === currentLayout
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-white/10 backdrop-blur-md text-white/70 border border-white/20'
              }`}
            >
              <span className="text-sm">{layout.icon}</span>
              <span>{layout.name}</span>
            </button>
          ))}
        </div>

        {/* 当前布局效果标签 */}
        <div className="flex justify-center mt-1.5 pointer-events-none">
          <span className="font-['Inter'] text-[10px] text-white/40 bg-white/5 rounded-full px-2.5 py-0.5 backdrop-blur-sm">
            {currentLayoutInfo?.effect || ''}
          </span>
        </div>
      </div>
    </>
  );
}
