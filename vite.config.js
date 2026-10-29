import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { campusPulseApiMiddleware } from './server/apiMiddleware.js';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    campusPulseApiMiddleware(),
  ],
  server: {
    port: 3000,
    open: false,
    host: true,
    watch: {
      ignored: ['**/data/**', '**/data/database.json', '**/*.jsonl', '**/tests/**'],
    },
  },
});
