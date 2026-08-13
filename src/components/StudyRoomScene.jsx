import { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, OrbitControls, Text, useCursor } from '@react-three/drei';

const OBJECT_COLORS = {
  laptop: '#2563eb',
  book: '#0f766e',
  coffee: '#f59e0b',
  plant: '#16a34a',
  lamp: '#fbbf24',
  clock: '#0284c7',
};

function HighlightRing({ scale = 1 }) {
  const ringRef = useRef();

  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    const pulse = scale + Math.sin(clock.elapsedTime * 4) * 0.05;
    ringRef.current.scale.set(pulse, pulse, pulse);
    ringRef.current.material.emissiveIntensity = 0.35 + Math.sin(clock.elapsedTime * 5) * 0.2;
  });

  return (
    <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.045, 0]}>
      <torusGeometry args={[0.55, 0.03, 16, 80]} />
      <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.45} />
    </mesh>
  );
}

function ObjectLabel({ text, position = [0, 0.95, 0.25] }) {
  return (
    <Suspense fallback={null}>
      <Text
        position={position}
        fontSize={0.16}
        color="#f8fafc"
        outlineColor="#0f172a"
        outlineWidth={0.015}
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </Suspense>
  );
}

function ClickableObject({ id, selectedId, onSelect, children, ringScale = 1, position = [0, 0, 0] }) {
  const [hovered, setHovered] = useState(false);
  const isSelected = selectedId === id;

  useCursor(hovered);

  return (
    <group
      position={position}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(id);
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {isSelected && <HighlightRing scale={ringScale} />}
      {isSelected && <pointLight position={[0, 1.05, 0.25]} color="#fbbf24" intensity={1.1} distance={3.2} />}
      <group scale={hovered ? 1.04 : 1}>{children}</group>
    </group>
  );
}

function Desk() {
  return (
    <group position={[0, 0, 0]}>
      <mesh castShadow receiveShadow position={[0, 1.05, 0]}>
        <boxGeometry args={[5.2, 0.28, 1.85]} />
        <meshStandardMaterial color="#b7794b" roughness={0.55} />
      </mesh>
      {[
        [-2.25, 0.5, -0.7],
        [2.25, 0.5, -0.7],
        [-2.25, 0.5, 0.7],
        [2.25, 0.5, 0.7],
      ].map((position) => (
        <mesh key={position.join('-')} castShadow position={position}>
          <boxGeometry args={[0.18, 1, 0.18]} />
          <meshStandardMaterial color="#5b4635" roughness={0.7} />
        </mesh>
      ))}
      <mesh castShadow receiveShadow position={[0, 0.5, 1.55]}>
        <boxGeometry args={[1.75, 0.18, 0.62]} />
        <meshStandardMaterial color="#425466" roughness={0.65} />
      </mesh>
      <mesh castShadow position={[0, 0.96, 1.76]}>
        <boxGeometry args={[1.55, 0.78, 0.18]} />
        <meshStandardMaterial color="#334155" roughness={0.7} />
      </mesh>
    </group>
  );
}

function Rug() {
  return (
    <group position={[0.15, 0.01, 0.65]}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[5.8, 2.9, 0.035]} />
        <meshStandardMaterial color="#8aa3b8" roughness={0.9} />
      </mesh>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <boxGeometry args={[5.35, 2.45, 0.038]} />
        <meshStandardMaterial color="#dbeafe" roughness={0.88} />
      </mesh>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, 0]}>
        <boxGeometry args={[3.9, 0.08, 0.04]} />
        <meshStandardMaterial color="#2563eb" roughness={0.7} />
      </mesh>
    </group>
  );
}

