import { PaperFormat } from "puppeteer";

interface Options {
  template?: string;
  theme?: string;
  scale?: number;
  format?: PaperFormat;
  suffix?: string;
}

export { Options };
