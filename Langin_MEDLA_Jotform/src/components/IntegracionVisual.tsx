import { useState, useEffect } from "react";

export default function IntegracionVisual() {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), 8000);
    return () => clearInterval(id);
  }, []);

  const pathLeftCenter = "M 110 180 L 200 180";
  const pathCenterCRM = "M 290 180 C 340 180 360 80 402 80";
  const pathCenterWA = "M 290 180 L 402 180";
  const pathCenterEmail = "M 290 180 C 340 180 360 280 402 280";

  return (
    <div className="w-full h-full bg-white overflow-hidden flex flex-col items-center justify-center">
      <svg
        key={cycle}
        viewBox="0 0 500 360"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Left node — Jotform */}
        <rect
          x={30}
          y={140}
          width={80}
          height={80}
          rx={14}
          fill="white"
          stroke="#F4E4C1"
          strokeWidth={2}
        />
        <text
          x={70}
          y={187}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#D4AF37"
          fontFamily="monospace"
          fontWeight="bold"
          fontSize={22}
        >
          JF
        </text>
        <text
          x={70}
          y={236}
          textAnchor="middle"
          fill="#6B6B6B"
          fontFamily="monospace"
          fontSize={9}
          letterSpacing={2}
        >
          JOTFORM
        </text>

        {/* Connection paths (dashed) */}
        <path d={pathLeftCenter} stroke="#D4AF37" strokeWidth={1.5} strokeDasharray="5 4" fill="none" />
        <path d={pathCenterCRM} stroke="#D4AF37" strokeWidth={1.5} strokeDasharray="5 4" fill="none" />
        <path d={pathCenterWA} stroke="#D4AF37" strokeWidth={1.5} strokeDasharray="5 4" fill="none" />
        <path d={pathCenterEmail} stroke="#D4AF37" strokeWidth={1.5} strokeDasharray="5 4" fill="none" />

        {/* Animated particles — Left → Center */}
        {["0s", "1.2s", "2.4s"].map((begin, i) => (
          <circle key={`lc-${i}`} r={5} fill="#D4AF37" opacity={0.85}>
            <animateMotion dur="3.6s" begin={begin} repeatCount="indefinite">
              <mpath href={`#pathLC`} />
            </animateMotion>
          </circle>
        ))}
        <path id="pathLC" d={pathLeftCenter} fill="none" />

        {/* Animated particles — Center → CRM */}
        {["0s", "1.2s", "2.4s"].map((begin, i) => (
          <circle key={`crm-${i}`} r={5} fill="#D4AF37" opacity={0.85}>
            <animateMotion dur="3.6s" begin={begin} repeatCount="indefinite">
              <mpath href={`#pathCRM`} />
            </animateMotion>
          </circle>
        ))}
        <path id="pathCRM" d={pathCenterCRM} fill="none" />

        {/* Animated particles — Center → WA */}
        {["0s", "1.2s", "2.4s"].map((begin, i) => (
          <circle key={`wa-${i}`} r={5} fill="#D4AF37" opacity={0.85}>
            <animateMotion dur="3.6s" begin={begin} repeatCount="indefinite">
              <mpath href={`#pathWA`} />
            </animateMotion>
          </circle>
        ))}
        <path id="pathWA" d={pathCenterWA} fill="none" />

        {/* Animated particles — Center → Email */}
        {["0s", "1.2s", "2.4s"].map((begin, i) => (
          <circle key={`em-${i}`} r={5} fill="#D4AF37" opacity={0.85}>
            <animateMotion dur="3.6s" begin={begin} repeatCount="indefinite">
              <mpath href={`#pathEmail`} />
            </animateMotion>
          </circle>
        ))}
        <path id="pathEmail" d={pathCenterEmail} fill="none" />

        {/* Center — MEDLA Engine */}
        {/* Gold ring */}
        <circle cx={250} cy={180} r={50} fill="none" stroke="#D4AF37" strokeWidth={2} strokeDasharray="8 4" opacity={0.5}>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 250 180"
            to="360 250 180"
            dur="8s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Charcoal base circle */}
        <circle cx={250} cy={180} r={40} fill="#2C2C2C" />

        {/* Gear teeth group */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 250 180"
            to="360 250 180"
            dur="4s"
            repeatCount="indefinite"
          />
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 360) / 8;
            const rad = (angle * Math.PI) / 180;
            const x1 = 250 + 38 * Math.cos(rad);
            const y1 = 180 + 38 * Math.sin(rad);
            const x2 = 250 + 48 * Math.cos(rad);
            const y2 = 180 + 48 * Math.sin(rad);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#D4AF37"
                strokeWidth={5}
                strokeLinecap="round"
              />
            );
          })}
        </g>

        {/* "AI" label inside circle */}
        <text
          x={250}
          y={180}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontFamily="serif"
          fontWeight="bold"
          fontSize={20}
        >
          AI
        </text>

        {/* Label below center */}
        <text
          x={250}
          y={236}
          textAnchor="middle"
          fill="#6B6B6B"
          fontFamily="monospace"
          fontSize={8}
          letterSpacing={1.5}
        >
          MEDLA ENGINE
        </text>

        {/* Right outputs */}
        {[
          { y: 80, abbr: "CRM", label: "CRM" },
          { y: 180, abbr: "WA", label: "WHATSAPP" },
          { y: 280, abbr: "✉", label: "EMAIL" },
        ].map(({ y, abbr, label }) => (
          <g key={label}>
            <circle cx={430} cy={y} r={28} fill="#D4AF37" />
            <text
              x={430}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontFamily="monospace"
              fontWeight="bold"
              fontSize={abbr === "✉" ? 16 : 11}
            >
              {abbr}
            </text>
            <text
              x={430}
              y={y + 42}
              textAnchor="middle"
              fill="#6B6B6B"
              fontFamily="monospace"
              fontSize={8}
              letterSpacing={1.5}
            >
              {label}
            </text>
          </g>
        ))}
      </svg>

      {/* Status badge */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF8F3] border border-[#F4E4C1] mt-2 mb-2">
        <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
        <span className="font-mono text-[10px] text-[#6B6B6B] tracking-wide uppercase">
          SINCRONIZACIÓN ACTIVA · 99.8% uptime
        </span>
      </div>
    </div>
  );
}
