
const { useState, useEffect, useRef } = React;
const { ArrowUpRight, BarChart3, Bot, Briefcase, Calendar, Check, Clock, Database, FileText, Layout, Mail, MapPin, MessageSquare, Plug, Search, Settings, Shield, TrendingDown, TrendingUp, User, Users, Zap } = lucideReact;

// --- StepCapsule.tsx ---

interface StepDetail {
  step: number;
  title: string;
  icon: React.ReactNode;
  color: string;
  desc: string;
  bullet1: string;
  bullet2: string;
  bullet3: string;
}

function StepCapsule() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 100
  const [currentStep, setCurrentStep] = useState<number>(1);

  const stepDetails: Record<number, StepDetail> = {
    1: {
      step: 1,
      title: 'Descubrimiento',
      icon: <Search className="w-7 h-7 text-gold-dark" />,
      color: '#D4AF37',
      desc: 'Analizamos tus necesidades específicas y flujos actuales.',
      bullet1: 'Auditoría completa de procesos manuales',
      bullet2: 'Identificación clara de cuellos de botella',
      bullet3: 'Propuesta estratégica personalizada'
    },
    2: {
      step: 2,
      title: 'Diseño',
      icon: <Layout className="w-7 h-7 text-gold-dark" />,
      color: '#B8941D',
      desc: 'Mapeamos cada integración, formulario y flujo automatizado.',
      bullet1: 'Prototipado formal de flujos de valor',
      bullet2: 'Creación de esquemas y lógica condicional',
      bullet3: 'Arquitectura limpia de transferencia de datos'
    },
    3: {
      step: 3,
      title: 'Implementación',
      icon: <Settings className="w-7 h-7 text-gold-dark" />,
      color: '#D4AF37',
      desc: 'Construimos e integramos tus herramientas en tiempo récord.',
      bullet1: 'Configuración premium de formularios inteligentes',
      bullet2: 'Conexión vía webhooks y API avanzada',
      bullet3: 'Despliegue ágil de agentes conversacionales'
    },
    4: {
      step: 4,
      title: 'Optimización',
      icon: <BarChart3 className="w-7 h-7 text-gold-dark" />,
      color: '#2C2C2C',
      desc: 'Monitoreamos rendimiento y escalamos tus automatizaciones.',
      bullet1: 'Auditorías de logs de ejecución y velocidad',
      bullet2: 'Refinamiento iterativo guiado por datos reales',
      bullet3: 'Escalamiento funcional sin fricción'
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const sectionTop = rect.top;
      
      // Calculate how far down we've scrolled inside this specific container
      // sectionTop goes from viewport height to negative sectionHeight
      const totalScrollableDistance = window.innerHeight - sectionHeight;
      let progress = 0;
      
      if (rect.top <= 0) {
        // We've started scrolling past the top of the element
        const scrolled = -rect.top;
        const maxScroll = rect.height - window.innerHeight;
        if (maxScroll > 0) {
          progress = Math.min(100, Math.max(0, (scrolled / maxScroll) * 100));
        } else {
          progress = 100;
        }
      } else {
        progress = 0;
      }
      
      setScrollProgress(progress);

      // Map progress to steps (1 to 4)
      if (progress < 25) {
        setCurrentStep(1);
      } else if (progress >= 25 && progress < 55) {
        setCurrentStep(2);
      } else if (progress >= 55 && progress < 80) {
        setCurrentStep(3);
      } else {
        setCurrentStep(4);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on load
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const active = stepDetails[currentStep] || stepDetails[1];

  return (
    <div 
      ref={containerRef} 
      className="w-full relative min-h-[2200px]"
    >
      {/* BACKGROUND DECORATION */}
      <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none flex justify-center">
        <div className="w-[3px] bg-gradient-to-b from-gold/10 via-gold/40 to-gold/10 h-full relative">
          <div 
            style={{ height: `${scrollProgress}%` }}
            className="w-full bg-gold shadow-[0_0_10px_#D4AF37] transition-all duration-300"
          ></div>
        </div>
      </div>

      {/* STICKY CENTRAL CAPSULE */}
      <div className="sticky top-[20%] md:top-[30%] lg:top-[35%] z-20 flex justify-center w-full pointer-events-none">
        <div className="w-[320px] h-[320px] md:w-[380px] md:h-[380px] p-6 lg:p-8 bg-gradient-to-tr from-white to-beige-soft border-4 border-gold rounded-full shadow-[0_20px_50px_rgba(212,175,55,0.25)] flex flex-col items-center justify-center text-center transition-all duration-500 scale-100 hover:scale-105 pointer-events-auto relative">
          
          {/* Circular progress highlight border */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
            <circle 
              cx="50%" cy="50%" r="48%" 
              stroke="#F4E4C1" 
              strokeWidth="6" 
              fill="none" 
              opacity="0.3"
            />
            <circle 
              cx="50%" cy="50%" r="48%" 
              stroke="#D4AF37" 
              strokeWidth="6" 
              fill="none" 
              strokeDasharray="300%"
              strokeDashoffset={`${300 - (scrollProgress * 3)}%`}
              className="transition-all duration-300"
            />
          </svg>

          {/* Core capsule content */}
          <div className="z-10 flex flex-col items-center">
            <span className="text-[10px] font-mono font-bold tracking-widest text-gold-dark uppercase mb-1">
              Cápsula Evolutiva
            </span>
            <div className="w-16 h-16 rounded-full bg-champagne flex items-center justify-center shadow-inner my-2 animate-pulse">
              {active.icon}
            </div>
            
            <h3 className="font-serif text-xl md:text-2xl font-bold text-charcoal transition-all duration-300">
              {active.title}
            </h3>
            
            <p className="font-sans text-[11px] md:text-xs text-gray-med max-w-[260px] leading-relaxed mt-2">
              {active.desc}
            </p>

            <div className="mt-3 flex items-center gap-1 bg-charcoal/5 px-2.5 py-1 rounded-full text-[9px] font-mono text-charcoal font-bold">
              <span>PROGRESO DE DESPLIEGUE:</span>
              <span className="text-gold-dark">{Math.round(scrollProgress)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* PROCESS STEPS SCROLLABLE CONTENT (LATERALLY ALIGNED) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        
        {/* Step 1: Descubrimiento */}
        <div className="absolute left-[5%] md:left-[10%] lg:left-[15%] top-[150px] w-[88%] md:w-[350px] lg:w-[400px] pointer-events-auto">
          <div className={`p-6 md:p-8 bg-white rounded-2xl border-l-4 border-gold shadow-md transition-all duration-500 ${
            currentStep === 1 ? 'shadow-xl scale-102 border-gold translate-x-2' : 'border-gray-light opacity-60'
          }`}>
            <span className="font-mono text-xs font-bold text-gold-dark tracking-wider uppercase">PASO 1</span>
            <h4 className="font-serif text-2xl font-bold text-charcoal mt-1 flex items-center gap-2">
              {stepDetails[1].icon} {stepDetails[1].title}
            </h4>
            <ul className="mt-4 space-y-2.5 font-sans text-xs text-gray-med">
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✓</span>
                <span>{stepDetails[1].bullet1}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✓</span>
                <span>{stepDetails[1].bullet2}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✓</span>
                <span>{stepDetails[1].bullet3}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Step 2: Diseño */}
        <div className="absolute right-[5%] md:right-[10%] lg:right-[15%] top-[650px] w-[88%] md:w-[350px] lg:w-[400px] pointer-events-auto">
          <div className={`p-6 md:p-8 bg-white rounded-2xl border-l-4 border-gold shadow-md transition-all duration-500 ${
            currentStep === 2 ? 'shadow-xl scale-102 border-gold -translate-x-2' : 'border-gray-light opacity-60'
          }`}>
            <span className="font-mono text-xs font-bold text-gold-dark tracking-wider uppercase">PASO 2</span>
            <h4 className="font-serif text-2xl font-bold text-charcoal mt-1 flex items-center gap-2">
              {stepDetails[2].icon} {stepDetails[2].title}
            </h4>
            <ul className="mt-4 space-y-2.5 font-sans text-xs text-gray-med">
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✓</span>
                <span>{stepDetails[2].bullet1}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✓</span>
                <span>{stepDetails[2].bullet2}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✓</span>
                <span>{stepDetails[2].bullet3}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Step 3: Implementación */}
        <div className="absolute left-[5%] md:left-[10%] lg:left-[15%] top-[1150px] w-[88%] md:w-[350px] lg:w-[400px] pointer-events-auto">
          <div className={`p-6 md:p-8 bg-white rounded-2xl border-l-4 border-gold shadow-md transition-all duration-500 ${
            currentStep === 3 ? 'shadow-xl scale-102 border-gold translate-x-2' : 'border-gray-light opacity-60'
          }`}>
            <span className="font-mono text-xs font-bold text-gold-dark tracking-wider uppercase">PASO 3</span>
            <h4 className="font-serif text-2xl font-bold text-charcoal mt-1 flex items-center gap-2">
              {stepDetails[3].icon} {stepDetails[3].title}
            </h4>
            <ul className="mt-4 space-y-2.5 font-sans text-xs text-gray-med">
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✓</span>
                <span>{stepDetails[3].bullet1}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✓</span>
                <span>{stepDetails[3].bullet2}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✓</span>
                <span>{stepDetails[3].bullet3}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Step 4: Optimización */}
        <div className="absolute right-[5%] md:right-[10%] lg:right-[15%] top-[1650px] w-[88%] md:w-[350px] lg:w-[400px] pointer-events-auto">
          <div className={`p-6 md:p-8 bg-white rounded-2xl border-l-4 border-gold shadow-md transition-all duration-500 ${
            currentStep === 4 ? 'shadow-xl scale-102 border-gold -translate-x-2' : 'border-gray-light opacity-60'
          }`}>
            <span className="font-mono text-xs font-bold text-gold-dark tracking-wider uppercase">PASO 4</span>
            <h4 className="font-serif text-2xl font-bold text-charcoal mt-1 flex items-center gap-2">
              {stepDetails[4].icon} {stepDetails[4].title}
            </h4>
            <ul className="mt-4 space-y-2.5 font-sans text-xs text-gray-med">
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✓</span>
                <span>{stepDetails[4].bullet1}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✓</span>
                <span>{stepDetails[4].bullet2}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✓</span>
                <span>{stepDetails[4].bullet3}</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

// --- HeroBackground.tsx ---

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  baseOpacity: number;
  phase: number;
}

const CONNECT_DIST = 170;
const COUNT = 55;

function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const nodesRef = useRef<Node[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width > 0 ? rect.width : window.innerWidth;
      canvas.height = rect.height > 0 ? rect.height : window.innerHeight;
      nodesRef.current = Array.from({ length: COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        r: Math.random() * 2.8 + 1.0,
        baseOpacity: Math.random() * 0.65 + 0.3,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    init();
    const ro = new ResizeObserver(init);
    ro.observe(canvas);

    const REPEL_D = 160;
    let t = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.007;
      const { x: mx, y: my } = mouseRef.current;
      const nodes = nodesRef.current;

      for (const n of nodes) {
        n.vx += Math.sin(t * 0.6 + n.phase) * 0.003;
        n.vy += Math.cos(t * 0.45 + n.phase * 1.2) * 0.003;

        const dx = n.x - mx, dy = n.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_D && dist > 0) {
          const force = ((REPEL_D - dist) / REPEL_D) * 5.5;
          n.vx += (dx / dist) * force * 0.09;
          n.vy += (dy / dist) * force * 0.09;
        }

        n.vx *= 0.968;
        n.vy *= 0.968;
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0) { n.x = 0; n.vx = Math.abs(n.vx); }
        if (n.x > canvas.width) { n.x = canvas.width; n.vx = -Math.abs(n.vx); }
        if (n.y < 0) { n.y = 0; n.vy = Math.abs(n.vy); }
        if (n.y > canvas.height) { n.y = canvas.height; n.vy = -Math.abs(n.vy); }
      }

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const proximity = 1 - d / CONNECT_DIST;
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            grad.addColorStop(0, `rgba(212,175,55,${proximity * 0.32})`);
            grad.addColorStop(0.5, `rgba(212,175,55,${proximity * 0.18})`);
            grad.addColorStop(1, `rgba(212,175,55,${proximity * 0.32})`);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = proximity * 1.6;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const op = n.baseOpacity * (0.6 + 0.4 * Math.sin(t * 0.55 + n.phase));

        // Outer glow halo
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 9);
        grd.addColorStop(0, `rgba(212,175,55,${op * 0.55})`);
        grd.addColorStop(0.35, `rgba(212,175,55,${op * 0.22})`);
        grd.addColorStop(1, 'rgba(212,175,55,0)');
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 9, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,55,${op})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    document.addEventListener('mousemove', onMove);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      document.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 2 }}
    />
  );
}

