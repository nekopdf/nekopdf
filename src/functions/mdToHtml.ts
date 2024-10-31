import { marked } from "marked";
import markedKatex from "marked-katex-extension-ts";
import fs from "fs";
import path from "path";
import { Options } from "../lib";

export function mdToHtml(mdPath: string, options?: Options): string {
  const htmlPath = mdPath.replace(/\.md$/, `${options?.suffix || ""}.html`);
  const markdown = fs.readFileSync(mdPath, "utf-8");
  marked.setOptions({
    highlight: function (code, language) {
      const hljs = require("highlight.js");
      const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
      return hljs.highlight(validLanguage, code).value;
    },
    langPrefix: "hljs language-",
  });
  marked.use(markedKatex({ throwOnError: false }));
  const mdHtml = marked.parse(markdown);

  let htmlTemplatePath = "";
  if (options?.template) {
    htmlTemplatePath = path.resolve(process.cwd(), options.template);
    if (!fs.existsSync(htmlTemplatePath)) {
      htmlTemplatePath = path.join(__dirname, "../../templates", options.template + ".html");
    }
  } else {
    htmlTemplatePath = path.join(__dirname, "../../templates/default.html");
  }
  const htmlTemplate = fs.readFileSync(htmlTemplatePath, "utf-8");

  let themePath = "";
  if (options?.theme) {
    themePath = path.resolve(process.cwd(), options.theme);
    if (!fs.existsSync(themePath)) {
      themePath = path.join(__dirname, "../../themes", options.theme + ".css");
    }
  } else {
    themePath = path.join(__dirname, "../../themes/basic.css");
  }

  const html = htmlTemplate.replace("<!--{content}-->", mdHtml).replace("/*{style}*/", fs.readFileSync(themePath, "utf-8"));
  fs.writeFileSync(htmlPath, html);
  return htmlPath;
}
