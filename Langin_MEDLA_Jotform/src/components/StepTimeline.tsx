import { Search, Layout, Settings, BarChart3 } from "lucide-react";
import { type ElementType } from "react";

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

export default function StepTimeline() {
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
