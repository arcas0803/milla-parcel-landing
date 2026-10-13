import { defineConfig } from "@playwright/test";
const port = process.env.LANDING_PORT ?? "4322";
const url = process.env.LANDING_URL ?? "http://127.0.0.1:" + port + "/";
export default defineConfig({
  testDir: "./tests",
  workers: 1,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    headless: true,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
      : {},
  },
  webServer: {
    command:
      "python3 -m http.server " + port + " --bind 127.0.0.1 --directory dist",
    url,
    reuseExistingServer: !process.env.CI,
  },
});
