import React from 'react'
import { Link } from 'react-router-dom'
import { Doc, Note } from '../components/Doc'

export default function NotFound() {
  return (
    <section className="sec sec--tight">
      <Doc
        aside={
          <Note title=" 자주 찾는 곳">
            상담을 시작하려면 AI 상담으로, 변호사 연결이 급하시면 상담 신청으로 가시면 됩니다.
          </Note>
        }
      >
        <p className="eyebrow">404</p>
        <h2>주소가 바뀌었거나 없는 페이지입니다</h2>
        <p className="lede">찾으시던 내용이 있다면 AI 상담에서 바로 물어보실 수 있습니다.</p>
        <div className="stack">
          <Link to="/chat" className="btn btn--fill">AI 상담 시작하기</Link>
          <Link to="/" className="btn btn--line">홈으로</Link>
        </div>
      </Doc>
    </section>
  )
}
