import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import LegalModal from './components/LegalModal'
import { useReveal } from './hooks/useReveal'
import { useModal } from './lib/ModalContext'

import Home from './pages/Home'
import Chat from './pages/Chat'
import About from './pages/About'
import Lawyers from './pages/Lawyers'
import Library from './pages/Library'
import Article from './pages/Article'
import Pricing from './pages/Pricing'
import Apply from './pages/Apply'
import NotFound from './pages/NotFound'
import { ARTICLES } from './data/site'

const TITLES = {
  '/': 'Lawful — AI 법률 상담',
  '/chat': 'AI 상담 — Lawful',
  '/about': '서비스 소개 — Lawful',
  '/lawyers': '변호사 소개 — Lawful',
  '/library': '법률 정보 — Lawful',
  '/pricing': '요금 안내 — Lawful',
  '/apply': '상담 신청 — Lawful'
}

/* /library/:id 는 정적 맵으로 못 잡으므로 글 제목을 찾아 씁니다. */
function titleFor(pathname) {
  if (TITLES[pathname]) return TITLES[pathname]

  const m = pathname.match(/^\/library\/(.+)$/)
  if (m) {
    const a = ARTICLES.find(x => x.id === m[1])
    if (a) return `${a.title} — Lawful`
  }
  return 'Lawful — AI 법률 상담'
}

export default function App() {
  const { pathname } = useLocation()
  const { open } = useModal()
  useReveal()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    document.title = titleFor(pathname)
  }, [pathname])

  return (
    <>
      <a className="skip" href="#main">본문으로 건너뛰기</a>
      <Header />

      <main id="main" className="page-in" key={pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/about" element={<About />} />
          <Route path="/lawyers" element={<Lawyers />} />
          <Route path="/library" element={<Library />} />
          <Route path="/library/:id" element={<Article />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      <button className="demo" onClick={() => open('demo')}>프로토타입 안내</button>
      <LegalModal />
    </>
  )
}
