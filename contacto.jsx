// Contacto page — interactive multi-step form + info + FAQ
const { useState, useEffect, useRef } = React;

/* ─────────── Icons local ─────────── */
const IconCal = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" />
    <circle cx="8" cy="15" r="1" fill="currentColor" />
  </svg>
);
const IconMsg = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 5h16v12H8l-4 4z" />
  </svg>
);
const IconWa = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 12.5a8 8 0 0 1-11.9 6.9L4 21l1.7-4A8 8 0 1 1 20 12.5z" />
    <path d="M9.3 10.2c.3 1.5 1.2 2.9 2.7 3.8.4.2.9.1 1.3-.2l.7-.5c.3-.2.7-.2 1 0l1.4.7" />
  </svg>
);
const IconMail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 7 9-7" />
  </svg>
);
const IconPhone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 4h3l2 5-2 1a11 11 0 0 0 6 6l1-2 5 2v3c0 1-1 2-2 2A18 18 0 0 1 3 6c0-1 1-2 2-2z" />
  </svg>
);
const IconPin = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s-8-7-8-13a8 8 0 0 1 16 0c0 6-8 13-8 13z" />
    <circle cx="12" cy="9" r="3" />
  </svg>
);
const IconLinkedIn = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M8 10v7M8 7.5v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
  </svg>
);

