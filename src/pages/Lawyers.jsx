import React from 'react'
import { Doc, Note } from '../components/Doc'
import { BRAND, LAWYERS } from '../data/site'

export default function Lawyers() {
  return (
    <section className="sec sec--tight">
      <Doc
        aside={
          <div className="rv">
            <Note title=" 광고 규정 표기">
              성명, 소속, 변호사 등록번호를 표기합니다.
              사건 수임 실적이나 승소율은 표시하지 않습니다.
            </Note>
          </div>
        }
      >
        <div className="rv">
          <p className="eyebrow">소속 변호사</p>
          <h2>실제로 상담하는 사람들</h2>
          <p className="lede mb34">AI가 정리한 내용을 이어받아 상담을 진행합니다.</p>

          <div className="grid grid--3">
            {LAWYERS.map(l => (
              <div className="lw" key={l.name}>
                <div className="lw__ph" aria-hidden="true">{l.initial}</div>
                <div className="lw__b">
                  <div className="lw__n">{l.name} <span>변호사</span></div>
                  <div className="lw__reg">{BRAND.entity} · 등록번호 {l.reg}</div>
                  <div className="lw__f">
                    {l.fields.map(f => <span className="tag" key={f}>{f}</span>)}
                  </div>
                  <ul>{l.career.map(c => <li key={c}>{c}</li>)}</ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Doc>
    </section>
  )
}
