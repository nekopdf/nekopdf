import playwright from "playwright";
import { formats } from "./formats";
import { MarginArray, parseMargin } from "../utils/parseMargin";
import { FormatArray, parseFormat } from "../utils/parseFormat";

export type PdfOptions = {
  format?: string | FormatArray;
  margin?: string | MarginArray;
  orientation?: "portrait" | "landscape";
};

export async function pdf(html: string, path: string, options: PdfOptions = {}) {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.setContent(html, { waitUntil: "networkidle" });

  const format = parseFormat(options.format || "a4");
  const margins = parseMargin(options.margin || "medium");
  const width = formats[format[0]];
  const height = formats[format[1]];

  await page.pdf({
    path,
    width: options.orientation === "landscape" ? height : width,
    height: options.orientation === "landscape" ? width : height,
    margin: {
      top: margins[0],
      right: margins[1],
      bottom: margins[2],
      left: margins[3],
    },
  });
  await browser.close();
  return;
}
