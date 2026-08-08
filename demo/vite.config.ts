import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/tiny-banner-carousel/',
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
});
