/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const targetUrl = process.env.VITE_API_BASE_URL;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["js-big-decimal"]
  },
  server: {
    proxy: {
      "/api": {
        target: targetUrl,
        changeOrigin: true
      }
    }
  }
});
