import React, { useEffect, useRef } from 'react'
import { BRAND } from '../data/site'
import { useModal } from '../lib/ModalContext'

function Terms() {
  return (
    <>
      <h3>이용약관</h3>
      <p className="small">최종 개정일 {BRAND.updated}</p>
      <h4>제1조 (목적)</h4>
      <p>본 약관은 {BRAND.entity}(이하 "회사")가 {BRAND.domain}을 통해 제공하는 AI 법률 정보 안내 서비스 및 변호사 상담 연결 서비스의 이용 조건과 절차를 정합니다.</p>
      <h4>제2조 (서비스의 성격)</h4>
      <ul>
        <li>AI 상담은 일반적인 법률 정보의 안내이며, 변호사법상 법률 자문에 해당하지 않습니다.</li>
        <li>이용자가 AI 답변에 근거해 내린 판단과 그 결과에 대해 회사는 책임을 지지 않습니다.</li>
        <li>개별 사건에 대한 법률 자문은 소속 변호사와의 상담을 통해서만 제공됩니다.</li>
      </ul>
      <h4>제3조 (위임 관계의 성립)</h4>
      <p>상담 신청 또는 AI 상담 이용만으로는 회사와 이용자 사이에 위임 관계가 성립하지 않습니다. 사건 위임은 상담 후 별도의 서면 계약으로 체결됩니다.</p>
      <h4>제4조 (이용자의 의무)</h4>
      <p>이용자는 상담 목적 외로 서비스를 이용하거나, 타인의 개인정보를 무단으로 입력해서는 안 됩니다.</p>
      <h4>제5조 (서비스의 중단)</h4>
      <p>시스템 점검, 장애, 법령 변경 등의 사유가 있는 경우 서비스 제공이 일시 중단될 수 있으며, 사전 공지를 원칙으로 합니다.</p>
    </>
  )
}

function Privacy() {
  return (
    <>
      <h3>개인정보처리방침</h3>
      <p className="small">최종 개정일 {BRAND.updated} · 개인정보보호책임자 {BRAND.adLawyer} 변호사</p>
      <h4>1. 수집하는 항목</h4>
      <ul>
        <li>상담 신청 시 — 이름, 연락처, 상담 분야, 상담 내용</li>
        <li>AI 상담 이용 시 — 대화 내용, 접속 일시, 브라우저 정보</li>
      </ul>
      <h4>2. 이용 목적</h4>
      <p>상담 예약 및 진행, 담당 변호사 배정, 상담 품질 관리, 법령상 보존 의무 이행.</p>
      <h4>3. 민감정보 처리</h4>
      <p>상담 내용에는 건강, 범죄경력, 가족관계 등 민감정보가 포함될 수 있습니다. 회사는 별도 동의를 받아 처리하며, 상담 목적 외로 이용하지 않습니다.</p>
      <h4>4. 보관 및 파기</h4>
      <p>대화 기록은 암호화 저장하고 개인 식별 정보와 분리 보관합니다. 상담 종료 후 3년간 보관 후 지체 없이 파기하며, 법령상 별도 보존 의무가 있는 경우 해당 기간을 따릅니다.</p>
      <h4>5. 제3자 제공 및 처리 위탁</h4>
      <p>이용자 동의 없이 제3자에게 제공하지 않습니다. 다만 서비스 운영을 위해 클라우드 호스팅 및 AI 응답 생성 처리를 위탁하며, 수탁자에게 개인정보 보호 의무를 부과합니다.</p>
      <h4>6. 정보주체의 권리</h4>
      <p>열람, 정정, 삭제, 처리정지를 언제든 요구하실 수 있습니다. {BRAND.privacyEmail} 로 연락 주시면 지체 없이 처리합니다.</p>
    </>
  )
}

function Disclaimer() {
  return (
    <>
      <h3>면책조항</h3>
      <p>{BRAND.name} 웹사이트에서 AI가 제공하는 모든 답변은 <b>일반적인 법률 정보</b>이며, 특정 사건에 대한 <b>법률 자문이 아닙니다</b>.</p>
      <h4>법률 자문과의 차이</h4>
      <p>법률 자문은 변호사가 구체적인 사실관계와 증거를 확인한 뒤, 의뢰인에 대한 책임을 지고 제공하는 판단입니다. AI 답변은 이 과정을 거치지 않으며, 같은 질문이라도 실제 사안에서는 결론이 달라질 수 있습니다.</p>
      <h4>책임의 범위</h4>
      <ul>
        <li>회사는 AI 답변의 정확성·완전성·최신성을 보증하지 않습니다.</li>
        <li>이용자가 AI 답변만을 근거로 행위하거나 하지 않아 발생한 손해에 대해 책임을 지지 않습니다.</li>
        <li>법령은 개정되며, 게시 시점 이후의 변경 사항이 반영되지 않았을 수 있습니다.</li>
      </ul>
      <h4>권고</h4>
      <p>기한이 정해진 절차(상속포기·한정승인, 부당해고 구제신청, 소멸시효 등)는 지체 없이 변호사와 상담하시기 바랍니다. AI 상담을 기다리다 기한을 놓치는 일이 없도록 해주세요.</p>
    </>
  )
}

function DemoNotice() {
  return (
    <>
      <h3>이 사이트는 프로토타입입니다</h3>
      <p>기획안을 바탕으로 만든 React + Vite 프론트엔드입니다. 실제 오픈 전 아래 항목을 채워야 합니다.</p>
      <h4>교체가 필요한 것</h4>
      <ul>
        <li><b>src/data/site.js</b> — 변호사 성명·등록번호·경력, 법인 사업자 정보, 연락처가 모두 예시 데이터입니다</li>
        <li><b>src/data/articles.js</b> — 법률 정보 아카이브 본문. 8개 글 중 1개만 초안이 있고, 그 초안도 변호사 검토 전입니다</li>
        <li>상담 신청 폼 전송 — 화면에서만 처리되며 서버로 전송되지 않습니다 (Apply.jsx 의 TODO 참고)</li>
      </ul>
      <h4>연동이 필요한 것</h4>
      <ul>
        <li>AI 응답 — <b>api/chat.js</b> 서버리스 함수에 <b>ANTHROPIC_API_KEY</b> 환경변수를 설정하세요. 브라우저에서 API를 직접 호출하면 키가 노출됩니다.</li>
        <li>상담 로그 저장 — 암호화 저장, 개인 식별 정보 분리 보관</li>
        <li>카카오톡 채널, 예약 캘린더, 결제</li>
      </ul>
      <h4>오픈 전 확인</h4>
      <p>약관·개인정보처리방침·면책조항 문안과 광고 표기사항은 초안입니다. 대한변호사협회 「변호사 광고에 관한 규정」과 개인정보보호법 적용 여부를 변호사 검토로 확정하시기 바랍니다.</p>
    </>
  )
}

export default function LegalModal() {
  const { key, close } = useModal()
  const boxRef = useRef(null)

  useEffect(() => {
    if (!key) return
    const onKey = e => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    boxRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [key, close])

  if (!key) return null

  const map = {
    terms: <Terms />,
    privacy: <Privacy />,
    disclaimer: <Disclaimer />,
    demo: <DemoNotice />
  }

  return (
    <div className="modal" role="presentation">
      <button className="modal__bg" aria-label="닫기" onClick={close} />
      <div className="modal__box" role="dialog" aria-modal="true" tabIndex={-1} ref={boxRef}>
        <button className="modal__x" onClick={close} aria-label="닫기">×</button>
        {map[key] || null}
      </div>
    </div>
  )
}
