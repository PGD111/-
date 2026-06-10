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
  const rotGroupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [textureError, setTextureError] = useState(false);
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
    setTexture(null);
    setTextureError(false);
    const loader = new TextureLoader();
    loader.setCrossOrigin('anonymous');
    loader.load(
      photo.url,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.needsUpdate = true;
        setTexture(tex);
      },
      undefined,
      () => {
        setTextureError(true);
      }
    );
  }, [photo.url]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const { phase, speed, amplitude, rotationSpeed, pulseSpeed } = animParams;
    
    if (groupRef.current) {
      // === 步骤1: 先计算位置动画 ===
      let newX = position[0];
      let newY = position[1];
      let newZ = position[2];

      switch (layoutType) {
        case 'spiral': {
          const floatY = Math.sin(time * speed + phase) * amplitude;
          const radialPulse = Math.sin(time * pulseSpeed * 2 + phase) * 0.2;
          newY = position[1] + floatY;
          newX = position[0] + Math.cos(time * speed * 0.5) * radialPulse;
          break;
        }
        case 'helix': {
          const verticalFloat = Math.sin(time * speed * 1.5 + phase) * amplitude * 1.5;
          const horizontalSwing = Math.cos(time * speed * 0.7 + phase) * 0.3;
          newY = position[1] + verticalFloat;
          newX = position[0] + horizontalSwing;
          break;
        }
        case 'heart': {
          const zFloat = Math.sin(time * speed + phase) * 0.3;
          newZ = position[2] + zFloat;
          break;
        }
        case 'torus': {
          const torusPhase = (index / 24) * Math.PI * 2;
          const waveFloat = Math.sin(time * speed + torusPhase) * amplitude * 1.5;
          const ringFlow = Math.cos(time * speed * 0.3 + torusPhase) * 0.4;
          newY = position[1] + waveFloat;
          newX = position[0] + ringFlow;
          break;
        }
        case 'flower': {
          const petalAngle = (index % 6) * (Math.PI / 3);
          const flowerFloat = Math.cos(time * speed * 0.8 + petalAngle) * 0.3;
          newY = position[1] + flowerFloat;
          break;
        }
        case 'wave': {
          const waveIndex = index * 0.4;
          const mainWave = Math.sin(time * speed * 2 + waveIndex) * amplitude * 1.8;
          const subWave = Math.cos(time * speed * 1.5 + waveIndex * 0.7) * 0.3;
          const surge = Math.cos(time * speed * 0.6 + waveIndex * 0.5) * 0.5;
          const swing = Math.sin(time * speed * 0.8 + waveIndex) * 0.2;
          newY = position[1] + mainWave + subWave;
          newZ = position[2] + surge;
          newX = position[0] + swing;
          break;
        }
      }

      // 更新位置
      groupRef.current.position.set(newX, newY, newZ);

      // === 步骤2: 位置更新后再 lookAt 相机 ===
      groupRef.current.lookAt(camera.position);
    }

    // === 子级 Group: 装饰性旋转 + 缩放（不影响面朝相机） ===
    if (rotGroupRef.current) {
      switch (layoutType) {
        case 'spiral': {
          rotGroupRef.current.rotation.z = Math.sin(time * speed + phase) * 0.15;
          const glowScale = 1.1 + Math.sin(time * pulseSpeed + phase) * 0.1;
          if (glowRef.current) {
            glowRef.current.scale.setScalar(glowScale);
            (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
              0.3 + Math.sin(time * pulseSpeed + phase) * 0.2;
          }
          break;
        }
        case 'helix': {
          const isEven = index % 2 === 0;
          const direction = isEven ? 1 : -1;
          rotGroupRef.current.rotation.z = Math.sin(time * speed * 0.7 + phase) * 0.3 * direction;
          rotGroupRef.current.rotation.x = Math.cos(time * speed * 0.5 + phase) * 0.1;
          const breathe = 1 + Math.sin(time * pulseSpeed * 0.5 + phase) * 0.1;
          rotGroupRef.current.scale.setScalar(breathe);
          if (glowRef.current) {
            const glowIntensity = Math.sin(time * pulseSpeed * 3 + phase) * 0.3 + 0.4;
            (glowRef.current.material as THREE.MeshBasicMaterial).opacity = glowIntensity;
            glowRef.current.scale.setScalar(1.2 + Math.sin(time * pulseSpeed * 2 + phase) * 0.15);
          }
          break;
        }
        case 'heart': {
          const heartbeat = Math.sin(time * pulseSpeed * 3) > 0.7 ? 1.15 : 1;
          const heartbeatGlow = Math.sin(time * pulseSpeed * 3) > 0.7 ? 0.6 : 0.2;
          const heartRotation = Math.sin(time * speed * 0.5 + phase) * 0.1;
          const heartScale = heartbeat + (isHovered ? 0.2 : 0);
          rotGroupRef.current.rotation.z = heartRotation;
          rotGroupRef.current.scale.setScalar(heartScale);
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
          const torusPhase = (index / 24) * Math.PI * 2;
          rotGroupRef.current.rotation.z = Math.sin(time * speed * 0.7 + torusPhase) * 0.25;
          const radialWave = Math.sin(time * pulseSpeed * 2 + torusPhase) * 0.15;
          rotGroupRef.current.scale.setScalar(1 + radialWave);
          if (glowRef.current) {
            const energyPulse = Math.sin(time * pulseSpeed * 4 + torusPhase) * 0.2 + 0.4;
            glowRef.current.scale.setScalar(1.25 + Math.sin(time * pulseSpeed * 2 + torusPhase) * 0.1);
            (glowRef.current.material as THREE.MeshBasicMaterial).opacity = energyPulse;
          }
          break;
        }
        case 'flower': {
          const petalAngle = (index % 6) * (Math.PI / 3);
          const sway = Math.sin(time * rotationSpeed * 2 + petalAngle * 2) * 0.15;
          const flowerRotation = Math.sin(time * rotationSpeed + petalAngle) * 0.3;
          const bloom = 1 + Math.sin(time * speed + petalAngle) * 0.2;
          rotGroupRef.current.rotation.z = sway + flowerRotation;
          rotGroupRef.current.scale.setScalar(bloom + (isHovered ? 0.3 : 0));
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
          const waveIndex = index * 0.4;
          rotGroupRef.current.rotation.z = Math.sin(time * speed * 0.8 + waveIndex) * 0.2;
          rotGroupRef.current.rotation.x = Math.cos(time * speed * 0.7 + waveIndex) * 0.08;
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

    // Hover 缩放
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
      {/* 子级 Group：装饰性旋转，不影响面朝相机 */}
      <group ref={rotGroupRef}>
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
            side={THREE.DoubleSide}
            color={textureError ? '#444444' : '#ffffff'}
            emissive={
              layoutType === 'heart' ? '#ff1493' :
              layoutType === 'flower' ? '#ff69b4' :
              layoutType === 'wave' ? '#00ced1' :
              layoutType === 'helix' ? '#9b59b6' :
              layoutType === 'torus' ? '#4ecdc4' :
              '#ffd700'
            }
            emissiveIntensity={textureError ? 0.5 : (isHovered ? 0.5 : 0.1)}
            roughness={0.3}
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
    </group>
  );
}