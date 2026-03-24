import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
// @ts-ignore
import { publishServerPlugin } from "./vite-plugin-publish-server.js"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), publishServerPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
