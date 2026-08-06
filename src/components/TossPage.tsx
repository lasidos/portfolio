import { useEffect, useRef, useState } from 'react';
import './TossPage.css';

const BASE = import.meta.env.BASE_URL;
const RESUME = `${BASE}${encodeURIComponent('경력기술서_유지혁.pdf')}`;
const ILRYEOK = `${BASE}${encodeURIComponent('이력서_20260214.pdf')}`;
const PORTFOLIO = `${BASE}${encodeURIComponent('포트폴리오_유지혁.pdf')}`;
const EMAIL = 'lasidos@naver.com';

const heroStats = [
  { value: '15년+', label: '실무 경력' },
  { value: '15+', label: '배포한 서비스' },
  { value: 'AI Native', label: '백엔드 · 풀스택' },
];

const projects = [
  {
    role: 'Back-End',
    period: '2025 — 현재',
    title: '제조 빅데이터 플랫폼 (BDP-SCM)',
    body: '설비·공정·생산·품질·알람을 실시간으로 통합 관리하는 제조 빅데이터 플랫폼의 백엔드를 설계·구축했어요. Kafka 이벤트 처리와 WebSocket·SSE로 대량 데이터를 실시간 라우팅했습니다.',
    stats: [
      { value: '30+', label: '도메인 API' },
      { value: '실시간', label: 'Kafka · WebSocket' },
    ],
    stack: ['Java', 'Spring Boot', 'Kafka', 'WebSocket', 'Oracle', 'GCP'],
  },
  {
    role: 'Full-Stack',
    period: '2025 — 현재',
    title: '단지노트 · 부동산 정보 앱',
    body: '기획부터 배포까지 혼자 만들어 iOS·Android 양대 스토어에 정식 출시하고 운영 중이에요. AI를 오케스트레이션해 개발 속도와 품질을 동시에 끌어올렸습니다.',
    stats: [
      { value: 'iOS·Android', label: '정식 출시' },
      { value: '단독', label: '기획 ~ 운영' },
    ],
    stack: ['TypeScript', 'Node.js', 'React', 'REST API'],
  },
  {
    role: 'Back-End',
    period: '개인 프로젝트',
    title: 'PreopenKR · 금융 데이터 파이프라인',
    body: '프랑크푸르트 상장 한국 GDR의 야간 괴리율을 추적해요. 6종 품질 게이트로 이상을 감지하고, 2년 백테스트로 신호를 수치로 검증하는 데이터 파이프라인을 만들었습니다.',
    stats: [
      { value: '0.70', label: '백테스트 상관' },
      { value: '6종', label: '데이터 품질 게이트' },
    ],
    stack: ['Node.js', 'Express', 'Luxon', 'PWA'],
  },
  {
    role: 'Architecture',
    period: '개인 프로젝트',
    title: 'RoomDeck · 숙박 무인 관제 플랫폼',
    body: '관제·업주·관리자·투숙객 앱과 엣지 게이트웨이를 pnpm 모노레포로 구성했어요. NestJS 기반 REST·WebSocket·MQTT 브로커 어댑터로 실시간 관제 이벤트를 처리하고 k6로 부하를 검증했습니다.',
    stats: [
      { value: '4앱 + GW', label: 'pnpm 모노레포' },
      { value: 'k6', label: '부하 테스트' },
    ],
    stack: ['NestJS', 'Prisma', 'WebSocket', 'MQTT', 'Docker'],
  },
  {
    role: 'AI',
    period: '개인 프로젝트',
    title: 'kakaoClaude · 카톡 Claude 챗봇',
    body: '카카오톡 오픈채팅 방별로 대화 컨텍스트를 분리·유지하는 Claude 챗봇 백엔드예요. Anthropic SDK로 프롬프트·응답을 처리하고 Express 세션으로 멀티룸 상태를 관리했습니다.',
    stats: [
      { value: 'Claude', label: 'Anthropic SDK' },
      { value: '방별', label: '컨텍스트 유지' },
    ],
    stack: ['Node.js', 'Express', 'Claude SDK'],
  },
  {
    role: 'AI',
    period: '개인 프로젝트',
    title: 'InsightForge · 다중 LLM 오케스트레이션',
    body: 'Claude·OpenAI를 목적에 맞게 선택·조합하는 LLM 오케스트레이션 앱이에요. 프롬프트 관리·응답 랭킹·토큰 비용 추적·모델 토론 모듈을 직접 설계했습니다.',
    stats: [
      { value: 'Claude+OpenAI', label: '멀티 프로바이더' },
      { value: '비용·랭킹', label: 'LLM 오케스트레이션' },
    ],
    stack: ['Next.js 15', 'TypeScript', 'Claude SDK', 'OpenAI'],
  },
  {
    role: 'Full-Stack',
    period: '개인 프로젝트',
    title: 'TripVoice · 여행 회화·도착알림 앱',
    body: '여행 회화·일정·위치 기반 도착 알림을 하나로 묶은 크로스플랫폼 앱을 기획·구현·배포했어요. AI로 회화 콘텐츠와 다국어 처리를 빠르게 구성했습니다.',
    stats: [
      { value: 'iOS·Android·Web', label: 'Capacitor' },
      { value: '실시간', label: '위치 도착 알림' },
    ],
    stack: ['Capacitor', 'Web SPA', 'Node.js'],
  },
  {
    role: 'Back-End',
    period: '2023 — 2024',
    title: '잡코리아 · 채용 플랫폼 운영',
    body: '대용량 트래픽의 채용 플랫폼 웹 서비스를 운영하며 API 구조 정비와 쿼리(LINQ·Dapper) 최적화로 성능을 안정화하고 주요 기능을 고도화했습니다.',
    stats: [
      { value: '대용량', label: '트래픽 운영' },
      { value: '성능', label: '쿼리 최적화' },
    ],
    stack: ['ASP.NET MVC', 'MSSQL', 'LINQ', 'Dapper'],
  },
  {
    role: 'Back-End',
    period: '2021 — 2022',
    title: 'Smart36 OTP · 설치기사 앱',
    body: '구글 OTP·Windows 잠금화면 연동 인증 관리 웹과 쿠팡 설치기사 앱을 신규 개발했어요. ASP.NET·React Native·Android로 웹·API·모바일을 함께 구현했습니다.',
    stats: [
      { value: 'OTP', label: '보안 인증' },
      { value: '웹·API·앱', label: 'AOS · iOS' },
    ],
    stack: ['ASP.NET', 'React Native', 'Android', 'MSSQL'],
  },
  {
    role: 'Full-Stack',
    period: '2019 — 2020',
    title: '기후·대기 의사결정지원 시스템',
    body: '국립환경과학원 기후·대기 연구 데이터를 활용한 의사결정지원 시스템을 신규 개발했어요. 데이터 관리 DB 설계와 시각화, 다기관 요구사항 분석을 담당했습니다.',
    stats: [
      { value: '연구 DB', label: '설계' },
      { value: '시각화', label: '의사결정 지원' },
    ],
    stack: ['C#', 'WinForm', 'MSSQL', 'Android'],
  },
  {
    role: 'PM·PL',
    period: '2010 — 2019',
    title: 'RPA 업무 자동화 · 광고 CRM',
    body: '광고·영업 운영의 반복 업무를 자동화하는 RPA 시스템을 10년 이상 설계·운영했어요. 데이터 수집·가공 파이프라인을 구축하고 다수 프로젝트를 PM/PL로 이끌었습니다.',
    stats: [
      { value: '10년+', label: 'RPA 설계·운영' },
      { value: '파이프라인', label: '데이터 수집·가공' },
    ],
    stack: ['C# WinForm', 'MSSQL', 'Android', 'PHP'],
  },
];

