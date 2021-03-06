import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import styleImport from 'vite-plugin-style-import'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), styleImport({
    libs: [
      {
        libraryName: 'zarm',
        esModule: true,
        resolveStyle: (name) => {
          return `zarm/es/${name}/style/css`
        },
      }
    ]
  })],
  css: {
    modules: {
      localsConvention: 'dashesOnly' //防止自定义样式名重复
    },
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'utils': path.resolve(__dirname, 'src/utils'),
      'config': path.resolve(__dirname, 'src/config') // src 路径
    }
  },
  server: {
    proxy: {
      '/api': {
        // 当遇到 /api 路径时，将其转换成 target 的值
        // target: 'http://api.chennick.wang/api/',
        target: 'http://127.0.0.1:7001/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '') // 将 /api 重写为空
      }
    }
  }
})
