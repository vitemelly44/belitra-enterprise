import { useState, useEffect, useRef } from 'react';

interface PathData {
  d: string;
  frame: number;
  thickness: number;
}

interface DecorationData {
  cx: number;
  cy: number;
  r: number;
  frame: number;
}

interface StructureData {
  pillars: PathData[];
  arches: PathData[];
  horizontals: PathData[];
  diagonals: PathData[];
  roofs: PathData[];
  curves: PathData[];
  decorations: DecorationData[];
}

function generateSymmetricStructure(w: number, h: number, frame: number): StructureData {
  const _seed = frame * 1000;
  // Use a deterministic pseudo-random generator seeded by frame
  let s = _seed;
  const rng = () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };

  // 1. Pillars
  const pillars: PathData[] = [];
  for (let i = 0; i < 3; i++) {
    const x1 = rng() * w * 0.5;
    const x2 = x1 + 20 + rng() * 40;
    const y = h * 0.8 + rng() * h * 0.1;
    const thickness = 2 + rng() * 3;
    pillars.push({
      d: `M ${x1} ${y} L ${x2} ${y} L ${x2} ${h} L ${x1} ${h} Z`,
      frame: 2 + i,
      thickness,
    });
  }

  // 2. Arches
  const arches: PathData[] = [];
  const cx = w * 0.5;
  const cy = h * 0.5;
  const maxR = Math.min(w, h) * 0.35;
  for (let i = 0; i < 3; i++) {
    const r = 30 + rng() * maxR;
    const startAngle = rng() * Math.PI;
    const endAngle = startAngle + Math.PI;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const largeArcFlag = rng() > 0.5 ? 1 : 0;
    arches.push({
      d: `M ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      frame: 3 + i,
      thickness: 2,
    });
  }

  // 3. Horizontals
  const horizontals: PathData[] = [];
  for (let i = 0; i < 5; i++) {
    const y = h * 0.2 + rng() * h * 0.6;
    const x1 = rng() * w * 0.3;
    const x2 = x1 + 100 + rng() * 200;
    const thickness = 1 + rng() * 4;
    horizontals.push({
      d: `M ${x1} ${y} L ${x2} ${y}`,
      frame: 2 + Math.floor(i / 2),
      thickness,
    });
  }

  // 4. Diagonals
  const diagonals: PathData[] = [];
  for (let i = 0; i < 4; i++) {
    const x1 = rng() * w;
    const y1 = rng() * h;
    const len = 50 + rng() * 150;
    const angle = rng() * Math.PI * 2;
    const x2 = x1 + len * Math.cos(angle);
    const y2 = y1 + len * Math.sin(angle);
    diagonals.push({
      d: `M ${x1} ${y1} L ${x2} ${y2}`,
      frame: 4 + i,
      thickness: 1.5,
    });
  }

  // 5. Roofs
  const roofs: PathData[] = [];
  const baseX = w * 0.5;
  const baseY = h * 0.8;
  roofs.push({
    d: `M ${baseX - 100} ${baseY} L ${baseX} ${baseY - 150} L ${baseX + 100} ${baseY}`,
    frame: 5,
    thickness: 3,
  });

  // 6. Curves
  const curves: PathData[] = [];
  for (let i = 0; i < 3; i++) {
    const cp1x = rng() * w;
    const cp1y = rng() * h;
    const cp2x = rng() * w;
    const cp2y = rng() * h;
    const endX = rng() * w;
    const endY = rng() * h;
    curves.push({
      d: `M 0 ${h * 0.5} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`,
      frame: 6 + i,
      thickness: 1.5,
    });
  }

  // 7. Decorations
  const decorations: DecorationData[] = [];
  for (let i = 0; i < 5; i++) {
    const x = rng() * w;
    const y = rng() * h;
    decorations.push({
      cx: x,
      cy: y,
      r: 2 + rng() * 4,
      frame: 7,
    });
  }

  return { pillars, arches, horizontals, diagonals, roofs, curves, decorations };
}

export default function BlueprintEngine() {
  const [frame, setFrame] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ width: 600, height: 600 });

  useEffect(() => {
    const updateSize = () => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        setSize({ width: rect.width || 600, height: rect.height || 600 });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => {
        if (prev >= 8) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const structure = generateSymmetricStructure(size.width, size.height, frame);
  const allPaths = [
    ...structure.pillars,
    ...structure.arches,
    ...structure.horizontals,
    ...structure.diagonals,
    ...structure.roofs,
    ...structure.curves,
  ];

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${size.width} ${size.height}`}
      className="w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        path {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        circle {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        path:not(.painted) {
          fill: none;
          stroke: #0C4A6E;
          stroke-width: 1;
        }
        path.painted {
          fill: #0C4A6E;
          fill-opacity: 0.2;
          stroke: #0C4A6E;
          stroke-width: 2;
        }
        circle:not(.painted) {
          fill: none;
          stroke: #0C4A6E;
          stroke-width: 1;
        }
        circle.painted {
          fill: #0C4A6E;
          fill-opacity: 0.6;
          stroke: #0C4A6E;
          stroke-width: 1.5;
        }
      `}</style>
      {allPaths.map((p, i) => (
        <path
          key={i}
          d={p.d}
          className={frame >= p.frame ? 'painted' : ''}
        />
      ))}
      {structure.decorations.map((d, i) => (
        <circle
          key={`dec-${i}`}
          cx={d.cx}
          cy={d.cy}
          r={d.r}
          className={frame >= d.frame ? 'painted' : ''}
        />
      ))}
    </svg>
  );
}
