import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Photo } from '../types';
import AnimatedPhotoCard from './AnimatedPhotoCard';
import * as THREE from 'three';

type LayoutType = 'spiral' | 'helix' | 'heart' | 'torus' | 'flower' | 'wave';

interface SceneProps {
  photos: Photo[];
  autoRotate: boolean;
  onPhotoClick: (photo: Photo) => void;
  layoutType: LayoutType;
}

export default function Scene({ photos, autoRotate, onPhotoClick, layoutType }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const getSpiralPosition = (index: number): [number, number, number] => {
    const angle = index * 0.5;
    const y = (index / photos.length - 0.5) * 10;
    const currentRadius = 5 - Math.abs(y) * 0.1;
    
    const x = currentRadius * Math.cos(angle);
    const z = currentRadius * Math.sin(angle);
    
    return [x, y, z];
  };

  const getHelixPosition = (index: number): [number, number, number] => {
    const t = index / photos.length;
    const angle = t * Math.PI * 4;
    const y = (t - 0.5) * 12;
    const offset = index % 2 === 0 ? 0 : Math.PI;
    
    const x = 5 * Math.cos(angle + offset);
    const z = 5 * Math.sin(angle + offset);
    
    return [x, y, z];
  };

  const getHeartPosition = (index: number): [number, number, number] => {
    const t = (index / photos.length) * Math.PI * 2;
    const scale = 5 * 0.8;
    
    const x = scale * 16 * Math.pow(Math.sin(t), 3);
    const y = scale * (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
    const z = scale * Math.sin(t) * 2;
    
    return [x * 0.1, y * 0.1 - 0.5, z * 0.1];
  };

  const getTorusPosition = (index: number): [number, number, number] => {
    const angle = (index / photos.length) * Math.PI * 2;
    const height = Math.sin(index * 0.8) * 1.5;
    
    const x = (5 + height * 0.3) * Math.cos(angle);
    const y = height;
    const z = (5 + height * 0.3) * Math.sin(angle);
    
    return [x, y, z];
  };

  const getFlowerPosition = (index: number): [number, number, number] => {
    const layer = Math.floor(index / 6);
    const petal = index % 6;
    const angle = (petal / 6) * Math.PI * 2 + layer * 0.3;
    const layerRadius = 5 - layer * 0.8;
    const y = Math.sin(angle * 3) * 1.5;
    
    const x = layerRadius * Math.cos(angle);
    const z = layerRadius * Math.sin(angle);
    
    return [x, y, z];
  };

  const getWavePosition = (index: number): [number, number, number] => {
    const t = index / photos.length;
    const angle = t * Math.PI * 4;
    const x = (t - 0.5) * 14;
    const y = Math.sin(angle) * 2 + Math.cos(angle * 2) * 1;
    const z = Math.cos(angle) * 3;
    
    return [x, y, z];
  };

  const getPosition = (index: number): [number, number, number] => {
    switch (layoutType) {
      case 'spiral':
        return getSpiralPosition(index);
      case 'helix':
        return getHelixPosition(index);
      case 'heart':
        return getHeartPosition(index);
      case 'torus':
        return getTorusPosition(index);
      case 'flower':
        return getFlowerPosition(index);
      case 'wave':
        return getWavePosition(index);
      default:
        return getSpiralPosition(index);
    }
  };

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate && !hoveredId) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <>
      <color attach="background" args={['#0a0a0f']} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffd700" castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ff6b6b" />
      <pointLight position={[0, 10, -10]} intensity={0.8} color="#4ecdc4" />
      <pointLight position={[0, -10, 0]} intensity={0.5} color="#9b59b6" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={5}
        maxDistance={20}
        autoRotate={autoRotate && !hoveredId}
        autoRotateSpeed={2}
      />

      <group ref={groupRef}>
        {photos.map((photo, index) => {
          const position = getPosition(index);
          return (
            <AnimatedPhotoCard
              key={photo.id}
              photo={photo}
              position={position}
              onHover={setHoveredId}
              onClick={onPhotoClick}
              hoveredId={hoveredId}
              layoutType={layoutType}
              index={index}
            />
          );
        })}
      </group>
    </>
  );
}
