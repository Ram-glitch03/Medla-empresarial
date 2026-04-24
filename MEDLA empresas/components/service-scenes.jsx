// Per-service decorative scenes — each a unique SVG illustration
// 600 x 220 viewBox, white bg, navy + gold palette

function SceneLegal({ t }) {
  return (
    <svg viewBox="0 0 600 220" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="slGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E5C876" />
          <stop offset="100%" stopColor="#8D6F1E" />
        </linearGradient>
      </defs>
      {/* grid bg */}
      {[...Array(8)].map((_, i) => (
        <line key={i} x1={i * 80} y1="0" x2={i * 80} y2="220" stroke="#1A1A2E" strokeOpacity="0.03" />
      ))}
      {/* Gavel */}
      <g transform={`translate(140, 110) rotate(${Math.sin(t) * 6 - 20})`}>
        <rect x="-8" y="-70" width="16" height="90" rx="2" fill="url(#slGold)" />
        <rect x="-26" y="-90" width="52" height="30" rx="3" fill="#C9A84C" stroke="#8D6F1E" strokeWidth="1" />
        <rect x="-22" y="-86" width="44" height="6" rx="1" fill="#E5C876" />
      </g>
      {/* Strike plate */}
      <ellipse cx="200" cy="180" rx="80" ry="10" fill="#1A1A2E" opacity="0.08" />
      <rect x="140" y="160" width="120" height="16" rx="2" fill="url(#slGold)" />
      <rect x="148" y="156" width="104" height="6" rx="1" fill="#E5C876" />
      {/* Document */}
      <g transform="translate(360, 50)">
        <rect width="160" height="140" rx="2" fill="#FAFAF8" stroke="#E8E5DE" />
        <rect x="16" y="20" width="80" height="4" rx="1" fill="#C9A84C" />
        <rect x="16" y="36" width="128" height="2" fill="#E8E5DE" />
        <rect x="16" y="46" width="128" height="2" fill="#E8E5DE" />
        <rect x="16" y="56" width="110" height="2" fill="#E8E5DE" />
        <rect x="16" y="66" width="128" height="2" fill="#E8E5DE" />
        <rect x="16" y="76" width="90" height="2" fill="#E8E5DE" />
        {/* Seal */}
        <circle cx="124" cy="110" r="18" fill="none" stroke="#C9A84C" strokeWidth="1.5" />
        <circle cx="124" cy="110" r="13" fill="none" stroke="#C9A84C" strokeWidth="0.6" strokeDasharray="2 2" />
        <text x="124" y="114" textAnchor="middle" fontSize="9" fill="#C9A84C" fontFamily="serif" fontStyle="italic">M</text>
        {/* Signature */}
        <path d="M 20 120 Q 35 110 45 118 Q 55 126 70 115" stroke="#1A1A2E" strokeWidth="1.2" fill="none" opacity="0.6" />
      </g>
    </svg>
  );
}

function SceneConstitucion({ t }) {
  return (
    <svg viewBox="0 0 600 220" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="scBldg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FAFAF8" />
          <stop offset="100%" stopColor="#E8E5DE" />
        </linearGradient>
      </defs>
      {/* Ground */}
      <line x1="40" y1="190" x2="560" y2="190" stroke="#1A1A2E" strokeOpacity="0.2" />
      {/* Building 1 — classical */}
      <g transform="translate(80, 60)">
        <polygon points="0,50 70,20 140,50" fill="#C9A84C" opacity="0.9" />
        <rect x="4" y="50" width="132" height="80" fill="url(#scBldg)" stroke="#C9A84C" strokeWidth="1" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={12 + i * 25} y="50" width="8" height="80" fill="#C9A84C" opacity="0.4" />
        ))}
        <rect x="4" y="125" width="132" height="5" fill="#C9A84C" />
        <rect x="54" y="100" width="32" height="30" fill="#1A1A2E" opacity="0.6" />
      </g>
      {/* Building 2 — modern */}
      <g transform="translate(260, 90)">
        <rect width="80" height="100" fill="#1A1A2E" />
        {[...Array(8)].map((_, i) =>
          [...Array(4)].map((_, j) => (
            <rect key={`${i}-${j}`} x={10 + j * 18} y={10 + i * 12} width="10" height="6"
              fill="#C9A84C" opacity={0.3 + ((i + j + Math.floor(t)) % 3) * 0.2} />
          ))
        )}
      </g>
      {/* Building 3 */}
      <g transform="translate(360, 110)">
        <rect width="60" height="80" fill="url(#scBldg)" stroke="#C9A84C" strokeWidth="1" />
        <rect x="8" y="10" width="44" height="6" fill="#C9A84C" opacity="0.3" />
        <rect x="8" y="22" width="44" height="6" fill="#C9A84C" opacity="0.3" />
        <rect x="8" y="34" width="44" height="6" fill="#C9A84C" opacity="0.3" />
        <rect x="8" y="46" width="44" height="6" fill="#C9A84C" opacity="0.3" />
      </g>
      {/* Arrow connecting — growth */}
      <path d="M 440 180 Q 470 140 500 100 L 510 100 M 500 100 L 500 110" stroke="#C9A84C" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="440" cy="180" r="3" fill="#C9A84C" />
      <polygon points="500,90 510,100 500,110" fill="#C9A84C" />
      {/* Stamp */}
      <g transform={`translate(500, 60) rotate(${Math.sin(t * 0.5) * 4 - 8})`}>
        <rect x="-30" y="-18" width="60" height="36" fill="none" stroke="#C9A84C" strokeWidth="1.5" rx="2" />
        <text textAnchor="middle" y="4" fontSize="11" fill="#C9A84C" fontFamily="serif" fontStyle="italic" fontWeight="600">S.L.</text>
      </g>
    </svg>
  );
}

