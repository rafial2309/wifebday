import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

const RotatingStars = () => {
  const ref = useRef();
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 50;
      ref.current.rotation.y -= delta / 60;
    }
  });

  return (
    <group ref={ref}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
};

const StarryBackground = () => {
  return (
    <Canvas camera={{ position: [0, 0, 1] }}>
      <color attach="background" args={['#111827']} />
      <ambientLight intensity={0.5} />
      <RotatingStars />
    </Canvas>
  );
};

export default StarryBackground;
