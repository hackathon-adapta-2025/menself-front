import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    VitePWA({
      includeAssets: ["favicon.ico", "icons/*.jpg"],
      manifest: {
        name: "Menself",
        short_name: "Menself",
        description:
          "Seu coach pessoal de autocuidado masculino. Transforme vontade de mudança em ações práticas e personalizadas.",
        theme_color: "#2D3436",
        background_color: "#0F0F0F",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "icons/menself-icon.jpg",
            sizes: "192x192",
            type: "image/jpg",
            purpose: "any",
          },
          {
            src: "icons/menself-icon.jpg",
            sizes: "512x512",
            type: "image/jpg",
            purpose: "any",
          },
          {
            src: "icons/menself-icon.jpg",
            sizes: "192x192",
            type: "image/jpg",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
