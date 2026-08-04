import React from 'react'

/* 좌측 방주 컬럼 + 본문의 2단 문서 레이아웃.
   1000px 미만에서는 방주가 본문 아래로 내려간다. */
export function Doc({ aside, children, className = '' }) {
  return (
    <div className={`wrap doc ${className}`}>
      <aside className="doc__aside">{aside}</aside>
      <div className="doc__main">{children}</div>
    </div>
  )
}

export function Note({ title, children }) {
  return (
    <div className="note">
      <b><span className="mark">§</span>{title}</b>
      {children}
    </div>
  )
}

export function Mark() {
  return <span className="mark">§</span>
}