/* ─────────── Nav ─────────── */
function CtNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const pageSections = [...document.querySelectorAll(".contacto-page > :not(.nav):not(.mobile-menu)")];
    document.body.style.overflow = "hidden";
    pageSections.forEach((section) => section.setAttribute("inert", ""));
    closeButtonRef.current?.focus();
    const panel = closeButtonRef.current?.closest(".mobile-menu-content");
    const focusables = panel ? [...panel.querySelectorAll('a[href], button:not([disabled])')] : [];
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        return;
      }
      if (event.key !== "Tab" || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      pageSections.forEach((section) => section.removeAttribute("inert"));
      document.removeEventListener("keydown", handleKeyDown);
      menuButtonRef.current?.focus();
    };
  }, [mobileOpen]);

  return (
    <>
    <nav className="nav scrolled">
      <div className="container nav-inner">
        <a href="index.html" className="logo"><img className="contact-logo-image" src="logo.png" alt="MEDLA" /></a>
        <ul className="nav-links">
          <li><a href="servicios.html">Servicios</a></li>
          <li><a href="nosotros.html">Nosotros</a></li>
          <li><a href="blog.html">Cuadernos</a></li>
          <li><a href="#contenido" style={{ color: "var(--gold)" }} aria-current="page">Contacto</a></li>
        </ul>
        <div style={{display: "flex", alignItems: "center"}}>
          <a href="#form" className="btn btn-primary btn-sm nav-cta">Solicitar diagnóstico</a>
          <button
            ref={menuButtonRef}
            className="nav-toggle"
            type="button"
            aria-label="Abrir navegación"
            aria-expanded={mobileOpen}
            aria-controls="contact-mobile-menu"
            onClick={() => setMobileOpen(true)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
      </div>
    </nav>
    {mobileOpen && (
      <div className="mobile-menu" id="contact-mobile-menu" role="dialog" aria-modal="true" aria-label="Navegación">
        <div className="mobile-menu-overlay" aria-hidden="true" onClick={() => setMobileOpen(false)}></div>
        <div className="mobile-menu-content">
          <div className="mobile-menu-head">
            <img src="logo.png" alt="MEDLA" style={{height: 40}} />
            <button ref={closeButtonRef} className="nav-toggle" type="button" aria-label="Cerrar navegación" style={{display: "block"}} onClick={() => setMobileOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <ul className="mobile-links" onClick={() => setMobileOpen(false)}>
            <li><a href="servicios.html">Servicios</a></li>
            <li><a href="nosotros.html">Nosotros</a></li>
            <li><a href="blog.html">Cuadernos</a></li>
            <li><a href="#contenido" style={{ color: "var(--gold)" }} aria-current="page">Contacto</a></li>
            <li style={{marginTop: 20}}><a href="#form" className="btn btn-primary" style={{textAlign: "center", justifyContent: "center", width: "100%"}}>Solicitar diagnóstico</a></li>
          </ul>
        </div>
      </div>
    )}
    </>
  );
}

/* ─────────── Hero ─────────── */
function CtHero() {
  return (
    <section className="contacto-hero">
      <div className="container contacto-hero-inner">
        <span className="eyebrow" style={{ justifyContent: "center" }}>— Contacto</span>
        <h1 style={{ marginTop: 20 }}>Qué decisión necesitas tomar, <em>qué proceso mejorar o qué contrato revisar.</em></h1>
        <p className="lead">
          Lo revisa una persona del equipo para responder con contexto y proponer un siguiente paso concreto.
        </p>
        <div className="contacto-pulse">
          <span className="dot"></span> Revisión humana · Contexto estructurado
        </div>
      </div>
    </section>
  );
}

/* ─────────── Paths Selector ─────────── */
const PATHS = [
  {
    id: "diagnostico",
    icon: <IconCal />,
    title: "Diagnóstico inicial",
    desc: "Una primera conversación para entender el problema y acotar el siguiente paso.",
    meta: "Primera conversación",
  },
  {
    id: "propuesta",
    icon: <IconMsg />,
    title: "Propuesta a medida",
    desc: "Para equipos que ya tienen claro el alcance y necesitan una cotización detallada.",
    meta: "Alcance a medida",
  },
  {
    id: "alianza",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3L4 8v6a8 8 0 0 0 8 7 8 8 0 0 0 8-7V8z" /><path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "Colaboración profesional",
    desc: "Despachos, firmas o fondos que quieren coordinar una oferta conjunta o integrar capacidades MEDLA.",
    meta: "Oferta conjunta",
  },
];

function CtPaths({ active, onPick }) {
  return (
    <section className="contacto-paths">
      <div className="container">
        <div className="paths-grid">
          {PATHS.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`path-card ${active === p.id ? "active" : ""}`}
              aria-pressed={active === p.id}
              onClick={() => onPick(p.id)}
            >
              <div className="path-icon">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="path-meta">{p.meta}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Multi-step Form ─────────── */
const ALCANCE_OPTIONS = [
  "Asesoría legal corporativa",
  "Constitución / reestructura",
  "Inversiones y capital",
  "Digitalización de procesos",
  "Automatización e integración",
  "IA aplicada",
  "Posicionamiento, captación y CRM",
  "Aún no lo tengo claro",
];

const CONTEXT_PRESETS = {
  operacion: {
    alcance: ["Digitalización de procesos", "Automatización e integración"],
    notas: "Punto de partida: un proceso de aprobaciones manuales sin un estado ni un responsable claros.",
  },
  legal: {
    alcance: ["Asesoría legal corporativa"],
    notas: "Punto de partida: una decisión bloqueada por contratos, obligaciones o versiones dispersas.",
  },
  ia: {
    alcance: ["IA aplicada"],
    notas: "Punto de partida: un caso de IA que aún no opera con fuentes, permisos y controles definidos.",
  },
  growth: {
    alcance: ["Posicionamiento, captación y CRM"],
    notas: "Punto de partida: oportunidades comerciales sin responsable o próxima acción.",
  },
  cuadernos: {
    alcance: ["Aún no lo tengo claro"],
    notas: "Punto de partida: quiero aplicar una guía de Cuadernos MEDLA a un caso concreto.",
  },
};

const selectedContext = CONTEXT_PRESETS[new URLSearchParams(window.location.search).get("context")] || null;

const ETAPA_OPTIONS = [
  "Pre-constitución",
  "Empresa emergente en ronda",
  "Pyme en crecimiento",
  "Empresa establecida",
  "Grupo o holding",
  "Otro",
];

const PRESUPUESTO_LABELS = [
  { min: 0, max: 0, label: "A definir" },
  { min: 1, max: 3, label: "1K – 3K" },
  { min: 3, max: 8, label: "3K – 8K" },
  { min: 8, max: 15, label: "8K – 15K" },
  { min: 15, max: 30, label: "15K – 30K" },
  { min: 30, max: 999, label: "30K+" },
];

function CtForm({ pathId }) {
  const [step, setStep] = useState(0);
  const questionRef = useRef(null);
  const previousStepRef = useRef(0);
  const [data, setData] = useState(() => ({
    alcance: selectedContext?.alcance || [],
    etapa: null,
    presupuestoIdx: 0,
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    notas: selectedContext?.notas || "",
    website: "",
  }));
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(null);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  useEffect(() => {
    if (previousStepRef.current === step) return;
    previousStepRef.current = step;
    questionRef.current?.focus();
  }, [step]);

  const totalSteps = 4;
  const toggleAlcance = (opt) =>
    setData((d) => ({
      ...d,
      alcance: d.alcance.includes(opt) ? d.alcance.filter((x) => x !== opt) : [...d.alcance, opt],
    }));

  const setEtapa = (opt) => setData((d) => ({ ...d, etapa: opt }));
  const setField = (k, v) => setData((d) => ({ ...d, [k]: v }));

  const canAdvance =
    (step === 0 && data.alcance.length > 0) ||
    (step === 1 && !!data.etapa) ||
    step >= 2;

  const submitToWebhook = async () => {
    if (!privacyAccepted) {
      setSendError("Necesitamos que aceptes la política de privacidad antes de enviar.");
      return;
    }
    setSending(true);
    setSendError(null);
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 12000);
    const rangoPresupuesto = PRESUPUESTO_LABELS[data.presupuestoIdx].label;
    const payload = {
      tipo_contacto: pathId,
      nombre: data.nombre,
      empresa: data.empresa,
      email: data.email,
      telefono: data.telefono,
      alcance: data.alcance,
      etapa_empresa: data.etapa,
      rango_presupuesto: rangoPresupuesto,
      notas: data.notas,
      consentimiento_privacidad: true,
      version_privacidad: "2026-08-28",
      website: data.website,
    };
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`Webhook error ${response.status}`);
      setSent(true);
    } catch (err) {
      setSendError(err.name === "AbortError"
        ? "El envío tardó demasiado. Comprueba tu conexión e inténtalo de nuevo."
        : "No se pudo enviar. Por favor inténtalo de nuevo.");
    } finally {
      window.clearTimeout(timeoutId);
      setSending(false);
    }
  };

  const next = () => {
    if (step < totalSteps - 1 && canAdvance) setStep(step + 1);
  };
  const back = () => step > 0 && setStep(step - 1);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (step !== totalSteps - 1 || sending) return;
    submitToWebhook();
  };

  const stepTitle = {
    diagnostico: "Diagnóstico inicial",
    propuesta: "Solicitud de propuesta",
    alianza: "Alianza estratégica",
  }[pathId];

  const stepHints = [
    "Qué necesitas",
    "Dónde estás",
    "Rango de presupuesto",
    "Tus datos",
  ];

  return (
    <section className="contacto-form-wrap" id="form">
      <div className="container">
        <form className="form-card" onSubmit={handleSubmit}>
          <aside className="form-side">
            <div className="form-side-top">
              <span className="eyebrow">— {stepTitle}</span>
              <h3>Danos la información necesaria antes de responderte.</h3>
              <p>Cuatro pasos breves para que podamos revisar el problema, el momento de la empresa y el alcance antes de responder.</p>

              <div className="form-side-steps">
                {stepHints.map((h, i) => (
                  <div
                    key={i}
                    className={`form-side-step ${i < step ? "done" : ""} ${i === step && !sent ? "current" : ""}`}
                  >
                    <div className="step-dot">{i < step || sent ? "✓" : i + 1}</div>
                    <div>{h}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-side-channels">
              <a className="form-side-channel" href="mailto:info@medla-empresas.com"><IconMail /> info@medla-empresas.com</a>
              <a className="form-side-channel" href="tel:+34641576772"><IconPhone /> +34 641 576 772</a>
              <a className="form-side-channel" href="https://wa.me/34641576772"><IconWa /> WhatsApp directo</a>
            </div>
          </aside>

          <div className="form-body">
            {!sent && (
              <div className="form-progress">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div
                    key={i}
                    className={`form-progress-bar ${i < step ? "done" : ""} ${i === step ? "current" : ""}`}
                  />
                ))}
              </div>
            )}

            {!sent && step === 0 && (
              <div className="form-step">
                <div>
                  <div className="step-label">Paso 1 · {stepHints[0]}</div>
                  <h4 ref={questionRef} tabIndex="-1" id="contact-scope-question">¿En qué necesitas que te acompañemos? <span aria-hidden="true">*</span><span className="sr-only"> Selección obligatoria.</span></h4>
                  <p id="contact-scope-hint" style={{ color: "var(--text-mute)", fontSize: 14, marginTop: 8 }}>
                    Selecciona todas las líneas relevantes. Si aún no lo tienes claro, no pasa nada.
                  </p>
                </div>
                <div className="options-grid" role="group" aria-labelledby="contact-scope-question" aria-describedby="contact-scope-hint">
                  {ALCANCE_OPTIONS.map((o) => (
                    <button
                      key={o}
                      className={`opt-card ${data.alcance.includes(o) ? "selected" : ""}`}
                      aria-pressed={data.alcance.includes(o)}
                      onClick={() => toggleAlcance(o)}
                      type="button"
                    >
                      <span>{o}</span>
                      <span className="opt-check"></span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!sent && step === 1 && (
              <div className="form-step">
                <div>
                  <div className="step-label">Paso 2 · {stepHints[1]}</div>
                  <h4 ref={questionRef} tabIndex="-1" id="contact-stage-question">¿En qué etapa está tu empresa? <span aria-hidden="true">*</span><span className="sr-only"> Selección obligatoria.</span></h4>
                  <p id="contact-stage-hint" style={{ color: "var(--text-mute)", fontSize: 14, marginTop: 8 }}>Selecciona una opción para continuar.</p>
                </div>
                <div className="options-grid" role="group" aria-labelledby="contact-stage-question" aria-describedby="contact-stage-hint">
                  {ETAPA_OPTIONS.map((o) => (
                    <button
                      key={o}
                      className={`opt-card ${data.etapa === o ? "selected" : ""}`}
                      aria-pressed={data.etapa === o}
                      onClick={() => setEtapa(o)}
                      type="button"
                    >
                      <span>{o}</span>
                      <span className="opt-check"></span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!sent && step === 2 && (
              <div className="form-step">
                <div>
                  <div className="step-label">Paso 3 · {stepHints[2]}</div>
                  <h4 ref={questionRef} tabIndex="-1">¿Qué rango de presupuesto contemplas?</h4>
                  <p style={{ color: "var(--text-mute)", fontSize: 14, marginTop: 8 }}>
                    Nos ayuda a orientar el alcance. Si aún no está definido, puedes indicarlo.
                  </p>
                </div>
                <div className="slider-wrap">
                  <div className="slider-value">
                    {data.presupuestoIdx > 0 && <em>€</em>} {PRESUPUESTO_LABELS[data.presupuestoIdx].label}
                  </div>
                  <input
                    type="range"
                    aria-label="Rango de presupuesto"
                    aria-valuetext={PRESUPUESTO_LABELS[data.presupuestoIdx].label}
                    min="0"
                    max={PRESUPUESTO_LABELS.length - 1}
                    step="1"
                    value={data.presupuestoIdx}
                    onChange={(e) => setField("presupuestoIdx", parseInt(e.target.value))}
                  />
                  <div className="slider-ticks">
                    <span>A definir</span>
                    <span>1–3K</span>
                    <span>3–8K</span>
                    <span>8–15K</span>
                    <span>15–30K</span>
                    <span>30K+</span>
                  </div>
                  <div className="slider-note">
                    <p><span>Referencia inicial</span> No es una cotización ni compromete un alcance.</p>
                    <p><span>Antes de empezar</span> Entregables, calendario y condiciones quedan por escrito.</p>
                  </div>
                </div>
              </div>
            )}

            {!sent && step === 3 && (
              <div className="form-step">
                <div>
                  <div className="step-label">Paso 4 · {stepHints[3]}</div>
                  <h4 ref={questionRef} tabIndex="-1">¿Cómo te contactamos?</h4>
                </div>
                <div className="fields-row">
                  <div className="field">
                    <label htmlFor="contact-name">Nombre *</label>
                    <input id="contact-name" type="text" required autoComplete="name" value={data.nombre} onChange={(e) => setField("nombre", e.target.value)} placeholder="Nombre y apellidos" />
                  </div>
                  <div className="field">
                    <label htmlFor="contact-company">Empresa</label>
                    <input id="contact-company" type="text" autoComplete="organization" value={data.empresa} onChange={(e) => setField("empresa", e.target.value)} placeholder="Nombre comercial" />
                  </div>
                </div>
                <div className="fields-row">
                  <div className="field">
                    <label htmlFor="contact-email">Email *</label>
                    <input id="contact-email" type="email" required autoComplete="email" value={data.email} onChange={(e) => setField("email", e.target.value)} placeholder="tu@empresa.com" />
                  </div>
                  <div className="field">
                    <label htmlFor="contact-phone">Teléfono</label>
                    <input id="contact-phone" type="tel" autoComplete="tel" value={data.telefono} onChange={(e) => setField("telefono", e.target.value)} placeholder="+34…" />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="contact-notes">Notas (opcional)</label>
                  <textarea id="contact-notes" value={data.notas} onChange={(e) => setField("notas", e.target.value)} placeholder="Cuéntanos el contexto: objetivo, urgencia, cualquier detalle útil…" />
                </div>
                <div className="contact-honeypot" aria-hidden="true">
                  <label htmlFor="contact-website">Tu web</label>
                  <input id="contact-website" type="text" tabIndex="-1" autoComplete="off" value={data.website} onChange={(event) => setField("website", event.target.value)} />
                </div>
                <div className="privacy-consent">
                  <input
                    id="contact-privacy"
                    type="checkbox"
                    required
                    checked={privacyAccepted}
                    onChange={(event) => setPrivacyAccepted(event.target.checked)}
                  />
                  <label htmlFor="contact-privacy">
                    He leído y acepto la <a href="privacidad.html" target="_blank" rel="noopener noreferrer">política de privacidad</a> y consiento el tratamiento de mis datos para responder a esta solicitud.
                  </label>
                </div>
              </div>
            )}

            {sent && (
              <div className="form-success" role="status" aria-live="polite">
                <div className="success-ring">
                  <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                    <path className="success-check" d="M 12 26 L 22 35 L 38 17" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3>Mensaje enviado, {data.nombre.split(" ")[0] || "gracias"}.</h3>
                <p>Hemos recibido el contexto. Una persona del equipo lo revisará antes de responder.</p>
                <div className="hero-ctas">
                  <a href="servicios.html" className="btn btn-primary">Explorar servicios <span className="arr">→</span></a>
                  <a href="index.html" className="btn btn-ghost">Volver al inicio</a>
                </div>
              </div>
            )}

            {!sent && (
              <div className="form-nav">
                <button type="button" className="btn-link" onClick={back} disabled={step === 0 || sending}>← Anterior</button>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                  {sendError && (
                    <span role="alert" style={{ fontSize: 13, color: "#c0392b" }}>{sendError}</span>
                  )}
                  <button
                    type={step === totalSteps - 1 ? "submit" : "button"}
                    className="btn btn-primary"
                    onClick={step === totalSteps - 1 ? undefined : next}
                    disabled={sending || (step < totalSteps - 1 && !canAdvance)}
                    style={{
                      opacity: !sending && (step === totalSteps - 1 || canAdvance) ? 1 : 0.4,
                      cursor: !sending && (step === totalSteps - 1 || canAdvance) ? "pointer" : "default"
                    }}
                  >
                    {sending ? "Enviando…" : step === totalSteps - 1 ? "Enviar mensaje" : "Siguiente"} <span className="arr">→</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

/* ─────────── Info + Map ─────────── */
function CtInfo() {
  return (
    <section className="contacto-info">
      <div className="container">
        <div className="info-grid">
          <div className="info-text">
            <span className="eyebrow">— Canales directos</span>
            <h2 style={{ marginTop: 16 }}>También puedes <em>escribirnos directamente.</em></h2>
            <p className="lead" style={{ maxWidth: "44ch" }}>
              Para una pregunta concreta o para valorar si el caso encaja antes de formalizar una colaboración.
            </p>

            <div className="info-channels">
              <a className="info-channel" href="mailto:info@medla-empresas.com">
                <div className="info-channel-icon"><IconMail /></div>
                <div className="info-channel-body">
                  <div className="info-channel-label">Email</div>
                  <div className="info-channel-val">info@medla-empresas.com</div>
                </div>
                <span className="info-channel-arr">→</span>
              </a>
              <a className="info-channel" href="tel:+34641576772">
                <div className="info-channel-icon"><IconPhone /></div>
                <div className="info-channel-body">
                  <div className="info-channel-label">Teléfono</div>
                  <div className="info-channel-val">+34 641 576 772</div>
                </div>
                <span className="info-channel-arr">→</span>
              </a>
              <a className="info-channel" href="https://wa.me/34641576772">
                <div className="info-channel-icon"><IconWa /></div>
                <div className="info-channel-body">
                  <div className="info-channel-label">WhatsApp</div>
                  <div className="info-channel-val">Mensaje directo</div>
                </div>
                <span className="info-channel-arr">→</span>
              </a>
            </div>
          </div>

          <div className="map-card">
            <div className="map-visual">
              <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <pattern id="mapGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1A1A2E" strokeOpacity="0.04" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="400" height="400" fill="url(#mapGrid)" />
                {/* roads */}
                <path d="M 0 180 L 400 160" stroke="#C9A84C" strokeOpacity="0.15" strokeWidth="8" />
                <path d="M 0 180 L 400 160" stroke="#C9A84C" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="4 4" />
                <path d="M 220 0 L 180 400" stroke="#C9A84C" strokeOpacity="0.15" strokeWidth="6" />
                <path d="M 220 0 L 180 400" stroke="#C9A84C" strokeOpacity="0.45" strokeWidth="1.5" strokeDasharray="4 4" />
                <path d="M 40 60 Q 200 200 380 340" stroke="#1A1A2E" strokeOpacity="0.15" strokeWidth="6" fill="none" />
                <path d="M 40 60 Q 200 200 380 340" stroke="#1A1A2E" strokeOpacity="0.4" strokeWidth="1" fill="none" strokeDasharray="3 4" />
                {/* blocks */}
                <rect x="60" y="50" width="60" height="40" fill="#1A1A2E" opacity="0.05" />
                <rect x="130" y="60" width="40" height="50" fill="#1A1A2E" opacity="0.07" />
                <rect x="250" y="40" width="80" height="60" fill="#1A1A2E" opacity="0.06" />
                <rect x="50" y="230" width="90" height="70" fill="#1A1A2E" opacity="0.08" />
                <rect x="220" y="220" width="60" height="60" fill="#1A1A2E" opacity="0.07" />
                <rect x="290" y="260" width="70" height="50" fill="#1A1A2E" opacity="0.05" />
                <rect x="60" y="320" width="50" height="50" fill="#1A1A2E" opacity="0.06" />
                <rect x="280" y="100" width="40" height="60" fill="#1A1A2E" opacity="0.06" />
                {/* pin */}
                <g transform="translate(200, 175)">
                  <circle className="map-pin-pulse" r="26" fill="#C9A84C" opacity="0.15" />
                  <circle r="14" fill="#C9A84C" opacity="0.3" />
                  <g transform="translate(0, -6)">
                    <path d="M 0 -14 C -8 -14 -12 -8 -12 -2 C -12 6 0 18 0 18 C 0 18 12 6 12 -2 C 12 -8 8 -14 0 -14 Z" fill="#1A1A2E" />
                    <circle cy="-2" r="4" fill="#C9A84C" />
                  </g>
                </g>
              </svg>
            </div>
            <div className="map-card-body">
              <span className="lbl">Base operativa</span>
              <span className="addr">Madrid, España</span>
              <span className="hours">Trabajo remoto · reuniones coordinadas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── FAQ ─────────── */
const FAQS = [
  {
    q: "¿Cómo funciona la primera respuesta?",
    a: "Una persona del equipo revisa la información enviada y responde con contexto, preguntas concretas y un siguiente paso.",
  },
  {
    q: "¿Cómo se define el alcance?",
    a: "Partimos del contexto enviado, hacemos las preguntas necesarias y delimitamos el trabajo, los responsables y el siguiente paso antes de comenzar.",
  },
  {
    q: "¿Trabajan con equipos fuera de España?",
    a: "El trabajo puede coordinarse de forma remota. La disponibilidad y, cuando aplique, la jurisdicción y los responsables locales se confirman durante la revisión inicial.",
  },
  {
    q: "¿Puedo activar una sola capacidad?",
    a: "Sí. Cada capacidad puede abordarse por separado. Cuando el problema cruza varias disciplinas, proponemos cómo coordinarlas y quién responde por cada parte.",
  },
  {
    q: "¿Cómo se acuerdan las condiciones?",
    a: "Antes de iniciar cualquier trabajo se presenta un alcance con entregables, responsables, calendario y condiciones económicas. La modalidad depende del tipo de intervención.",
  },
  {
    q: "¿Cómo comparto información sensible?",
    a: "No la incluyas en el primer formulario. Indica que existe documentación sensible y acordaremos el canal y las condiciones de intercambio antes de recibirla.",
  },
];

function CtFAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="contacto-faq">
      <div className="container">
        <div className="section-head" style={{ textAlign: "center", margin: "0 auto" }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>— Preguntas frecuentes</span>
          <h2 style={{ margin: "12px auto 0" }}>Antes de escribir, quizá <em>ya lo respondimos</em>.</h2>
        </div>
        <div className="faq-grid">
          {FAQS.map((f, i) => (
            <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
              <button
                className="faq-q"
                type="button"
                id={`faq-question-${i}`}
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                {f.q} <span className="faq-plus" aria-hidden="true">+</span>
              </button>
              <div
                className="faq-a"
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-question-${i}`}
                aria-hidden={open !== i}
                hidden={open !== i}
              >
                {f.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Footer (reused) ─────────── */
function CtFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="index.html"><img src="logo.png" alt="MEDLA Empresas" style={{height: 72, display: "block", marginBottom: 16}} /></a>
            <p>Contratos, procesos y herramientas con responsables y próximos pasos claros.</p>
          </div>
          <div>
            <h4>Servicios</h4>
            <ul>
              <li><a href="asesoria-legal.html">Asesoría legal</a></li>
              <li><a href="redes-sociales.html">Comunicación</a></li>
              <li><a href="jotform.html">Soluciones Jotform</a></li>
            </ul>
          </div>
          <div>
            <h4>Empresa</h4>
            <ul>
              <li><a href="nosotros.html">Nosotros</a></li>
              <li><a href="blog.html">Cuadernos</a></li>
              <li><a href="contacto.html">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4>Contacto</h4>
            <ul>
              <li><a href="mailto:info@medla-empresas.com">info@medla-empresas.com</a></li>
              <li><a href="tel:+34641576772">+34 641 576 772</a></li>
              <li>Madrid, España</li>
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
          <span>© 2026 MEDLA empresas. Todos los derechos reservados.</span>
          <span><a href="privacidad.html">Privacidad</a> · Madrid, España</span>
        </div>
      </div>
    </footer>
  );
}

/* ─────────── App ─────────── */
function ContactoApp() {
  const [path, setPath] = useState("diagnostico");
  return (
    <div className="contacto-page">
      <CtNav />
      <main id="contenido">
        <CtHero />
        <CtPaths active={path} onPick={setPath} />
        <CtForm pathId={path} />
        <CtInfo />
        <CtFAQ />
      </main>
      <CtFooter />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ContactoApp />);