const strengths = [
  { no: '01', title: '경계를 넘어 원인까지', body: '화면에서 보이는 증상의 원인이 쿼리나 인프라에 있는 경우가 많아요. 레이어를 가리지 않고 끝까지 따라가 문제를 해결합니다.' },
  { no: '02', title: 'AI를 파트너로', body: 'Claude·Cursor를 단순 자동완성이 아니라 설계·검증 파트너로 오케스트레이션해요. 위임할 부분과 코드가 책임질 부분을 나눕니다.' },
  { no: '03', title: '운영까지 책임지기', body: '배포하고 끝내지 않아요. 이상 감지·모니터링·정합성 대사까지 만들어 새벽에 깨지 않는 시스템을 지향합니다.' },
];

const stackGroups = [
  { label: 'Frontend', items: 'React · React Native · TypeScript · Vite · PWA' },
  { label: 'Backend', items: 'Java · Spring Boot · NestJS · Node.js · ASP.NET · Python' },
  { label: 'Data · 실시간', items: 'Oracle · MSSQL · PostgreSQL · Kafka · WebSocket · MQTT · Prisma' },
  { label: 'AI · Infra', items: 'Claude · OpenAI · Cursor · GCP · Docker · Jenkins · SAP JCo' },
];

const career = [
  { period: '2025.07 — 현재', org: '이우코퍼레이션 · 리드피플', role: 'Back-End Engineer (프리랜서)', body: 'TCC Steel 제조 빅데이터 플랫폼(BDP-SCM)의 백엔드를 설계·구축했습니다. Kafka 실시간 이벤트 처리와 30여 개 도메인 API, SAP·GCP 연동을 담당했습니다.' },
  { period: '2021 — 2025', org: '스마트삼육 · 엠아이에이치 등', role: 'Full-stack Engineer', body: 'Smart36 OTP·설치기사 앱을 신규 개발하고, 잡코리아 등 대형 웹 서비스를 운영하며 API 구조 정비와 쿼리 최적화로 성능을 안정화했습니다.' },
  { period: '2016 — 2020', org: '퍼블릭애드 · 그린에코스 등', role: '과장 · PM / PL', body: '광고 플랫폼 CRM·RPA와 환경부 과제를 PM/PL로 설계·개발했습니다. 반복 업무 자동화와 데이터 수집·가공 파이프라인을 구축했습니다.' },
  { period: '2010 — 2016', org: '애드인스토어 · 화담미디어', role: '개발 · 매니저', body: 'C# WinForm 기반 RPA와 광고주 관리 CRM을 신규 개발하며 개발 커리어를 시작했습니다. 조직의 업무 흐름을 코드로 개선했습니다.' },
];