function Bookshelf() {
  const bookColors = ['#2563eb', '#0f766e', '#f59e0b', '#dc2626', '#7c3aed'];

  return (
    <group position={[3.65, 1.35, -2.82]}>
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.25, 2.2, 0.25]} />
        <meshStandardMaterial color="#74513a" roughness={0.75} />
      </mesh>
      {[0.58, 0, -0.58].map((y) => (
        <mesh key={y} castShadow position={[0, y, 0.16]}>
          <boxGeometry args={[1.16, 0.08, 0.18]} />
          <meshStandardMaterial color="#4b3526" roughness={0.7} />
        </mesh>
      ))}
      {bookColors.map((color, index) => (
        <mesh key={color} castShadow position={[-0.42 + index * 0.2, 0.76, 0.32]}>
          <boxGeometry args={[0.13, 0.55 - (index % 2) * 0.08, 0.16]} />
          <meshStandardMaterial color={color} roughness={0.58} />
        </mesh>
      ))}
      {bookColors.slice().reverse().map((color, index) => (
        <mesh key={`${color}-lower`} castShadow position={[-0.42 + index * 0.2, -0.36, 0.32]}>
          <boxGeometry args={[0.13, 0.5 + (index % 2) * 0.08, 0.16]} />
          <meshStandardMaterial color={color} roughness={0.58} />
        </mesh>
      ))}
    </group>
  );
}

function Laptop({ selectedId, onSelect }) {
  return (
    <ClickableObject id="laptop" selectedId={selectedId} onSelect={onSelect} position={[-1.55, 1.24, -0.1]}>
      <ObjectLabel text="Laptop" position={[0, 1.02, 0.18]} />
      <mesh castShadow position={[0, 0.03, 0.18]} rotation={[-0.25, 0, 0]}>
        <boxGeometry args={[1.25, 0.07, 0.75]} />
        <meshStandardMaterial color="#1f2937" roughness={0.4} />
      </mesh>
      <mesh castShadow position={[0, 0.52, -0.18]} rotation={[0.38, 0, 0]}>
        <boxGeometry args={[1.25, 0.78, 0.06]} />
        <meshStandardMaterial color="#111827" roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.52, -0.215]} rotation={[0.38, 0, 0]}>
        <boxGeometry args={[1.05, 0.58, 0.025]} />
        <meshStandardMaterial
          color={selectedId === 'laptop' ? OBJECT_COLORS.laptop : '#93c5fd'}
          emissive={selectedId === 'laptop' ? '#1d4ed8' : '#1e3a8a'}
          emissiveIntensity={0.3}
        />
      </mesh>
    </ClickableObject>
  );
}

function Book({ selectedId, onSelect }) {
  return (
    <ClickableObject id="book" selectedId={selectedId} onSelect={onSelect} position={[0.15, 1.25, -0.35]}>
      <ObjectLabel text="Book" position={[0, 0.42, 0.18]} />
      <mesh castShadow rotation={[0, 0.15, 0]}>
        <boxGeometry args={[1.05, 0.14, 0.68]} />
        <meshStandardMaterial color={selectedId === 'book' ? OBJECT_COLORS.book : '#0f766e'} roughness={0.5} />
      </mesh>
      <mesh castShadow position={[0.02, 0.085, 0]} rotation={[0, 0.15, 0]}>
        <boxGeometry args={[0.96, 0.035, 0.62]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.75} />
      </mesh>
      <mesh castShadow position={[-0.18, 0.13, 0]} rotation={[0, 0.15, 0]}>
        <boxGeometry args={[0.03, 0.08, 0.68]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
    </ClickableObject>
  );
}

function CoffeeCup({ selectedId, onSelect }) {
  return (
    <ClickableObject id="coffee" selectedId={selectedId} onSelect={onSelect} position={[1.18, 1.28, 0.18]} ringScale={0.8}>
      <ObjectLabel text="Coffee" position={[0, 0.72, 0.2]} />
      <mesh castShadow position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.18, 0.22, 0.36, 32]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.03, 32]} />
        <meshStandardMaterial color={selectedId === 'coffee' ? OBJECT_COLORS.coffee : '#7c2d12'} />
      </mesh>
      <mesh castShadow position={[0.25, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.13, 0.025, 12, 32]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
    </ClickableObject>
  );
}

