import fs from "node:fs";
import path from "node:path";

const dataMap = {
  theme: {
    folderName: "themes",
    extension: ".css",
  },
  template: {
    folderName: "templates",
    extension: ".mustache",
  },
  boilerplate: {
    folderName: "boilerplates",
    extension: ".md",
  },
};

export function loadComponent(type: "theme" | "template" | "boilerplate", name: string) {
  if (fs.existsSync(path.resolve(name))) return fs.readFileSync(path.resolve(name), "utf-8");

  if (
    fs.existsSync(path.join(__dirname, "..", "builtin", dataMap[type].folderName, `${name}${dataMap[type].extension}`))
  ) {
    return fs.readFileSync(
      path.join(__dirname, "..", "builtin", dataMap[type].folderName, `${name}${dataMap[type].extension}`),
      "utf-8",
    );
  }

  throw new Error(`Could not find ${type} ${name}`);
}
