import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  uniform vec3 uMouse;

  float easeInOutCubic(float x) {
    return x < 0.5 ? 4. * x * x * x : 1. - pow(-2. * x + 2., 3.) / 2.;
  }

  float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
  }

  void main() {
    vec3 myPos = instanceMatrix[3].xyz;
    float dist = length(myPos.xy - uMouse.xy);
    float minDist = 8.;
    float startDist = 15.;
    float scale = smoothstep(startDist, minDist, dist);
    float zPos = map(easeInOutCubic(scale), 0., 1., 0., -12.);
    vec3 toCenter = normalize(vec3(uMouse - myPos.xy, 0.));
    vec4 worldPosition = modelMatrix * instanceMatrix * vec4(position, 1.0);
    vec3 toInstance = worldPosition.xyz - myPos;
    float angle = atan(toCenter.y, toCenter.x);
    vec3 newPos = vec3(cos(angle), sin(angle), 0.) * (1. - scale) * 4.;
    vec4 modelViewPosition = modelViewMatrix * instanceMatrix * vec4(position.x + newPos.x, position.y + newPos.y, position.z + zPos, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;
  }
`;

const fragmentShader = `
  void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 0.15);
  }
`;

function createGrid() {
  const sizeX = (typeof window !== 'undefined' ? window.innerWidth : 1200) / 2.5;
  const sizeY = (typeof window !== 'undefined' ? window.innerHeight : 800) / 2.5;
  const countX = Math.floor(sizeX / 5);
  const countY = Math.floor(sizeY / 5);
  return {
    count: countX * countY,
    rows: countY,
    columns: countX,
  };
}

function ParticleGrid() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();
  const mouseRef = useRef(new THREE.Vector3(1000, 1000, 0));
  const smoothMouseRef = useRef(new THREE.Vector3(1000, 1000, 0));

  const grid = useMemo(() => createGrid(), []);

  const { geometry, matrices } = useMemo(() => {
    const geo = new THREE.CircleGeometry(0.4, 8);
    const mats: THREE.Matrix4[] = [];
    const spacingX = viewport.width / grid.columns;
    const spacingY = viewport.height / grid.rows;

    let idx = 0;
    for (let row = 0; row < grid.rows; row++) {
      for (let col = 0; col < grid.columns; col++) {
        const x = (col - grid.columns / 2) * spacingX + spacingX / 2;
        const y = (row - grid.rows / 2) * spacingY + spacingY / 2;
        const matrix = new THREE.Matrix4();
        matrix.setPosition(x, y, 0);
        mats.push(matrix);
        idx++;
      }
    }
    return { geometry: geo, matrices: mats };
  }, [grid, viewport]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uMouse: { value: new THREE.Vector3(1000, 1000, 0) },
      },
      transparent: true,
      depthWrite: false,
    });
  }, []);

  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Matrix4();
    matrices.forEach((mat, i) => {
      dummy.copy(mat);
      meshRef.current!.setMatrixAt(i, dummy);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [matrices]);

  useFrame(() => {
    if (!meshRef.current) return;

    // Lerp mouse
    smoothMouseRef.current.lerp(mouseRef.current, 0.08);
    material.uniforms.uMouse.value.copy(smoothMouseRef.current);
  });

  // Set up mouse listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.set(
        nx * viewport.width * 0.5,
        ny * viewport.height * 0.5,
        0
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [viewport]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, grid.count]}
    />
  );
}

export default function ParticleWaveField() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Canvas
      orthographic
      camera={{
        position: [0, 0, 50],
        zoom: 4,
        near: 0.1,
        far: 1000,
      }}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
      }}
      gl={{ alpha: true, antialias: false }}
    >
      <ParticleGrid />
    </Canvas>
  );
}
