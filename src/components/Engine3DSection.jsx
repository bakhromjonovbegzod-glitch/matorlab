import { Component, Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { Cpu, Eye, EyeOff, Pause, Play, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

const ENGINE_PARTS = [
  {
    id: 'block',
    name: 'Silindr bloki',
    role: 'Dvigatelning asosiy korpusi',
    description:
      'Porshenlar harakatlanadigan 4 ta silindr, sovitish kanallari va moy yo‘llarini o‘zida jamlagan mustahkam metall asos.',
    position: [0, 0.05, 0],
    labelPos: [0, 0.1, 1.15],
  },
  {
    id: 'pistons',
    name: 'Porshenlar va tirsakli val',
    role: 'Yonish kuchini aylanishga aylantiradi',
    description:
      'Porshenlar yuqoriga-pastga harakatlanib, shatunlar orqali tirsakli valni aylantiradi. 1-3-4-2 tartibida ishlaydi.',
    position: [0, -0.35, 0],
    labelPos: [-0.95, -0.45, 0.95],
  },
  {
    id: 'head',
    name: 'Silindr kallagi (DOHC)',
    role: 'Klapanlar va shamlar joylashgan qism',
    description:
      'Har bir silindrga havo-yoqilg‘i aralashmasini kiritish va chiqindi gazlarni chiqarish klapanlarini boshqaradi.',
    position: [0, 0.85, 0],
    labelPos: [0, 1.25, 0.3],
  },
  {
    id: 'turbo',
    name: 'Turbokompressor',
    role: 'Havoni siqib quvvatni oshiradi',
    description:
      'Chiqarish gazlari hisobiga parrakni aylantirib, silindrlarga ko‘proq kislorod haydaydi va ot kuchini oshiradi.',
    position: [1.15, 0.35, -0.45],
    labelPos: [1.45, 0.72, -0.45],
  },
  {
    id: 'intake',
    name: 'Kiritish kollektori',
    role: 'Havoni silindrlarga taqsimlaydi',
    description:
      'Filtrlangan va turbodan o‘tgan havoni barcha silindrlarga teng miqdorda yetkazib beruvchi kanallar tizimi.',
    position: [-1.0, 0.55, 0],
    labelPos: [-1.42, 0.82, 0],
  },
  {
    id: 'cooling',
    name: 'Shkiv va sovitish ventilyatori',
    role: 'Yordamchi agregatlar va harorat nazorati',
    description:
      'Tirsakli valdan kamar orqali generator va suv pompasini harakatga keltirib, dvigatel haroratini me’yorda saqlaydi.',
    position: [0, -0.1, 1.55],
    labelPos: [0.35, 0.15, 1.85],
  },
];

class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function isWebGLSupported() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

function EngineAssembly({ isPlaying, selectedPart, showLabels, onSelectPart }) {
  const pistonRefs = useRef([]);
  const rodRefs = useRef([]);
  const crankRef = useRef();
  const flywheelRef = useRef();
  const turboWheelRef = useRef();
  const fanRef = useRef();

  const pistonOffsets = useMemo(() => [-0.84, -0.28, 0.28, 0.84], []);
  const phases = useMemo(() => [0, Math.PI, Math.PI, 0], []);

  useFrame((_, delta) => {
    if (!isPlaying) return;
    const speed = delta * 5.2;

    if (crankRef.current) crankRef.current.rotation.z += speed;
    if (flywheelRef.current) flywheelRef.current.rotation.z += speed;
    if (turboWheelRef.current) turboWheelRef.current.rotation.x += speed * 2.6;
    if (fanRef.current) fanRef.current.rotation.z += speed * 1.4;

    const angle = crankRef.current ? crankRef.current.rotation.z : 0;

    pistonOffsets.forEach((_, idx) => {
      const p = Math.sin(angle + phases[idx]) * 0.22;
      if (pistonRefs.current[idx]) {
        pistonRefs.current[idx].position.y = 0.22 + p;
      }
      if (rodRefs.current[idx]) {
        rodRefs.current[idx].position.y = -0.14 + p * 0.65;
        rodRefs.current[idx].rotation.z = Math.cos(angle + phases[idx]) * 0.14;
      }
    });
  });

  const highlightColor = (id, defaultColor) =>
    selectedPart === id ? '#22d3ee' : defaultColor;

  return (
    <group rotation={[0.14, -0.58, 0]}>
      {/* Cylinder Block (semi-transparent metallic cutaway) */}
      <mesh position={[0, 0.05, 0]} onClick={() => onSelectPart('block')}>
        <boxGeometry args={[2.3, 1.05, 1.02]} />
        <meshStandardMaterial
          color={highlightColor('block', '#64748b')}
          metalness={0.85}
          roughness={0.25}
          transparent
          opacity={0.34}
        />
      </mesh>

      {/* Cylinder Sleeves */}
      {pistonOffsets.map((zOffset, idx) => (
        <mesh key={`sleeve-${idx}`} position={[0, 0.1, zOffset]}>
          <cylinderGeometry args={[0.21, 0.21, 0.86, 24, 1, true]} />
          <meshStandardMaterial
            color="#94a3b8"
            metalness={0.9}
            roughness={0.2}
            transparent
            opacity={0.42}
            side={2}
          />
        </mesh>
      ))}

      {/* Pistons & Connecting Rods */}
      {pistonOffsets.map((zOffset, idx) => (
        <group key={`piston-group-${idx}`}>
          <mesh
            ref={(el) => (pistonRefs.current[idx] = el)}
            position={[0, 0.22, zOffset]}
            onClick={() => onSelectPart('pistons')}
          >
            <cylinderGeometry args={[0.175, 0.175, 0.24, 24]} />
            <meshStandardMaterial
              color={highlightColor('pistons', '#cbd5e1')}
              metalness={0.92}
              roughness={0.18}
            />
          </mesh>
          <mesh
            ref={(el) => (rodRefs.current[idx] = el)}
            position={[0, -0.14, zOffset]}
            onClick={() => onSelectPart('pistons')}
          >
            <boxGeometry args={[0.07, 0.56, 0.08]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.88} roughness={0.25} />
          </mesh>
        </group>
      ))}

      {/* Crankshaft & Oil Pan */}
      <mesh
        ref={crankRef}
        position={[0, -0.45, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        onClick={() => onSelectPart('pistons')}
      >
        <cylinderGeometry args={[0.11, 0.11, 2.55, 20]} />
        <meshStandardMaterial color={highlightColor('pistons', '#38bdf8')} metalness={0.9} roughness={0.2} />
      </mesh>

      <mesh position={[0, -0.72, 0]}>
        <boxGeometry args={[1.06, 0.34, 2.25]} />
        <meshStandardMaterial color="#1e293b" metalness={0.75} roughness={0.35} />
      </mesh>

      {/* Flywheel */}
      <mesh
        ref={flywheelRef}
        position={[0, -0.45, -1.32]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.52, 0.52, 0.12, 32]} />
        <meshStandardMaterial color="#475569" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* DOHC Cylinder Head & Blue Valve Cover */}
      <mesh position={[0, 0.72, 0]} onClick={() => onSelectPart('head')}>
        <boxGeometry args={[1.08, 0.32, 2.28]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.86} roughness={0.22} />
      </mesh>
      <mesh position={[0, 0.96, 0]} onClick={() => onSelectPart('head')}>
        <boxGeometry args={[0.92, 0.18, 2.16]} />
        <meshStandardMaterial
          color={highlightColor('head', '#1d4ed8')}
          metalness={0.72}
          roughness={0.26}
          emissive="#1e40af"
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* Ignition Coils */}
      {pistonOffsets.map((zOffset, idx) => (
        <mesh key={`coil-${idx}`} position={[0, 1.09, zOffset]}>
          <cylinderGeometry args={[0.06, 0.06, 0.1, 16]} />
          <meshStandardMaterial color="#22d3ee" emissive="#06b6d4" emissiveIntensity={0.6} />
        </mesh>
      ))}

      {/* Intake Manifold (Left side) */}
      <group position={[-0.78, 0.52, 0]} onClick={() => onSelectPart('intake')}>
        <mesh position={[-0.22, -0.08, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 1.95, 20]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial
            color={highlightColor('intake', '#334155')}
            metalness={0.78}
            roughness={0.3}
          />
        </mesh>
        {pistonOffsets.map((zOffset, idx) => (
          <mesh key={`runner-${idx}`} position={[0.08, 0.08, zOffset]} rotation={[0, 0, 0.55]}>
            <cylinderGeometry args={[0.065, 0.065, 0.56, 14]} />
            <meshStandardMaterial color={highlightColor('intake', '#64748b')} metalness={0.85} roughness={0.25} />
          </mesh>
        ))}
      </group>

      {/* Turbocharger Assembly (Right side) */}
      <group position={[0.95, 0.35, -0.35]} onClick={() => onSelectPart('turbo')}>
        {/* Exhaust snail */}
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.24, 0.11, 16, 32]} />
          <meshStandardMaterial color="#475569" metalness={0.85} roughness={0.35} />
        </mesh>
        {/* Compressor snail */}
        <mesh position={[0.26, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.25, 0.12, 16, 32]} />
          <meshStandardMaterial
            color={highlightColor('turbo', '#cbd5e1')}
            metalness={0.92}
            roughness={0.18}
          />
        </mesh>
        {/* Spinning Turbine Wheel */}
        <mesh ref={turboWheelRef} position={[0.32, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.14, 0.14, 0.06, 12]} />
          <meshStandardMaterial color="#22d3ee" emissive="#06b6d4" emissiveIntensity={0.45} metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Boost Pipe */}
        <mesh position={[0.12, 0.36, 0.25]} rotation={[0.45, 0, 0.4]}>
          <cylinderGeometry args={[0.075, 0.075, 0.72, 16]} />
          <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Front Pulley & Cooling Fan */}
      <group position={[0, -0.1, 1.32]} onClick={() => onSelectPart('cooling')}>
        <mesh position={[0, -0.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.1, 24]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0.48, 0.18, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.14, 0.14, 0.12, 20]} />
          <meshStandardMaterial color="#64748b" metalness={0.85} roughness={0.25} />
        </mesh>
        <group ref={fanRef} position={[0, 0.12, 0.18]}>
          {[0, 1, 2, 3, 4, 5].map((blade) => (
            <mesh
              key={`blade-${blade}`}
              rotation={[0, 0, (blade * Math.PI) / 3]}
            >
              <boxGeometry args={[0.09, 0.74, 0.03]} />
              <meshStandardMaterial
                color={highlightColor('cooling', '#38bdf8')}
                metalness={0.8}
                roughness={0.25}
              />
            </mesh>
          ))}
        </group>
      </group>

      {/* Interactive 3D Component Labels */}
      {showLabels &&
        ENGINE_PARTS.map((part) => (
          <Html key={part.id} position={part.labelPos} center distanceFactor={8}>
            <button
              type="button"
              onClick={() => onSelectPart(part.id)}
              style={{
                padding: '5px 10px',
                borderRadius: 999,
                background:
                  selectedPart === part.id
                    ? 'linear-gradient(135deg, #2563eb, #06b6d4)'
                    : 'rgba(5, 11, 24, 0.86)',
                border: `1px solid ${selectedPart === part.id ? '#67e8f9' : 'rgba(56, 189, 248, 0.45)'}`,
                color: '#f8fafc',
                fontSize: '11px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                boxShadow: '0 6px 18px rgba(0,0,0,0.45)',
                cursor: 'pointer',
              }}
            >
              {part.name}
            </button>
          </Html>
        ))}
    </group>
  );
}

