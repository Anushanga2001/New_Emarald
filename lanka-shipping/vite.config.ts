import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Use relative base path for GitHub Pages compatibility
  // For custom domain or root deployment, this can be changed to '/'
  base: process.env.VITE_BASE_PATH || '/',
})
