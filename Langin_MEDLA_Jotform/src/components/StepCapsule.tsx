import React, { useEffect, useState, useRef } from 'react';
import { Search, Layout, Settings, BarChart3 } from 'lucide-react';

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

export default function StepCapsule() {
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
