const { existsSync } = require('node:fs');
const { defineConfig } = require('cypress');

// Optional local settings: copy .env.example to .env. Empty values fall back to the defaults below.
if (existsSync('.env')) process.loadEnvFile('.env');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    reportPageTitle: 'Cypress UI Automation Report',
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  e2e: {
    baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
    viewportWidth: 1280,
    viewportHeight: 800,
    defaultCommandTimeout: 8000,
    video: false,
    screenshotOnRunFailure: true,
    retries: { runMode: 1, openMode: 0 },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
});
