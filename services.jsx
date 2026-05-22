// Services page — interactive explorer
// Sidebar list + detail panel + cross-sell grid

const { useState, useEffect, useRef } = React;

const SERVICES_DATA = [
  {
    id: "legal",
    icon: "legal",
    num: "01",
    label: "Core",
    category: "Asesoría legal",
    title: "Asesoría legal y gobierno corporativo",
    lead: "Estructura jurídica viva. Contratos, actas, compliance y resoluciones que sostienen cada decisión empresarial con respaldo y criterio.",
    features: [
      { t: "Contratos comerciales", d: "Redacción, revisión y negociación de todo tipo de acuerdo mercantil." },
      { t: "Gobierno corporativo", d: "Actas, estatutos, órganos sociales y políticas internas." },
      { t: "Compliance", d: "Programas de cumplimiento normativo adaptados al sector." },
      { t: "Litigio preventivo", d: "Diagnóstico de riesgos y estrategia de mitigación." },
      { t: "Protección de datos", d: "LOPDGDD, RGPD y políticas de privacidad." },
      { t: "Laboral estratégico", d: "Contratos, despidos, conflictos y reestructuración." },
    ],
    meta: [
      { l: "Modalidad", v: "Suscripción mensual" },
      { l: "Tiempo respuesta", v: "< 24 horas" },
      { l: "Ideal para", v: "Pymes y startups" },
    ],
  },
  {
    id: "social",
    icon: "social",
    num: "02",
    label: "Brand",
    category: "Comunicación",
    title: "Presencia estratégica en redes sociales",
    lead: "Comunicación corporativa con arquitectura: narrativa, contenido y medición. Para founders y empresas que quieren autoridad sin ruido.",
    features: [
      { t: "Estrategia de marca", d: "Narrativa, tono y arquitectura de mensajes." },
      { t: "Contenido LinkedIn", d: "Posicionamiento del founder y la empresa." },
      { t: "Video corporativo", d: "Formatos cortos para YouTube y redes." },
      { t: "PR estratégico", d: "Prensa, podcasts y entrevistas selectas." },
      { t: "Community", d: "Gestión editorial y moderación." },
      { t: "Analítica", d: "Medición de alcance, engagement y leads." },
    ],
    meta: [
      { l: "Modalidad", v: "Retainer mensual" },
      { l: "Formatos", v: "Post, video, podcast" },
      { l: "Ideal para", v: "Founders y C-level" },
    ],
  },
  {
    id: "jotform",
    icon: "digitalizacion",
    num: "03",
    label: "Forms",
    category: "Soluciones Jotform",
    title: "Implementación de Jotform Enterprise",
    lead: "Diseño y desarrollo de formularios avanzados y portales corporativos para agilizar la recopilación de datos y automatizar procesos empresariales.",
    features: [
      { t: "Formularios avanzados", d: "Lógica condicional, cálculos y prellenado." },
      { t: "Portales de clientes", d: "Espacios seguros para compartir y gestionar datos." },
      { t: "Integraciones CRM/ERP", d: "Conexión directa con tu ecosistema actual." },
      { t: "Firmas electrónicas", d: "Jotform Sign integrado en flujos de trabajo." },
      { t: "Aprobaciones complejas", d: "Flujos de revisión y aprobación multinivel." },
      { t: "Cumplimiento normativo", d: "Seguridad de nivel corporativo y cifrado." },
    ],
    meta: [
      { l: "Modalidad", v: "Proyecto a medida" },
      { l: "Plazo típico", v: "2–4 semanas" },
      { l: "Ideal para", v: "Empresas con alto volumen de datos" },
    ],
  },
];

function SvcNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <>
    <nav className="nav scrolled">
      <div className="container nav-inner">
        <a href="index.html" className="logo"><img src="logo.png" alt="MEDLA" style={{ height: 64 }} /></a>
        <ul className="nav-links">
          <li><a href="servicios.html" style={{ color: "var(--gold)" }}>Servicios</a></li>
          <li><a href="nosotros.html">Nosotros</a></li>
          <li><a href="blog.html">Blog</a></li>
          <li><a href="contacto.html">Contacto</a></li>
        </ul>
        <div style={{display: "flex", alignItems: "center"}}>
          <a href="contacto.html" className="btn btn-primary btn-sm nav-cta">Agendar diagnóstico</a>
          <button className="nav-toggle" onClick={() => setMobileOpen(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
      </div>
    </nav>
    {mobileOpen && (
      <div className="mobile-menu">
        <div className="mobile-menu-overlay" onClick={() => setMobileOpen(false)}></div>
        <div className="mobile-menu-content">
          <div className="mobile-menu-head">
            <img src="logo.png" alt="MEDLA" style={{height: 40}} />
            <button className="nav-toggle" style={{display: "block"}} onClick={() => setMobileOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <ul className="mobile-links" onClick={() => setMobileOpen(false)}>
            <li><a href="servicios.html" style={{ color: "var(--gold)" }}>Servicios</a></li>
            <li><a href="nosotros.html">Nosotros</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="contacto.html">Contacto</a></li>
            <li style={{marginTop: 20}}><a href="contacto.html" className="btn btn-primary" style={{textAlign: "center", justifyContent: "center", width: "100%"}}>Agendar diagnóstico</a></li>
          </ul>
        </div>
      </div>
    )}
    </>
  );
}

function SvcHero() {
  return (
    <section className="svc-hero">
      <div className="container svc-hero-inner">
        <div>
          <span className="eyebrow">— Servicios</span>
          <h1 style={{ marginTop: 16 }}>Soluciones integrales para escalar tu <em>negocio</em>.</h1>
          <p className="lead" style={{ marginTop: 24, maxWidth: "52ch" }}>
            Elimina la fricción de tratar con múltiples agencias y despachos. En MEDLA unificamos la asesoría corporativa, la automatización y el marketing para que tu empresa crezca sin límites.
          </p>
          <div className="hero-ctas" style={{ marginTop: 32 }}>
            <a href="contacto.html" className="btn btn-primary">Explorar servicios <span className="arr">↓</span></a>
            <a href="contacto.html" className="btn btn-ghost">Diagnóstico gratuito</a>
          </div>
        </div>
        <div className="svc-stats">
          <div className="svc-stat">
            <div className="svc-stat-num">360°</div>
            <div className="svc-stat-lbl">Estrategia integral. Legal, tech y marketing en un solo equipo.</div>
          </div>
          <div className="svc-stat">
            <div className="svc-stat-num">100%</div>
            <div className="svc-stat-lbl">Enfocados en resultados medibles y escalabilidad operativa.</div>
          </div>
          <div className="svc-stat">
            <div className="svc-stat-num">24/7</div>
            <div className="svc-stat-lbl">Acompañamiento continuo y soporte prioritario para tu empresa.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SvcExplorer() {
  const [active, setActive] = useState(SERVICES_DATA[0].id);
  const [t, setT] = useState(0);
  const current = SERVICES_DATA.find((s) => s.id === active);
  const Scene = Scenes[current.icon] || Scenes.legal;

  useEffect(() => {
    let raf;
    const loop = () => {
      setT(performance.now() / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="svc-explorer" id="explorer">
      <div className="container">
        <div className="section-head" style={{ marginBottom: 40, textAlign: "center" }}>
          <span className="eyebrow">— Explorador</span>
          <h2 style={{ margin: "12px auto 12px" }}>Cada servicio, con <em>nombre y criterio</em>.</h2>
          <p className="lead" style={{ margin: "0 auto", maxWidth: "58ch" }}>Selecciona un servicio para conocer su alcance, modalidad y cómo se articula con el resto del ecosistema MEDLA.</p>
        </div>

        <div className="svc-layout">
          <div className="svc-tabs" role="tablist">
            {SERVICES_DATA.map((s) => (
              <button
                key={s.id}
                className={`svc-tab ${active === s.id ? "active" : ""}`}
                onClick={() => setActive(s.id)}
                role="tab"
                aria-selected={active === s.id}
              >
                <span className="svc-tab-num">{s.num}</span>
                <span className="svc-tab-icon"><ServiceIcon name={s.icon} size={16} /></span>
                <span>{s.category}</span>
              </button>
            ))}
          </div>

          <div className="svc-detail" key={current.id}>
            <div className="svc-detail-left">
              <div className="svc-detail-head">
                <span className="eyebrow" style={{ marginBottom: 18 }}>— {current.label} · {current.num}</span>
                <h2>{current.title}</h2>
                <p className="svc-detail-lead">{current.lead}</p>
              </div>

              <div className="svc-detail-meta">
                {current.meta.map((m, i) => (
                  <div key={i}>
                    <span className="lbl">{m.l}</span>
                    <span className="val">{m.v}</span>
                  </div>
                ))}
              </div>

              <div className="svc-detail-ctas">
                <a href={
                  current.id === "legal" ? "asesoria-legal.html" :
                    current.id === "constitucion" ? "constitucion.html" :
                      current.id === "inversiones" ? "inversiones.html" :
                        current.id === "automatizacion" ? "automatizacion.html" :
                          current.id === "digitalizacion" ? "digitalizacion.html" :
                            current.id === "ia" ? "agentes.html" :
                              current.id === "social" ? "redes-sociales.html" :
                                current.id === "jotform" ? "Langin_MEDLA_Jotform/dist/index.html" :
                                  "index.html#contacto"
                } className="btn btn-primary">Ver todos los detalles <span className="arr">→</span></a>
                <a href="contacto.html" className="btn btn-ghost">Agendar diagnóstico</a>
              </div>
            </div>

            <div className="svc-detail-right">
              <div className="svc-visual">
                <Scene t={t} />
              </div>
              <div className="svc-features-grid">
                {current.features.map((f, i) => (
                  <div className="svc-feature" key={i}>
                    <div className="svc-feature-title">{f.t}</div>
                    <div className="svc-feature-desc">{f.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SvcCross() {
  return (
    <section className="svc-cross">
      <div className="container">
        <div className="section-head" style={{ margin: "0 auto 16px" }}>
          <span className="eyebrow">— Paquetes integrados</span>
          <h2 style={{ maxWidth: "22ch", margin: "16px auto 0" }}>Tres formas de <em>trabajar con MEDLA</em>.</h2>
        </div>
        <div className="svc-cross-grid">
          <div className="svc-cross-card">
            <span className="eyebrow">Essential</span>
            <h4 style={{ marginTop: 12 }}>Base jurídica</h4>
            <p>Contratos, gobierno y compliance mensual. La capa mínima viable para operar con criterio.</p>
          </div>
          <div className="svc-cross-card">
            <span className="eyebrow">Pro</span>
            <h4 style={{ marginTop: 12 }}>Operación digital</h4>
            <p>Legal + digitalización + automatización. Tu empresa deja de depender de tareas manuales.</p>
          </div>
          <div className="svc-cross-card">
            <span className="eyebrow">Elite</span>
            <h4 style={{ marginTop: 12 }}>Suite completa</h4>
            <p>Los siete servicios integrados. Una sola arquitectura operando como un solo equipo.</p>
          </div>
        </div>
        <a href="contacto.html" className="btn btn-dark" style={{ marginTop: 48 }}>Ver paquetes y precios <span className="arr">→</span></a>
      </div>
    </section>
  );
}

function SvcFooter() {
  return (
    <footer className="footer" id="blog">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="index.html"><img src="logo.png" alt="MEDLA Empresas" style={{height: 160, display: "block", marginBottom: 16, filter: "invert(1)"}} /></a>
            <p>Estructura legal, tecnológica y comercial para empresas que deciden operar con criterio.</p>
          </div>
          <div>
            <h4>Servicios</h4>
            <ul>
              <li><a href="asesoria-legal.html">Asesoría legal</a></li>
              <li><a href="redes-sociales.html">Comunicación</a></li>
              <li><a href="Langin_MEDLA_Jotform/dist/index.html">Soluciones Jotform</a></li>
            </ul>
          </div>
          <div>
            <h4>Compañía</h4>
            <ul>
              <li><a href="nosotros.html">Nosotros</a></li>
              <li><a href="blog.html">Blog</a></li>
              <li><a href="contacto.html">Casos</a></li>
              <li><a href="contacto.html">Carreras</a></li>
            </ul>
          </div>
          <div>
            <h4>Contacto</h4>
            <ul>
              <li><a href="mailto:info@medla-empresas.com">info@medla-empresas.com</a></li>
              <li><a href="tel:+34641576772">+34 641 576 772</a></li>
              <li><a href="#">Madrid, España</a></li>
            </ul>
            <a
              href="https://api.whatsapp.com/send/?phone=34641576772&text=Hola%2C+me+gustar%C3%ADa+recibir+m%C3%A1s+informaci%C3%B3n&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{marginTop: 20, display: "inline-flex", alignItems: "center", gap: 8, fontSize: "0.85rem", padding: "10px 20px"}}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Contactar por WhatsApp
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 MEDLA Empresas. Todos los derechos reservados.</span>
          <span>Aviso de privacidad · Términos</span>
        </div>
      </div>
    </footer>
  );
}

function ServicesApp() {
  return (
    <div className="svc-page">
      <SvcNav />
      <SvcHero />
      <SvcExplorer />
      <SvcCross />
      <SvcFooter />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ServicesApp />);
