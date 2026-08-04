import React from 'react'
import { Link } from 'react-router-dom'
import { Doc, Note } from '../components/Doc'
import { useModal } from '../lib/ModalContext'

const CAN = [
  '법률 용어와 제도의 일반적인 설명',
  '절차의 순서와 통상 소요 기간 안내',
  '상담 유형 분류와 담당 분야 연결',
  '놓치기 쉬운 기한 환기',
  '변호사 상담 시 준비할 자료 목록'
]

const CANNOT = [
  '승소 가능성이나 결과 예측',
  '위자료·손해배상 예상 금액 산정',
  '사건에 맞춘 구체적 대응 전략',
  '소장·계약서 등 법률 서류 작성',
  '수사·재판 절차에서의 대리'
]

export default function About() {
  const { open } = useModal()

  return (
    <section className="sec sec--tight">
      <Doc
        aside={
          <div className="rv">
            <Note title=" 변호사법 제109조">
              변호사가 아닌 자의 법률사무 취급은 금지됩니다.
              Lawful이 AI의 역할을 정보 안내로 한정하는 이유입니다.
            </Note>
          </div>
        }
      >
        <div className="rv">
          <p className="eyebrow">서비스 소개</p>
          <h2>할 수 있는 일과 하지 않는 일</h2>
          <p className="lede">
            경계를 흐리지 않는 편이 결국 더 도움이 된다고 봅니다. Lawful AI가 다루는 범위를 먼저 밝힙니다.
          </p>

          <div className="grid grid--2" style={{ marginTop: 38 }}>
            <div className="cell">
              <div className="cell__k">AI가 합니다</div>
              <ul>{CAN.map(t => <li key={t}>{t}</li>)}</ul>
            </div>
            <div className="cell">
              <div className="cell__k">AI가 하지 않습니다</div>
              <ul>{CANNOT.map(t => <li key={t}>{t}</li>)}</ul>
            </div>
          </div>

          <div style={{ marginTop: 52 }}>
            <h3 style={{ marginBottom: 14 }}>답변을 신뢰해도 되는 범위</h3>
            <p className="small" style={{ maxWidth: '66ch' }}>
              AI 답변은 일반적으로 통용되는 법률 정보를 바탕으로 생성됩니다.
              다만 법령은 개정되고, 같은 사실관계도 증거와 정황에 따라 결론이 달라집니다.
              Lawful은 AI 답변을 최종 결론이 아니라 <b>상담을 위한 출발점</b>으로 설계했습니다.
              실제 판단이 필요한 지점에서는 대화 중 변호사 상담으로 전환됩니다.
            </p>
          </div>

          <div style={{ marginTop: 44 }}>
            <h3 style={{ marginBottom: 14 }}>개인정보 처리</h3>
            <p className="small" style={{ maxWidth: '66ch' }}>
              상담 내용에는 민감정보가 포함될 수 있습니다. 대화는 암호화 저장되고 개인 식별 정보와 분리 보관하며,
              변호사 상담을 신청하신 경우에 한해 담당 변호사에게 전달됩니다. 자세한 내용은{' '}
              <button className="u" style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }} onClick={() => open('privacy')}>
                개인정보처리방침
              </button>
              을 확인해 주세요.
            </p>
          </div>

          <div className="stack">
            <Link to="/chat" className="btn btn--fill">AI 상담 시작하기</Link>
            <Link to="/apply" className="btn btn--line">변호사 상담 신청</Link>
          </div>
        </div>
      </Doc>
    </section>
  )
}