function Plant({ selectedId, onSelect }) {
  return (
    <ClickableObject id="plant" selectedId={selectedId} onSelect={onSelect} position={[2.02, 1.25, -0.3]} ringScale={0.9}>
      <ObjectLabel text="Plant" position={[0, 0.93, 0.22]} />
      <mesh castShadow position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.22, 0.28, 0.32, 18]} />
        <meshStandardMaterial color="#fb923c" roughness={0.62} />
      </mesh>
      <mesh castShadow position={[0, 0.54, 0]}>
        <sphereGeometry args={[0.28, 18, 18]} />
        <meshStandardMaterial color={selectedId === 'plant' ? '#22c55e' : '#15803d'} roughness={0.72} />
      </mesh>
      <mesh castShadow position={[-0.2, 0.5, 0.08]} rotation={[0.2, 0.1, -0.5]}>
        <sphereGeometry args={[0.18, 14, 14]} />
        <meshStandardMaterial color="#16a34a" roughness={0.72} />
      </mesh>
      <mesh castShadow position={[0.22, 0.48, -0.04]} rotation={[0.1, -0.2, 0.5]}>
        <sphereGeometry args={[0.18, 14, 14]} />
        <meshStandardMaterial color="#166534" roughness={0.72} />
      </mesh>
    </ClickableObject>
  );
}

function Lamp({ selectedId, onSelect, isDarkRoom }) {
  return (
    <ClickableObject id="lamp" selectedId={selectedId} onSelect={onSelect} position={[-2.28, 1.24, 0.08]} ringScale={0.8}>
      <ObjectLabel text="Lamp" position={[0.18, 1.08, 0.16]} />
      <mesh castShadow position={[0, 0.14, 0]}>
        <cylinderGeometry args={[0.18, 0.25, 0.08, 24]} />
        <meshStandardMaterial color="#334155" roughness={0.55} />
      </mesh>
      <mesh castShadow position={[0, 0.44, 0]} rotation={[0, 0, -0.42]}>
        <cylinderGeometry args={[0.04, 0.04, 0.65, 16]} />
        <meshStandardMaterial color="#475569" />
      </mesh>
      <mesh castShadow position={[0.22, 0.74, 0]} rotation={[0, 0, -0.42]}>
        <coneGeometry args={[0.28, 0.35, 28]} />
        <meshStandardMaterial
          color={selectedId === 'lamp' ? OBJECT_COLORS.lamp : '#fde68a'}
          emissive="#f59e0b"
          emissiveIntensity={isDarkRoom ? 1.15 : 0.38}
        />
      </mesh>
      {isDarkRoom && <pointLight position={[0.22, 0.7, 0]} color="#fbbf24" intensity={1.9} distance={5.8} />}
    </ClickableObject>
  );
}

function Clock({ selectedId, onSelect }) {
  return (
    <ClickableObject id="clock" selectedId={selectedId} onSelect={onSelect} position={[2.12, 2.72, -2.82]} ringScale={0.8}>
      <ObjectLabel text="Clock" position={[0, 0.66, 0.12]} />
      <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.08, 48]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.45} />
      </mesh>
      <mesh position={[0, 0, 0.048]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.36, 0.36, 0.025, 48]} />
        <meshStandardMaterial color={selectedId === 'clock' ? '#bae6fd' : '#e0f2fe'} />
      </mesh>
      <mesh position={[0, 0.08, 0.075]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.035, 0.27, 0.02]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <mesh position={[0.08, -0.02, 0.08]} rotation={[0, 0, -1.35]}>
        <boxGeometry args={[0.03, 0.22, 0.02]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
    </ClickableObject>
  );
}

