import { defineConfig } from "tsup";

export default defineConfig([
  // Configuration for the CLI build
  {
    entry: ["src/cli.ts"],
    outDir: "dist",
    format: ["esm"],
    target: "node20",
    shims: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    dts: false,
    minify: true,
    onSuccess: "chmod +x dist/cli.js", // Make it executable
  },
  // Configuration for the library build
  {
    entry: ["src/lib.ts"],
    outDir: "dist",
    format: ["esm", "cjs"], // Library should be usable in both ESM and CommonJS
    target: "node20",
    sourcemap: true,
    clean: false,
    dts: true, // Generate TypeScript declarations for the library
  },
]);
