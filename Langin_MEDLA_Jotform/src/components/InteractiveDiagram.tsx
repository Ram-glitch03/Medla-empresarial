import React, { useState, useEffect, useRef } from 'react';

type NodeID = 'jotform' | 'validacion' | 'routing' | 'storage' | 'triggers' | 'crm' | 'whatsapp' | 'email';
type CaseID = 'lead' | 'onboarding' | 'event';

const VB_W = 800, VB_H = 460;

interface DiagramNode {
  id: NodeID;
  abbr: string;
  label: string;
  px: number;
  py: number;
  level: 'center' | 'middle' | 'outer';
  desc: string;
}

const NODES: DiagramNode[] = [
  {
    id: 'jotform', abbr: 'JF', label: 'Jotform Core',
    px: 400, py: 230, level: 'center',
    desc: 'El punto de entrada del ecosistema. Captura datos, firmas y pagos con seguridad enterprise-grade.',
  },
  {
    id: 'validacion', abbr: 'VAL', label: 'Validación',
    px: 280, py: 138, level: 'middle',
    desc: 'Limpia y valida emails, teléfonos e información en milisegundos antes de procesarlos.',
  },
  {
    id: 'routing', abbr: 'IA', label: 'Routing IA',
    px: 520, py: 138, level: 'middle',
    desc: 'Clasifica y dirige prospectos según perfil comercial, geografía e intención de compra.',
  },
  {
    id: 'storage', abbr: 'DB', label: 'Storage / DB',
    px: 280, py: 322, level: 'middle',
    desc: 'Resguarda registros en hojas de cálculo, SQL o unidades en la nube en tiempo real.',
  },
  {
    id: 'triggers', abbr: 'ZAP', label: 'Disparadores',
    px: 520, py: 322, level: 'middle',
    desc: 'Inicia acciones inmediatas en sistemas externos mediante webhooks de alta precisión.',
  },
  {
    id: 'crm', abbr: 'CRM', label: 'CRM (GHL)',
    px: 110, py: 230, level: 'outer',
    desc: 'Crea contactos, asigna tags y embudos de venta. Pipeline gestionado automáticamente.',
  },
  {
    id: 'whatsapp', abbr: 'WA', label: 'WhatsApp',
    px: 400, py: 68, level: 'outer',
    desc: 'Notifica al instante con mensajes personalizados. Bienvenidas y confirmaciones automáticas.',
  },
  {
    id: 'email', abbr: '@', label: 'Email',
    px: 690, py: 230, level: 'outer',
    desc: 'Envía minutas PDF, confirmaciones HTML premium y recordatorios de fechas clave.',
  },
];

const CONNECTIONS: [NodeID, NodeID][] = [
  ['jotform', 'validacion'], ['jotform', 'routing'],
  ['jotform', 'storage'],    ['jotform', 'triggers'],
  ['validacion', 'crm'],     ['routing', 'crm'],
  ['routing', 'whatsapp'],   ['storage', 'crm'],
  ['storage', 'email'],      ['triggers', 'whatsapp'],
  ['triggers', 'email'],
];

interface Case {
  id: CaseID;
  label: string;
  subtitle: string;
  nodes: NodeID[];
  path: string;
  desc: string;
}

const CASES: Case[] = [
  {
    id: 'lead',
    label: 'Calificación de Lead',
    subtitle: 'Jotform → Validación → Routing IA → CRM',
    nodes: ['jotform', 'validacion', 'routing', 'crm'],
    path: 'M 400 230 L 280 138 L 520 138 L 110 230',
    desc: 'El prospecto llena el formulario. MEDLA valida los datos, los clasifica con IA y los envía al CRM con tags y embudo asignado automáticamente.',
  },
  {
    id: 'onboarding',
    label: 'Onboarding de Cliente',
    subtitle: 'Jotform → Validación → Storage → Email PDF',
    nodes: ['jotform', 'validacion', 'storage', 'email'],
    path: 'M 400 230 L 280 138 L 280 322 L 690 230',
    desc: 'El cliente firma el contrato digital. Los datos se validan, se guardan en la base de datos y se dispara un email con PDF de bienvenida y próximos pasos.',
  },
  {
    id: 'event',
    label: 'Registro de Evento',
    subtitle: 'Jotform → Disparadores → WhatsApp + Email',
    nodes: ['jotform', 'triggers', 'whatsapp', 'email'],
    path: 'M 400 230 L 520 322 L 400 68 L 690 230',
    desc: 'El asistente completa el registro en tiempo real. Los disparadores envían WhatsApp con accesos y email con detalles — todo en menos de 5 segundos.',
  },
];

