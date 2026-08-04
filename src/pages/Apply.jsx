import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Doc, Note } from '../components/Doc'
import { BRAND, FIELDS } from '../data/site'
import { makeTicket } from '../lib/format'
import { useConsult } from '../lib/ConsultContext'
import { useModal } from '../lib/ModalContext'

const EMPTY = { name: '', tel: '', field: '', type: '전화 상담 30분', msg: '', c1: false, c2: false }

const MESSAGES = {
  name: '이름을 입력해 주세요.',
  tel: '연락 가능한 번호를 입력해 주세요.',
  field: '분야를 선택해 주세요.',
  msg: '상담 내용을 10자 이상 적어주세요.',
  c1: '필수 항목입니다.'
}

export default function Apply() {
  const { summary, setSummary, field } = useConsult()
  const { open } = useModal()
  const [v, setV] = useState({ ...EMPTY, field: field || '' })
  const [errs, setErrs] = useState({})
  const [done, setDone] = useState(null)
  const [sending, setSending] = useState(false)

  const set = (k, val) => {
    setV(s => ({ ...s, [k]: val }))
    setErrs(e => (e[k] ? { ...e, [k]: false } : e))
  }

  const validate = () => {
    const e = {}
    if (!v.name.trim()) e.name = true
    if (!/^[0-9+\-\s()]{8,}$/.test(v.tel.trim())) e.tel = true
    if (!v.field) e.field = true
    if (v.msg.trim().length < 10) e.msg = true
    if (!v.c1) e.c1 = true
    setErrs(e)
    return Object.keys(e).length === 0
  }

  const submit = async e => {
    e.preventDefault()
    if (!validate()) {
      // 에러 클래스가 DOM 에 반영된 다음 프레임에 첫 오류로 이동
      setTimeout(() => {
        document.querySelector('.f.bad')?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      }, 0)
      return
    }
    setSending(true)

    // TODO(운영): 자체 백엔드로 전송하세요.
    // await fetch('/api/consultations', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ ...v, summary })
    // })
    await new Promise(r => setTimeout(r, 450))

    setSending(false)
    setDone({ ticket: makeTicket(), ...v, hasSummary: !!summary.trim() })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const again = () => {
    setDone(null)
    setV({ ...EMPTY })
    setErrs({})
  }

  const cls = k => `f ${errs[k] ? 'bad' : ''}`

  return (
    <section className="sec sec--tight">
      <Doc
        aside={
          <>
            <Note title=" 접수 이후">
              영업일 기준 하루 안에 담당 변호사 또는 상담 담당자가 연락드립니다.
              접수만으로 위임 관계가 생기지는 않습니다.
            </Note>
            <Note title=" 다른 방법">
              전화 {BRAND.tel} ({BRAND.telHours})<br />
              카카오톡 채널 {BRAND.kakao}<br />
              이메일 {BRAND.email}
            </Note>
          </>
        }
      >
        <p className="eyebrow">상담 신청</p>
        <h2>변호사와 직접 상담하기</h2>
        <p className="lede" style={{ marginBottom: 32 }}>
          AI 상담을 하셨다면 요약이 자동으로 담깁니다. 바로 신청하셔도 됩니다.
        </p>

        {done ? (
          <div className="done">
            <h3>상담 신청이 접수되었습니다</h3>
            <p>
              영업일 기준 24시간 이내에 담당자가 연락드립니다.
              급한 사안이라면 {BRAND.tel}으로 전화 주세요.
            </p>
            <dl>
              <dt>접수번호</dt><dd>{done.ticket}</dd>
              <dt>이름</dt><dd>{done.name}</dd>
              <dt>연락처</dt><dd>{done.tel}</dd>
              <dt>상담 분야</dt><dd>{done.field}</dd>
              <dt>상담 방식</dt><dd>{done.type}</dd>
              <dt>AI 요약</dt><dd>{done.hasSummary ? '함께 전달됨' : '없음'}</dd>
            </dl>
            <div style={{ marginTop: 24, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link to="/" className="btn btn--fill btn--sm">홈으로</Link>
              <button className="btn btn--ghost btn--sm" onClick={again}>새로 신청하기</button>
            </div>
          </div>
        ) : (
          <form className="form" onSubmit={submit} noValidate>
            <div className="f-row">
              <div className={cls('name')}>
                <label htmlFor="a-name">이름<i>*</i></label>
                <input id="a-name" autoComplete="name" placeholder="홍길동"
                  value={v.name} onChange={e => set('name', e.target.value)} />
                {errs.name && <div className="err">{MESSAGES.name}</div>}
              </div>
              <div className={cls('tel')}>
                <label htmlFor="a-tel">연락처<i>*</i></label>
                <input id="a-tel" inputMode="tel" autoComplete="tel" placeholder="010-0000-0000"
                  value={v.tel} onChange={e => set('tel', e.target.value)} />
                {errs.tel && <div className="err">{MESSAGES.tel}</div>}
              </div>
            </div>

            <div className="f-row">
              <div className={cls('field')}>
                <label htmlFor="a-field">상담 분야<i>*</i></label>
                <select id="a-field" value={v.field} onChange={e => set('field', e.target.value)}>
                  <option value="">선택해 주세요</option>
                  {FIELDS.map(f => <option key={f.key}>{f.key}</option>)}
                  <option>기타</option>
                </select>
                {errs.field && <div className="err">{MESSAGES.field}</div>}
              </div>
              <div className="f">
                <label htmlFor="a-type">상담 방식</label>
                <select id="a-type" value={v.type} onChange={e => set('type', e.target.value)}>
                  <option>전화 상담 30분</option>
                  <option>화상 상담 30분</option>
                  <option>방문 상담 60분</option>
                </select>
              </div>
            </div>

            <div className={cls('msg')}>
              <label htmlFor="a-msg">상담 내용<i>*</i></label>
              <textarea id="a-msg" value={v.msg} onChange={e => set('msg', e.target.value)}
                placeholder="언제, 누구와, 무슨 일이 있었는지 순서대로 적어주시면 상담이 빨라집니다." />
              <div className="hint">주민등록번호, 계좌번호는 적지 말아주세요. 필요하면 상담 중에 확인합니다.</div>
              {errs.msg && <div className="err">{MESSAGES.msg}</div>}
            </div>

            <div className="consent">
              <div className={cls('c1')} style={{ marginBottom: 12 }}>
                <div className="check">
                  <input type="checkbox" id="a-c1" checked={v.c1} onChange={e => set('c1', e.target.checked)} />
                  <label htmlFor="a-c1">
                    <b>[필수]</b> 상담 진행을 위한 개인정보 수집·이용에 동의합니다.
                    수집 항목은 이름·연락처·상담 내용이며, 상담 종료 후 3년간 보관 후 파기합니다.{' '}
                    <button type="button" onClick={() => open('privacy')}>전문 보기</button>
                  </label>
                </div>
                {errs.c1 && <div className="err">{MESSAGES.c1}</div>}
              </div>
              <div className="check">
                <input type="checkbox" id="a-c2" checked={v.c2} onChange={e => set('c2', e.target.checked)} />
                <label htmlFor="a-c2">[선택] 법률 정보 소식지 수신에 동의합니다.</label>
              </div>
            </div>

            {summary && (
              <div className="f">
                <label htmlFor="a-sum">AI 상담 요약 (함께 전달)</label>
                <textarea id="a-sum" rows={5} value={summary} onChange={e => setSummary(e.target.value)} />
                <div className="hint">내용을 수정하거나 지우실 수 있습니다.</div>
              </div>
            )}

            <button type="submit" className="btn btn--fill btn--full" disabled={sending}>
              {sending ? '접수 중…' : '상담 신청하기'}
            </button>

            <p className="small" style={{ marginTop: 14 }}>
              <span className="mark">§</span>
              신청 접수만으로 변호사와의 위임 계약이 성립하지는 않습니다. 상담 후 별도 서면으로 진행합니다.
            </p>
          </form>
        )}
      </Doc>
    </section>
  )
}