// --- HeroParticles.tsx ---

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  baseOpacity: number;
  color: string;
  phase: number;
}

const COLORS = ['#D4AF37', '#D4AF37', '#B8941D', '#F4E4C1', '#D4AF37'];

function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const init = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const n = Math.min(80, Math.floor((canvas.width * canvas.height) / 12000));
      particlesRef.current = Array.from({ length: n }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2.2 + 0.6,
        baseOpacity: Math.random() * 0.45 + 0.08,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        phase: Math.random() * Math.PI * 2,
      }));
    };

    init();

    const ro = new ResizeObserver(() => init());
    ro.observe(canvas);

    const REPEL_DIST = 110;
    const REPEL_STRENGTH = 4.5;
    let t = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.012;
      const { x: mx, y: my } = mouseRef.current;

      for (const p of particlesRef.current) {
        p.vx += Math.sin(t + p.phase) * 0.003;
        p.vy += Math.cos(t + p.phase * 1.2) * 0.003;

        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_DIST && dist > 0) {
          const force = ((REPEL_DIST - dist) / REPEL_DIST) * REPEL_STRENGTH;
          p.vx += (dx / dist) * force * 0.07;
          p.vy += (dy / dist) * force * 0.07;
        }

        p.vx *= 0.965;
        p.vy *= 0.965;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) { p.x = 0; p.vx = Math.abs(p.vx); }
        if (p.x > canvas.width) { p.x = canvas.width; p.vx = -Math.abs(p.vx); }
        if (p.y < 0) { p.y = 0; p.vy = Math.abs(p.vy); }
        if (p.y > canvas.height) { p.y = canvas.height; p.vy = -Math.abs(p.vy); }

        const op = p.baseOpacity * (0.65 + 0.35 * Math.sin(t * 0.7 + p.phase));

        // Glow halo
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 5);
        grd.addColorStop(0, `rgba(212,175,55,${op * 0.6})`);
        grd.addColorStop(1, 'rgba(212,175,55,0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = op;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    document.addEventListener('mousemove', onMove);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      document.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 2 }}
    />
  );
}

