import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

export const Ground = () => {
  const texture = useLoader(TextureLoader, '/grass_2.jpg');

  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(500, 500);

  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]}>
      <planeGeometry args={[2000, 2000]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};
