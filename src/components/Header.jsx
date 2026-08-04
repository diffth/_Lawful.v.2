import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { BRAND } from '../data/site'

const NAV = [
  { to: '/', label: '홈', end: true },
  { to: '/chat', label: 'AI 상담' },
  { to: '/about', label: '서비스 소개' },
  { to: '/lawyers', label: '변호사' },
  { to: '/library', label: '법률 정보' },
  { to: '/pricing', label: '요금' },
  { to: '/apply', label: '상담 신청' }
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <div className="strip">
        <span className="mark">§</span> {BRAND.name}의 AI 상담은 <b>일반 법률 정보 안내</b>입니다.
        개별 사건에 대한 법률 자문은 소속 변호사가 직접 제공합니다.
      </div>

      <header className="hdr">
        <div className="hdr__in">
          <Link to="/" className="logo" aria-label={`${BRAND.name} 홈`}>
            <span className="logo__w">{BRAND.name}</span>
            <span className="logo__t">법률상담</span>
          </Link>

          <nav className={`nav ${open ? 'open' : ''}`} aria-label="주요 메뉴">
            {NAV.map(n => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) => (isActive ? 'on' : '')}
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <Link to="/chat" className="btn btn--fill btn--sm">AI 상담 시작</Link>

          <button
            className="burger"
            aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </header>
    </>
  )
}
