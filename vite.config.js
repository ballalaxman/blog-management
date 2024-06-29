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
        target: "http://192.168.1.27:5000",
        changeOrigin: true
      }
    }
  }
});
