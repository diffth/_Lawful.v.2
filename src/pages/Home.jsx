import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Doc, Note } from '../components/Doc'
import { ARTICLES, FIELDS, LAWYERS } from '../data/site'
import { READY } from '../data/articles'
import { useConsult } from '../lib/ConsultContext'

export default function Home() {
  const [q, setQ] = useState('')
  const nav = useNavigate()
  const { setField } = useConsult()

  const start = text => nav('/chat', { state: { q: text } })

  const startField = key => {
    setField(key)
    start(`${key} 관련 문제로 상담하려고 합니다. 어떤 것부터 정리하면 될까요?`)
  }

  return (
    <>
      {/* ── 히어로: 상담 입력 자체가 히어로 ── */}
      <div className="hero">
        <div className="hero__in">
          <Doc
            aside={
              <Note title=" 이 서비스의 범위">
                AI는 법률 <em>정보</em>를 안내하고 상담 유형을 분류합니다.
                승소 가능성이나 예상 금액 같은 개별 사건 판단은 변호사가 맡습니다.
              </Note>
            }
          >
            <p className="eyebrow">24시간 법률 정보 안내</p>
            <h1>
              무엇부터 물어야 할지<br />
              모르는 상태에서<br />
              <em>시작해도 됩니다.</em>
            </h1>
            <p className="hero__sub">
              한 줄만 적어주세요. AI가 어떤 법률 문제에 해당하는지, 어떤 절차가 있는지,
              무엇을 준비하면 되는지 정리해 드립니다. 변호사가 필요한 지점에서는 바로 연결합니다.
            </p>

            <form
              className="ask"
              onSubmit={e => { e.preventDefault(); if (q.trim()) start(q.trim()) }}
            >
              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                aria-label="상담 내용 입력"
                placeholder="예: 전세 계약이 끝났는데 보증금을 못 받고 있어요"
              />
              <button type="submit" className="btn btn--fill">상담 시작</button>
            </form>

            <div className="chips chips--hero">
              {FIELDS.map(f => (
                <button key={f.key} className="chip" onClick={() => startField(f.key)}>
                  {f.key}
                </button>
              ))}
            </div>

            <div className="trust">
              <div>
                <div className="trust__n">24시간</div>
                <div className="trust__l">AI 상담 응답 가능 시간</div>
              </div>
              <div>
                <div className="trust__n">무료</div>
                <div className="trust__l">AI 법률 정보 안내</div>
              </div>
              <div>
                <div className="trust__n">실명 변호사</div>
                <div className="trust__l">최종 상담은 사람이 진행</div>
              </div>
            </div>
          </Doc>
        </div>
      </div>

      {/* ── 상담 분야 ── */}
      <section className="sec sec--first">
        <Doc
          aside={
            <div className="rv">
              <Note title=" 분류의 목적">
                분야를 먼저 나누는 이유는 상담을 빠르게 만들기 위해서입니다.
                분야가 정해지면 필요한 서류와 기한 안내가 달라집니다.
              </Note>
            </div>
          }
        >
          <div className="rv">
            <p className="eyebrow">상담 분야</p>
            <h2>어느 쪽에 가까운지만 골라주세요</h2>
            <p className="lede mb34">정확히 맞지 않아도 괜찮습니다. 대화 중에 다시 정리해 드립니다.</p>
            <div className="fields">
              {FIELDS.map(f => (
                <button key={f.key} className="field" onClick={() => startField(f.key)}>
                  <div className="field__t">{f.key} <span>→</span></div>
                  <div className="field__d">{f.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </Doc>
      </section>

      {/* ── 이용 절차 ── */}
      <section className="sec sec--dark">
        <Doc
          aside={
            <div className="rv">
              <Note title=" 사람이 개입하는 지점">
                3단계는 생략되지 않습니다. Lawful은 AI만으로 상담을 끝내지 않고,
                변호사 검토를 전제로 설계했습니다.
              </Note>
            </div>
          }
        >
          <div className="rv">
            <p className="eyebrow">이용 절차</p>
            <h2>질문에서 상담까지, 세 단계</h2>
            <p className="lede" style={{ marginBottom: 44 }}>
              각 단계가 무엇을 하고 무엇을 하지 않는지 미리 밝힙니다.
            </p>
            <div className="steps">
              <div className="step">
                <div className="step__n">STEP 01</div>
                <h3>상황을 적습니다</h3>
                <p>정돈되지 않은 문장이어도 됩니다. AI가 되묻는 질문에 답하면서 사실관계가 정리됩니다.</p>
              </div>
              <div className="step">
                <div className="step__n">STEP 02</div>
                <h3>AI가 유형을 분류합니다</h3>
                <p>해당 분야, 일반적인 절차, 놓치기 쉬운 기한, 준비할 자료를 안내합니다. 결과 예측은 하지 않습니다.</p>
              </div>
              <div className="step">
                <div className="step__n">STEP 03</div>
                <h3>변호사가 이어받습니다</h3>
                <p>상담 요약을 담당 변호사에게 전달합니다. 같은 이야기를 처음부터 다시 하지 않아도 됩니다.</p>
              </div>
            </div>
            <div className="stack">
              <Link to="/chat" className="btn btn--fill">AI 상담 시작하기</Link>
              <Link to="/about" className="btn btn--ghost">AI 상담의 한계 보기</Link>
            </div>
          </div>
        </Doc>
      </section>

      {/* ── 변호사 ── */}
      <section className="sec">
        <Doc
          aside={
            <div className="rv">
              <Note title=" 표기 근거">
                변호사의 성명·등록번호·소속을 명시하는 것은 대한변호사협회
                「변호사 광고에 관한 규정」에 따른 표기입니다.
              </Note>
            </div>
          }
        >
          <div className="rv">
            <p className="eyebrow">소속 변호사</p>
            <h2>답을 책임지는 사람이 있습니다</h2>
            <p className="lede mb34">AI 뒤에 누가 있는지 확인하고 상담을 시작하세요.</p>
            <div className="grid grid--3">
              {LAWYERS.map(l => (
                <div className="lw" key={l.name}>
                  <div className="lw__b">
                    <div className="lw__n">{l.name} <span>변호사</span></div>
                    <div className="lw__reg">Lawful · 등록번호 {l.reg}</div>
                    <div className="lw__f">
                      {l.fields.map(f => <span className="tag" key={f}>{f}</span>)}
                    </div>
                    <ul>{l.career.map(c => <li key={c}>{c}</li>)}</ul>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt24">
              <Link to="/lawyers" className="btn btn--line">변호사 전체 보기</Link>
            </div>
          </div>
        </Doc>
      </section>

      {/* ── 법률 정보 ── */}
      <section className="sec">
        <Doc
          aside={
            <div className="rv">
              <Note title=" 읽는 순서">
                기한이 걸린 문제(상속포기, 부당해고 구제신청 등)를 먼저 확인하시길 권합니다.
              </Note>
            </div>
          }
        >
          <div className="rv">
            <p className="eyebrow">법률 정보</p>
            <h2>자주 묻는 것부터 정리했습니다</h2>
            <div className="arts">
              {ARTICLES.slice(0, 4).map(a => (
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
            <div className="mt24">
              <Link to="/library" className="btn btn--line">전체 글 보기</Link>
            </div>
          </div>
        </Doc>
      </section>
    </>
  )
}
