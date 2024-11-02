import minimustache from "minimustache";
import markdown, { Module } from "./markdown";
import { pdf, PdfOptions } from "./pdf";

type AdditionalCssValue = string | undefined;

export class Neko {
  private markdown: string | null = null;
  private boilerplate: string | null = null;
  private template: string | null = null;
  private styles: string | null = null;
  private renderedMarkdown: string | null = null;
  private fullHtml: string | null = null;

  constructor() {}

  public setMarkdown(markdown: string): void {
    this.markdown = markdown;
  }

  public setBoilerplate(boilerplate: string): void {
    this.boilerplate = boilerplate;
  }

  public setTemplate(template: string): void {
    this.template = template;
  }

  public setStyles(styles: string): void {
    this.styles = styles;
  }

  public getCombinedMarkdown(): string {
    if (!this.markdown) throw new Error("No markdown provided");
    if (!this.boilerplate) return this.markdown;
    return minimustache(this.boilerplate, { content: this.markdown });
  }

  async renderMarkdown(modules: Module[]): Promise<void> {
    this.renderedMarkdown = await markdown(this.getCombinedMarkdown(), modules);
  }

  public injectAdditionalCss(styles: AdditionalCssValue[] | AdditionalCssValue): void {
    if (!this.styles) throw new Error("No styles provided");
    if (Array.isArray(styles)) {
      this.styles = styles.filter(Boolean).join("\n") + this.styles;
    } else if (styles) {
      this.styles = styles + this.styles;
    }
  }

  public assembleHtml() {
    if (!this.renderedMarkdown) throw new Error("No markdown rendered");
    if (!this.template) throw new Error("No template provided");
    if (!this.styles) throw new Error("No styles provided");

    this.fullHtml = minimustache(this.template, {
      content: this.renderedMarkdown,
      styles: `<style>${this.styles}</style>`,
    });
  }

  async createPdf(path: string, options: PdfOptions = {}): Promise<void> {
    if (!this.fullHtml) throw new Error("No HTML built");
    await pdf(this.fullHtml, path, options);
  }
}
