import React from 'react'
import { Link } from 'react-router-dom'
import { Doc, Note } from '../components/Doc'
import { PLANS } from '../data/site'

export default function Pricing() {
  return (
    <section className="sec sec--tight">
      <Doc
        aside={
          <div className="rv">
            <Note title=" 표시 기준">
              아래 금액은 상담료 기준이며 부가세 별도입니다.
              사건 수임료는 사안에 따라 달라져 상담 시 별도 안내합니다.
            </Note>
          </div>
        }
      >
        <div className="rv">
          <p className="eyebrow">요금 안내</p>
          <h2>어디까지 무료인지 먼저 밝힙니다</h2>
          <p className="lede mb34">
            AI 상담은 비용이 없습니다. 사람이 시간을 쓰는 지점부터 요금이 발생합니다.
          </p>

          <div className="grid grid--3 grid--plain">
            {PLANS.map(p => (
              <div className={`plan ${p.primary ? 'plan--hi' : ''}`} key={p.name}>
                <h3>{p.name}</h3>
                <div className="plan__p">{p.price} {p.unit && <small>{p.unit}</small>}</div>
                <p className="small" style={{ margin: 0 }}>{p.sub}</p>
                <ul>{p.items.map(i => <li key={i}>{i}</li>)}</ul>
                <Link
                  to={p.cta.to}
                  className={`btn btn--full ${p.primary ? 'btn--fill' : 'btn--line'}`}
                >
                  {p.cta.label}
                </Link>
              </div>
            ))}
          </div>

          <p className="small" style={{ marginTop: 24 }}>
            <span className="mark">§</span>
            상담 예약 후 24시간 이내 취소 시 전액 환불됩니다.
            수임료는 사건의 종류·심급·난이도에 따라 결정되며 계약 전 서면으로 안내합니다.
          </p>
        </div>
      </Doc>
    </section>
  )
}
