import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: process.env.VITE_PORT,
  },

  plugins: [react()],

  build: {
    // generate manifest.json in outDir
    manifest: true,

    rollupOptions: {
      // https://rollupjs.org/configuration-options/

      // overwrite default .html entry
      input: 'js/app.js',

      output: {
        // entryFileNames: "assets/[name]-[hash].js", // default value in Vite
        // exclude hash from filenames since Django and Whitenoise handle cache-busting
        // exclude 'assets/' prefix since we don't need it here either
        entryFileNames: "[name].js",
      },
    },
  },
})
