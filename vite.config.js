import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// elementPlus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// elementPlus-icon
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),

    // elementPlus
    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: false // 避免 npm run dev，根目录自动生成 auto-imports.d.ts
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),

        // 自动注册图标组件
        IconsResolver({
          // 修改Icon组件前缀
          // 不设置则默认为i     e.g. i-ep-Bell
          // 禁用则设置为false   e.g. ep-Bell
          prefix: false,

          enabledCollections: ['ep'] // 指定启用的图标集合
        })
      ],
      dts: false // 避免 npm run dev，根目录自动生成 components.d.ts
    }),
    Icons({
      autoInstall: true // 自动安装图标组件
    })
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  server: {
    host: '0.0.0.0',
    port: 3000, // 指定端口号
    open: true
  },

  build: {
    target: 'esnext', // 支持顶级 await

    outDir: `dist/integrated_platform`, // 设置输出目录

    // 打包按资源类型分文件夹
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name].[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  }
})
