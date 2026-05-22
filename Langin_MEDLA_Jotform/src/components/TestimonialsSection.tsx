export default function TestimonialsSection() {
  const testimonials = [
    {
      initial: "M",
      name: "María González",
      company: "Medla Asesores",
      stars: 5,
      quote:
        "Avanzza transformó completamente nuestro proceso de captación. Antes perdíamos leads en hojas de Excel; ahora cada prospecto entra directamente a nuestro CRM en segundos. El ROI fue visible desde la primera semana.",
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
