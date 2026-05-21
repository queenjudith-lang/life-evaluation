import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: false, // we provide custom manifest in public
      workbox: {
        globPatterns: ['**/*.{js,css,html,glb,hdr,json,png}']
      }
    })
  ],
  server: {
    open: true
  }
});