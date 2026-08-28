"use strict";

const assert = require("node:assert/strict");

process.env.HIGHLEVEL_WEBHOOK_URL = "https://example.invalid/webhook";
const contactHandler = require("./contact");

function request(method, body, address) {
  return {
    method,
    body,
    headers: { "x-forwarded-for": address },
    socket: {},
  };
}

function response() {
  return {
    headers: {},
    statusCode: 200,
    body: null,
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
  };
}

async function run() {
  const providerCalls = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, options) => {
    providerCalls.push({ url, options });
    return { ok: true, status: 200 };
  };

  try {
    const methodResponse = response();
    await contactHandler(request("GET", {}, "192.0.2.1"), methodResponse);
    assert.equal(methodResponse.statusCode, 405);
    assert.equal(methodResponse.headers.Allow, "POST");

    const invalidResponse = response();
    await contactHandler(request("POST", { nombre: "A" }, "192.0.2.2"), invalidResponse);
    assert.equal(invalidResponse.statusCode, 400);

    const honeypotResponse = response();
    await contactHandler(request("POST", { website: "robot.example" }, "192.0.2.3"), honeypotResponse);
    assert.equal(honeypotResponse.statusCode, 200);
    assert.equal(providerCalls.length, 0);

    const validPayload = {
      tipo_contacto: "diagnostico",
      nombre: "Ana Pérez",
      empresa: "Empresa de prueba",
      email: "ana@example.com",
      telefono: "+34 600 000 000",
      alcance: ["Digitalización de procesos", "IA aplicada"],
      etapa_empresa: "Pyme en crecimiento",
      rango_presupuesto: "8K – 15K",
      notas: "Necesitamos revisar un proceso.",
      consentimiento_privacidad: true,
      version_privacidad: "2026-08-28",
      website: "",
    };
    const validResponse = response();
    await contactHandler(request("POST", validPayload, "192.0.2.4"), validResponse);
    assert.equal(validResponse.statusCode, 200);
    assert.equal(providerCalls.length, 1);

    const forwarded = JSON.parse(providerCalls[0].options.body);
    assert.equal(providerCalls[0].url, process.env.HIGHLEVEL_WEBHOOK_URL);
    assert.equal(forwarded.alcance, "Digitalización de procesos, IA aplicada");
    assert.equal(forwarded.email, "ana@example.com");
    assert.equal(Object.hasOwn(forwarded, "website"), false);
    assert.equal(Object.hasOwn(forwarded, "ip"), false);
    assert.match(forwarded.fecha, /^\d{4}-\d{2}-\d{2}T/);

    let limitedResponse;
    for (let attempt = 0; attempt < 6; attempt += 1) {
      limitedResponse = response();
      await contactHandler(request("POST", {}, "192.0.2.5"), limitedResponse);
    }
    assert.equal(limitedResponse.statusCode, 429);
    assert.equal(providerCalls.length, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
}

run().then(
  () => process.stdout.write("contact api: ok\n"),
  (error) => {
    process.stderr.write(`${error.stack || error}\n`);
    process.exitCode = 1;
  },
);
