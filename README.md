# Lawful — AI 법률 상담

React + Vite 기반 프론트엔드. 배포 주소: https://www.lawful.co.kr

AI가 일반 법률 정보를 안내하고 상담 유형을 분류한 뒤, 개별 판단이 필요한 지점에서 소속 변호사 상담으로 연결하는 구조입니다.

## 실행

```bash
npm install
npm run dev        # http://localhost:5173  프론트
npm run dev:api    # http://localhost:3000  /api/chat (별도 터미널)
npm run build      # dist/ 생성
npm run preview
```

`/api/chat` 은 배포 시 Vercel 서버리스 함수로 실행되므로 `npm run dev` 만으로는 동작하지 않습니다.
로컬에서는 `npm run dev:api` 가 `dev-server.mjs` 로 같은 핸들러를 띄우고,
`vite.config.js` 의 proxy 가 `/api` 요청을 그쪽으로 넘깁니다. `.env` 에 `ANTHROPIC_API_KEY` 가 필요합니다.
(`vercel dev` 를 써도 되지만 Vercel 로그인과 프로젝트 연결이 필요합니다.)

## 환경변수

`.env.example` 을 `.env` 로 복사한 뒤 채웁니다.

| 키 | 위치 | 설명 |
|---|---|---|
| `ANTHROPIC_API_KEY` | 서버 전용 | Anthropic API 키. **`VITE_` 접두어를 붙이면 번들에 노출됩니다.** |
| `VITE_CHAT_ENDPOINT` | 선택 | 챗 엔드포인트를 바꿀 때만. 기본값 `/api/chat` |

## 구조

```
api/chat.js              Anthropic API 프록시 (시스템 프롬프트를 서버에서 고정)
dev-server.mjs           로컬 개발용 /api 서버 — api/chat.js 를 감싸는 래퍼 (배포와 무관)
src/config.js            챗 엔드포인트, 시스템 프롬프트, 이스케이프 패턴
src/data/site.js         브랜드·변호사·아티클 목록·요금 — 운영 정보는 여기만 수정
src/data/articles.js     아카이브 본문. site.js 의 ARTICLES 와 id 로 대응
src/components/
  ChatPanel.jsx          챗봇 (ref 로 send 노출)
  Doc.jsx                방주(§ 주석) + 본문 2단 레이아웃
  LegalModal.jsx         약관·개인정보처리방침·면책조항
src/pages/               홈 / 상담 / 소개 / 변호사 / 정보 / 요금 / 신청
  Article.jsx            아카이브 개별 글 (/library/:id)
src/styles/global.css    디자인 토큰과 전체 스타일
```

### 아카이브에 글 추가하기

1. `src/data/site.js` 의 `ARTICLES` 에 목록 항목(id, cat, title, desc, date, read)을 추가
2. `src/data/articles.js` 의 `BODIES` 에 같은 id 로 본문 블록을 작성
3. 변호사 검토를 마치면 `reviewed: true` 로 바꾸고 `reviewedBy` / `reviewedAt` 을 채움

`BODIES` 에 없는 id 는 목록에 "준비 중"으로 표시되고, 상세 페이지도 준비 중 화면을 보여줍니다.
`reviewed: false` 인 글은 본문 상단과 방주에 "검토 전" 배지가 노출됩니다.

## 설계상 지켜야 하는 것

기획안 2항(법적 리스크)을 구조로 반영했습니다. 아래를 임의로 빼지 마세요.

1. **답변 범위 통제는 서버에서** — `api/chat.js` 의 `SYSTEM_PROMPT` 가 진짜 통제 지점입니다.
   클라이언트가 보낸 `system` 값은 무시합니다.
2. **면책 고지 상시 노출** — 상단 고정 바, AI 답변마다 붙는 `§` 주석, 챗 하단 문구까지 3중.
3. **이스케이프 로직** — `ESCALATE_PATTERN` 에 걸리면 변호사 연결 카드를 띄웁니다.
4. **변호사 실명·등록번호 표기** — 대한변호사협회 「변호사 광고에 관한 규정」.

## 오픈 전 남은 작업

- [ ] `src/data/site.js` 의 변호사·사업자 정보 실제 값으로 교체 (현재 전부 예시)
- [ ] 법률 정보 아카이브 본문 — 8개 중 `deposit-return` 1개만 초안 있음, 나머지 7개 미작성
- [ ] `deposit-return` 초안 변호사 검토 후 `reviewed: true` 로 전환
- [ ] 상담 신청 폼 백엔드 연동 — `src/pages/Apply.jsx` 의 `TODO(운영)` 참고
- [ ] 상담 로그 저장 — `api/chat.js` 의 `TODO(운영)` 참고. 암호화 저장, 개인정보 분리 보관
- [ ] 약관·개인정보처리방침·면책조항 문안 변호사 검토
- [ ] 카카오톡 채널, 예약 캘린더, 결제 연동
- [ ] OG 이미지 (`public/og.png`) 추가 후 `index.html` 에 `og:image` 지정

## 배포 (Vercel 기준)

```bash
vercel --prod
```

프로젝트 설정에서 `ANTHROPIC_API_KEY` 를 환경변수로 등록하고,
도메인에 `www.lawful.co.kr` 을 연결하면 됩니다. SPA 라우팅 rewrite 는 `vercel.json` 에 있습니다.
