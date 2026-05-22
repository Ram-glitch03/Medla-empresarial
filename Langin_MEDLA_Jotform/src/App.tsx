/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import InteractiveDiagram from './components/InteractiveDiagram';
import HeroBackground from './components/HeroBackground';
import CapturaVisual from './components/CapturaVisual';
import AgentesVisual from './components/AgentesVisual';
import IntegracionVisual from './components/IntegracionVisual';
import TestimonialsSection from './components/TestimonialsSection';
import StepTimeline from './components/StepTimeline';
import {
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


export default function App() {
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
                href="https://wa.me/34600000000" 
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
                <a href="mailto:medlaai@gmail.com" className="hover:text-gold transition-colors">
                  medlaai@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                <span>CDMX | Madrid | Remoto</span>
              </li>
              <li className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="https://linkedin.com" target="_blank" rel="referrer noopener" className="hover:text-gold transition-colors">
                  MEDLA AI en LinkedIn
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