const links = [
  { label: 'GitHub', value: '@lasidos', href: 'https://github.com/lasidos' },
  { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
  { label: 'Portfolio', value: 'lasidos.github.io', href: BASE },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export function TossPage() {
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, 4);
  const fifthRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (showAll && fifthRef.current) {
      fifthRef.current.focus({ preventScroll: true });
      fifthRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showAll]);

  return (
    <div className="tp">
      {/* Header */}
      <header className="tp-header">
        <button className="tp-brand" style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => scrollTo('top')}>유지혁</button>
        <nav className="tp-nav">
          <button className="tp-nav-link" onClick={() => scrollTo('work')}>프로젝트</button>
          <button className="tp-nav-link" onClick={() => scrollTo('about')}>소개</button>
          <button className="tp-nav-link" onClick={() => scrollTo('career')}>경력</button>
          <button className="tp-nav-cta" onClick={() => scrollTo('contact')}>연락하기</button>
        </nav>
      </header>

      {/* Hero */}
      <section id="top" style={{ padding: '84px 0 96px' }}>
        <h1 className="tp-h1" style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.28, letterSpacing: '-0.035em', margin: '0 0 28px' }}>
          화면부터 서버까지,<br />
          혼자서도 <span style={{ color: '#3182f6' }}>끝까지</span> 만듭니다.
        </h1>
        <p style={{ fontSize: 20, lineHeight: 1.65, color: '#4e5968', margin: '0 0 40px', maxWidth: '32em' }}>
          15년간 제조·커머스·금융 도메인에서 실시간 데이터 시스템을 설계·운영했고,
          AI를 파트너 삼아 아이디어를 실제 출시되는 제품으로 만들어 왔습니다.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 56 }}>
          <button className="tp-btn tp-btn-primary" style={{ border: 'none', cursor: 'pointer' }} onClick={() => scrollTo('work')}>프로젝트 보기</button>
          <a className="tp-btn tp-btn-soft" href={RESUME} download>경력기술서 받기</a>
        </div>
        <div className="tp-g3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {heroStats.map((s, i) => (
            <div key={i} style={{ background: '#f9fafb', borderRadius: 20, padding: '26px 24px' }}>
              <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-0.04em', color: '#191f28' }}>{s.value}</div>
              <div style={{ fontSize: 15, fontWeight: 500, color: '#8b95a1', marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Work */}
      <section id="work" style={{ padding: '40px 0 96px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, marginBottom: 40, flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, color: '#3182f6', margin: '0 0 12px' }}>Selected Work</p>
            <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.32, margin: 0 }}>
              만든 것들과,<br />그래서 달라진 경험
            </h2>
          </div>
          {projects.length > 4 && (
            <button
              type="button"
              className="tp-more"
              onClick={() => setShowAll((v) => !v)}
            >
              {showAll ? '접기' : `프로젝트 ${projects.length - 4}개 더보기`}
              <span style={{ fontSize: 13 }}>{showAll ? '‹' : '›'}</span>
            </button>
          )}
        </div>
        <div className="tp-g2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {visibleProjects.map((p, i) => (
            <article
              key={i}
              className="tp-card tp-rv"
              ref={i === 4 ? fifthRef : undefined}
              tabIndex={i === 4 ? -1 : undefined}
              style={{ scrollMarginTop: 88, outline: 'none' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#8b95a1', background: '#f2f4f6', padding: '6px 12px', borderRadius: 999 }}>{p.role}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#b0b8c1' }}>{p.period}</span>
              </div>
              <h3 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.35, margin: '0 0 12px' }}>{p.title}</h3>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: '#4e5968', margin: '0 0 24px', flex: 1 }}>{p.body}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                {p.stats.map((s, j) => (
                  <div key={j} style={{ background: '#f9fafb', borderRadius: 16, padding: '18px 20px' }}>
                    <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.04em', color: '#3182f6' }}>{s.value}</div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: '#8b95a1', marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {p.stack.map((t) => (
                  <span key={t} style={{ fontSize: 13, fontWeight: 600, color: '#6b7684', background: '#f2f4f6', padding: '6px 11px', borderRadius: 8 }}>{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" style={{ padding: '40px 0 96px' }}>
        <p style={{ fontSize: 15, fontWeight: 700, color: '#3182f6', margin: '0 0 12px' }}>About</p>
        <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.32, margin: '0 0 16px' }}>
          6개월 뒤의 동료가<br />읽을 것을 전제로 씁니다
        </h2>
        <p style={{ fontSize: 19, lineHeight: 1.7, color: '#4e5968', margin: '0 0 44px', maxWidth: '34em' }}>
          혼자 빨리 가는 것보다, 팀이 계속 굴릴 수 있는 코드를 남기는 쪽을 택해요.
        </p>
        <div className="tp-g3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 56 }}>
          {strengths.map((s) => (
            <div key={s.no} className="tp-rv" style={{ background: '#f9fafb', borderRadius: 24, padding: 30 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: '#e8f3ff', color: '#3182f6', fontSize: 18, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>{s.no}</div>
              <h3 style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-0.03em', margin: '0 0 10px' }}>{s.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: '#6b7684', margin: 0 }}>{s.body}</p>
            </div>
          ))}
        </div>
        <div style={{ background: '#fff', border: '1px solid #f2f4f6', borderRadius: 24, padding: '12px 32px' }}>
          {stackGroups.map((g, i) => (
            <div key={g.label} className="tp-row" style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: 24, alignItems: 'baseline', padding: '22px 0', borderBottom: i === stackGroups.length - 1 ? 'none' : '1px solid #f2f4f6' }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#8b95a1' }}>{g.label}</span>
              <span style={{ fontSize: 16, fontWeight: 500, color: '#333d4b', lineHeight: 1.6 }}>{g.items}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Career */}
      <section id="career" style={{ padding: '40px 0 96px' }}>
        <p style={{ fontSize: 15, fontWeight: 700, color: '#3182f6', margin: '0 0 12px' }}>Career</p>
        <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.32, margin: '0 0 40px' }}>지나온 자리</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {career.map((c, i) => (
            <div key={i} className="tp-rv tp-row" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 28, background: '#f9fafb', borderRadius: 24, padding: '30px 32px' }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#3182f6' }}>{c.period}</div>
                <div style={{ fontSize: 15, fontWeight: 500, color: '#8b95a1', marginTop: 4 }}>{c.org}</div>
              </div>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.03em', margin: '0 0 10px' }}>{c.role}</h3>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: '#4e5968', margin: 0 }}>{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="tp-contact" style={{ background: '#191f28', borderRadius: 32, padding: '72px 56px', marginTop: 24 }}>
        <h2 style={{ fontSize: 42, fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.32, color: '#fff', margin: '0 0 16px' }}>
          같이 만들 것이 있다면<br />편하게 알려주세요
        </h2>
        <p style={{ fontSize: 18, lineHeight: 1.7, color: '#8b95a1', margin: '0 0 36px' }}>보통 하루 안에 답장 드려요.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 56 }}>
          <a className="tp-btn tp-cbtn tp-btn-dark-primary" href={`mailto:${EMAIL}`}>이메일 보내기</a>
          <a className="tp-btn tp-cbtn tp-btn-dark-ghost" href={ILRYEOK} download>이력서 PDF</a>
          <a className="tp-btn tp-cbtn tp-btn-dark-ghost" href={PORTFOLIO} download>포트폴리오 PDF</a>
          <a className="tp-btn tp-cbtn tp-btn-dark-ghost" href={RESUME} download>경력기술서 PDF</a>
        </div>
        <div className="tp-g3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {links.map((l) => (
            <a key={l.label} className="tp-clink" href={l.href} target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,.06)', borderRadius: 18, padding: '22px 24px', display: 'block' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#8b95a1' }}>{l.label}</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginTop: 6, wordBreak: 'break-all' }}>{l.value}</div>
            </a>
          ))}
        </div>
        <p style={{ fontSize: 14, color: '#6b7684', margin: '56px 0 0' }}>© 2026. 유지혁</p>
      </section>
    </div>
  );
}
