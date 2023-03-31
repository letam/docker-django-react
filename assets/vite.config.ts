import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: process.env.VITE_PORT,
  },

  plugins: [
    react(),
    splitVendorChunkPlugin(),
  ],

  build: {
    // generate manifest.json in outDir
    manifest: true,

    rollupOptions: {
      // https://rollupjs.org/configuration-options/

      // overwrite default .html entry
      input: 'src/main.tsx',

      output: {
        // Exclude 'assets/' prefix from file names since it's redundant.

        // Exclude hash from names for "entry" and "asset" files since Django
        // itself will add a hash to the file names for use in HTML templates.

        // entryFileNames: "assets/[name]-[hash].js", // default value in Vite
        entryFileNames: "[name].js",

        // assetFileNames: "assets/[name]-[hash].[ext]", // default value in Vite
        assetFileNames: "[name].[ext]",

        // Note that we include the hash for chunk files since they are 
        // imported by other JS files and not by Django HTML templates.
        // chunkFileNames: 'assets/[name]-[hash].js', // default value in Vite
        chunkFileNames: '[name]-[hash].js',
      },
    },
  },
})
