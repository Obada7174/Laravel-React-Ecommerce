import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  preview: {
    port: 3005,
    strictPort: true,
    host: true,
    allowedHosts: [
      'localhost',
      'ecommerce.obada-almaghribi.com',
      '.obada-almaghribi.com', // Allow all subdomains
    ],
  },
})
