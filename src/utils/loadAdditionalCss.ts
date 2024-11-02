import fs from "node:fs";
import path from "node:path";

export function loadAdditionalCss(name: string): string | undefined {
  const filePath = path.join(__dirname, "..", "builtin", `${name}.css`);
  if (!fs.existsSync(path.resolve(filePath))) return;
  return fs.readFileSync(filePath, "utf-8");
}
