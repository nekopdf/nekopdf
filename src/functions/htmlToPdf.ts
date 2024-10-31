import { Options } from "../lib";
import puppeteer from "puppeteer";

export async function htmlToPdf(htmlPath: string, options?: Options): Promise<string> {
  const pdfPath = htmlPath.replace(/\.html$/, ".pdf");

  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  await page.goto(`file://${htmlPath}`);

  await timeout(1000); // this is a hack to wait for the page to load properly (TODO: find a better way)

  await page.pdf({
    path: pdfPath,
    scale: options?.scale || 1.3,
    format: options?.format || "A4",
    margin: {
      top: 40,
      right: 80,
      bottom: 40,
      left: 80,
    },
    printBackground: true,
  });

  await browser.close();

  return pdfPath;
}

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
