// Service icons — minimal line icons, each rendered as SVG paths
// Shared between hero orbit and tile headers. 24x24 base.

const ServiceIcons = {
  finanzas: (
    <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 18 L9 13 L13 15 L20 7" />
      <path d="M15 7 L20 7 L20 12" />
      <circle cx="9" cy="13" r="1" fill="currentColor" />
      <circle cx="13" cy="15" r="1" fill="currentColor" />
    </g>
  ),
  automatizacion: (
    <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 4 L12 6 M12 18 L12 20 M4 12 L6 12 M18 12 L20 12" />
      <path d="M6.3 6.3 L7.7 7.7 M16.3 16.3 L17.7 17.7 M6.3 17.7 L7.7 16.3 M16.3 7.7 L17.7 6.3" />
    </g>
  ),
  digitalizacion: (
    <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="5" width="16" height="12" rx="1.5" />
      <path d="M8 20 L16 20" />
      <path d="M12 17 L12 20" />
      <path d="M8 10 L10 12 L8 14 M13 14 L16 14" />
    </g>
  ),
  ia: (
    <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1.3" fill="currentColor" />
      <path d="M12 4 L12 8 M12 16 L12 20 M4 12 L8 12 M16 12 L20 12" />
      <circle cx="12" cy="4" r="1" fill="currentColor" />
      <circle cx="12" cy="20" r="1" fill="currentColor" />
      <circle cx="4" cy="12" r="1" fill="currentColor" />
      <circle cx="20" cy="12" r="1" fill="currentColor" />
    </g>
  ),
  contratos: (
    <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3 L16 3 L19 6 L19 21 L6 21 Z" />
      <path d="M16 3 L16 6 L19 6" />
      <path d="M9 10 L15 10 M9 13 L15 13 M9 16 L13 16" />
    </g>
  ),
  comercial: (
    <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 18 L4 10 M9 18 L9 7 M14 18 L14 12 M19 18 L19 5" />
      <path d="M3 20 L20 20" />
    </g>
  ),
  legal: (
    <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4 L12 20" />
      <path d="M5 20 L19 20" />
      <path d="M5 7 L19 7" />
      <circle cx="5" cy="7" r="1" fill="currentColor" />
      <circle cx="19" cy="7" r="1" fill="currentColor" />
      <path d="M2 13 L5 7 L8 13 Q5 15 2 13" />
      <path d="M16 13 L19 7 L22 13 Q19 15 16 13" />
    </g>
  ),
  constitucion: (
    <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20 L20 20" />
      <path d="M4 10 L20 10 L12 4 Z" />
      <path d="M7 10 L7 20 M11 10 L11 20 M13 10 L13 20 M17 10 L17 20" />
    </g>
  ),
  inversiones: (
    <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4 A8 8 0 0 1 18.9 16" fill="currentColor" opacity="0.15" stroke="none" />
      <path d="M12 4 A8 8 0 0 1 18.9 16" />
      <path d="M12 8 L12 12 L15 14" />
    </g>
  ),
  social: (
    <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="3" />
      <circle cx="17" cy="10" r="2.2" />
      <path d="M3 19 Q3 14 9 14 Q15 14 15 19" />
      <path d="M15 14.5 Q21 14.5 21 19" />
    </g>
  ),
};

function ServiceIcon({ name, size = 24, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color, display: "block" }}>
      {ServiceIcons[name]}
    </svg>
  );
}

window.ServiceIcons = ServiceIcons;
window.ServiceIcon = ServiceIcon;
