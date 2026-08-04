/* 모델 응답을 표시하기 위한 최소 마크다운 파서.
   문단과 '- ' 목록, **강조** 만 처리합니다.
   결과는 React 엘리먼트 배열이라 dangerouslySetInnerHTML 이 필요 없습니다. */

import React from 'react'

function inline(text, keyBase) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((p, i) =>
    /^\*\*[^*]+\*\*$/.test(p)
      ? <strong key={`${keyBase}-b${i}`}>{p.slice(2, -2)}</strong>
      : <React.Fragment key={`${keyBase}-t${i}`}>{p}</React.Fragment>
  )
}

export function renderRich(raw = '') {
  const lines = String(raw).split('\n')
  const out = []
  let list = null

  const flush = () => {
    if (list) {
      out.push(<ul key={`ul-${out.length}`}>{list}</ul>)
      list = null
    }
  }

  lines.forEach((line, i) => {
    const t = line.trim()
    if (/^[-*•]\s+/.test(t)) {
      const content = t.replace(/^[-*•]\s+/, '')
      if (!list) list = []
      list.push(<li key={`li-${i}`}>{inline(content, `li-${i}`)}</li>)
    } else {
      flush()
      if (t) out.push(<p key={`p-${i}`}>{inline(t, `p-${i}`)}</p>)
    }
  })
  flush()
  return out
}

export function makeTicket() {
  const d = new Date().toISOString().slice(2, 10).replace(/-/g, '')
  const n = String(Math.floor(Math.random() * 900) + 100)
  return `LW-${d}-${n}`
}
