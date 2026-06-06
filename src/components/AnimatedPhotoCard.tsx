import { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { TextureLoader, Vector3 } from 'three';
import { Photo } from '../types';
import * as THREE from 'three';

type LayoutType = 'spiral' | 'helix' | 'heart' | 'torus' | 'flower' | 'wave';

interface AnimatedPhotoCardProps {
  photo: Photo;
  position: [number, number, number];
  onHover: (id: string | null) => void;
  onClick: (photo: Photo) => void;
  hoveredId: string | null;
  layoutType: LayoutType;
  index: number;
}

export default function AnimatedPhotoCard({
  photo,
  position,
  onHover,
  onClick,
  hoveredId,
  layoutType,
  index
}: AnimatedPhotoCardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const isHovered = hoveredId === photo.id;
  const { camera } = useThree();

  // 每个照片独特的动画参数
  const animParams = useMemo(() => ({
    phase: Math.random() * Math.PI * 2,
    speed: 0.3 + Math.random() * 0.4,
    amplitude: 0.3 + Math.random() * 0.4,
    rotationSpeed: 0.2 + Math.random() * 0.3,
    pulseSpeed: 0.5 + Math.random() * 0.5,
  }), [index]);

  useEffect(() => {
    const loader = new TextureLoader();
    loader.load(photo.url, (tex) => {
      tex.needsUpdate = true;
      setTexture(tex);
    });
  }, [photo.url]);

  // 根据布局类型应用独特的动画效果
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const { phase, speed, amplitude, rotationSpeed, pulseSpeed } = animParams;
    
    if (groupRef.current) {
      // 让照片始终面向相机
      groupRef.current.lookAt(camera.position);

      // 根据布局类型应用独特的动画
      switch (layoutType) {
        case 'spiral': {
          // 🌀 螺旋布局：星空轨道效果
          const floatY = Math.sin(time * speed + phase) * amplitude;
          const radialPulse = Math.sin(time * pulseSpeed * 2 + phase) * 0.2;
          
          groupRef.current.position.y = position[1] + floatY;
          groupRef.current.position.x = position[0] + Math.cos(time * speed * 0.5) * radialPulse;
          groupRef.current.rotation.z = Math.sin(time * speed + phase) * 0.15;
          
          // 发光效果
          if (glowRef.current) {
            const glowScale = 1.1 + Math.sin(time * pulseSpeed + phase) * 0.1;
            glowRef.current.scale.setScalar(glowScale);
            (glowRef.current.material as THREE.MeshBasicMaterial).opacity = 
              0.3 + Math.sin(time * pulseSpeed + phase) * 0.2;
          }
          break;
        }

        case 'helix': {
          // 🧬 DNA双螺旋：生命律动效果
          const isEven = index % 2 === 0;
          const direction = isEven ? 1 : -1;
          
          const verticalFloat = Math.sin(time * speed * 1.5 + phase) * amplitude * 1.5;
          const horizontalSwing = Math.cos(time * speed * 0.7 + phase) * 0.3;
          const breathe = 1 + Math.sin(time * pulseSpeed * 0.5 + phase) * 0.1;
          const helixRotation = time * rotationSpeed * 2 * direction;
          
          groupRef.current.position.y = position[1] + verticalFloat;
          groupRef.current.position.x = position[0] + horizontalSwing;
          groupRef.current.scale.setScalar(breathe);
          groupRef.current.rotation.z = helixRotation;
          
          if (glowRef.current) {
            const glowIntensity = Math.sin(time * pulseSpeed * 3 + phase) * 0.3 + 0.4;
            (glowRef.current.material as THREE.MeshBasicMaterial).opacity = glowIntensity;
            glowRef.current.scale.setScalar(1.2 + Math.sin(time * pulseSpeed * 2 + phase) * 0.15);
          }
          break;
        }

        case 'heart': {
          // 💖 心形布局：心跳脉动效果
          const heartbeat = Math.sin(time * pulseSpeed * 3) > 0.7 ? 1.15 : 1;
          const heartbeatGlow = Math.sin(time * pulseSpeed * 3) > 0.7 ? 0.6 : 0.2;
          
          const zFloat = Math.sin(time * speed + phase) * 0.3;
          const heartRotation = Math.sin(time * speed * 0.5 + phase) * 0.1;
          const heartScale = heartbeat + (isHovered ? 0.2 : 0);
          
          groupRef.current.position.z = position[2] + zFloat;
          groupRef.current.rotation.z = heartRotation;
          groupRef.current.scale.setScalar(heartScale);
          
          if (glowRef.current) {
            const pulseScale = 1.3 + Math.sin(time * pulseSpeed * 3) * 0.2;
            glowRef.current.scale.setScalar(pulseScale);
            (glowRef.current.material as THREE.MeshBasicMaterial).opacity = heartbeatGlow;
            (glowRef.current.material as THREE.MeshBasicMaterial).color.setHex(
              Math.sin(time * 2) > 0 ? 0xff6b6b : 0xff1493
            );
          }
          break;
        }

        case 'torus': {
          // 💫 环形布局：能量波动效果
          const torusPhase = (index / 24) * Math.PI * 2;
          
          const waveFloat = Math.sin(time * speed + torusPhase) * amplitude * 1.5;
          const ringFlow = Math.cos(time * speed * 0.3 + torusPhase) * 0.4;
          const radialWave = Math.sin(time * pulseSpeed * 2 + torusPhase) * 0.15;
          const torusRotation = time * rotationSpeed * 0.5;
          
          groupRef.current.position.y = position[1] + waveFloat;
          groupRef.current.position.x = position[0] + ringFlow;
          groupRef.current.rotation.z = torusRotation;
          groupRef.current.scale.setScalar(1 + radialWave);
          
          if (glowRef.current) {
            const energyPulse = Math.sin(time * pulseSpeed * 4 + torusPhase) * 0.2 + 0.4;
            glowRef.current.scale.setScalar(1.25 + Math.sin(time * pulseSpeed * 2 + torusPhase) * 0.1);
            (glowRef.current.material as THREE.MeshBasicMaterial).opacity = energyPulse;
          }
          break;
        }

        case 'flower': {
          // 🌸 花瓣布局：绽放旋转效果
          const petalAngle = (index % 6) * (Math.PI / 3);
          
          const bloom = 1 + Math.sin(time * speed + petalAngle) * 0.2;
          const sway = Math.sin(time * rotationSpeed * 2 + petalAngle * 2) * 0.15;
          const flowerFloat = Math.cos(time * speed * 0.8 + petalAngle) * 0.3;
          const flowerRotation = Math.sin(time * rotationSpeed + petalAngle) * 0.3;
          
          groupRef.current.position.y = position[1] + flowerFloat;
          groupRef.current.rotation.z = sway + flowerRotation;
          groupRef.current.scale.setScalar(bloom + (isHovered ? 0.3 : 0));
          
          if (glowRef.current) {
            const petalGlow = Math.sin(time * speed * 2 + petalAngle) * 0.15 + 0.35;
            glowRef.current.scale.setScalar(1.2 + Math.sin(time * speed + petalAngle) * 0.1);
            (glowRef.current.material as THREE.MeshBasicMaterial).opacity = petalGlow;
            (glowRef.current.material as THREE.MeshBasicMaterial).color.setHex(
              Math.sin(time * 1.5 + petalAngle) > 0 ? 0xff69b4 : 0xff1493
            );
          }
          break;
        }

        case 'wave': {
          // 🌊 波浪布局：海浪涌动效果
          const waveIndex = index * 0.4;
          
          const mainWave = Math.sin(time * speed * 2 + waveIndex) * amplitude * 1.8;
          const subWave = Math.cos(time * speed * 1.5 + waveIndex * 0.7) * 0.3;
          const surge = Math.cos(time * speed * 0.6 + waveIndex * 0.5) * 0.5;
          const swing = Math.sin(time * speed * 0.8 + waveIndex) * 0.2;
          
          groupRef.current.position.y = position[1] + mainWave + subWave;
          groupRef.current.position.z = position[2] + surge;
          groupRef.current.position.x = position[0] + swing;
          groupRef.current.rotation.x = Math.sin(time * speed + waveIndex) * 0.1;
          groupRef.current.rotation.z = Math.cos(time * speed * 0.7 + waveIndex) * 0.08;
          
          if (glowRef.current) {
            const waterGlow = Math.sin(time * pulseSpeed * 2 + waveIndex) * 0.2 + 0.35;
            glowRef.current.scale.setScalar(1.15 + Math.sin(time * pulseSpeed * 3 + waveIndex) * 0.12);
            (glowRef.current.material as THREE.MeshBasicMaterial).opacity = waterGlow;
            (glowRef.current.material as THREE.MeshBasicMaterial).color.setHex(
              Math.sin(time * 1.2 + waveIndex) > 0 ? 0x00ced1 : 0x4169e1
            );
          }
          break;
        }
      }
    }

    if (meshRef.current) {
      const targetScale = isHovered ? 1.4 : 1;
      meshRef.current.scale.lerp(new Vector3(targetScale, targetScale, targetScale), 0.1);
      
      if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
        meshRef.current.material.emissiveIntensity = isHovered ? 0.5 : 
          (layoutType === 'heart' ? 0.2 + Math.sin(time * animParams.pulseSpeed * 3) * 0.15 : 0);
      }
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* 发光背景 */}
      <mesh ref={glowRef} position={[0, 0, -0.02]}>
        <planeGeometry args={[1.5, 1.2]} />
        <meshBasicMaterial 
          color={
            layoutType === 'heart' ? '#ff6b6b' :
            layoutType === 'flower' ? '#ff69b4' :
            layoutType === 'wave' ? '#00ced1' :
            '#ffd700'
          } 
          transparent 
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* 照片主体 */}
      <mesh
        ref={meshRef}
        onPointerOver={() => onHover(photo.id)}
        onPointerOut={() => onHover(null)}
        onClick={() => onClick(photo)}
        castShadow
        receiveShadow
      >
        <planeGeometry args={[1.2, 0.9]} />
        <meshStandardMaterial
          map={texture}
          emissive={
            layoutType === 'heart' ? '#ff1493' :
            layoutType === 'flower' ? '#ff69b4' :
            layoutType === 'wave' ? '#00ced1' :
            layoutType === 'helix' ? '#9b59b6' :
            layoutType === 'torus' ? '#4ecdc4' :
            '#ffd700'
          }
          emissiveIntensity={isHovered ? 0.5 : 0.1}
        />
      </mesh>
      
      {/* 照片边框 */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[1.3, 1]} />
        <meshStandardMaterial 
          color={
            layoutType === 'heart' ? '#ff1493' :
            layoutType === 'flower' ? '#ff69b4' :
            layoutType === 'wave' ? '#4169e1' :
            layoutType === 'helix' ? '#8e44ad' :
            layoutType === 'torus' ? '#20b2aa' :
            '#daa520'
          } 
          metalness={0.9} 
          roughness={0.1} 
        />
      </mesh>
    </group>
  );
}