export default function InteractiveDiagram() {
  const [hoveredNode, setHoveredNode] = useState<NodeID | null>(null);
  const [caseIdx, setCaseIdx] = useState<number | null>(null);
  const [isAuto, setIsAuto] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeCase = caseIdx !== null ? CASES[caseIdx] : null;

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (progRef.current) clearInterval(progRef.current);
    if (!isAuto || hoveredNode || caseIdx === null) return;

    setProgress(0);
    progRef.current = setInterval(() => setProgress(p => Math.min(p + 2.5, 100)), 100);
    timerRef.current = setInterval(() => {
      setCaseIdx(i => i !== null ? (i + 1) % 3 : 0);
      setProgress(0);
    }, 4000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progRef.current) clearInterval(progRef.current);
    };
  }, [isAuto, hoveredNode, caseIdx]);

  const getNode = (id: NodeID) => NODES.find(n => n.id === id)!;

  const isConnActive = (from: NodeID, to: NodeID) => {
    if (hoveredNode) return hoveredNode === 'jotform' || hoveredNode === from || hoveredNode === to;
    if (!activeCase) return false;
    return activeCase.nodes.includes(from) && activeCase.nodes.includes(to);
  };

  const isNodeActive = (id: NodeID) => {
    if (hoveredNode) return id === hoveredNode || id === 'jotform';
    if (!activeCase) return false;
    return activeCase.nodes.includes(id);
  };

  const hoveredData = hoveredNode ? NODES.find(n => n.id === hoveredNode) : null;

  return (
    <div className="w-full flex flex-col gap-5">

      {/* Case tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {CASES.map((c, i) => (
          <button
            key={c.id}
            onClick={() => { setCaseIdx(i); setIsAuto(false); setProgress(0); }}
            className={`relative text-left px-4 py-3 rounded-xl border-2 transition-all duration-300 overflow-hidden ${
              caseIdx === i
                ? 'bg-charcoal border-gold shadow-lg'
                : 'bg-white border-gray-light hover:border-gold-light'
            }`}
          >
            <span className="block font-mono text-[9px] uppercase tracking-widest text-gold mb-0.5">
              Caso {i + 1}
            </span>
            <span className={`block font-serif text-sm font-semibold leading-tight ${
              caseIdx === i ? 'text-white' : 'text-charcoal'
            }`}>
              {c.label}
            </span>
            <span className={`block font-sans text-[10px] mt-1 leading-snug ${
              caseIdx === i ? 'text-gold-light/80' : 'text-gray-med'
            }`}>
              {c.subtitle}
            </span>
            {caseIdx === i && isAuto && (
              <div
                className="absolute bottom-0 left-0 h-[3px] bg-gold rounded-full"
                style={{ width: `${Math.min(progress, 100)}%`, transition: 'width 0.1s linear' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Diagram */}
      <div className="w-full bg-white border border-gold-light rounded-2xl overflow-hidden shadow-sm relative">
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="id-glow-line" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
            <radialGradient id="id-jf-grad" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#E8C84A"/>
              <stop offset="100%" stopColor="#B8941D"/>
            </radialGradient>
          </defs>

          {/* Decorative orbit rings */}
          <circle cx="400" cy="230" r="118" fill="none" stroke="#F4E4C1" strokeWidth="1" strokeDasharray="4 6"/>
          <circle cx="400" cy="230" r="236" fill="none" stroke="#F4E4C1" strokeWidth="1" strokeDasharray="6 8" opacity="0.55"/>

          {/* Connection lines */}
          {CONNECTIONS.map(([from, to]) => {
            const a = getNode(from), b = getNode(to);
            const active = isConnActive(from, to);
            return (
              <line
                key={`${from}-${to}`}
                x1={a.px} y1={a.py}
                x2={b.px} y2={b.py}
                stroke={active ? '#D4AF37' : '#E8E8E8'}
                strokeWidth={active ? 2.5 : 1.5}
                filter={active ? 'url(#id-glow-line)' : undefined}
                style={{ transition: 'stroke 0.4s, stroke-width 0.4s' }}
              />
            );
          })}

          {/* Animated data packets — 3 staggered on the active path */}
          {activeCase && ([0, 1.5, 3] as number[]).map(delay => (
            <circle key={delay} r="5" fill="#D4AF37" opacity="0.9">
              <animateMotion
                path={activeCase.path}
                dur="4.5s"
                begin={`${delay}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}

          {/* Nodes */}
          {NODES.map(node => {
            const active = isNodeActive(node.id);
            const isCenter = node.id === 'jotform';
            const r = isCenter ? 52 : 32;

            return (
              <g
                key={node.id}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Glow halo on active nodes */}
                {active && (
                  <circle
                    cx={node.px} cy={node.py}
                    r={r + (isCenter ? 24 : 16)}
                    fill="rgba(212,175,55,0.10)"
                  />
                )}

                {/* Main circle */}
                <circle
                  cx={node.px} cy={node.py} r={r}
                  fill={isCenter ? 'url(#id-jf-grad)' : active ? '#2C2C2C' : '#FAFAFA'}
                  stroke={isCenter ? '#B8941D' : active ? '#D4AF37' : '#E8E8E8'}
                  strokeWidth={isCenter ? 3 : active ? 2 : 1.5}
                  style={{ transition: 'fill 0.35s, stroke 0.35s' }}
                />

                {/* Text inside circle */}
                {isCenter ? (
                  <>
                    <text
                      x={node.px} y={node.py - 5}
                      textAnchor="middle" fontSize="13" fontWeight="800"
                      fontFamily="Inter,sans-serif" fill="#FFFFFF" letterSpacing="1.5"
                    >
                      JOTFORM
                    </text>
                    <text
                      x={node.px} y={node.py + 12}
                      textAnchor="middle" fontSize="9" fontWeight="500"
                      fontFamily="Inter,sans-serif" fill="rgba(255,255,255,0.7)" letterSpacing="2"
                    >
                      CORE
                    </text>
                  </>
                ) : (
                  <text
                    x={node.px} y={node.py + 5}
                    textAnchor="middle" fontSize="11" fontWeight="700"
                    fontFamily="Inter,sans-serif"
                    fill={active ? '#F4E4C1' : '#BBBBBB'}
                    style={{ transition: 'fill 0.35s' }}
                  >
                    {node.abbr}
                  </text>
                )}

                {/* Label below circle */}
                {!isCenter && (
                  <text
                    x={node.px} y={node.py + r + 18}
                    textAnchor="middle" fontSize="10" fontWeight="600"
                    fontFamily="Inter,sans-serif"
                    fill={active ? '#2C2C2C' : '#BBBBBB'}
                    style={{ transition: 'fill 0.35s' }}
                  >
                    {node.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Info bar */}
        <div className="border-t border-gold-light px-6 py-4 bg-[#FAF8F3] flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="font-sans font-bold text-xs text-charcoal mb-0.5">
              {hoveredData
                ? `Módulo: ${hoveredData.label}`
                : activeCase
                ? activeCase.label
                : 'Ecosistema MEDLA × Jotform'}
            </p>
            <p className="font-sans text-xs text-gray-med leading-relaxed">
              {hoveredData
                ? hoveredData.desc
                : activeCase
                ? activeCase.desc
                : 'Selecciona uno de los casos de uso para visualizar el flujo de datos en tiempo real.'}
            </p>
          </div>
          {activeCase && (
            <button
              onClick={() => { setIsAuto(a => !a); setProgress(0); }}
              className="shrink-0 px-3 py-1.5 rounded-full border border-gold-light bg-white text-[10px] font-bold font-mono text-gold-dark hover:border-gold transition-all whitespace-nowrap"
            >
              {isAuto ? '⏸ Pausar' : '▶ Auto'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
