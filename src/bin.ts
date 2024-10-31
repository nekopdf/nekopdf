#!/usr/bin/env node
import { program } from "commander";
import fs from "fs";
import path from "path";
import { mdToHtml, mdToPdf } from "./lib";

const packageFile = JSON.parse(fs.readFileSync(path.join(__dirname, "../package.json"), "utf-8"));

program
  .version(packageFile.version)
  .description(packageFile.description)
  .name(packageFile.name)
  .argument("<file>", "input file")
  .option("--only-html", "only generate HTML file instead of PDF")
  .option("-h, --html", "also generate HTML file")
  .option("-n, --name <name>", "output file name")
  .option("-t, --theme <file>", "CSS theme name or file path")
  .option("-T, --template <file>", "HTML template name or file path")
  .option("-s, --scale <number>", "PDF scale")
  .option("-f, --format <string>", "PDF format")
  .option("--suffix <suffix>", "add suffix to output file name")
  .action(async (file, options) => {
    const markdownPath = path.resolve(process.cwd(), file);
    if (!markdownPath.endsWith(".md")) return console.error("Input file must be a Markdown file and end with .md.");
    if (!fs.existsSync(markdownPath)) return console.error("Input file does not exist.");
    console.log("Starting conversion of", markdownPath);
    if (options.onlyHtml) {
      const htmlPath = await mdToHtml(markdownPath, {
        theme: options.theme,
        template: options.template,
        scale: parseFloat(options.scale || "1.3"),
        format: options.format,
        suffix: options.suffix,
      });
      console.log("HTML file generated at", htmlPath);
    } else {
      const pdfPath = await mdToPdf(
        markdownPath,
        {
          template: options.template || "default",
          theme: options.theme || "default",
          scale: parseFloat(options.scale || "1.3"),
          format: options.format,
          suffix: options.suffix,
        },
        options.html,
      );
      console.log("Conversion complete. Output file:", pdfPath);
      if (options.html) console.log("HTML file generated at", markdownPath.replace(/\.md$/, ".html"));
    }
  });

program.parse(process.argv);
