import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from "@originjs/vite-plugin-federation"
import topLevelAwait from "vite-plugin-top-level-await"
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: "subpage1",
      filename: "remoteEntry.js",
      exposes: {
        "./TestButton": "./src/components/TestButton.ts",
      },
      shared: {
        vue: {
          generate: false,
        },
        pinia: {
          generate: false,
        }
      },
    }),
    tsconfigPaths(),
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: "__tla",
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: i => `__tla_${i}`
    })
  ],
  build: {
    assetsInlineLimit: 40960,
    minify: true,
    cssCodeSplit: false,
    sourcemap: true,
    rollupOptions: {
      output: {
        minifyInternalExports: false
      }
    }
  }
})
