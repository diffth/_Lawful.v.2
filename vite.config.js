import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    watch: {
      ignored: ['**/doc/**', '**/*.md', '**/.git/**']
    },
    // 로컬 개발 시 /api/chat 은 dev-server.mjs 가 처리합니다 (npm run dev:api).
    // 프로덕션에서는 Vercel 이 api/chat.js 를 서버리스 함수로 실행하므로 이 설정은 무시됩니다.
    proxy: { '/api': 'http://localhost:3000' }
  },
  build: { outDir: 'dist', sourcemap: false }
})
