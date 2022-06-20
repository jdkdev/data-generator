
          // @ts-check - enable TS check for js file
          import { resolve } from 'path'
          import { minify } from 'html-minifier'
          import { defineConfig, loadEnv } from 'vite'
          import frontierPlugin from '@frontierjs/vite-plugin-frontier'
          import { config as envConfig } from 'dotenv'
          import svelteConfig from './svelte.config'
          const frontier = frontierPlugin.default

          import viteMainJs from 'vite-main-js'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import windicss from 'vite-plugin-windicss'
          
          const nodeEnv = process.env.NODE_ENV
          const root = resolve(__dirname, '../')

          // https://vitejs.dev/config/
          export default defineConfig(({ command, mode }) => {
            const env = loadEnv(mode, process.cwd(), '')
            const indexReplace = () => {
              return {
                name: 'html-transform',
                transformIndexHtml (html) {
                  return minify(html, {
                    collapseWhitespace: true
                  })
                }
              }
            }
            const isProduction = mode === 'production'
            return {
  server: {
    open: false,
    port: process.env.PORT || 8000,
    host: !!process.env.VITE_HOST_APP,
    hmr: {
      overlay: true
    }
  },
  build: {
    polyfillDynamicImport: false,
    cssCodeSplit: false,
    minify: isProduction
  },
  resolve: {
    alias: {
      '@': resolve(root, '/src')
    }
  },
  plugins: [
    frontier({
        root,
        nodeEnv: process.env.NODE_ENV || 'development',
        exampleData: {}
      }),
    viteMainJs(),
    svelte(svelteConfig),
    indexReplace(),
    windicss({
  config: './config/windi.config.js'
})
  ]
}
        })
        