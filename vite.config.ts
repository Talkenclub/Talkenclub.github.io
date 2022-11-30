import { defineConfig, loadEnv, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv) => {
  //检查process.cwd()路径下.env.development.local、.env.development、.env.local、.env这四个环境文件
	const env = loadEnv(mode.mode, process.cwd());
  // console.log(env,'-----------env-----------')
  return {
    // vite代理配置
    server: {
      host: '0.0.0.0',
      port: 3000,
      proxy: {
        '^/api': {
          target: env.VITE_APP_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    },
    plugins: [vue()]
  }
})
