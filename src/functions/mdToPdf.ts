import { htmlToPdf, mdToHtml } from ".";
import { Options } from "../interfaces";
import fs from "fs";

export async function mdToPdf(mdPath: string, options?: Options, keepHtml = false): Promise<string> {
  const htmlPath = mdToHtml(mdPath, options);
  const pdfPath = await htmlToPdf(htmlPath, options);
  if (!keepHtml) fs.rmSync(htmlPath);
  return pdfPath;
}
