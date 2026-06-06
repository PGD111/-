# 3D 照片墙 - 交互式画廊

一个精美的 3D 交互式照片墙，支持多种创意布局和音乐播放功能。

## ✨ 功能特点

### 🎨 创意照片布局
支持 **6 种独特的照片布局方式**，可以通过右侧面板手动切换：

1. 🌀 **螺旋布局 (Spiral)** - 从下往上盘旋上升，像星系旋臂
2. 🧬 **DNA双螺旋 (Helix)** - 完美的生命螺旋结构
3. 💖 **心形布局 (Heart)** - 浪漫的心形图案
4. 💫 **环形布局 (Torus)** - 波动的环形轨迹
5. 🌸 **花瓣布局 (Flower)** - 绽放的花瓣形态
6. 🌊 **波浪布局 (Wave)** - 流动的波浪效果

### 🎵 音乐播放功能
- 🎹 5 首精选背景音乐
- ▶️ 播放/暂停控制
- ⏮️ 上一曲/下一曲切换
- 🔊 音量调节和静音功能
- 📜 完整的播放列表管理
- 💫 当前播放指示器动画

### 🖼️ 照片交互
- 鼠标拖拽旋转视角
- 滚轮缩放
- 照片悬停放大效果
- 点击查看详情
- 自动旋转（可暂停）

### 🎭 视觉效果
- 深色宇宙主题背景
- 星空效果
- 三色光源（金色、粉色、青色）
- 玻璃态 UI 设计
- 霓虹渐变效果
- 平滑的布局切换动画

## 🚀 快速开始

### 安装依赖
```bash
cd 3d-photo-gallery
npm install
```

### 启动开发服务器
```bash
npm run dev
```

在浏览器中打开 http://localhost:5173/

## 📁 项目结构

```
3d-photo-gallery/
├── src/
│   ├── components/
│   │   ├── PhotoCard.tsx      # 3D 照片卡片组件
│   │   ├── Scene.tsx           # 3D 场景和布局算法
│   │   ├── ControlPanel.tsx    # 照片控制面板
│   │   ├── MusicPlayer.tsx     # 音乐播放器
│   │   └── LayoutSwitcher.tsx  # 布局切换器
│   ├── data/
│   │   ├── photos.ts           # 照片数据
│   │   └── musics.ts           # 音乐数据
│   ├── types.ts               # TypeScript 类型定义
│   ├── App.tsx                # 主应用
│   ├── App.css                # 应用样式
│   └── main.tsx               # 入口文件
├── package.json
└── README.md
```

## 🎮 操作指南

### 布局控制
- **查看当前布局**: 右下角显示当前布局名称和图标
- **切换布局**: 点击"切换布局"按钮打开布局选择面板
- **选择新布局**: 点击想要的布局样式，照片会自动重新排列

### 照片交互
- **旋转视角**: 鼠标左键拖拽
- **缩放**: 鼠标滚轮
- **查看照片详情**: 点击任意照片

### 音乐控制
- **播放/暂停**: 点击左下角音乐播放器的中央按钮
- **切换音乐**: 使用左右箭头按钮或打开播放列表选择
- **调节音量**: 拖动音量滑块或点击静音按钮

### 全局控制
- **暂停自动旋转**: 点击顶部控制面板的暂停按钮
- **继续自动旋转**: 点击播放按钮

## 🛠️ 技术栈

- **React 18** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 快速构建工具
- **Three.js** - 3D 渲染
- **@react-three/fiber** - React Three.js 渲染器
- **@react-three/drei** - Three.js 辅助工具
- **Tailwind CSS** - 样式框架
- **lucide-react** - 图标库

## 📝 自定义照片

编辑 `src/data/photos.ts` 文件来添加你自己的照片：

```typescript
export const photos: Photo[] = [
  {
    id: '1',
    url: '你的图片URL',
    title: '照片标题',
    description: '照片描述',
    author: '作者名'
  },
  // 添加更多照片...
];
```

## 🎵 添加音乐

编辑 `src/data/musics.ts` 文件来添加你自己的音乐：

```typescript
export const musics: Music[] = [
  {
    id: '1',
    title: '音乐标题',
    artist: '艺术家',
    url: '音乐文件URL或在线地址',
    cover: '🎵',
    genre: '音乐类型'
  },
  // 添加更多音乐...
];
```

## 💡 布局算法详解

### 1. 螺旋布局 (Spiral)
使用极坐标角度和线性高度实现从下往上的螺旋效果：
- 角度随索引线性增加
- 高度从中心向上下延伸
- 半径随高度略微收缩

### 2. DNA双螺旋 (Helix)
模拟 DNA 的双螺旋结构：
- 两条螺旋相互缠绕
- 使用正弦和余弦函数实现交替位置
- 垂直均匀分布

### 3. 心形布局 (Heart)
使用心形曲线的极坐标方程：
- 参数方程：x = 16sin³(t), y = 13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t)
- 缩放适配球体半径
- 保持 z 轴深度

### 4. 环形布局 (Torus)
使用圆环面的参数方程：
- 基础圆形轨迹
- 添加垂直波动
- 形成起伏的环形

### 5. 花瓣布局 (Flower)
多层花瓣结构：
- 分层排列
- 每层 6 个花瓣
- 使用正弦函数调整高度

### 6. 波浪布局 (Wave)
复合正弦波效果：
- 水平方向传播
- 多频率叠加
- 形成流动感

## 🎯 性能优化

- 使用 `useRef` 优化动画性能
- 使用 `OrbitControls` 的阻尼效果
- 优化的纹理加载
- 高效的状态管理

## 📄 许可证

MIT License

## 🙏 致谢

- 照片来源: [Unsplash](https://unsplash.com/)
- 音乐来源: [SoundHelix](https://www.soundhelix.com/)
- 图标来源: [Lucide](https://lucide.dev/)
- emoji 图标: [Twemoji](https://twemoji.twitter.com/)

---

Made with ❤️ using React + Three.js
