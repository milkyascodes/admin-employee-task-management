// vite.config.js
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
// Add framework-specific plugins if needed (e.g., import react from '@vitejs/plugin-react';)

export default defineConfig({
  plugins: [
    // Add other plugins first (e.g., react()),
    tailwindcss(),
  ],
});
