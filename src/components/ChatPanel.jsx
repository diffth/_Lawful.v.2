import React, {
  forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState
} from 'react'
import { Link } from 'react-router-dom'
import {
  CHAT_ENDPOINT, SYSTEM_PROMPT, ESCALATE_PATTERN,
  GREETING, CONSENT_NOTICE, SUMMARY_REQUEST
} from '../config'
import { DISCLAIMER_SHORT } from '../data/site'
import { renderRich } from '../lib/format'
import { useConsult } from '../lib/ConsultContext'

let seq = 0
const uid = () => `m${++seq}`

function Disclaimer() {
  return (
    <div className="dis">
      <span className="mark">§</span>
      <span>{DISCLAIMER_SHORT}</span>
    </div>
  )
}

function Escalate() {
  return (
    <div className="esc">
      이 지점부터는 사실관계와 증거를 직접 확인해야 판단이 가능합니다. 담당 분야 변호사에게 연결해 드릴까요?
      <div><Link to="/apply" className="btn btn--fill btn--sm">변호사와 상담하기</Link></div>
    </div>
  )
}

function Bubble({ msg }) {
  const who = msg.role === 'me' ? '나' : msg.role === 'sys' ? '안내' : 'Lawful AI'
  const cls =
    msg.role === 'me' ? 'bub--me' :
    msg.role === 'sys' ? 'bub--sys' :
    msg.error ? 'bub--err' : 'bub--ai'

  return (
    <div className={`msg ${msg.role === 'me' ? 'msg--me' : ''}`}>
      <div className="msg__who">{who}</div>
      <div className={`bub ${cls}`}>
        {msg.typing
          ? <span className="typing"><i /><i /><i /></span>
          : msg.node || renderRich(msg.text)}
      </div>
      {msg.role === 'ai' && !msg.typing && !msg.error && !msg.noDisclaimer && <Disclaimer />}
      {msg.escalate && <Escalate />}
      {msg.afterSummary && (
        <div className="esc">
          요약을 상담 신청서에 담아두었습니다. 신청 시 담당 변호사에게 함께 전달됩니다.
          <div><Link to="/apply" className="btn btn--fill btn--sm">상담 신청서로 이동</Link></div>
        </div>
      )}
    </div>
  )
}

function ErrorBody() {
  return (
    <>
      <p><b>지금은 AI 응답을 불러오지 못했습니다.</b></p>
      <p className="small" style={{ margin: 0 }}>
        잠시 후 다시 보내보시거나 변호사 상담을 신청해 주세요.
        반복해서 실패한다면 상담 신청 페이지의 전화·카카오톡 채널로 연락 주시면 바로 도와드리겠습니다.
      </p>
      <div style={{ marginTop: 12 }}>
        <Link to="/apply" className="btn btn--line btn--sm">상담 신청하기</Link>
      </div>
    </>
  )
}

const initialMessages = () => ([
  {
    id: uid(), role: 'sys',
    node: (
      <>
        <b>상담 시작 전 안내</b><br />
        <span dangerouslySetInnerHTML={{ __html: CONSENT_NOTICE }} />
      </>
    )
  },
  { id: uid(), role: 'ai', text: GREETING, noDisclaimer: true }
])

