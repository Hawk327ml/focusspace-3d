import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base: works on GitHub Pages (/focusspace-3d/) and Firebase Hosting root.
export default defineConfig({
  base: './',
  plugins: [react()],
});
