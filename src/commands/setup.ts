import { defineCommand } from "clerc";
import task from "tasuku";
import { exec } from "node:child_process";

export const setupCommand = defineCommand(
  {
    name: "setup",
    description: "Setup nekopdf for first time use",
  },
  async () => {
    await task("Installing Chromium for PDF Generation (this may take a few minutes)", async () => {
      return new Promise<void>((resolve) => {
        // Run `npx playwright install chromium`:
        exec("npx playwright install chromium", (error, stdout, stderr) => {
          if (error) {
            throw error;
          }
          if (stderr) {
            throw new Error(stderr);
          }
          resolve();
        });
      });
    });
  },
);
