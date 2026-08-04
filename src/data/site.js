/* ────────────────────────────────────────────
   사이트 전역 데이터 — 운영 정보는 여기만 고치면 됩니다.
   ──────────────────────────────────────────── */

export const BRAND = {
  name: 'Lawful',
  nameKo: '로풀',
  entity: '법무법인 로풀',
  tagline: '법률 정보는 AI가, 판단은 변호사가',
  domain: 'www.lawful.co.kr',
  url: 'https://www.lawful.co.kr',
  tel: '02-000-0000',
  telHours: '평일 09:30–18:00',
  kakao: '@lawful',
  email: 'counsel@lawful.co.kr',
  privacyEmail: 'privacy@lawful.co.kr',
  address: '서울특별시 서초구 서초대로 000, 00층',
  bizNo: '000-00-00000',
  adLawyer: '서지환',
  adLawyerReg: '00000',
  updated: '2026년 6월 1일'
}

export const FIELDS = [
  { key: '이혼·가사',      desc: '협의·재판상 이혼 절차, 재산분할과 양육권의 일반 기준, 준비 서류' },
  { key: '상속',          desc: '상속 순위와 법정상속분, 한정승인·상속포기 기한, 유류분의 개념' },
  { key: '부동산·임대차',  desc: '보증금 반환, 대항력과 우선변제권, 계약 갱신과 명도 절차' },
  { key: '노동',          desc: '부당해고 구제신청, 임금·퇴직금 체불, 직장 내 괴롭힘 신고 절차' },
  { key: '형사',          desc: '고소·고발과 수사 절차, 피의자·피해자의 권리, 조사 전 준비' },
  { key: '계약·채권',      desc: '계약 해제와 손해배상의 구조, 내용증명, 지급명령과 소멸시효' }
]

export const LAWYERS = [
  {
    name: '서지환', initial: '徐', reg: '00000',
    fields: ['이혼·가사', '상속'],
    career: ['제00회 변호사시험 합격', '가사·상속 전문 등록', '가정법원 조정위원 역임']
  },
  {
    name: '문해린', initial: '文', reg: '00000',
    fields: ['부동산·임대차', '계약·채권'],
    career: ['제00회 변호사시험 합격', '부동산 분쟁 다수 수행', '주택임대차분쟁조정위원회 자문']
  },
  {
    name: '강도윤', initial: '姜', reg: '00000',
    fields: ['형사', '노동'],
    career: ['제00회 변호사시험 합격', '검찰 수사 대응 실무', '노동위원회 국선노무 지원 경력']
  }
]

export const ARTICLES = [
  {
    id: 'deposit-return',
    cat: '부동산·임대차',
    title: '전세보증금을 못 받았을 때, 순서대로 확인할 것',
    desc: '대항력과 우선변제권이 유지되고 있는지부터 확인해야 합니다. 임차권등기명령의 시점과 효과를 정리했습니다.',
    date: '2026.05.20', read: '6분'
  },
  {
    id: 'inheritance-waiver',
    cat: '상속',
    title: '상속포기와 한정승인, 3개월이라는 기한',
    desc: '기한을 넘기면 단순승인으로 간주되어 빚도 함께 상속됩니다. 기산점을 언제로 볼지가 핵심입니다.',
    date: '2026.05.11', read: '7분'
  },
  {
    id: 'unfair-dismissal',
    cat: '노동',
    title: '부당해고 구제신청은 해고일로부터 3개월',
    desc: '노동위원회 구제신청과 민사소송의 차이, 각각에 필요한 증거를 비교했습니다.',
    date: '2026.04.28', read: '5분'
  },
  {
    id: 'divorce-types',
    cat: '이혼·가사',
    title: '협의이혼과 재판상 이혼은 무엇이 다른가',
    desc: '숙려기간, 필요한 서류, 재산분할과 양육권이 정해지는 방식의 차이를 정리했습니다.',
    date: '2026.04.15', read: '8분'
  },
  {
    id: 'police-summons',
    cat: '형사',
    title: '경찰 출석 요구를 받았다면 준비할 것',
    desc: '피의자와 참고인의 지위 차이, 진술거부권과 변호인 조력권이 실제로 작동하는 방식.',
    date: '2026.03.30', read: '6분'
  },
  {
    id: 'certified-mail',
    cat: '계약·채권',
    title: '내용증명은 언제 의미가 있고 언제 형식에 그치는가',
    desc: '내용증명 자체에는 법적 강제력이 없습니다. 그럼에도 보내는 실질적인 이유를 설명합니다.',
    date: '2026.03.18', read: '5분'
  },
  {
    id: 'lease-renewal',
    cat: '부동산·임대차',
    title: '계약갱신요구권, 언제까지 어떻게 행사하나',
    desc: '행사 기간과 거절 사유, 갱신 후 임대료 인상 한도에 관한 일반 기준.',
    date: '2026.03.02', read: '6분'
  },
  {
    id: 'forced-share',
    cat: '상속',
    title: '유류분이란 무엇이고 누가 청구할 수 있나',
    desc: '법정상속분과 유류분의 관계, 청구 기간과 산정의 기본 구조.',
    date: '2026.02.19', read: '7분'
  }
]

export const PLANS = [
  {
    name: 'AI 법률 정보 안내', price: '무료', unit: '', sub: '횟수 제한 없음',
    items: ['24시간 즉시 응답', '절차·기한·준비 서류 안내', '상담 유형 분류', '상담 요약 생성'],
    cta: { label: '지금 시작', to: '/chat' }, primary: false
  },
  {
    name: '변호사 상담 30분', price: '55,000원', unit: '/ 회', sub: '전화 또는 화상',
    items: ['AI 상담 요약 사전 전달', '사건 쟁점 정리', '대응 방향과 예상 절차 안내', '수임 시 상담료 전액 공제'],
    cta: { label: '상담 신청', to: '/apply' }, primary: true
  },
  {
    name: '방문 상담 60분', price: '110,000원', unit: '/ 회', sub: '사무소 방문',
    items: ['서류 원본 검토 포함', '사건 기록 열람 후 상담', '서면 의견 요약 제공', '수임 시 상담료 전액 공제'],
    cta: { label: '상담 신청', to: '/apply' }, primary: false
  }
]

export const DISCLAIMER_SHORT =
  '본 답변은 일반적인 법률 정보이며, 귀하의 사안에 대한 법률 자문이 아닙니다.'
