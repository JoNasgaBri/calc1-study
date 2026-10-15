import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          jsxgraph: ['jsxgraph'],
          katex: ['katex'],
          react: ['react', 'react-dom', 'react-router-dom', 'zustand'],
        },
      },
    },
  },
});
