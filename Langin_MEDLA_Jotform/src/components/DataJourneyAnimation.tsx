import { useState, useEffect } from 'react';

export default function DataJourneyAnimation() {
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

        {/* Step 2: Avanzza AI (The Engine) */}
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
          }`}>Avanzza Engine</span>
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
          {activeStep === 1 && "Avanzza automatiza el webhook. Los datos son extraídos y enviados al hub central sin un solo script manual."}
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