function SceneInversiones({ t }) {
  const bars = [40, 65, 50, 80, 60, 95, 75, 110, 90, 130];
  return (
    <svg viewBox="0 0 600 220" preserveAspectRatio="xMidYMid meet">
      <line x1="40" y1="180" x2="560" y2="180" stroke="#1A1A2E" strokeOpacity="0.15" />
      {[40, 80, 120, 160].map((y) => (
        <line key={y} x1="40" y1={y} x2="560" y2={y} stroke="#1A1A2E" strokeOpacity="0.04" strokeDasharray="3 4" />
      ))}
      {/* Bars */}
      {bars.map((h, i) => {
        const wave = Math.sin(t + i * 0.4) * 6;
        const H = h + wave;
        return (
          <g key={i}>
            <rect x={60 + i * 36} y={180 - H} width="22" height={H} fill="#1A1A2E" opacity="0.85" />
            <rect x={60 + i * 36} y={180 - H} width="22" height="4" fill="#C9A84C" />
          </g>
        );
      })}
      {/* Trend line */}
      <path
        d={bars.map((h, i) => `${i === 0 ? "M" : "L"} ${71 + i * 36} ${180 - h - Math.sin(t + i * 0.4) * 6}`).join(" ")}
        stroke="#C9A84C"
        strokeWidth="1.8"
        fill="none"
        opacity="0.6"
      />
      {/* Arrow up */}
      <g transform="translate(520, 40)">
        <circle r="20" fill="#C9A84C" />
        <path d="M 0 7 L 0 -7 M -5 -2 L 0 -7 L 5 -2" stroke="#FAFAF8" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* € floating */}
      <text x="80" y="50" fontSize="22" fill="#C9A84C" fontFamily="serif" fontStyle="italic" opacity="0.6">€</text>
      <text x="480" y="90" fontSize="14" fill="#C9A84C" fontFamily="serif" fontStyle="italic" opacity="0.4">€</text>
    </svg>
  );
}

