import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from "@originjs/vite-plugin-federation"
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: "unientry",
      filename: "remoteEntry.js",
      remotes: {
        'css-modules': 'http://localhost:5003/assets/remoteEntry.js'
      },
      shared: {
        vue: {
        },
        pinia: {
        },
      },
    }),
    tsconfigPaths(),
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        minifyInternalExports: false
      }
    }
  }
})
