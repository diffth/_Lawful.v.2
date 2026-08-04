import React from 'react'
import { Link } from 'react-router-dom'
import { BRAND } from '../data/site'
import { useModal } from '../lib/ModalContext'

export default function Footer() {
  const { open } = useModal()
  const year = new Date().getFullYear()

  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr__top">
          <div>
            <div className="logo" style={{ marginBottom: 14 }}>
              <span className="logo__w">{BRAND.name}</span>
              <span className="logo__t">법률상담</span>
            </div>
            <p style={{ margin: 0, maxWidth: '38ch' }}>
              {BRAND.tagline}. 상담의 시작 지점을 낮추기 위해 만든 서비스입니다.
            </p>
            <div className="ad-note">
              <b style={{ color: '#AEBCCB' }}>광고 표기사항</b><br />
              본 웹사이트는 {BRAND.entity}의 변호사 광고입니다.
              대한변호사협회 「변호사 광고에 관한 규정」을 준수합니다.<br />
              광고책임변호사 : {BRAND.adLawyer} (변호사 등록번호 {BRAND.adLawyerReg})
            </div>
          </div>

          <div>
            <h4>서비스</h4>
            <div className="ftr__links">
              <Link to="/chat">AI 상담</Link>
              <Link to="/about">서비스 소개</Link>
              <Link to="/lawyers">변호사 소개</Link>
              <Link to="/library">법률 정보</Link>
              <Link to="/pricing">요금 안내</Link>
              <Link to="/apply">상담 신청</Link>
            </div>
          </div>

          <div>
            <h4>사업자 정보</h4>
            <div style={{ lineHeight: 2 }}>
              {BRAND.entity}<br />
              대표변호사 {BRAND.adLawyer}<br />
              {BRAND.address}<br />
              사업자등록번호 {BRAND.bizNo}<br />
              전화 {BRAND.tel}<br />
              {BRAND.domain}
            </div>
          </div>
        </div>

        <div className="ftr__bot">
          <div>© {year} {BRAND.entity}. All rights reserved.</div>
          <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
            <button onClick={() => open('terms')}>이용약관</button>
            <button onClick={() => open('privacy')}>
              <b style={{ color: '#AEBCCB' }}>개인정보처리방침</b>
            </button>
            <button onClick={() => open('disclaimer')}>면책조항</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
