import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Деплой: GitHub Pages (https://<username>.github.io/<repo>/)
// Если сайт будет на custom domain или в корне (username.github.io) — замени '/' на ''
export default defineConfig({
  plugins: [react()],
  base: '/stas-bday/',
  server: {
    host: '0.0.0.0',
    port: 5173,
    // Разрешаем все хосты для совместимости с preview-окружением
    allowedHosts: true,
    strictPort: false,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
