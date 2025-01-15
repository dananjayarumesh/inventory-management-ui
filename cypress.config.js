import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
  video: true,
  e2e: {
    baseUrl: 'http://inventory-management-ui.local:5900',
    // eslint-disable-next-line no-unused-vars
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
