#!/usr/bin/env node
import { Clerc, friendlyErrorPlugin, helpPlugin, notFoundPlugin, versionPlugin } from "clerc";
import fs from "node:fs";
import path from "node:path";
import { convertCommand } from "./commands/convert";
import { setupCommand } from "./commands/setup";

const pkg = fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf-8");
const { name, description, version } = JSON.parse(pkg);

Clerc.create()
  .scriptName(name)
  .description(description)
  .version(version)

  .use(helpPlugin({ flag: false }))
  .use(friendlyErrorPlugin())
  .use(notFoundPlugin())

  .flag("version", "Show version information", {
    alias: "v",
    type: Boolean,
    default: false,
  })

  .interceptor({
    enforce: "pre",
    fn: (context, next) => {
      if (context.flags.version) {
        const pkg = fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf-8");
        const { name, version } = JSON.parse(pkg);
        console.log(`${name} v${version}`);
      } else {
        next();
      }
    },
  })

  .command(convertCommand)
  .command(setupCommand)

  .parse();
