/* ────────────────────────────────────────────
   로컬 개발용 /api/chat 서버

   Vercel 서버리스 함수(api/chat.js)를 그대로 가져다 쓰기 위한 얇은 래퍼입니다.
   배포에는 관여하지 않습니다 — 프로덕션에서는 Vercel 이 api/chat.js 를 직접 실행합니다.

   실행: npm run dev:api   (vite dev 서버와 별도 프로세스)
   vite.config.js 의 proxy 가 /api 요청을 이 포트로 넘깁니다.
   ──────────────────────────────────────────── */

import { createServer } from 'node:http'
import handler from './api/chat.js'

const PORT = Number(process.env.API_PORT ?? 3000)

/* Vercel 핸들러가 기대하는 res.status().json() 형태를 흉내냅니다. */
function shim(res) {
  res.status = code => { res.statusCode = code; return res }
  res.json = payload => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify(payload))
    return res
  }
  return res
}

const server = createServer(async (req, res) => {
  shim(res)

  const { pathname } = new URL(req.url, `http://${req.headers.host}`)
  if (pathname !== '/api/chat') {
    return res.status(404).json({ error: 'not_found' })
  }

  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  req.body = chunks.length ? Buffer.concat(chunks).toString('utf8') : ''

  try {
    await handler(req, res)
  } catch (err) {
    console.error('[dev-server] 핸들러 예외', err)
    if (!res.headersSent) res.status(500).json({ error: 'internal_error' })
  }
})

server.listen(PORT, () => {
  const keySet = Boolean(process.env.ANTHROPIC_API_KEY)
  console.log(`  /api/chat  →  http://localhost:${PORT}/api/chat`)
  console.log(`  ANTHROPIC_API_KEY  ${keySet ? '설정됨' : '없음 — .env 를 채우세요'}`)
})
