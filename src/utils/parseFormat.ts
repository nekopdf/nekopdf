import { formats } from "../lib/formats";

export type FullFormat = [string, string];
export type FormatArray = string[];

export function parseFormat(format: string | FormatArray): FullFormat {
  if (typeof format === "string") {
    if (format in formats) {
      return parseFormatArray(formats[format]);
    } else {
      if (format.includes(",")) {
        return format.split(",") as FullFormat;
      } else {
        return [format, format];
      }
    }
  } else {
    return parseFormatArray(format);
  }
}

export function parseFormatArray(format: FormatArray): FullFormat {
  if (format.length === 0) {
    return formats.a4 as FullFormat;
  } else if (format.length === 1) {
    return [format[0], format[0]];
  } else if (format.length === 2) {
    return [format[0], format[1]];
  } else {
    return format.slice(0, 2) as FullFormat;
  }
}
