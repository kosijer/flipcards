import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Required for GitHub Pages: app is served at https://<user>.github.io/flipcards/
  base: '/flipcards/',
  plugins: [react()],
})
