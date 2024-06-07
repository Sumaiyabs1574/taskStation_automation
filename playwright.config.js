// @ts-check
const { defineConfig, devices } = require("@playwright/test");

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: "https://sbueurope.mytask.today/",
    headless: false,
    bypassCSP: false,
    screenshot: "on",
    video: "retain-on-failure",
    // viewport: { width: 1536, height: 730 },
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    { name: "setup", testMatch: /.*\.setup\.js/ },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "testData/.authentication/auth.json",
        viewport: { width: 1536, height: 730 },
      },
      dependencies: ["setup"],
    },
  ],
});