function EngineFallback() {
  return (
    <div
      style={{
        height: '100%',
        minHeight: 490,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        textAlign: 'center',
        gap: 16,
      }}
    >
      <Cpu size={56} style={{ color: '#22d3ee' }} />
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>3D Dvigatel Sxemasi (Zaxira ko‘rinish)</h3>
      <p style={{ color: 'var(--text-secondary)', maxWidth: 420 }}>
        Qurilmangizda WebGL 3D rejimi vaqtincha cheklangan. O‘ng tarafdagi ro‘yxat orqali dvigatel qismlarining tuzilishi bilan tanishishingiz mumkin.
      </p>
    </div>
  );
}

export default function Engine3DSection() {
  const [selectedPartId, setSelectedPartId] = useState('turbo');
  const [isPlaying, setIsPlaying] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const controlsRef = useRef();

  const webglAvailable = useMemo(() => isWebGLSupported(), []);
  const activePart = ENGINE_PARTS.find((p) => p.id === selectedPartId) || ENGINE_PARTS[0];

  const handleZoom = (factor) => {
    const controls = controlsRef.current;
    if (!controls) return;
    const camera = controls.object;
    const direction = camera.position.clone().sub(controls.target);
    const nextLength = Math.min(9, Math.max(3.2, direction.length() * factor));
    direction.setLength(nextLength);
    camera.position.copy(controls.target).add(direction);
    controls.update();
  };

  const handleResetView = () => {
    const controls = controlsRef.current;
    if (!controls) return;
    controls.object.position.set(3.8, 2.2, 4.4);
    controls.target.set(0, 0.1, 0);
    controls.update();
  };

  return (
    <section id="dvigatellar" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <Cpu size={14} />
            Interaktiv 3D Dvigatel
          </div>
          <h2 className="section-title">4 silindrli Turbo dvigatelning 3D modeli</h2>
          <p className="section-subtitle">
            Sichqoncha yoki barmoq yordamida dvigatelni aylantiring, yaqinlashtiring va har bir asosiy qismning vazifasini o‘rganing.
          </p>
        </div>

        <div className="engine-layout">
          <div className="glass-card engine-canvas-card">
            {webglAvailable ? (
              <WebGLErrorBoundary fallback={<EngineFallback />}>
                <Suspense fallback={<EngineFallback />}>
                  <Canvas
                    camera={{ position: [3.8, 2.2, 4.4], fov: 42 }}
                    dpr={[1, 2]}
                    style={{ height: 490, width: '100%' }}
                  >
                    <ambientLight intensity={0.75} />
                    <directionalLight position={[6, 8, 6]} intensity={1.8} color="#e2e8f0" />
                    <pointLight position={[-4, 3, -3]} intensity={1.8} color="#2563eb" />
                    <pointLight position={[4, -1, 4]} intensity={1.5} color="#06b6d4" />

                    <EngineAssembly
                      isPlaying={isPlaying}
                      selectedPart={selectedPartId}
                      showLabels={showLabels}
                      onSelectPart={setSelectedPartId}
                    />

                    <OrbitControls
                      ref={controlsRef}
                      enableDamping
                      dampingFactor={0.08}
                      enablePan={false}
                      minDistance={3.2}
                      maxDistance={9}
                    />
                  </Canvas>
                </Suspense>
              </WebGLErrorBoundary>
            ) : (
              <EngineFallback />
            )}

            <div className="engine-controls-bar">
              <div className="engine-controls-group">
                <button
                  type="button"
                  className={`engine-ctrl-btn ${isPlaying ? 'active' : ''}`}
                  onClick={() => setIsPlaying((prev) => !prev)}
                >
                  {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                  {isPlaying ? 'To‘xtatish' : 'Ishga tushirish'}
                </button>
                <button
                  type="button"
                  className={`engine-ctrl-btn ${showLabels ? 'active' : ''}`}
                  onClick={() => setShowLabels((prev) => !prev)}
                >
                  {showLabels ? <Eye size={15} /> : <EyeOff size={15} />}
                  Yorliqlar
                </button>
              </div>

              <div className="engine-controls-group">
                <button
                  type="button"
                  className="engine-ctrl-btn"
                  onClick={() => handleZoom(0.84)}
                  aria-label="Yaqinlashtirish"
                >
                  <ZoomIn size={15} />
                </button>
                <button
                  type="button"
                  className="engine-ctrl-btn"
                  onClick={() => handleZoom(1.18)}
                  aria-label="Uzoqlashtirish"
                >
                  <ZoomOut size={15} />
                </button>
                <button
                  type="button"
                  className="engine-ctrl-btn"
                  onClick={handleResetView}
                  aria-label="Ko‘rinishni tiklash"
                >
                  <RotateCcw size={15} />
                  Tiklash
                </button>
              </div>
            </div>
          </div>

          <div className="glass-card engine-parts-panel">
            <div style={{ marginBottom: 6 }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-cyan-bright)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Tanlangan qism
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: 4 }}>{activePart.name}</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--accent-blue-bright)', fontWeight: 600, marginTop: 2 }}>
                {activePart.role}
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: 8, lineHeight: 1.6 }}>
                {activePart.description}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 'auto' }}>
              {ENGINE_PARTS.map((part) => (
                <button
                  key={part.id}
                  type="button"
                  onClick={() => setSelectedPartId(part.id)}
                  className={`engine-part-btn ${selectedPartId === part.id ? 'active' : ''}`}
                >
                  <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{part.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{part.role}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
