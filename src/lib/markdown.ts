import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeMathjax from "rehype-mathjax";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

export type Module = "gfm" | "math" | "code" | "sanitize";

export default async function markdown(content: string, modules?: Module[]): Promise<string> {
  function module(name: Module): boolean {
    return modules?.includes(name) ?? false;
  }

  const processor = unified().use(remarkParse);
  if (module("gfm")) processor.use(remarkGfm);
  if (module("math")) processor.use(remarkMath);

  processor.use(remarkRehype);
  if (module("sanitize")) processor.use(rehypeSanitize);
  if (module("math")) processor.use(rehypeMathjax);
  if (module("code")) processor.use(rehypeHighlight);

  processor.use(rehypeStringify);

  return (await processor.process(content)).toString();
}
