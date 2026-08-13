import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './playwright',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  reporter: 'html',
  use: {
    headless: true, // Roda em segundo plano (sem abrir a janela do navegador)
    actionTimeout: 70000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});