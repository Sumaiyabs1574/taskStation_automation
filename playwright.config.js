const { defineConfig, devices } = require('@playwright/test');



/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  use: {
    storageState: 'storageState.json',
    baseURL: "https://sbueurope.mytask.today/",
    headless: false,
    bypassCSP:false,
    viewport: { width: 1536, height: 730 },
    screenshot: "on",
    video: "on",
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
      viewport: { width: 1536, height: 730 },

       },
    },

    
  ],
  reporter: [
    ["dot"],
    ["allure-playwright"],
  [
    "json",
    {
      outputFile: "jsonReport/jsonReport.json",
    },
  ],
  [
    "html",
    {
      outputFile: "htmlReport/htmlReport.html",
      open: "never",
    },
  ],]

  

  
});