const ChatPanel = forwardRef(function ChatPanel({ autoSend }, ref) {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const logRef = useRef(null)
  const taRef = useRef(null)
  const convoRef = useRef([])        // API 로 보내는 대화 이력
  const firedRef = useRef(false)
  const { setSummary } = useConsult()

  useEffect(() => {
    const el = logRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages])

  const send = useCallback(async (text, opts = {}) => {
    const body = String(text || '').trim()
    if (!body || busy) return null
    setBusy(true)

    if (!opts.hidden) {
      setMessages(m => [...m, { id: uid(), role: 'me', text: body }])
    }
    convoRef.current = [...convoRef.current, { role: 'user', content: body }]

    const typingId = uid()
    setMessages(m => [...m, { id: typingId, role: 'ai', typing: true }])

    try {
      const res = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: SYSTEM_PROMPT,
          messages: convoRef.current
        })
      })
      if (!res.ok) throw new Error(`status ${res.status}`)

      const data = await res.json()
      const out = (data.content || [])
        .map(b => (b.type === 'text' ? b.text : ''))
        .filter(Boolean).join('\n').trim()
      if (!out) throw new Error('empty response')

      convoRef.current = [...convoRef.current, { role: 'assistant', content: out }]
      const escalate = !opts.hidden && ESCALATE_PATTERN.test(body)

      setMessages(m => m.map(x =>
        x.id === typingId
          ? { ...x, typing: false, text: out, escalate, afterSummary: !!opts.afterSummary }
          : x
      ))
      return out
    } catch (err) {
      console.error('[Lawful] 상담 응답 실패:', err)
      convoRef.current = convoRef.current.slice(0, -1)
      setMessages(m => m.map(x =>
        x.id === typingId
          ? { ...x, typing: false, error: true, node: <ErrorBody /> }
          : x
      ))
      return null
    } finally {
      setBusy(false)
    }
  }, [busy])

  /* 부모(분야 칩 등)가 대화를 이어서 보낼 수 있도록 send 를 노출한다 */
  useImperativeHandle(ref, () => ({ send }), [send])

  /* 홈 히어로 / 분야 카드에서 넘어온 첫 질문 자동 전송 */
  useEffect(() => {
    if (autoSend && !firedRef.current) {
      firedRef.current = true
      send(autoSend)
    }
  }, [autoSend, send])

  const submit = e => {
    e.preventDefault()
    const v = input.trim()
    if (!v) return
    setInput('')
    if (taRef.current) taRef.current.style.height = 'auto'
    send(v)
  }

  const reset = () => {
    convoRef.current = []
    firedRef.current = true
    setMessages(initialMessages())
  }

  const summarize = async () => {
    if (busy) return
    if (convoRef.current.length < 2) {
      setMessages(m => [...m, {
        id: uid(), role: 'sys',
        text: '먼저 상담 내용을 입력해 주세요. 대화가 쌓이면 변호사에게 전달할 요약을 만들어 드립니다.'
      }])
      return
    }
    const out = await send(SUMMARY_REQUEST, { hidden: true, afterSummary: true })
    if (out) setSummary(out)
  }

  return (
    <>
      <div className="chat">
        <div className="chat__bar">
          <div>
            <h3>Lawful AI 상담</h3>
            <div className="small">법률 정보 안내 · 상담 유형 분류</div>
          </div>
          <button className="btn btn--ghost btn--sm" onClick={reset}>대화 새로 시작</button>
        </div>

        <div className="chat__log" ref={logRef} role="log" aria-live="polite">
          {messages.map(m => <Bubble key={m.id} msg={m} />)}
        </div>

        <div className="chat__tools">
          <button className="btn btn--line btn--sm" onClick={summarize} disabled={busy}>
            상담 내용 정리하기
          </button>
          <Link to="/apply" className="btn btn--line btn--sm">변호사와 직접 상담하기</Link>
        </div>

        <form className="chat__form" onSubmit={submit}>
          <textarea
            ref={taRef}
            rows={1}
            value={input}
            aria-label="메시지 입력"
            placeholder="상황을 적어주세요.  Shift+Enter 줄바꿈"
            onChange={e => {
              setInput(e.target.value)
              e.target.style.height = 'auto'
              e.target.style.height = Math.min(e.target.scrollHeight, 140) + 'px'
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                e.currentTarget.form.requestSubmit()
              }
            }}
          />
          <button type="submit" className="btn btn--fill" disabled={busy}>보내기</button>
        </form>
      </div>

      <p className="small" style={{ marginTop: 14 }}>
        <span className="mark">§</span>
        본 답변은 일반적인 법률 정보이며 법률 자문이 아닙니다.
        답변에 근거해 내린 판단의 결과에 대해 Lawful은 책임을 지지 않습니다.
      </p>
    </>
  )
})

export default ChatPanel
