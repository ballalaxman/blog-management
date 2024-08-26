import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["js-big-decimal"]
  },
  server: {
    proxy: {
      "/api": {
        target: "https://blog-management-backend-umber.vercel.app",
        changeOrigin: true
      }
    }
  }
});
