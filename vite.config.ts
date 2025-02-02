import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: '0.0.0.0',  // Allow external access
    port: process.env.PORT || 5173,  // Use Render's assigned port
    strictPort: true,  // Prevent auto-changing ports
  },
});
