import { useEffect, useState } from 'react';

const PETAL_COLORS = [
  'hsl(345, 75%, 78%)',
  'hsl(350, 70%, 82%)',
  'hsl(340, 65%, 80%)',
  'hsl(355, 80%, 85%)',
  'hsl(330, 60%, 78%)',
];

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  rotate: number;
  color: string;
}

function PetalSVG({ size, opacity, color }: { size: number; opacity: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(20,20)">
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <ellipse
            key={i}
            cx={Math.cos((angle * Math.PI) / 180) * 9}
            cy={Math.sin((angle * Math.PI) / 180) * 9}
            rx="6"
            ry="9"
            transform={`rotate(${angle + 90} ${Math.cos((angle * Math.PI) / 180) * 9} ${Math.sin((angle * Math.PI) / 180) * 9})`}
            fill={color}
            fillOpacity="0.85"
          />
        ))}
        <circle cx="0" cy="0" r="3" fill="hsl(345, 60%, 88%)" />
      </g>
    </svg>
  );
}

export default function SakuraPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const count = 14;
    const generated: Petal[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 14 + 10,
      duration: Math.random() * 10 + 12,
      delay: Math.random() * 15,
      opacity: Math.random() * 0.4 + 0.4,
      rotate: Math.random() * 360,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    }));
    setPetals(generated);
  }, []);

  if (petals.length === 0) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="sakura-petal"
          style={{
            left: `${petal.left}%`,
            top: '-30px',
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            transform: `rotate(${petal.rotate}deg)`,
          }}
        >
          <PetalSVG size={petal.size} opacity={petal.opacity} color={petal.color} />
        </div>
      ))}
    </div>
  );
}
