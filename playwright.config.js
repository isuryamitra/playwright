// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',          // folder containing your test files
  timeout: 50000,               // max time per test
  retries: 1,                   // retry failed tests
  reporter: [['html'], ['allure-playwright']], // terminal + Allure
  use: {
    headless: true,            // run browser in headed mode for debugging
    viewport: null,
    launchOptions:
    {
      args: ['--start-maximized']
    },
    actionTimeout: 10000,
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    outputDir: './test-results',  // screenshot on
    video: 'retain-on-failure',
    trace: 'off'      // video on failure
  },
  projects: [
    {
      name: 'chromium'
      //use: { ...devices['Desktop Chrome'] },
    },
    // Add more projects if needed (firefox, webkit)
  ],
});
