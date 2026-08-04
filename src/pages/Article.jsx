import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Doc, Note } from '../components/Doc'
import { ARTICLES } from '../data/site'
import { BODIES } from '../data/articles'
import NotFound from './NotFound'

/* articles.js 의 블록을 렌더링합니다. 새 블록 타입을 추가하면 여기에도 분기를 넣으세요. */
function Block({ b }) {
  if (b.h) return <h3 className="ab__h">{b.h}</h3>
  if (b.p) return <p>{b.p}</p>
  if (b.ul) return <ul className="ab__ul">{b.ul.map((li, i) => <li key={i}>{li}</li>)}</ul>
  if (b.ol) return <ol className="ab__ol">{b.ol.map((li, i) => <li key={i}>{li}</li>)}</ol>
  if (b.note) return (
    <div className="ab__note">
      <b><span className="mark">§</span>{b.note.title}</b>
      <p>{b.note.body}</p>
    </div>
  )
  return null
}

export default function Article() {
  const { id } = useParams()
  const meta = ARTICLES.find(a => a.id === id)

  /* 목록에 없는 id — 잘못된 주소 */
  if (!meta) return <NotFound />

  const body = BODIES[id]
  const related = ARTICLES.filter(a => a.cat === meta.cat && a.id !== id).slice(0, 3)

  return (
    <section className="sec sec--tight">
      <Doc
        aside={
          <div className="rv">
            <Note title=" 이 글의 성격">
              일반적인 법률 정보이며, 귀하의 사안에 대한 법률 자문이 아닙니다. 같은 쟁점이라도
              사실관계에 따라 결론이 달라집니다.
            </Note>

            {body && !body.reviewed && (
              <Note title=" 검토 전 원고">
                소속 변호사 검토를 마치지 않은 초안입니다. 검토 완료 후 갱신일과 함께 확정됩니다.
              </Note>
            )}

            {related.length > 0 && (
              <Note title=" 같은 분야">
                <ul className="ab__rel">
                  {related.map(r => (
                    <li key={r.id}><Link to={`/library/${r.id}`}>{r.title}</Link></li>
                  ))}
                </ul>
              </Note>
            )}
          </div>
        }
      >
        <div className="rv">
          <p className="ab__crumb">
            <Link to="/library" className="u">법률 정보</Link>
            <span aria-hidden="true"> · </span>
            <span className="ab__cat">{meta.cat}</span>
          </p>

          <h2>{meta.title}</h2>
          <p className="ab__meta">
            {meta.date} 작성 · 읽는 데 {meta.read}
            {body && !body.reviewed && <span className="ab__wip">검토 전</span>}
          </p>

          {body ? (
            <>
              <p className="lede mb34">{body.lede}</p>
              <div className="ab">
                {body.blocks.map((b, i) => <Block b={b} key={i} />)}
              </div>
            </>
          ) : (
            <>
              <p className="lede mb34">{meta.desc}</p>
              <div className="ab">
                <p>
                  이 글은 아직 준비 중입니다. 소속 변호사 검토를 거쳐 순차적으로 공개하고 있습니다.
                  지금 필요한 내용이 있다면 AI 상담에서 바로 물어보실 수 있습니다.
                </p>
              </div>
            </>
          )}

          <div className="stack">
            <Link to="/chat" className="btn btn--fill">AI 상담에서 물어보기</Link>
            <Link to="/apply" className="btn btn--line">변호사 상담 신청</Link>
          </div>

          <p className="small" style={{ marginTop: 34 }}>
            <Link to="/library" className="u">← 법률 정보 목록으로</Link>
          </p>
        </div>
      </Doc>
    </section>
  )
}
