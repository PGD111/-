import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { photos } from './data/photos';
import { musics, Music } from './data/musics';
import { Photo } from './types';
import Scene from './components/Scene';
import ControlPanel from './components/ControlPanel';
import MusicPlayer from './components/MusicPlayer';
import LayoutSwitcher from './components/LayoutSwitcher';
import './App.css';

// 布局类型
type LayoutType = 'spiral' | 'helix' | 'heart' | 'torus' | 'flower' | 'wave';

function App() {
  const [autoRotate, setAutoRotate] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentLayout, setCurrentLayout] = useState<LayoutType>('spiral');
  
  // 音乐播放状态
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMusic, setCurrentMusic] = useState<Music>(musics[0]);

  const handleNextMusic = () => {
    const currentIndex = musics.findIndex(m => m.id === currentMusic.id);
    const nextIndex = (currentIndex + 1) % musics.length;
    setCurrentMusic(musics[nextIndex]);
  };

  const handlePreviousMusic = () => {
    const currentIndex = musics.findIndex(m => m.id === currentMusic.id);
    const prevIndex = (currentIndex - 1 + musics.length) % musics.length;
    setCurrentMusic(musics[prevIndex]);
  };

  const handleSelectMusic = (music: Music) => {
    setCurrentMusic(music);
    setIsPlaying(true);
  };

  return (
    <div className="w-full h-screen relative overflow-hidden">
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 50 }}>
        <Scene
          photos={photos}
          autoRotate={autoRotate}
          onPhotoClick={setSelectedPhoto}
          layoutType={currentLayout}
        />
      </Canvas>
      
      <ControlPanel
        autoRotate={autoRotate}
        setAutoRotate={setAutoRotate}
        selectedPhoto={selectedPhoto}
        onClosePhoto={() => setSelectedPhoto(null)}
      />
      
      <MusicPlayer
        musics={musics}
        currentMusic={currentMusic}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onNext={handleNextMusic}
        onPrevious={handlePreviousMusic}
        onSelectMusic={handleSelectMusic}
      />
      
      <LayoutSwitcher
        currentLayout={currentLayout}
        onLayoutChange={setCurrentLayout}
      />
    </div>
  );
}

export default App;