// --- TestimonialsSection.tsx ---
function TestimonialsSection() {
  const testimonials = [
    {
      initial: "M",
      name: "María González",
      company: "Medla Asesores",
      stars: 5,
      quote:
        "MEDLA transformó completamente nuestro proceso de captación. Antes perdíamos leads en hojas de Excel; ahora cada prospecto entra directamente a nuestro CRM en segundos. El ROI fue visible desde la primera semana.",
    },
    {
      initial: "R",
      name: "Ricardo Hernández",
      company: "Mercadex MX",
      stars: 5,
      quote:
        "La integración con GoHighLevel fue perfecta. Ahora nuestro equipo de ventas recibe notificaciones de WhatsApp en tiempo real cada vez que un lead llena el formulario. Cerramos un 40% más de negocios.",
    },
    {
      initial: "S",
      name: "Sofía Ramírez",
      company: "InnovaTech LATAM",
      stars: 5,
      quote:
        "El agente de IA que implementaron califica leads automáticamente y agenda demos sin intervención humana. Es como tener un vendedor disponible 24/7 que nunca se cansa ni comete errores.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((t) => (
        <div
          key={t.name}
          className="relative bg-white rounded-2xl p-8 border border-[#F0EDED] shadow-sm hover:shadow-[0_12px_32px_rgba(212,175,55,0.12)] hover:border-[#F4E4C1] transition-all duration-300 overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

          <div className="flex gap-0.5 mb-4">
            {Array.from({ length: t.stars }).map((_, i) => (
              <span key={i} className="text-[#D4AF37] text-base">
                ★
              </span>
            ))}
          </div>

          <p className="font-serif italic text-[#2C2C2C] text-sm leading-relaxed mb-6">
            "{t.quote}"
          </p>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941D] text-white font-serif font-bold text-base flex items-center justify-center flex-shrink-0">
              {t.initial}
            </div>
            <div>
              <p className="font-sans font-semibold text-sm text-[#2C2C2C]">{t.name}</p>
              <p className="font-sans text-xs text-[#6B6B6B]">{t.company}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// --- AgentesVisual.tsx ---

type ChatStep = 'idle' | 'user1' | 'typing1' | 'bot1' | 'user2' | 'typing2' | 'bot2' | 'badge' | 'fadeout';

const SEQUENCE: { step: ChatStep; delay: number }[] = [
  { step: 'user1',   delay: 300 },
  { step: 'typing1', delay: 1800 },
  { step: 'bot1',    delay: 2600 },
  { step: 'user2',   delay: 4400 },
  { step: 'typing2', delay: 6200 },
  { step: 'bot2',    delay: 7100 },
  { step: 'badge',   delay: 7800 },
  { step: 'fadeout', delay: 11200 },
  { step: 'idle',    delay: 12200 },
];

const CYCLE_MS = 12500;

function AgentesVisual() {
  const [step, setStep] = useState<ChatStep>('idle');
  const [blink, setBlink] = useState(false);

  // Main sequence
  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = [];

    const run = () => {
      setStep('idle');
      timers = SEQUENCE.map(({ step: s, delay }) =>
        setTimeout(() => setStep(s), delay)
      );
    };

    run();
    const cycle = setInterval(run, CYCLE_MS);
    return () => {
      clearInterval(cycle);
      timers.forEach(clearTimeout);
    };
  }, []);

  // Blink
  useEffect(() => {
    const id = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 180);
    }, 3200 + Math.random() * 1400);
    return () => clearInterval(id);
  }, []);

  const show = (target: ChatStep[]) => target.includes(step) && step !== 'idle';

  const visible = (targets: ChatStep[]) =>
    targets.includes(step) && step !== 'idle' && step !== 'fadeout';

  return (
    <div className="w-full h-full relative flex flex-col bg-white rounded-xl overflow-hidden">

      {/* Header bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[#F4E4C1] bg-[#FAF8F3]">
        {/* Bot avatar */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 relative"
          style={{
            background: 'linear-gradient(135deg, #D4AF37, #B8941D)',
            boxShadow: '0 4px 12px rgba(212,175,55,0.35)',
          }}
        >
          <svg width="22" height="18" viewBox="0 0 60 44">
            <ellipse cx="20" cy="16" rx="6" ry={blink ? 0.8 : 6} fill="white" />
            <ellipse cx="40" cy="16" rx="6" ry={blink ? 0.8 : 6} fill="white" />
            <circle cx="20" cy="16" r="2" fill="#2C2C2C" />
            <circle cx="40" cy="16" r="2" fill="#2C2C2C" />
            <path d="M 18 32 Q 30 40 42 32" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <span
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white"
            style={{ background: '#10B981' }}
          />
        </div>
        <div>
          <p className="text-[11px] font-bold text-[#2C2C2C]">Agente MEDLA</p>
          <p className="text-[9px] text-[#10B981] font-semibold">● En línea · 24/7</p>
        </div>
        {/* Badge top-right */}
        <div
          className="ml-auto px-2.5 py-1 rounded-full text-[9px] font-mono font-bold tracking-wider transition-all duration-500"
          style={{
            background: visible(['badge']) ? 'linear-gradient(135deg,#D4AF37,#B8941D)' : '#F4E4C1',
            color: visible(['badge']) ? 'white' : '#B8941D',
            transform: visible(['badge']) ? 'scale(1)' : 'scale(0.85)',
            opacity: visible(['badge']) ? 1 : 0,
            boxShadow: visible(['badge']) ? '0 4px 14px rgba(212,175,55,0.45)' : 'none',
          }}
        >
          ✓ LEAD CALIFICADO
        </div>
      </div>

      {/* Chat area */}
      <div
        className="flex-1 flex flex-col justify-end gap-2.5 p-3 overflow-hidden transition-opacity duration-700"
        style={{ opacity: step === 'fadeout' || step === 'idle' ? 0 : 1 }}
      >
        {/* User message 1 */}
        <div
          className="flex justify-end transition-all duration-400"
          style={{
            opacity: show(['user1', 'typing1', 'bot1', 'user2', 'typing2', 'bot2', 'badge', 'fadeout']) ? 1 : 0,
            transform: show(['user1', 'typing1', 'bot1', 'user2', 'typing2', 'bot2', 'badge', 'fadeout'])
              ? 'translateY(0)' : 'translateY(14px)',
          }}
        >
          <div
            className="max-w-[72%] px-3 py-2 rounded-2xl rounded-tr-sm text-[11px] leading-snug"
            style={{ background: '#FAF8F3', border: '1px solid #F4E4C1', color: '#2C2C2C' }}
          >
            Hola, me gustaría agendar una demo de MEDLA.
          </div>
          <div className="w-7 h-7 rounded-full bg-[#E8E8E8] flex items-center justify-center ml-2 flex-shrink-0 self-end text-gray-500">
            <User className="w-4 h-4" />
          </div>
        </div>

        {/* Typing indicator 1 */}
        <div
          className="flex items-end gap-2 transition-all duration-300"
          style={{
            opacity: show(['typing1']) ? 1 : 0,
            transform: show(['typing1']) ? 'translateY(0)' : 'translateY(10px)',
          }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white"
            style={{ background: 'linear-gradient(135deg,#D4AF37,#B8941D)' }}
          >
            <Bot className="w-4 h-4" />
          </div>
          <div
            className="flex gap-1 px-3 py-2.5 rounded-2xl rounded-tl-sm"
            style={{ background: 'white', border: '1px solid #E8E8E8' }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
                style={{ animation: `typeDot 0.9s ease-in-out infinite`, animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>

        {/* Bot message 1 */}
        <div
          className="flex items-end gap-2 transition-all duration-400"
          style={{
            opacity: show(['bot1', 'user2', 'typing2', 'bot2', 'badge', 'fadeout']) ? 1 : 0,
            transform: show(['bot1', 'user2', 'typing2', 'bot2', 'badge', 'fadeout'])
              ? 'translateY(0)' : 'translateY(14px)',
          }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white"
            style={{ background: 'linear-gradient(135deg,#D4AF37,#B8941D)' }}
          >
            <Bot className="w-4 h-4" />
          </div>
          <div
            className="max-w-[72%] px-3 py-2 rounded-2xl rounded-tl-sm text-[11px] leading-snug"
            style={{ background: '#2C2C2C', color: '#F7F3E3', border: '1px solid rgba(212,175,55,0.2)' }}
          >
            ¡Excelente! Revisé tu formulario Jotform. ¿Cuántos prospectos manejas al mes?
          </div>
        </div>

        {/* User message 2 */}
        <div
          className="flex justify-end transition-all duration-400"
          style={{
            opacity: show(['user2', 'typing2', 'bot2', 'badge', 'fadeout']) ? 1 : 0,
            transform: show(['user2', 'typing2', 'bot2', 'badge', 'fadeout'])
              ? 'translateY(0)' : 'translateY(14px)',
          }}
        >
          <div
            className="max-w-[72%] px-3 py-2 rounded-2xl rounded-tr-sm text-[11px] leading-snug"
            style={{ background: '#FAF8F3', border: '1px solid #F4E4C1', color: '#2C2C2C' }}
          >
            Entre 50 y 100 leads por mes.
          </div>
          <div className="w-7 h-7 rounded-full bg-[#E8E8E8] flex items-center justify-center ml-2 flex-shrink-0 self-end text-gray-500">
            <User className="w-4 h-4" />
          </div>
        </div>

        {/* Typing indicator 2 */}
        <div
          className="flex items-end gap-2 transition-all duration-300"
          style={{
            opacity: show(['typing2']) ? 1 : 0,
            transform: show(['typing2']) ? 'translateY(0)' : 'translateY(10px)',
          }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white"
            style={{ background: 'linear-gradient(135deg,#D4AF37,#B8941D)' }}
          >
            <Bot className="w-4 h-4" />
          </div>
          <div
            className="flex gap-1 px-3 py-2.5 rounded-2xl rounded-tl-sm"
            style={{ background: 'white', border: '1px solid #E8E8E8' }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
                style={{ animation: `typeDot 0.9s ease-in-out infinite`, animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>

        {/* Bot message 2 */}
        <div
          className="flex items-end gap-2 transition-all duration-400"
          style={{
            opacity: show(['bot2', 'badge', 'fadeout']) ? 1 : 0,
            transform: show(['bot2', 'badge', 'fadeout']) ? 'translateY(0)' : 'translateY(14px)',
          }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white"
            style={{ background: 'linear-gradient(135deg,#D4AF37,#B8941D)' }}
          >
            <Bot className="w-4 h-4" />
          </div>
          <div
            className="max-w-[72%] px-3 py-2 rounded-2xl rounded-tl-sm text-[11px] leading-snug"
            style={{ background: '#2C2C2C', color: '#F7F3E3', border: '1px solid rgba(212,175,55,0.2)' }}
          >
            Perfecto. ¿Te va hoy a las <span style={{ color: '#D4AF37', fontWeight: 700 }}>4:00 PM</span> o mañana a las <span style={{ color: '#D4AF37', fontWeight: 700 }}>11:00 AM</span>?
          </div>
        </div>

        {/* Quick reply buttons */}
        <div
          className="flex gap-2 pl-9 transition-all duration-400"
          style={{
            opacity: show(['bot2', 'badge', 'fadeout']) ? 1 : 0,
            transform: show(['bot2', 'badge', 'fadeout']) ? 'translateY(0)' : 'translateY(10px)',
          }}
        >
          <button
            className="text-[10px] font-semibold px-3 py-1.5 rounded-lg border transition-all"
            style={{ background: '#FAF8F3', border: '1px solid #F4E4C1', color: '#2C2C2C' }}
          >
            Hoy 4:00 PM
          </button>
          <button
            className="text-[10px] font-semibold px-3 py-1.5 rounded-lg text-white"
            style={{ background: 'linear-gradient(90deg,#D4AF37,#B8941D)', boxShadow: '0 4px 10px rgba(212,175,55,0.35)' }}
          >
            Mañana 11:00 AM
          </button>
        </div>
      </div>

      <style>{`
        @keyframes typeDot {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// --- StepTimeline.tsx ---

interface Step {
  icon: ElementType;
  title: string;
  bullets: string[];
}

const steps: Step[] = [
  {
    icon: Search,
    title: "Descubrimiento",
    bullets: [
      "Auditoría de procesos actuales",
      "Identificación de cuellos de botella",
      "Propuesta estratégica personalizada",
    ],
  },
  {
    icon: Layout,
    title: "Diseño & Arquitectura",
    bullets: [
      "Prototipado de flujos de valor",
      "Esquemas y lógica condicional",
      "Arquitectura de datos limpia",
    ],
  },
  {
    icon: Settings,
    title: "Implementación",
    bullets: [
      "Configuración de formularios",
      "Conexión vía webhooks y API",
      "Despliegue de agentes IA",
    ],
  },
  {
    icon: BarChart3,
    title: "Optimización Continua",
    bullets: [
      "Auditorías de rendimiento",
      "Refinamiento basado en datos",
      "Escalamiento sin fricción",
    ],
  },
];

function StepTimeline() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="relative flex flex-col items-center text-center px-4">
              {i < 3 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] right-[-50%] h-px border-t-2 border-dashed border-[#D4AF37]/40 z-0" />
              )}
              <div className="relative z-10 w-16 h-16 rounded-full bg-white border-2 border-[#D4AF37] flex items-center justify-center shadow-[0_4px_16px_rgba(212,175,55,0.2)] mb-4">
                <Icon className="w-6 h-6 text-[#B8941D]" />
              </div>
              <span className="font-mono text-[10px] font-bold text-[#B8941D] tracking-widest uppercase mb-2">
                PASO {i + 1}
              </span>
              <h4 className="font-serif text-lg font-bold text-[#2C2C2C] mb-3">{step.title}</h4>
              <ul className="space-y-2 text-left w-full max-w-[200px] mx-auto">
                {step.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-xs text-[#6B6B6B]">
                    <span className="text-[#D4AF37] mt-0.5 flex-shrink-0">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- IntegracionVisual.tsx ---

function IntegracionVisual() {
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

// --- CapturaVisual.tsx ---

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

function CapturaVisual() {
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

// --- InteractiveDiagram.tsx ---

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

function InteractiveDiagram() {
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

// --- DataJourneyAnimation.tsx ---

function DataJourneyAnimation() {
  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 bg-radial from-beige-soft to-champagne rounded-xl border border-gold-light shadow-inner relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold-dark/5 rounded-full blur-2xl pointer-events-none"></div>

      {/* Header of the Journey */}
      <div className="text-center z-10">
        <h4 className="font-serif text-lg font-bold text-charcoal tracking-wide">
          Flujo de Datos en Tiempo Real
        </h4>
        <p className="font-sans text-xs text-gray-med mt-1">
          Visualiza el camino de un cliente potencial automatizado
        </p>
      </div>

      {/* Grid of the three key steps */}
      <div className="grid grid-cols-3 gap-4 items-center justify-center my-6 z-10 relative">
        {/* Step 1: Jotform (The Source) */}
        <div 
          onClick={() => setActiveStep(0)}
          className={`flex flex-col items-center p-4 rounded-xl transition-all duration-500 cursor-pointer ${
            activeStep === 0 
              ? 'bg-white border-2 border-gold shadow-lg scale-105' 
              : 'bg-white/80 border border-gray-light scale-100 hover:border-gold-light'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center relative shadow-sm">
            <span className="text-xl">📝</span>
            {activeStep === 0 && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
            )}
          </div>
          <span className="font-sans font-semibold text-xs text-charcoal mt-2 text-center">Jotform</span>
          <span className="font-sans text-[10px] text-gray-med text-center mt-0.5">Captura de datos</span>
        </div>

        {/* Step 2: MEDLA AI (The Engine) */}
        <div 
          onClick={() => setActiveStep(1)}
          className={`flex flex-col items-center p-4 rounded-xl transition-all duration-500 cursor-pointer ${
            activeStep === 1 || activeStep === 2
              ? 'bg-charcoal border-2 border-gold shadow-lg scale-105 text-white' 
              : 'bg-white border border-gray-light scale-100 hover:border-gold-light text-charcoal'
          }`}
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center relative shadow-sm transition-colors duration-500 ${
            activeStep === 1 || activeStep === 2 ? 'bg-gold' : 'bg-gold-light/40 border border-gold-light'
          }`}>
            <span className="text-xl">🤖</span>
            {(activeStep === 1 || activeStep === 2) && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-gold-dark"></span>
              </span>
            )}
          </div>
          <span className={`font-sans font-semibold text-xs mt-2 text-center transition-colors ${
            activeStep === 1 || activeStep === 2 ? 'text-gold-light' : 'text-charcoal'
          }`}>MEDLA Engine</span>
          <span className={`font-sans text-[10px] text-center mt-0.5 ${
            activeStep === 1 || activeStep === 2 ? 'text-gray-light' : 'text-gray-med'
          }`}>AI & Automatización</span>
        </div>

        {/* Step 3: Outputs (The Destination) */}
        <div 
          onClick={() => setActiveStep(3)}
          className={`flex flex-col items-center p-4 rounded-xl transition-all duration-500 cursor-pointer ${
            activeStep === 3 
              ? 'bg-white border-2 border-gold shadow-lg scale-105' 
              : 'bg-white/80 border border-gray-light scale-100 hover:border-gold-light'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-green-50 border border-green-200 flex items-center justify-center relative shadow-sm">
            <span className="text-xl font-bold">🚀</span>
            {activeStep === 3 && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            )}
          </div>
          <span className="font-sans font-semibold text-xs text-charcoal mt-2 text-center">Sistemas Conectados</span>
          <span className="font-sans text-[10px] text-gray-med text-center mt-0.5">CRM, WhatsApp, Email</span>
        </div>

        {/* SVG Connectors with Moving Glow Packets */}
        <div className="absolute inset-0 pointer-events-none h-full w-full hidden md:block">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Line 1 -> 2 */}
            <path 
              d="M 160 85 L 230 85" 
              stroke="#E8E8E8" 
              strokeWidth="2" 
              fill="none" 
              strokeDasharray="4"
            />
            {activeStep === 1 && (
              <circle r="4" fill="#D4AF37">
                <animateMotion 
                  path="M 160 85 L 230 85" 
                  dur="1.5s" 
                  repeatCount="indefinite" 
                />
              </circle>
            )}

            {/* Line 2 -> 3 */}
            <path 
              d="M 330 85 L 400 85" 
              stroke="#E8E8E8" 
              strokeWidth="2" 
              fill="none" 
              strokeDasharray="4"
            />
            {activeStep === 3 && (
              <circle r="4" fill="#2C2C2C">
                <animateMotion 
                  path="M 330 85 L 400 85" 
                  dur="1.5s" 
                  repeatCount="indefinite" 
                />
              </circle>
            )}
          </svg>
        </div>
      </div>

      {/* Dynamic Status / Actions log at bottom */}
      <div className="bg-white/80 p-3 rounded-lg border border-gold-light mt-2 z-10">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-gold animate-ping"></span>
          <span className="font-mono text-[10px] font-bold text-gold-dark tracking-wider uppercase">
            {activeStep === 0 && "ESTADO: Registro de Lead"}
            {activeStep === 1 && "ESTADO: Procesamiento Inteligente"}
            {activeStep === 2 && "ESTADO: Clasificación de Intención con IA"}
            {activeStep === 3 && "ESTADO: Entrega y Notificación Instantánea"}
          </span>
        </div>
        <p className="font-sans text-xs text-charcoal leading-relaxed">
          {activeStep === 0 && "El usuario llena el formulario de Jotform. Los datos son capturados con encriptación segura y validados al instante."}
          {activeStep === 1 && "MEDLA automatiza el webhook. Los datos son extraídos y enviados al hub central sin un solo script manual."}
          {activeStep === 2 && "Nuestra IA analiza el tamaño de la PyME y la intención de compra para autoasignar el lead al asesor comercial idóneo."}
          {activeStep === 3 && "¡Éxito! El CRM se actualiza, la base de datos se guarda y se dispara un WhatsApp personalizado al cliente en menos de 5 segundos."}
        </p>
      </div>

      {/* Manual Step Tabs */}
      <div className="flex justify-center gap-1.5 mt-4 z-10">
        {[0, 1, 2, 3].map((index) => (
          <button
            key={index}
            onClick={() => setActiveStep(index)}
            className={`w-8 h-2 rounded-full transition-all duration-300 ${
              activeStep === index ? 'bg-gold-dark w-12' : 'bg-gold-light hover:bg-gold'
            }`}
            aria-label={`Ver paso de animación ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// --- App.tsx ---
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

  Check,
  Settings,
  Bot,
  FileText,
  MessageSquare,
  Calendar,
  Mail,
  MapPin,
  ArrowUpRight,
  Briefcase,
  Shield,
  TrendingDown,
  Database,
  Zap,
  Users,
  Clock,
  Plug,
  TrendingUp
} from 'lucide-react';


// Custom helper for fading logos in/out on viewport entry/exit (Intersection Observer)
function ObservedLogo({ children, className = "" }: { children: React.ReactNode; className?: string; key?: React.Key }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.05
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 0.7 : 0,
        transition: "opacity 0.8s ease"
      }}
      className={className}
    >
      {children}
    </div>
  );
}

// Custom helper for scroll reveal slide up on viewport entry
function ScrollReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        root: null,
        threshold: 0.1
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out"
      }}
      className={className}
    >
      {children}
    </div>
  );
}


function App() {
  // Form handling
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    empresa: '',
    proceso: ''
  });


  // Hero section mouse interactive layout state
  const heroRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      heroRef.current.style.setProperty('--mouse-x', `${x}%`);
      heroRef.current.style.setProperty('--mouse-y', `${y}%`);
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.nombre && formData.email) {
      setFormSubmitted(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white text-charcoal font-sans antialiased selection:bg-gold-light selection:text-gold-dark overflow-x-hidden">
      
      {/* HEADER / NAVIGATION BAR (Logo area top-left styled according to spec) */}
      <header className="absolute top-0 left-0 right-0 z-50 py-8 px-6 max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-sans font-bold text-lg md:text-2xl text-charcoal tracking-wider cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            MEDLA <span className="text-gold">×</span> JOTFORM
          </span>
          <span className="hidden sm:inline-block px-2.5 py-0.5 border border-gold-dark/30 text-[10px] font-mono font-bold text-gold-dark rounded-full bg-champagne bg-opacity-40">
            PARTNER OFICIAL
          </span>
        </div>

        {/* Navigation links styled as specified in Design HTML */}
        <div className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-gray-med">
          <button onClick={() => scrollToSection('servicios')} className="hover:text-gold transition-colors cursor-pointer focus:outline-none">Servicios</button>
          <button onClick={() => scrollToSection('ecosistema')} className="hover:text-gold transition-colors cursor-pointer focus:outline-none">Solución</button>
          <button onClick={() => scrollToSection('beneficios')} className="hover:text-gold transition-colors cursor-pointer focus:outline-none">Beneficios</button>
          <button onClick={() => scrollToSection('contact-form')} className="text-gold font-bold hover:text-gold-dark transition-colors cursor-pointer focus:outline-none">Contacto</button>
        </div>

        <button 
          onClick={() => scrollToSection('contact-form')}
          className="inline-flex md:hidden items-center gap-1.5 px-4 py-2 bg-white border-2 border-gold text-gold font-sans font-semibold text-xs uppercase tracking-wider rounded-lg transition-all hover:bg-gold-light/20 shadow-sm"
        >
          <span>Contacto</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* SECCIÓN 1: HERO (100vh viewport height, centered vertical, dynamic custom radial gradient background tracking cursor) */}
      <section 
        ref={heroRef}
        className="hero-section"
      >
        {/* Dynamic Interactive Radial Gradient Layer managed by useEffect and CSS custom properties */}
        <div className="hero-gradient-layer" />

        {/* Constellation network — reacts to mouse hover */}
        <HeroBackground />

        {/* Background blobs for premium illumination glow */}
        <div className="absolute top-[18%] left-[-8%] w-[500px] h-[500px] bg-gold-light/25 rounded-full blur-[130px] pointer-events-none" style={{ zIndex: 3 }}></div>
        <div className="absolute bottom-[8%] right-[-8%] w-[600px] h-[600px] bg-[#F7F3E3]/70 rounded-full blur-[160px] pointer-events-none" style={{ zIndex: 3 }}></div>
        <div className="absolute top-[60%] left-[40%] w-[300px] h-[300px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" style={{ zIndex: 3 }}></div>

        <div className="hero-content flex flex-col items-center justify-center relative z-10 w-full mt-24">
          <h1 className="font-serif text-[#2C2C2C] text-4xl sm:text-5xl md:text-[64px] font-bold leading-[1.2] max-w-[900px] text-center mb-6">
            Digitaliza tu negocio de principio a fin con <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-dark to-gold">formularios inteligentes</span> y automatización total
          </h1>

          <p className="font-sans text-[#6B6B6B] text-lg md:text-[20px] leading-[1.6] max-w-[700px] text-center mb-10">
            Captura datos, automatiza procesos y conecta todo tu ecosistema digital. Sin código, sin complicaciones.
          </p>

          <button 
            onClick={() => scrollToSection('contact-form')}
            style={{
              boxShadow: '0 4px 20px rgba(212, 175, 55, 0.3)',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            className="px-12 py-4.5 bg-gradient-to-r from-gold to-gold-dark text-white font-sans font-semibold text-base uppercase tracking-[1.5px] rounded-lg hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(212,175,55,0.5)] active:scale-98"
          >
            Agenda tu consultoría gratuita
          </button>
        </div>
      </section>

      {/* SECCIÓN 2: NUEVO CARRUSEL DE EMPRESAS (Cambio 2) */}
      <section 
        className="py-[80px] pb-[100px] px-6 relative overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, rgba(247, 243, 227, 0) 0%, #F7F3E3 100%)'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <p className="font-sans font-medium text-sm text-[#B8941D] tracking-[2px] uppercase text-center mb-10">
            Empresas que confían en nosotros
          </p>
          
          <div className="w-full overflow-hidden relative py-4">
            {/* Ambient vignette gradient fade effect on carousel edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F7F3E3] to-transparent z-10 pointer-events-none"></div>

            <div className="carousel-track">
              {[
                "MEDLA Asesores",
                "Mercadex",
                "Base44",
                "Cliente 4",
                "Cliente 5",
                "Cliente 6",
                "Cliente 7",
                "Cliente 8",
                "MEDLA Asesores",
                "Mercadex",
                "Base44",
                "Cliente 4",
                "Cliente 5",
                "Cliente 6",
                "Cliente 7",
                "Cliente 8"
              ].map((name, index) => (
                <ObservedLogo 
                  key={index}
                  className="flex-shrink-0"
                >
                  <div className="w-[160px] h-[80px] flex items-center justify-center bg-white/60 border border-[rgba(212,175,55,0.2)] rounded-xl p-5 backdrop-blur-md cursor-default">
                    <span className="font-sans font-bold text-sm tracking-tight text-[#2C2C2C]/80 text-center select-none">
                      {name}
                    </span>
                  </div>
                </ObservedLogo>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: DESAFÍOS - PAIN POINTS */}
      <section className="bg-white py-[120px] px-6 relative overflow-hidden">
        {/* Decorative background grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />

        <div className="max-w-[1060px] mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block font-sans font-semibold text-xs text-[#B8941D] tracking-[2.5px] uppercase mb-4 px-4 py-1.5 bg-[#FAF8F3] border border-[#F4E4C1] rounded-full">
              ¿Te suena familiar?
            </span>
            <h2 className="font-serif text-[#2C2C2C] text-3xl md:text-[46px] font-bold leading-[1.15] mt-4">
              Los problemas que están<br className="hidden md:block" /> frenando tu crecimiento
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <FileText className="w-5 h-5" />,
                title: 'Formularios rígidos y poco atractivos',
                body: 'Tus formularios actuales cansan al usuario. Al no estar optimizados para móvil ni contar con lógica condicional, la tasa de abandono de tus prospectos es frustrantemente alta.',
              },
              {
                icon: <Database className="w-5 h-5" />,
                title: 'Bandejas llenas de datos sin procesar',
                body: 'La información llega a tu correo o a hojas de cálculo aisladas, pero nadie la procesa. Los datos se enfrían antes de que tu equipo de ventas pueda darles seguimiento.',
              },
              {
                icon: <Settings className="w-5 h-5" />,
                title: 'Copiar y pegar datos entre herramientas',
                body: 'Tu equipo pierde horas valiosas transcribiendo contactos del formulario a tu CRM, Excel o sistema de facturación. Un proceso lento, aburrido y propenso a errores humanos.',
              },
              {
                icon: <MessageSquare className="w-5 h-5" />,
                title: 'Falta de confirmación inmediata',
                body: 'Cuando un prospecto se registra, no recibe confirmación visual profesional ni por correo ni por WhatsApp al instante. El silencio mata el interés del cliente potencial.',
              },
              {
                icon: <Shield className="w-5 h-5" />,
                title: 'Contratos y firmas en papel o PDFs estáticos',
                body: 'Hacer que tus clientes impriman, firmen físicamente y escaneen contratos entorpece los cierres comerciales. La firma digital integrada es clave para acelerar tus ventas.',
              },
              {
                icon: <TrendingDown className="w-5 h-5" />,
                title: 'Cero visibilidad del viaje de tus prospectos',
                body: 'No sabes qué canal o campaña trajo a los leads que de verdad compran. Al carecer de atribución clara, sigues gastando presupuesto a ciegas en marketing digital.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-white border border-[#F0EDED] rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.07)] hover:border-[#F4E4C1] relative overflow-hidden"
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C85A54]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-[#C85A54]"
                    style={{ background: 'linear-gradient(135deg, #FEF2F2, #FEE2E2)' }}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-base text-[#2C2C2C] mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: SOLUCIÓN - SCROLL DINÁMICO CON 3 ELEMENTOS */}
      <section className="bg-[#F7F3E3] py-[120px] px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-4xl mx-auto mb-24">
            <h2 className="font-serif text-[#2C2C2C] text-3xl md:text-[48px] font-bold leading-[1.2]">
              La solución completa para PyMEs que quieren crecer
            </h2>
          </div>

          <div className="space-y-[120px]">
            {/* Pilar 1 */}
            <ScrollReveal className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div>
                <span className="font-sans font-bold text-xs uppercase tracking-[2px] text-[#B8941D] bg-white px-4 py-1.5 rounded-full shadow-sm mb-6 inline-block">
                  Pilar 1: Captura Inteligente
                </span>
                <h3 className="font-serif text-[#2C2C2C] text-2xl md:text-3xl font-bold mb-6">
                  Formularios interactivos que tus clientes aman responder
                </h3>
                <p className="font-sans text-[#6B6B6B] text-base leading-relaxed mb-8">
                  Diseñamos interfaces conversacionales de alta conversión, optimizadas para dispositivos móviles, con lógica condicional avanzada y firmas digitales integradas. El primer paso crucial para digitalizar tu negocio sin fricción.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-charcoal font-medium">
                    <span className="w-5 h-5 rounded-full bg-white text-[#B8941D] flex items-center justify-center text-xs font-bold shadow-sm">✓</span>
                    Lógica condicional para acortar flujos y evitar preguntas irrelevantes
                  </li>
                  <li className="flex items-center gap-3 text-sm text-charcoal font-medium">
                    <span className="w-5 h-5 rounded-full bg-white text-[#B8941D] flex items-center justify-center text-xs font-bold shadow-sm">✓</span>
                    Prueba social y diseño premium alineado a tu identidad visual
                  </li>
                  <li className="flex items-center gap-3 text-sm text-charcoal font-medium">
                    <span className="w-5 h-5 rounded-full bg-white text-[#B8941D] flex items-center justify-center text-xs font-bold shadow-sm">✓</span>
                    Firmas electrónicas con validez legal certificada y subida de archivos
                  </li>
                </ul>
              </div>
              <div className="border-2 border-[#D4AF37] rounded-2xl shadow-[0_20px_60px_rgba(212,175,55,0.15)] h-[360px] relative overflow-hidden hover:shadow-[0_20px_60px_rgba(212,175,55,0.25)] transition-all duration-500">
                <CapturaVisual />
              </div>
            </ScrollReveal>

            {/* Pilar 2 */}
            <ScrollReveal className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div className="order-2 lg:order-1 border-2 border-[#D4AF37] rounded-2xl shadow-[0_20px_60px_rgba(212,175,55,0.15)] h-[380px] relative overflow-hidden hover:shadow-[0_20px_60px_rgba(212,175,55,0.25)] transition-all duration-500">
                <IntegracionVisual />
              </div>
              <div className="order-1 lg:order-2">
                <span className="font-sans font-bold text-xs uppercase tracking-[2px] text-[#B8941D] bg-white px-4 py-1.5 rounded-full shadow-sm mb-6 inline-block">
                  Pilar 2: Integración Síncrona
                </span>
                <h3 className="font-serif text-[#2C2C2C] text-2xl md:text-3xl font-bold mb-6">
                  Conexión perfecta con todo tu ecosistema digital
                </h3>
                <p className="font-sans text-[#6B6B6B] text-base leading-relaxed mb-8">
                  Olvídate de transcribir datos de forma manual. Conectamos los registros de tus formularios directamente con tu CRM (HubSpot, GoHighLevel), ERP y gestores de almacenamiento, automatizando flujos de extremo a extremo.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-charcoal font-medium">
                    <span className="w-5 h-5 rounded-full bg-white text-[#B8941D] flex items-center justify-center text-xs font-bold shadow-sm">✓</span>
                    Notificaciones en tiempo real vía WhatsApp y correo tras cada registro
                  </li>
                  <li className="flex items-center gap-3 text-sm text-charcoal font-medium">
                    <span className="w-5 h-5 rounded-full bg-white text-[#B8941D] flex items-center justify-center text-xs font-bold shadow-sm">✓</span>
                    Creación instantánea de contactos enriquecidos y oportunidades de venta
                  </li>
                  <li className="flex items-center gap-3 text-sm text-charcoal font-medium">
                    <span className="w-5 h-5 rounded-full bg-white text-[#B8941D] flex items-center justify-center text-xs font-bold shadow-sm">✓</span>
                    Generación automática y envío seguro de cotizaciones y facturas
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            {/* Pilar 3 */}
            <ScrollReveal className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div>
                <span className="font-sans font-bold text-xs uppercase tracking-[2px] text-[#B8941D] bg-white px-4 py-1.5 rounded-full shadow-sm mb-6 inline-block">
                  Pilar 3: Agentes de IA
                </span>
                <h3 className="font-serif text-[#2C2C2C] text-2xl md:text-3xl font-bold mb-6">
                  Agentes autónomos que atienden tus leads 24/7
                </h3>
                <p className="font-sans text-[#6B6B6B] text-base leading-relaxed mb-8">
                  Implementamos agentes inteligentes alimentados por los datos recogidos en tus formularios Jotform. Resuelven las dudas frecuentes de tus clientes potenciales, califican el perfil y programan citas en tu calendario de manera automática.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-charcoal font-medium">
                    <span className="w-5 h-5 rounded-full bg-white text-[#B8941D] flex items-center justify-center text-xs font-bold shadow-sm">✓</span>
                    Chatbots inteligentes adaptados a tu base de conocimientos y tono de marca
                  </li>
                  <li className="flex items-center gap-3 text-sm text-charcoal font-medium">
                    <span className="w-5 h-5 rounded-full bg-white text-[#B8941D] flex items-center justify-center text-xs font-bold shadow-sm">✓</span>
                    Filtro automático de leads calificados según sus respuestas operativas
                  </li>
                  <li className="flex items-center gap-3 text-sm text-charcoal font-medium">
                    <span className="w-5 h-5 rounded-full bg-white text-[#B8941D] flex items-center justify-center text-xs font-bold shadow-sm">✓</span>
                    Agendamiento directo sincronizado con Google Calendar en segundos
                  </li>
                </ul>
              </div>
              <div className="border-2 border-[#D4AF37] rounded-2xl shadow-[0_20px_60px_rgba(212,175,55,0.15)] h-[360px] relative overflow-hidden hover:shadow-[0_20px_60px_rgba(212,175,55,0.25)] transition-all duration-500">
                <AgentesVisual />
              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>

      {/* SECCIÓN 5: SERVICIOS */}
      <section id="servicios" className="bg-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
        <div className="max-w-6xl mx-auto relative z-10">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block font-sans font-semibold text-xs text-[#B8941D] tracking-[2.5px] uppercase mb-4 px-4 py-1.5 bg-[#FAF8F3] border border-[#F4E4C1] rounded-full">
              Todo en un solo ecosistema
            </span>
            <h2 className="font-serif text-[#2C2C2C] text-3xl md:text-[42px] font-bold leading-[1.2] mt-4">
              Todo lo que necesitas<br className="hidden md:block" /> en un solo lugar
            </h2>
            <p className="font-sans text-gray-med text-base leading-relaxed mt-4">
              Trabajamos mano a mano contigo para implementar un motor integrado de crecimiento digital.
            </p>
          </div>

          {/* Featured large dark card */}
          <div className="bg-[#2C2C2C] rounded-2xl p-8 md:p-10 relative overflow-hidden mb-6">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8941D] flex items-center justify-center mb-6 shadow-lg">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <span className="font-mono text-[10px] font-bold text-[#D4AF37]/80 uppercase tracking-widest mb-3 block">01 — Captura Inteligente</span>
                <h3 className="font-serif text-white text-2xl md:text-3xl font-bold mb-4 leading-snug">Captura de Prospectos Automática</h3>
                <p className="font-sans text-white/60 text-sm leading-relaxed mb-6">
                  Diseñamos flujos interactivos que eliminan la fricción. Recolectamos datos enriquecidos estructurados listos para clasificar de forma inmediata.
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { icon: <TrendingUp className="w-3 h-3" />, label: 'Conversión +45%' },
                    { icon: <Clock className="w-3 h-3" />, label: 'Carga < 1s' },
                  ].map((tag, ti) => (
                    <span key={ti} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-full text-[11px] font-sans font-semibold text-[#D4AF37]">
                      {tag.icon} {tag.label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="hidden md:flex items-center justify-center">
                <div className="w-52 h-40 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-3 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent" />
                  <span className="font-serif text-[80px] font-bold text-[#D4AF37]/15 leading-none select-none">01</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3 smaller cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: '02', Icon: Zap,
                tag: 'Sincronización CRM',
                title: 'Sincronización Total con CRM',
                body: 'Integramos Jotform directamente con HubSpot o GoHighLevel. Cada campo mapeado de forma limpia, sin datos dispersos ni copiar-pegar.',
                tags: [{ icon: <Plug className="w-3 h-3" />, label: '1000+ Integraciones' }, { icon: <Settings className="w-3 h-3" />, label: 'Cero Errores' }],
              },
              {
                num: '03', Icon: Bot,
                tag: 'Agentes Conversacionales',
                title: 'Automatización Conversacional',
                body: 'Agentes de IA que califican leads, responden dudas y agendan citas directamente en tu calendario sin intervención humana.',
                tags: [{ icon: <Bot className="w-3 h-3" />, label: 'Atención 24/7' }, { icon: <Check className="w-3 h-3" />, label: 'Precisión 99%' }],
              },
              {
                num: '04', Icon: Shield,
                tag: 'Firma Digital',
                title: 'Firma Digital & Documentación',
                body: 'Contratos, propuestas y actas con firma electrónica integrada en el flujo web. Proceso legal, rápido y totalmente seguro.',
                tags: [{ icon: <FileText className="w-3 h-3" />, label: '100% Digital' }, { icon: <Shield className="w-3 h-3" />, label: 'Seguridad SSL' }],
              },
            ].map((item, i) => (
              <div key={i} className="group bg-[#FAF8F3] border border-[#F4E4C1] rounded-2xl p-7 relative overflow-hidden hover:shadow-[0_16px_40px_rgba(212,175,55,0.14)] hover:border-[#D4AF37]/40 transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-white border border-[#F4E4C1] flex items-center justify-center shadow-sm group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-colors duration-300">
                    <item.Icon className="w-5 h-5 text-[#B8941D] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="font-serif text-4xl font-bold text-[#F4E4C1] select-none">{item.num}</span>
                </div>
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#B8941D] mb-2 block">{item.tag}</span>
                <h3 className="font-serif text-[#2C2C2C] text-lg font-bold mb-3 leading-snug">{item.title}</h3>
                <p className="font-sans text-gray-med text-sm leading-relaxed mb-5">{item.body}</p>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[#F4E4C1]">
                  {item.tags.map((tag, ti) => (
                    <span key={ti} className="flex items-center gap-1 text-[10px] font-sans font-semibold text-[#B8941D]">
                      {tag.icon} {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* TEXTO FLOTANTE: Potenciado con Jotform */}
      <div className="w-full py-16 px-6 flex flex-col items-center justify-center gap-3 bg-white">
        <ScrollReveal className="flex flex-col items-center gap-2 text-center">
          <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold font-semibold">
            Tecnología &nbsp;·&nbsp; Partner Oficial
          </span>
          <span className="font-serif text-5xl md:text-7xl font-bold text-charcoal leading-tight">
            Potenciado con <span className="text-gold italic">Jotform</span>
          </span>
        </ScrollReveal>
      </div>

      {/* SECCIÓN 5: DEMO VISUAL - DIAGRAMA INTERACTIVO (Champagne bg, center title, interactive data solar system diagram) */}
      <section id="ecosistema" className="bg-gradient-champagne py-24 px-6 relative border-t border-b border-gold-light/40">
        <div className="max-w-7xl mx-auto text-center">
          
          <div className="max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase font-mono tracking-widest text-gold-dark font-bold px-3 py-1 bg-white rounded-full">
              Demostración Interactiva
            </span>
            <h2 className="font-serif text-charcoal text-4xl md:text-5xl font-bold mt-4">
              Cómo funciona el ecosistema
            </h2>
            <p className="font-sans text-gray-med text-base md:text-lg mt-4 leading-relaxed">
              Descubre cómo la captura de un solo formulario Jotform desencadena un flujo inteligente de validaciones, base de datos y salidas automáticas.
            </p>
          </div>

          <div className="w-full max-w-5xl mx-auto">
            <InteractiveDiagram />
          </div>

        </div>
      </section>

      {/* SECCIÓN 6: TESTIMONIOS */}
      <section id="beneficios" className="bg-[#FAF8F3] py-24 px-6 relative overflow-hidden border-t border-[#F4E4C1]">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block font-sans font-semibold text-xs text-[#B8941D] tracking-[2.5px] uppercase mb-4 px-4 py-1.5 bg-white border border-[#F4E4C1] rounded-full">
              Lo que dicen nuestros clientes
            </span>
            <h2 className="font-serif text-[#2C2C2C] text-3xl md:text-[42px] font-bold leading-[1.2] mt-4">
              Resultados que hablan por sí solos
            </h2>
          </div>
          <TestimonialsSection />
        </div>
      </section>

      {/* SECCIÓN 7: PROCESO */}
      <section className="bg-champagne py-32 px-6 overflow-hidden relative border-t border-b border-gold-light/40">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
            <span className="text-xs uppercase font-mono tracking-widest text-gold-dark font-bold px-3 py-1 bg-white rounded-full">
              Sólida Metodología
            </span>
            <h2 className="font-serif text-charcoal text-4xl md:text-5xl font-bold mt-4">
              Cómo trabajamos
            </h2>
            <p className="font-sans text-gray-med text-base md:text-lg mt-4 leading-relaxed">
              Despliega automatizaciones profesionales en cuatro fases estructuradas con soporte continuo y auditoría de seguridad.
            </p>
          </div>

          <StepTimeline />

        </div>
      </section>

      {/* SECCIÓN 8: INTEGRACIONES (Three stacked horizontal carousels of logos) (Cambio 7) */}
      <section className="bg-white py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs uppercase font-sans tracking-widest text-[#B8941D] font-bold px-3 py-1 bg-beige-soft rounded-full">
              Máxima Compatibilidad
            </span>
            <h2 className="font-serif text-[#2C2C2C] text-4xl font-bold mt-4">
              Conecta con tu stack actual
            </h2>
            <p className="font-sans text-gray-med text-base mt-4 leading-relaxed">
              MEDLA AI sincroniza Jotform con tus CRMs, herramientas contables, bases de datos o soluciones de mensajería preferidas.
            </p>
          </div>

          <div className="space-y-5 relative max-w-5xl mx-auto">
            {/* Soft gradient masks on sides */}
            <div className="absolute top-0 left-0 h-full w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 h-full w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            {(() => {
              const rows: { name: string; abbr: string; bg: string; fg: string; category: string; highlighted?: boolean }[][] = [
                [
                  { name: "GoHighLevel", abbr: "GHL", bg: "#1a1a2e", fg: "#D4AF37", category: "CRM & Ventas" },
                  { name: "HubSpot", abbr: "HS", bg: "#ff7a59", fg: "#ffffff", category: "Inbound Marketing" },
                  { name: "Salesforce", abbr: "SF", bg: "#009edb", fg: "#ffffff", category: "Enterprise CRM" },
                  { name: "ActiveCampaign", abbr: "AC", bg: "#356ae6", fg: "#ffffff", category: "Email Automation" },
                  { name: "GoHighLevel", abbr: "GHL", bg: "#1a1a2e", fg: "#D4AF37", category: "CRM & Ventas" },
                  { name: "HubSpot", abbr: "HS", bg: "#ff7a59", fg: "#ffffff", category: "Inbound Marketing" },
                  { name: "Salesforce", abbr: "SF", bg: "#009edb", fg: "#ffffff", category: "Enterprise CRM" },
                  { name: "ActiveCampaign", abbr: "AC", bg: "#356ae6", fg: "#ffffff", category: "Email Automation" },
                ],
                [
                  { name: "WhatsApp Biz", abbr: "WA", bg: "#25D366", fg: "#ffffff", category: "Mensajería Directa" },
                  { name: "Google Drive", abbr: "GD", bg: "#1fa463", fg: "#ffffff", category: "Almacenamiento" },
                  { name: "Stripe", abbr: "ST", bg: "#6772e5", fg: "#ffffff", category: "Pasarela de Pago" },
                  { name: "Slack", abbr: "SL", bg: "#4a154b", fg: "#ffffff", category: "Alertas Internas" },
                  { name: "WhatsApp Biz", abbr: "WA", bg: "#25D366", fg: "#ffffff", category: "Mensajería Directa" },
                  { name: "Google Drive", abbr: "GD", bg: "#1fa463", fg: "#ffffff", category: "Almacenamiento" },
                  { name: "Stripe", abbr: "ST", bg: "#6772e5", fg: "#ffffff", category: "Pasarela de Pago" },
                  { name: "Slack", abbr: "SL", bg: "#4a154b", fg: "#ffffff", category: "Alertas Internas" },
                ],
                [
                  { name: "Jotform", abbr: "JF", bg: "#D4AF37", fg: "#ffffff", category: "Captura Interactiva", highlighted: true },
                  { name: "Calendly", abbr: "CL", bg: "#006bff", fg: "#ffffff", category: "Agendamiento" },
                  { name: "Outlook", abbr: "OL", bg: "#0072c6", fg: "#ffffff", category: "Correo Corp" },
                  { name: "Airtable", abbr: "AT", bg: "#18bfff", fg: "#ffffff", category: "Base de Datos" },
                  { name: "Jotform", abbr: "JF", bg: "#D4AF37", fg: "#ffffff", category: "Captura Interactiva", highlighted: true },
                  { name: "Calendly", abbr: "CL", bg: "#006bff", fg: "#ffffff", category: "Agendamiento" },
                  { name: "Outlook", abbr: "OL", bg: "#0072c6", fg: "#ffffff", category: "Correo Corp" },
                  { name: "Airtable", abbr: "AT", bg: "#18bfff", fg: "#ffffff", category: "Base de Datos" },
                ],
              ];
              const animClass = ['carousel-1', 'carousel-2', 'carousel-3'];
              return rows.map((row, ri) => (
                <div key={ri} className="overflow-hidden w-full relative py-1.5">
                  <div className={`flex gap-5 ${animClass[ri]} w-max`}>
                    {row.map((item, idx) => (
                      <div
                        key={`r${ri}-${idx}`}
                        className={`w-56 h-20 rounded-xl flex items-center gap-3 px-4 transition-all duration-300 hover:scale-105 flex-shrink-0 group ${
                          item.highlighted
                            ? 'bg-white border-2 border-[#D4AF37] shadow-[0_8px_24px_rgba(212,175,55,0.2)] relative overflow-hidden'
                            : 'bg-[#FAF8F3]/70 border border-[#F0EDED] hover:border-[#D4AF37]/50 shadow-sm'
                        }`}
                      >
                        {item.highlighted && (
                          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold to-gold-dark" />
                        )}
                        {/* Letter badge */}
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm flex-shrink-0 shadow-sm"
                          style={{ background: item.bg, color: item.fg }}
                        >
                          {item.abbr}
                        </div>
                        <div className="text-left min-w-0">
                          <p className="font-sans font-bold text-sm text-charcoal group-hover:text-[#B8941D] transition-colors truncate">
                            {item.name}
                          </p>
                          <p className="font-mono text-[9px] text-gray-med uppercase tracking-wide mt-0.5">{item.category}</p>
                          {item.highlighted && (
                            <span className="inline-block mt-1 text-[8px] text-[#B8941D] uppercase font-bold tracking-wider bg-[#FAF8F3] px-1.5 py-0.5 rounded-full border border-[#F4E4C1]">
                              Socio Premium
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ));
            })()}

          </div>

          <div className="text-center mt-12 bg-beige-soft border border-gold-light max-w-sm mx-auto py-3 px-6 rounded-full shadow-sm">
            <p className="font-sans font-semibold text-xs text-gold-dark">
              ★ +1,000 integraciones completadas bajo demanda
            </p>
          </div>

        </div>
      </section>

      {/* SECCIÓN 9: CTA FINAL (Graduate background with structured contact form) */}
      <section id="contact-form" className="bg-gradient-to-b from-beige-soft to-champagne py-24 px-6 relative border-t border-gold-light/40">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <span className="text-xs uppercase font-mono tracking-widest text-gold-dark font-bold px-3 py-1 bg-white rounded-full">
              Agenda Estratégica
            </span>
            <h2 className="font-serif text-charcoal text-4xl md:text-5xl font-bold mt-4">
              ¿Listo para digitalizar tu negocio?
            </h2>
            <p className="font-sans text-gray-med text-base md:text-lg mt-4 max-w-xl mx-auto">
              Agenda una consultoría gratuita de 30 min y recibe un pre-diseño de tu flujo de automatización sin compromiso.
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white border-2 border-gold rounded-2xl p-6 md:p-12 shadow-[0_15px_50px_rgba(212,175,55,0.18)]">
            
            {formSubmitted ? (
              <div className="text-center py-10 transition-all duration-500">
                <div className="w-20 h-20 bg-gold-light/4% border border-gold/40 text-gold-dark rounded-full flex items-center justify-center mx-auto text-4xl mb-6 shadow-inner animate-bounce">
                  ✨
                </div>
                <h3 className="font-serif text-3xl font-bold text-charcoal">
                  ¡Propuesta agendada con éxito!
                </h3>
                <p className="font-sans text-sm text-gray-med max-w-md mx-auto leading-relaxed mt-4">
                  Gracias por tu confianza, <strong className="text-charcoal">{formData.nombre}</strong>. Nos pondremos en contacto contigo al correo <strong className="text-charcoal">{formData.email}</strong> en menos de 12 horas hábiles para fijar la sesión técnica de 30 minutos.
                </p>
                <button 
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ nombre: '', email: '', empresa: '', proceso: '' });
                  }}
                  className="mt-8 px-6 py-2.5 bg-charcoal text-white rounded font-sans text-xs uppercase tracking-wider font-bold hover:bg-gold-dark transition-all"
                >
                  Registrar otro proceso
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                
                {/* Name */}
                <div>
                  <label htmlFor="nombre" className="block text-xs font-sans font-bold text-charcoal uppercase tracking-wider mb-2">
                    Nombre completo <span className="text-gold-dark">*</span>
                  </label>
                  <input 
                    id="nombre"
                    type="text"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Ej. Sofía Ramos"
                    className="w-full bg-beige-soft border border-gray-light rounded-lg px-4 py-3.5 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all placeholder:text-gray-med/50 text-charcoal"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-sans font-bold text-charcoal uppercase tracking-wider mb-2">
                    Email empresarial <span className="text-gold-dark">*</span>
                  </label>
                  <input 
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Ej. sramos@miempresa.com"
                    className="w-full bg-beige-soft border border-gray-light rounded-lg px-4 py-3.5 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all placeholder:text-gray-med/50 text-charcoal"
                  />
                </div>

                {/* Empresa */}
                <div>
                  <label htmlFor="empresa" className="block text-xs font-sans font-bold text-charcoal uppercase tracking-wider mb-2">
                    Nombre de tu empresa
                  </label>
                  <input 
                    id="empresa"
                    type="text"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    placeholder="Ej. Logística Avanzada SA"
                    className="w-full bg-beige-soft border border-gray-light rounded-lg px-4 py-3.5 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all placeholder:text-gray-med/50 text-charcoal"
                  />
                </div>

                {/* Proceso */}
                <div>
                  <label htmlFor="proceso" className="block text-xs font-sans font-bold text-charcoal uppercase tracking-wider mb-2">
                    ¿Qué proceso quieres automatizar primero?
                  </label>
                  <textarea 
                    id="proceso"
                    name="proceso"
                    rows={4}
                    value={formData.proceso}
                    onChange={handleInputChange}
                    placeholder="Ej. Queremos que cuando un cliente llene el formulario de registro se le envíe un WhatsApp con la cotización en PDF automática y se asigne el trato en GoHighLevel."
                    className="w-full bg-beige-soft border border-gray-light rounded-lg px-4 py-3.5 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all placeholder:text-gray-med/50 text-charcoal resize-none leading-relaxed"
                  />
                </div>

                {/* Submit button */}
                <button 
                  type="submit"
                  className="w-full py-4.5 bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-white font-sans font-semibold text-sm uppercase tracking-widest rounded-lg transition-all shadow-md hover:shadow-lg active:scale-98"
                >
                  Quiero mi consultoría gratuita
                </button>

              </form>
            )}

          </div>

          {/* Alternativas de contacto (inline cards buttons) */}
          <div className="mt-12 text-center">
            <span className="font-sans text-xs text-gray-med tracking-wider uppercase block mb-4">
              O contáctanos directamente:
            </span>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://wa.me/34641576772?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n" 
                target="_blank" 
                rel="referrer noopener"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gold text-gold font-sans font-bold text-xs uppercase tracking-wider rounded-full transition-all hover:bg-gold-light/25 shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-gold-dark" />
                <span>WhatsApp</span>
              </a>
              <button 
                onClick={() => scrollToSection('contact-form')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gold text-gold font-sans font-bold text-xs uppercase tracking-wider rounded-full transition-all hover:bg-gold-light/25 shadow-sm"
              >
                <Calendar className="w-4 h-4 text-gold-dark" />
                <span>Calendario directo</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* SECCIÓN 10: FOOTER (White font on charcoal #2C2C2C background, golden top border) */}
      <footer className="bg-charcoal text-white pt-16 pb-8 border-t-[3px] border-gold px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12">
          
          {/* Column 1: Logo and brand description */}
          <div className="md:col-span-6">
            <h3 className="font-sans font-bold text-2xl tracking-wider text-white">
              MEDLA <span className="text-gold">×</span> JOTFORM
            </h3>
            <p className="font-sans text-gray-light hover:text-white transition-colors text-xs leading-relaxed max-w-sm mt-4">
              Consultora elite especializada en automatización y digitalización completa de procesos empresariales para PyMEs en México y España. Despliega el máximo potencial de tu negocio sin escribir una línea de código.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-gold">
              <span>★ Partner Autorizado de Formulación Digital</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3">
            <h4 className="font-serif text-sm font-bold text-gold tracking-wider uppercase mb-4">
              Servicios
            </h4>
            <ul className="space-y-2.5 font-sans text-xs text-gray-light">
              <li>
                <button 
                  onClick={() => scrollToSection('servicios')}
                  className="hover:text-gold transition-colors text-left"
                >
                  Automatización general
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('servicios')}
                  className="hover:text-gold transition-colors text-left"
                >
                  Agentes Inteligentes IA
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('servicios')}
                  className="hover:text-gold transition-colors text-left"
                >
                  CRMs Cloud & GoHighLevel
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('servicios')}
                  className="hover:text-gold transition-colors text-left"
                >
                  Digitalización de Procesos
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact layout */}
          <div className="md:col-span-3">
            <h4 className="font-serif text-sm font-bold text-gold tracking-wider uppercase mb-4">
              Contacto
            </h4>
            <ul className="space-y-3 font-sans text-xs text-gray-light">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="mailto:info@medla-empresas.com" className="hover:text-gold transition-colors">
                  info@medla-empresas.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Madrid | CDMX | Remoto</span>
              </li>
              <li className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="https://linkedin.com" target="_blank" rel="referrer noopener" className="hover:text-gold transition-colors">
                  MEDLA en LinkedIn
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider line in footer */}
        <div className="border-t border-[#6B6B6B]/40 max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
          <p className="font-sans text-[11px] text-gray-med">
            &copy; 2026 MEDLA AI. Todos los derechos reservados.
          </p>
          <div className="flex gap-4 font-sans text-[10px] text-gray-med">
            <a href="#privacy" className="hover:text-gold transition-colors">Aviso de Privacidad</a>
            <span>•</span>
            <a href="#terms" className="hover:text-gold transition-colors">Términos del Servicio</a>
          </div>
        </div>
      </footer>

    </div>
  );
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
