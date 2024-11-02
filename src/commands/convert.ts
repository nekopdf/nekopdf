import { defineCommand } from "clerc";
import path from "node:path";
import { loadComponent } from "../utils/loadComponent";
import { Neko } from "../lib/Neko";
import fs from "node:fs";
import task from "tasuku";
import { loadAdditionalCss } from "../utils/loadAdditionalCss";

export const convertCommand = defineCommand(
  {
    name: "convert",
    description: "Convert markdown to PDF",
    parameters: ["<input>", "[output]"],
    flags: {
      theme: {
        type: String,
        description: "Theme to use",
        alias: "t",
        default: "default",
      },
      template: {
        type: String,
        description: "Template to use",
        alias: "e",
        default: "default",
      },
      boilerplate: {
        type: String,
        description: "Boilerplate to use",
        alias: "b",
        default: "default",
      },
      format: {
        type: String,
        description: "Format to use",
        alias: "f",
        default: "a4",
      },
      margins: {
        type: String,
        description: "Margins to use",
        alias: "m",
        default: "medium",
      },
      orientation: {
        type: String,
        description: "Orientation to use",
        alias: "o",
        default: "portrait",
      },
      modules: {
        type: String,
        description: "remark/rehype plugins to use",
        alias: "x",
        default: "",
      },
    },
  },
  async ({ parameters, flags }) => {
    if (!parameters.output) {
      const parsedPath = path.parse(parameters.input);
      parameters.output = path.join(parsedPath.dir, parsedPath.name + ".pdf");
    }

    parameters.input = path.resolve(parameters.input);
    parameters.output = path.resolve(parameters.output);

    const inputFile = fs.readFileSync(parameters.input, "utf-8");

    const styles = loadComponent("theme", flags.theme);
    const template = loadComponent("template", flags.template);
    const boilerplate = loadComponent("boilerplate", flags.boilerplate);

    const neko = new Neko();
    neko.setMarkdown(inputFile);
    neko.setStyles(styles);
    neko.setTemplate(template);
    neko.setBoilerplate(boilerplate);

    neko.injectAdditionalCss([loadAdditionalCss("variables")]);

    await task("Rendering markdown", async () => {
      await neko.renderMarkdown([]);
    });

    neko.assembleHtml();

    await task("Creating PDF", async () => {
      await neko
        .createPdf(parameters.output, {
          format: flags.format,
          margin: flags.margins,
          orientation: flags.orientation as "portrait" | "landscape",
        })
        .catch((error) => {
          if (error.message.includes("Executable doesn't exist")) {
            throw new Error("nekopdf is not fully set up yet. Please run `nekopdf setup`.");
          } else {
            throw error;
          }
        });
    });
  },
);
