import tailwind from 'tailwindcss'
import { VueUseComponentsResolver, VueUseDirectiveResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import path from "node:path"
import autoprefixer from 'autoprefixer'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [
    Components({

      resolvers: [
        VueUseComponentsResolver(),
        VueUseDirectiveResolver(),

        AutoImport({
          imports: [
            // presets
            'vue',
            'vue-router',
            {
              log: [
                ['default', 'log'],
              ],
            },
            {
              '@vueuse/core': [
                // named imports
                // alias
              ],
              'axios': [
                // default imports
                ['default', 'axios'], // import { default as axios } from 'axios',
              ],
            },
            // example type import
            {
              from: 'vue-router',
              imports: ['RouteLocationRaw'],
              type: true,
            },
          ],
          exclude: [
            '/[\\/]ui[\\/]/',

          ],
          defaultExportByFilename: true,
          injectAtEnd: true,
          viteOptimizeDeps: true,
          eslintrc: {

            globalsPropValue: true, // Para adicionar axiosI como global
            enabled: true, // <-- this
          },
        }),
        vue(),
      ],
      dts: true, // enabled by default if `typescript` is installed

    }),
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
