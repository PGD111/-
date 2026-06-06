import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Photo } from '../types';
import * as THREE from 'three';

interface PhotoCardProps {
  photo: Photo;
  position: [number, number, number];
  onHover: (id: string | null) => void;
  onClick: (photo: Photo) => void;
  hoveredId: string | null;
}

export default function PhotoCard({ photo, position, onHover, onClick, hoveredId }: PhotoCardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const isHovered = hoveredId === photo.id;
  const { camera } = useThree();

  useEffect(() => {
    const loader = new TextureLoader();
    loader.load(photo.url, (tex) => {
      tex.needsUpdate = true;
      setTexture(tex);
    });
  }, [photo.url]);

  // 让照片始终面向相机
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.lookAt(camera.position);
    }
    
    if (meshRef.current) {
      const targetScale = isHovered ? 1.3 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 5 * 0.016);
      meshRef.current.position.z = position[2] + (isHovered ? 0.5 : 0);
    }
  });

  return (
    <group ref={groupRef} position={position}>
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
          emissive={isHovered ? '#ffd700' : '#000000'}
          emissiveIntensity={isHovered ? 0.2 : 0}
        />
      </mesh>
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[1.3, 1]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}
