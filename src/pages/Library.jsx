import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Doc, Note } from '../components/Doc'
import { ARTICLES, FIELDS } from '../data/site'
import { READY } from '../data/articles'

const CATS = ['전체', ...FIELDS.map(f => f.key)]

export default function Library() {
  const [cat, setCat] = useState('전체')

  const list = useMemo(
    () => (cat === '전체' ? ARTICLES : ARTICLES.filter(a => a.cat === cat)),
    [cat]
  )

  return (
    <section className="sec sec--tight">
      <Doc
        aside={
          <div className="rv">
            <Note title=" 작성 기준">
              모든 글은 소속 변호사 검토를 거칩니다. 법령 개정 시 갱신일을 함께 표기합니다.
            </Note>
          </div>
        }
      >
        <div className="rv">
          <p className="eyebrow">법률 정보</p>
          <h2>알아두면 달라지는 것들</h2>
          <p className="lede mb34">기한, 절차, 준비 서류 중심으로 정리한 안내 글입니다.</p>

          <div className="chips" style={{ marginBottom: 26 }}>
            {CATS.map(c => (
              <button
                key={c}
                className={`chip ${cat === c ? 'on' : ''}`}
                onClick={() => setCat(c)}
                aria-pressed={cat === c}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="arts">
            {list.map(a => (
              <Link className="art" key={a.id} to={`/library/${a.id}`}>
                <div className="art__c">{a.cat}</div>
                <div>
                  <div className="art__t">
                    {a.title}
                    {!READY.has(a.id) && <span className="art__wip">준비 중</span>}
                  </div>
                  <div className="art__d">{a.desc}</div>
                </div>
                <div className="art__m">{a.date} · {a.read}</div>
              </Link>
            ))}
          </div>

          {!list.length && (
            <p className="small" style={{ paddingTop: 24 }}>
              이 분야의 글은 아직 준비 중입니다. AI 상담에서 바로 물어보실 수 있습니다.
            </p>
          )}
        </div>
      </Doc>
    </section>
  )
}
