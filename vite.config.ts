import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: '0.0.0.0', // Allow external access
    port: process.env.PORT ? parseInt(process.env.PORT) : 4000, // Use Render's assigned port or default to 4000
    strictPort: true, // Prevent auto-changing ports
  },
  preview: {
    host: '0.0.0.0', // Allow external access
    port: process.env.PORT ? parseInt(process.env.PORT) : 4000, // Use Render's assigned port or default to 4000
  },
});
