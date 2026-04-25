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
    id: "constitucion",
    icon: "constitucion",
    num: "02",
    label: "Setup",
    category: "Sociedades",
    title: "Constitución y reestructuración de sociedades",
    lead: "Arquitectura jurídica diseñada para crecer. Desde la primera SL hasta holdings, fusiones, escisiones y operaciones transfronterizas.",
    features: [
      { t: "Constitución SL/SA", d: "Trámite completo en < 10 días hábiles." },
      { t: "Holdings", d: "Estructuras de tenencia fiscalmente óptimas." },
      { t: "Fusiones y escisiones", d: "Operaciones complejas con asesoría integral." },
      { t: "Reestructuración", d: "Rediseño societario para eficiencia operativa." },
      { t: "Pactos de socios", d: "Cláusulas de entrada, salida y bloqueo." },
      { t: "Sucursales", d: "Apertura en UE, LATAM y EE.UU." },
    ],
    meta: [
      { l: "Modalidad", v: "Proyecto cerrado" },
      { l: "Plazo típico", v: "2–6 semanas" },
      { l: "Ideal para", v: "Grupos en expansión" },
    ],
  },
  {
    id: "inversiones",
    icon: "inversiones",
    num: "03",
    label: "Growth",
    category: "Inversión",
    title: "Inversiones y levantamiento de capital",
    lead: "Acompañamiento técnico y estratégico en rondas, term sheets, due diligence y negociación con inversores institucionales.",
    features: [
      { t: "Term sheet", d: "Redacción y negociación en favor del founder." },
      { t: "Due diligence", d: "Preparación y gestión del proceso." },
      { t: "SAFE / Notas convertibles", d: "Instrumentos ágiles para rondas semilla." },
      { t: "Pacto de accionistas", d: "Cláusulas de protección y control." },
      { t: "Valuación", d: "Modelo financiero y defensa ante inversores." },
      { t: "Cap table", d: "Gestión profesional de la tabla de capitalización." },
    ],
    meta: [
      { l: "Modalidad", v: "Success fee + fija" },
      { l: "Rango ronda", v: "€250K – €10M" },
      { l: "Ideal para", v: "Startups en ronda" },
    ],
  },
  {
    id: "digitalizacion",
    icon: "digitalizacion",
    num: "04",
    label: "Tech",
    category: "Digitalización",
    title: "Digitalización de procesos operativos",
    lead: "Convertimos procesos manuales en flujos digitales auditables. ERP, CRM, firma electrónica y plataformas internas medibles.",
    features: [
      { t: "ERP ligeros", d: "Odoo, Holded, Sage configurados a medida." },
      { t: "CRM comercial", d: "HubSpot, Pipedrive, Zoho con automatizaciones." },
      { t: "Firma electrónica", d: "Integración de eIDAS en flujos contractuales." },
      { t: "Portales internos", d: "Intranets y dashboards de gestión." },
      { t: "Onboarding digital", d: "KYC y alta de clientes automatizada." },
      { t: "Migración documental", d: "Hacia sistemas con trazabilidad legal." },
    ],
    meta: [
      { l: "Modalidad", v: "Proyecto + mantenimiento" },
      { l: "Plazo típico", v: "6–12 semanas" },
      { l: "Ideal para", v: "Empresas 10–200 emp." },
    ],
  },
  {
    id: "automatizacion",
    icon: "automatizacion",
    num: "05",
    label: "Scale",
    category: "Automatización",
    title: "Automatización e integración de sistemas",
    lead: "Conectamos tus herramientas para que hablen entre sí. Menos tareas repetitivas, más decisiones basadas en datos.",
    features: [
      { t: "Integraciones API", d: "Entre ERP, CRM, contabilidad y bancos." },
      { t: "No-code / low-code", d: "Make, n8n, Zapier con lógica robusta." },
      { t: "Reportería", d: "Dashboards en Power BI / Looker Studio." },
      { t: "Flujos aprobación", d: "Workflow digital para órdenes y pagos." },
      { t: "Alertas inteligentes", d: "Monitorización de KPIs y desviaciones." },
      { t: "RPA", d: "Automatización de tareas repetitivas de escritorio." },
    ],
    meta: [
      { l: "Modalidad", v: "Sprints 2 semanas" },
      { l: "Ahorro medio", v: "30–60% tiempo" },
      { l: "Ideal para", v: "Equipos administrativos" },
    ],
  },
  {
    id: "ia",
    icon: "ia",
    num: "06",
    label: "Edge",
    category: "Inteligencia Artificial",
    title: "Inteligencia Artificial aplicada",
    lead: "IA con criterio: no tecnología por moda, sino casos concretos donde automatizar, analizar o decidir con modelos genera ROI medible.",
    features: [
      { t: "Asistentes internos", d: "GPTs corporativos con tu documentación." },
      { t: "Análisis documental", d: "Extracción estructurada de contratos y facturas." },
      { t: "Atención cliente IA", d: "Agentes conversacionales con handoff humano." },
      { t: "Predicción comercial", d: "Modelos de scoring y churn." },
      { t: "Generación contenido", d: "Pipelines para marketing y comunicación." },
      { t: "Compliance IA", d: "Monitoreo regulatorio automatizado." },
    ],
    meta: [
      { l: "Modalidad", v: "PoC → producción" },
      { l: "Plazo PoC", v: "3–6 semanas" },
      { l: "Ideal para", v: "Pymes con datos" },
    ],
  },
  {
    id: "social",
    icon: "social",
    num: "07",
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
          <a href="index.html#contacto" className="btn btn-primary btn-sm nav-cta">Agendar diagnóstico</a>
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
            <li style={{marginTop: 20}}><a href="index.html#contacto" className="btn btn-primary" style={{textAlign: "center", justifyContent: "center", width: "100%"}}>Agendar diagnóstico</a></li>
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
            <a href="#explorer" className="btn btn-primary">Explorar servicios <span className="arr">↓</span></a>
            <a href="index.html#contacto" className="btn btn-ghost">Diagnóstico gratuito</a>
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
                                "index.html#contacto"
                } className="btn btn-primary">Ver todos los detalles <span className="arr">→</span></a>
                <a href="index.html#contacto" className="btn btn-ghost">Agendar diagnóstico</a>
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
        <a href="index.html#paquetes" className="btn btn-dark" style={{ marginTop: 48 }}>Ver paquetes y precios <span className="arr">→</span></a>
      </div>
    </section>
  );
}

function SvcFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo"><span className="logo-mark" style={{ borderColor: "#C9A84C" }}></span>MEDLA<span className="light">&nbsp;empresas</span></div>
            <p>Estructura legal, tecnológica y comercial para empresas que deciden operar con criterio.</p>
          </div>
          <div>
            <h4>Servicios</h4>
            <ul>
              {SERVICES_DATA.map((s) => (
                <li key={s.id}><a href="#explorer">{s.category}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Empresa</h4>
            <ul>
              <li><a href="nosotros.html">Nosotros</a></li>
              <li><a href="blog.html">Blog</a></li>
              <li><a href="contacto.html">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4>Contacto</h4>
            <ul>
              <li>contacto@medlaempresas.com</li>
              <li>+34 910 00 00 00</li>
              <li>Madrid · Barcelona · Remoto</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 MEDLA empresas. Todos los derechos reservados.</span>
          <div>
            <a href="#">Aviso legal</a>
            <a href="#">Política de privacidad</a>
            <a href="#">Cookies</a>
          </div>
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