function Room({ isDarkRoom }) {
  const wallColor = isDarkRoom ? '#1f2937' : '#dbe4f0';
  const floorColor = isDarkRoom ? '#273244' : '#c7d2df';

  return (
    <>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[9, 7]} />
        <meshStandardMaterial color={floorColor} roughness={0.8} />
      </mesh>
      <mesh receiveShadow position={[0, 2.1, -3.05]}>
        <boxGeometry args={[9, 4.3, 0.14]} />
        <meshStandardMaterial color={wallColor} roughness={0.82} />
      </mesh>
      <mesh receiveShadow position={[-4.55, 2.1, 0]}>
        <boxGeometry args={[0.14, 4.3, 7]} />
        <meshStandardMaterial color={isDarkRoom ? '#182232' : '#edf3f8'} roughness={0.85} />
      </mesh>
      <mesh castShadow position={[-3.45, 2.75, -2.96]}>
        <boxGeometry args={[1.08, 0.76, 0.05]} />
        <meshStandardMaterial color="#60a5fa" roughness={0.5} />
      </mesh>
      <mesh castShadow position={[-2.15, 2.75, -2.96]}>
        <boxGeometry args={[1.08, 0.76, 0.05]} />
        <meshStandardMaterial color="#14b8a6" roughness={0.5} />
      </mesh>
      <group position={[-3.55, 1.95, -2.94]}>
        <mesh castShadow>
          <boxGeometry args={[1.55, 1.05, 0.06]} />
          <meshStandardMaterial color={isDarkRoom ? '#1e3a8a' : '#bfdbfe'} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0, 0.04]}>
          <boxGeometry args={[0.08, 1.05, 0.04]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[1.55, 0.08, 0.04]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
      </group>
      <group position={[-0.25, 2.65, -2.94]}>
        <mesh castShadow>
          <boxGeometry args={[1.75, 0.7, 0.055]} />
          <meshStandardMaterial color="#fff7ed" roughness={0.55} />
        </mesh>
        <mesh position={[0, 0, 0.04]}>
          <boxGeometry args={[1.42, 0.09, 0.035]} />
          <meshStandardMaterial color="#2563eb" />
        </mesh>
        <mesh position={[0, -0.19, 0.04]}>
          <boxGeometry args={[1.05, 0.08, 0.035]} />
          <meshStandardMaterial color="#0f766e" />
        </mesh>
      </group>
      <Suspense fallback={null}>
        <Text
          position={[0, 3.25, -2.92]}
          fontSize={0.28}
          color={isDarkRoom ? '#bfdbfe' : '#1f2937'}
          anchorX="center"
          anchorY="middle"
        >
          FocusSpace
        </Text>
      </Suspense>
    </>
  );
}

function SceneContent({ selectedId, onSelectObject, isDarkRoom }) {
  return (
    <>
      <color attach="background" args={[isDarkRoom ? '#0f172a' : '#eef4fb']} />
      <ambientLight intensity={isDarkRoom ? 0.34 : 0.78} />
      <directionalLight
        castShadow
        position={[3.5, 6, 4.5]}
        intensity={isDarkRoom ? 0.75 : 1.55}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-2.2, 2.6, 1.6]} intensity={isDarkRoom ? 1.4 : 0.35} color="#fbbf24" />
      <Room isDarkRoom={isDarkRoom} />
      <Rug />
      <Desk />
      <Bookshelf />
      <Laptop selectedId={selectedId} onSelect={onSelectObject} />
      <Book selectedId={selectedId} onSelect={onSelectObject} />
      <CoffeeCup selectedId={selectedId} onSelect={onSelectObject} />
      <Plant selectedId={selectedId} onSelect={onSelectObject} />
      <Lamp selectedId={selectedId} onSelect={onSelectObject} isDarkRoom={isDarkRoom} />
      <Clock selectedId={selectedId} onSelect={onSelectObject} />
      <ContactShadows position={[0, 0.02, 0]} opacity={0.3} scale={8} blur={2.5} far={4} />
      <OrbitControls
        makeDefault
        target={[0, 1.3, -0.5]}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.55}
        minDistance={4.6}
        maxDistance={9}
        minPolarAngle={0.45}
        maxPolarAngle={1.35}
      />
    </>
  );
}

function StudyRoomScene({ selectedId, onSelectObject, isDarkRoom }) {
  const selectedLabel = useMemo(() => {
    if (!selectedId) return '点击物件开始';
    return `${selectedId.charAt(0).toUpperCase()}${selectedId.slice(1)} 已选`;
  }, [selectedId]);

  return (
    <section className="scene-shell overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-calm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-base-300 px-5 py-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            3D Room
          </p>
          <h2 className="font-display text-2xl font-bold text-base-content">书房场景</h2>
        </div>
        <span className="badge badge-primary badge-outline">{selectedLabel}</span>
      </div>

      <div className="scene-canvas">
        <Canvas
          shadows
          camera={{ position: [5.2, 4.2, 5.4], fov: 43 }}
          onCreated={({ camera }) => camera.lookAt(0, 1.3, -0.5)}
        >
          <SceneContent
            selectedId={selectedId}
            onSelectObject={onSelectObject}
            isDarkRoom={isDarkRoom}
          />
        </Canvas>
      </div>
    </section>
  );
}

export default StudyRoomScene;
