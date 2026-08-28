import { build } from "esbuild";

const javascript = [
  { entryPoints: ["app.jsx"], outfile: "app.js" },
  { entryPoints: ["contacto.jsx"], outfile: "contacto.js" },
  { entryPoints: ["servicios-entry.jsx"], outfile: "servicios.js", bundle: true },
  { entryPoints: ["nosotros.jsx"], outfile: "nosotros.js" },
  { entryPoints: ["blog.jsx"], outfile: "blog.js" },
  { entryPoints: ["specialty.jsx"], outfile: "specialty.js" },
];

const styles = [
  { entryPoints: ["home-premium.css"], outfile: "home-premium.min.css" },
  { entryPoints: ["specialty.css"], outfile: "specialty.min.css" },
  { entryPoints: ["privacy-entry.css"], outfile: "privacy.min.css", bundle: true },
];

await Promise.all([
  ...javascript.map((options) => build({
    ...options,
    format: "iife",
    minify: true,
    target: "es2018",
    logLevel: "silent",
  })),
  ...styles.map((options) => build({
    ...options,
    minify: true,
    logLevel: "silent",
  })),
]);

process.stdout.write("build: ok (6 bundles JS, 3 bundles CSS)\n");
