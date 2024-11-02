import { margins } from "../lib/margins";

export type FullMargin = [string, string, string, string];
export type MarginArray = string[];

export function parseMargin(margin: string | MarginArray): FullMargin {
  if (typeof margin === "string") {
    if (margin in margins) {
      return parseMarginArray(margins[margin]);
    } else {
      if (margin.includes(",")) {
        return margin.split(",") as FullMargin;
      } else {
        return [margin, margin, margin, margin];
      }
    }
  } else {
    return parseMarginArray(margin);
  }
}

export function parseMarginArray(margin: MarginArray): FullMargin {
  if (margin.length === 0) {
    return ["0", "0", "0", "0"];
  } else if (margin.length === 1) {
    return [margin[0], margin[0], margin[0], margin[0]];
  } else if (margin.length === 2) {
    return [margin[0], margin[1], margin[0], margin[1]];
  } else if (margin.length === 3) {
    return [margin[0], margin[1], margin[2], margin[1]];
  } else if (margin.length === 4) {
    return [margin[0], margin[1], margin[2], margin[3]];
  } else {
    return margin.slice(0, 4) as FullMargin;
  }
}