function SceneDigitalizacion({ t }) {
  return (
    <svg viewBox="0 0 600 220" preserveAspectRatio="xMidYMid meet">
      {/* Paper stack on left */}
      <g transform="translate(60, 50)">
        {[0, 1, 2].map((i) => (
          <rect key={i} x={i * 4} y={i * -4} width="90" height="120" rx="2"
            fill="#FAFAF8" stroke="#E8E5DE" strokeWidth="1" />
        ))}
        <rect x="8" y="-4" width="90" height="120" rx="2" fill="#FFF" stroke="#C9A84C" strokeWidth="1" />
        {[0,1,2,3,4].map(i => (
          <rect key={i} x="16" y={10 + i * 16} width="74" height="3" fill="#E8E5DE" />
        ))}
      </g>
      {/* Arrow with "scan" pulse */}
      <g transform="translate(220, 110)">
        <line x1="0" y1="0" x2="140" y2="0" stroke="#C9A84C" strokeWidth="1.2" strokeDasharray="4 4" />
        <circle cx={(Math.sin(t) * 0.5 + 0.5) * 140} cy="0" r="5" fill="#C9A84C" />
        <polygon points="140,-6 150,0 140,6" fill="#C9A84C" />
        <text x="70" y="-12" textAnchor="middle" fontSize="9" fill="#9A9AB0" letterSpacing="2">DIGITALIZAR</text>
      </g>
      {/* Screen/laptop on right */}
      <g transform="translate(400, 50)">
        <rect x="-10" y="0" width="170" height="110" rx="4" fill="#1A1A2E" />
        <rect x="0" y="8" width="150" height="90" rx="2" fill="#FAFAF8" />
        {/* UI rows */}
        <rect x="8" y="16" width="40" height="4" fill="#C9A84C" />
        <rect x="8" y="26" width="134" height="1" fill="#E8E5DE" />
        {/* Cards */}
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${8 + i * 48}, 36)`}>
            <rect width="42" height="54" rx="2" fill="#FFF" stroke="#E8E5DE" />
            <rect x="4" y="6" width="20" height="3" fill="#C9A84C" opacity="0.6" />
            <rect x="4" y="14" width="34" height="2" fill="#E8E5DE" />
            <rect x="4" y="20" width="28" height="2" fill="#E8E5DE" />
            <circle cx="36" cy="46" r="4" fill={i === Math.floor(t) % 3 ? "#C9A84C" : "#E8E5DE"} />
          </g>
        ))}
        {/* base */}
        <rect x="-20" y="110" width="190" height="4" rx="1" fill="#1A1A2E" />
      </g>
    </svg>
  );
}

function SceneAutomatizacion({ t }) {
  const nodes = [
    { x: 90, y: 60, l: "CRM" },
    { x: 90, y: 160, l: "ERP" },
    { x: 300, y: 110, l: "MEDLA", big: true },
    { x: 510, y: 60, l: "Banco" },
    { x: 510, y: 160, l: "BI" },
  ];
  const edges = [[0,2],[1,2],[2,3],[2,4]];
  return (
    <svg viewBox="0 0 600 220" preserveAspectRatio="xMidYMid meet">
      {/* Gears bg */}
      <g opacity="0.08" transform={`translate(50, 50) rotate(${t * 20})`}>
        <path d="M 0 -20 L 4 -16 L 8 -18 L 10 -12 L 16 -12 L 14 -6 L 20 -4 L 18 2 L 22 6 L 16 10 L 16 16 L 10 14 L 8 20 L 4 16 L 0 22 L -4 16 L -8 20 L -10 14 L -16 16 L -16 10 L -22 6 L -18 2 L -22 -4 L -18 -10 L -14 -10 L -12 -16 L -8 -18 L -4 -16 Z" fill="#1A1A2E" />
      </g>
      {/* Edges with animated flow */}
      {edges.map(([a, b], i) => {
        const A = nodes[a], B = nodes[b];
        const prog = (t * 0.5 + i * 0.25) % 1;
        const px = A.x + (B.x - A.x) * prog;
        const py = A.y + (B.y - A.y) * prog;
        return (
          <g key={i}>
            <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#C9A84C" strokeOpacity="0.3" strokeWidth="1.2" strokeDasharray="2 4" />
            <circle cx={px} cy={py} r="4" fill="#C9A84C" />
          </g>
        );
      })}
      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={i} transform={`translate(${n.x}, ${n.y})`}>
          <circle r={n.big ? 34 : 24} fill={n.big ? "#1A1A2E" : "#FAFAF8"} stroke={n.big ? "#C9A84C" : "#E8E5DE"} strokeWidth="1.5" />
          {n.big && <circle r="40" fill="none" stroke="#C9A84C" strokeOpacity="0.3" style={{ transformOrigin: `${n.x}px ${n.y}px`, animation: "pulse 2s ease-in-out infinite" }} />}
          <text textAnchor="middle" y="4" fontSize={n.big ? "11" : "10"} fill={n.big ? "#C9A84C" : "#1A1A2E"} fontFamily="Inter" fontWeight="500">{n.l}</text>
        </g>
      ))}
    </svg>
  );
}

function SceneIA({ t }) {
  return (
    <svg viewBox="0 0 600 220" preserveAspectRatio="xMidYMid meet">
      {/* Neural net */}
      {[0,1,2,3,4].map(i => (
        [0,1,2,3].map(j => {
          const cx = 100 + i * 100;
          const cy = 40 + j * 50;
          return [0,1,2,3].map(k => {
            if (i === 4) return null;
            const x2 = cx + 100;
            const y2 = 40 + k * 50;
            return <line key={`${i}-${j}-${k}`} x1={cx} y1={cy} x2={x2} y2={y2}
              stroke="#C9A84C"
              strokeOpacity={0.05 + Math.abs(Math.sin(t + i + j + k)) * 0.2}
              strokeWidth="0.6" />;
          });
        })
      ))}
      {/* Nodes */}
      {[0,1,2,3,4].map(i => (
        [0,1,2,3].map(j => {
          const cx = 100 + i * 100;
          const cy = 40 + j * 50;
          const active = Math.sin(t * 1.5 + i * 0.7 + j * 0.5) > 0.4;
          return (
            <g key={`n-${i}-${j}`}>
              <circle cx={cx} cy={cy} r="8" fill={active ? "#C9A84C" : "#FAFAF8"} stroke="#C9A84C" strokeWidth="1" />
              {active && <circle cx={cx} cy={cy} r="12" fill="none" stroke="#C9A84C" strokeOpacity="0.3" />}
            </g>
          );
        })
      ))}
      {/* Input/output labels */}
      <text x="100" y="210" textAnchor="middle" fontSize="9" fill="#9A9AB0" letterSpacing="1.5">INPUT</text>
      <text x="500" y="210" textAnchor="middle" fontSize="9" fill="#9A9AB0" letterSpacing="1.5">OUTPUT</text>
      {/* Brain pulse circle */}
      <circle cx="300" cy="115" r="60" fill="none" stroke="#C9A84C" strokeOpacity="0.15" strokeDasharray="2 6" style={{ transformOrigin: "300px 115px", animation: "spin0 40s linear infinite" }} />
    </svg>
  );
}

function SceneSocial({ t }) {
  return (
    <svg viewBox="0 0 600 220" preserveAspectRatio="xMidYMid meet">
      {/* Phone */}
      <g transform="translate(60, 30)">
        <rect width="120" height="170" rx="10" fill="#1A1A2E" />
        <rect x="5" y="5" width="110" height="160" rx="6" fill="#FAFAF8" />
        <rect x="45" y="8" width="30" height="4" rx="2" fill="#1A1A2E" />
        {/* Profile header */}
        <circle cx="22" cy="30" r="8" fill="#C9A84C" />
        <rect x="35" y="25" width="50" height="3" fill="#1A1A2E" opacity="0.6" />
        <rect x="35" y="32" width="36" height="2" fill="#1A1A2E" opacity="0.3" />
        {/* Post img */}
        <rect x="10" y="48" width="100" height="60" rx="2" fill="#C9A84C" opacity="0.2" />
        <circle cx="60" cy="78" r="16" fill="#C9A84C" opacity="0.4" />
        {/* Engagement */}
        <path d="M 14 118 L 18 114 L 22 118 M 18 114 L 18 124" stroke="#C9A84C" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <text x="30" y="123" fontSize="8" fill="#1A1A2E">12.4K</text>
        <circle cx="60" cy="119" r="2" fill="#1A1A2E" opacity="0.4" />
        <text x="72" y="123" fontSize="8" fill="#1A1A2E">847</text>
        {/* Copy */}
        <rect x="10" y="136" width="80" height="2" fill="#1A1A2E" opacity="0.3" />
        <rect x="10" y="144" width="96" height="2" fill="#1A1A2E" opacity="0.3" />
        <rect x="10" y="152" width="60" height="2" fill="#1A1A2E" opacity="0.3" />
      </g>
      {/* Floating engagement bubbles */}
      {[
        { x: 240, y: 60, r: 18, label: "♥", ts: 0 },
        { x: 320, y: 40, r: 14, label: "↗", ts: 0.5 },
        { x: 280, y: 110, r: 22, label: "✦", ts: 1 },
        { x: 380, y: 140, r: 16, label: "♥", ts: 1.5 },
        { x: 340, y: 90, r: 12, label: "+", ts: 2 },
      ].map((b, i) => {
        const pulse = Math.sin(t + b.ts) * 2;
        return (
          <g key={i} transform={`translate(${b.x}, ${b.y + pulse})`}>
            <circle r={b.r} fill="#C9A84C" opacity={0.9 - i * 0.1} />
            <text textAnchor="middle" y="5" fontSize="14" fill="#FAFAF8">{b.label}</text>
          </g>
        );
      })}
      {/* Audience graph bars */}
      <g transform="translate(430, 50)">
        <text y="-8" fontSize="9" fill="#9A9AB0" letterSpacing="1.5">AUDIENCE</text>
        {[30, 50, 75, 95, 130].map((h, i) => (
          <rect key={i} x={i * 24} y={140 - h} width="16" height={h}
            fill={i === 4 ? "#C9A84C" : "#1A1A2E"} opacity={i === 4 ? 1 : 0.85} />
        ))}
        <line x1="0" y1="142" x2="116" y2="142" stroke="#1A1A2E" strokeOpacity="0.2" />
      </g>
    </svg>
  );
}

const Scenes = {
  legal: SceneLegal,
  constitucion: SceneConstitucion,
  inversiones: SceneInversiones,
  digitalizacion: SceneDigitalizacion,
  automatizacion: SceneAutomatizacion,
  ia: SceneIA,
  social: SceneSocial,
};

window.Scenes = Scenes;
