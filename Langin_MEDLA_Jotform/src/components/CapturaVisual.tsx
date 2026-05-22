import { useState, useEffect } from 'react';

const CYCLE_MS = 7000;

const DESTS = [
  { cy: 75,  abbr: '✉', label: 'Email' },
  { cy: 200, abbr: 'WA', label: 'WhatsApp' },
  { cy: 325, abbr: 'DB', label: 'CRM' },
];

// Bezier path strings from form right edge (~210) to each dest center (~390)
const PATHS = [
  'M 210 140 Q 300 90 390 75',
  'M 210 180 Q 300 185 390 200',
  'M 210 220 Q 300 280 390 325',
];

// 5 particles per destination, staggered
const PARTICLES = DESTS.flatMap((_, di) =>
  [0, 1, 2, 3, 4].map((pi) => ({ di, pi }))
);

export default function CapturaVisual() {
  const [cycle, setCycle] = useState(0);
  const [pulseIdx, setPulseIdx] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  // Pulse destinations sequentially during particle arrival window
  useEffect(() => {
    const delays = [3400, 3700, 4000];
    const timers = delays.map((d, i) =>
      setTimeout(() => {
        setPulseIdx(i);
        setTimeout(() => setPulseIdx(null), 500);
      }, d)
    );
    return () => timers.forEach(clearTimeout);
  }, [cycle]);

  return (
    <div className="w-full h-full relative overflow-hidden rounded-xl bg-white">
      <svg
        key={cycle}
        viewBox="0 0 500 400"
        className="w-full h-full"
        style={{ display: 'block' }}
      >
        <defs>
          <linearGradient id={`fg-${cycle}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F4E4C1" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
          <filter id={`glow-${cycle}`}>
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Particle path definitions */}
          {PATHS.map((d, i) => (
            <path key={i} id={`pp-${cycle}-${i}`} d={d} fill="none" />
          ))}
        </defs>

        {/* Dot-grid texture */}
        <pattern id={`dots-${cycle}`} x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="rgba(212,175,55,0.06)" />
        </pattern>
        <rect x="0" y="0" width="500" height="400" fill={`url(#dots-${cycle})`} />

        {/* === FORM PANEL === */}
        <rect x="28" y="50" width="170" height="300" rx="14" fill="#FAF8F3" stroke="#F4E4C1" strokeWidth="1.5" />
        {/* Form header bar */}
        <rect x="44" y="68" width="100" height="8" rx="4" fill="#F4E4C1" />
        <rect x="44" y="68" width="60" height="8" rx="4" fill="#D4AF37">
          <animate attributeName="width" from="0" to="60" dur="0.5s" begin="0.2s" fill="freeze" />
        </rect>

        {/* Form fields */}
        {[110, 160, 210, 260].map((y, i) => (
          <g key={i}>
            {/* Field background */}
            <rect x="44" y={y} width="136" height="26" rx="6" fill="white" stroke="#E8E8E8" strokeWidth="1.2" />
            {/* Fill bar */}
            <rect x="44" y={y} width="0" height="26" rx="6" fill={`url(#fg-${cycle})`} opacity="0.9">
              <animate
                attributeName="width"
                from="0"
                to="136"
                dur="0.55s"
                begin={`${0.4 + i * 0.45}s`}
                fill="freeze"
                calcMode="spline"
                keySplines="0.2 0.7 0.3 1"
              />
            </rect>
            {/* Check circle */}
            <circle cx="193" cy={y + 13} r="9" fill="#D4AF37" opacity="0">
              <animate
                attributeName="opacity"
                from="0"
                to="1"
                dur="0.25s"
                begin={`${0.4 + i * 0.45 + 0.5}s`}
                fill="freeze"
              />
            </circle>
            <text x="193" y={y + 18} textAnchor="middle" fontSize="9" fill="white" opacity="0" fontWeight="700">
              ✓
              <animate
                attributeName="opacity"
                from="0"
                to="1"
                dur="0.25s"
                begin={`${0.4 + i * 0.45 + 0.5}s`}
                fill="freeze"
              />
            </text>
          </g>
        ))}

        {/* Submit button */}
        <rect x="44" y="302" width="136" height="28" rx="8" fill="#D4AF37" opacity="0">
          <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="2.6s" fill="freeze" />
        </rect>
        <text x="112" y="321" textAnchor="middle" fontSize="10" fill="white" fontWeight="700" opacity="0">
          ENVIAR
          <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="2.6s" fill="freeze" />
        </text>

        {/* === CONNECTOR LINES (dashed) === */}
        {PATHS.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="rgba(212,175,55,0.3)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            opacity="0"
          >
            <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="2.8s" fill="freeze" />
          </path>
        ))}

        {/* === DESTINATION CIRCLES === */}
        {DESTS.map((d, i) => (
          <g key={i}>
            {/* Background circle */}
            <circle cx="390" cy={d.cy} r="30" fill="#FAF8F3" stroke="#D4AF37" strokeWidth="2"
              style={{ filter: pulseIdx === i ? 'drop-shadow(0 0 12px rgba(212,175,55,0.7))' : undefined }}>
              <animate
                attributeName="r"
                values={pulseIdx === i ? '30;36;30' : '30'}
                dur="0.45s"
                fill="freeze"
              />
            </circle>
            {/* Abbr badge */}
            <text x="390" y={d.cy + 5} textAnchor="middle" fontSize="10" fill="#B8941D" fontWeight="700" fontFamily="monospace">
              {d.abbr}
            </text>
            {/* Label */}
            <text x="390" y={d.cy + 46} textAnchor="middle" fontSize="8.5" fill="#B8941D" fontWeight="600" letterSpacing="0.8">
              {d.label.toUpperCase()}
            </text>
          </g>
        ))}

        {/* === PARTICLES along bezier paths === */}
        {PARTICLES.map(({ di, pi }) => {
          const beginS = 2.9 + di * 0.3 + pi * 0.22;
          const dur = 1.4 + pi * 0.08;
          return (
            <circle key={`${di}-${pi}`} r="4.5" fill="#D4AF37" filter={`url(#glow-${cycle})`} opacity="0">
              <animateMotion
                dur={`${dur}s`}
                begin={`${beginS}s`}
                fill="freeze"
                calcMode="spline"
                keySplines="0.4 0 0.6 1"
              >
                <mpath href={`#pp-${cycle}-${di}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;1;0.9;0"
                keyTimes="0;0.15;0.75;1"
                dur={`${dur}s`}
                begin={`${beginS}s`}
                fill="freeze"
              />
              <animate
                attributeName="r"
                values="3;5;3"
                keyTimes="0;0.5;1"
                dur={`${dur}s`}
                begin={`${beginS}s`}
                fill="freeze"
              />
            </circle>
          );
        })}

        {/* LABEL top-left */}
        <rect x="8" y="8" width="130" height="22" rx="11" fill="white" stroke="#F4E4C1" strokeWidth="1" />
        <text x="73" y="23" textAnchor="middle" fontSize="9" fill="#B8941D" fontWeight="700" letterSpacing="1.5">
          CAPTURA EN VIVO
        </text>
      </svg>
    </div>
  );
}
