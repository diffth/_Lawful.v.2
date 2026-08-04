import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Doc, Note } from '../components/Doc'
import ChatPanel from '../components/ChatPanel'
import { FIELDS } from '../data/site'
import { useConsult } from '../lib/ConsultContext'

export default function Chat() {
  const { state } = useLocation()
  const { field, setField } = useConsult()
  const panel = useRef(null)
  /* 홈에서 넘어온 첫 질문. 마운트 시점 값만 사용해 중복 전송을 막는다. */
  const [autoSend] = useState(state?.q || '')

  const pickField = key => {
    setField(key)
    panel.current?.send(`${key} 관련 문제로 상담하려고 합니다. 어떤 것부터 정리하면 될까요?`)
  }

  return (
    <section className="sec sec--tight">
      <Doc
        aside={
          <>
            <Note title=" 답변의 성격">
              이 대화의 모든 답변은 일반적인 법률 정보이며, 특정 사건에 대한 법률 자문이 아닙니다.
              같은 상황도 사실관계와 증거에 따라 결론이 달라집니다.
            </Note>
            <Note title=" 기록 보관">
              대화 내용은 암호화 저장되며, 변호사 상담을 신청하신 경우에만 담당 변호사에게 전달됩니다.
            </Note>
            <Note title=" 급한 경우">
              체포·구속, 출석 요구, 기한이 임박한 신청은 AI 상담을 기다리지 말고{' '}
              <Link to="/apply">바로 상담을 신청</Link>해 주세요.
            </Note>
          </>
        }
      >
        <p className="eyebrow">AI 법률 상담</p>
        <h2>무엇이 궁금하신가요</h2>
        <p className="lede" style={{ marginBottom: 26 }}>
          상황을 편하게 적어주세요. 필요한 것만 되묻겠습니다.
        </p>

        <div className="chips" style={{ marginBottom: 18 }}>
          {FIELDS.map(f => (
            <button
              key={f.key}
              className={`chip ${field === f.key ? 'on' : ''}`}
              onClick={() => pickField(f.key)}
            >
              {f.key}
            </button>
          ))}
        </div>

        <ChatPanel ref={panel} autoSend={autoSend} />
      </Doc>
    </section>
  )
}
