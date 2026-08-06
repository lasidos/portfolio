export type Locale = 'ko' | 'en' | 'ja';

export interface ProjectItem {
  title: string;
  period: string;
  type: string;
  description: string;
  achievements: string[];
  stack: string;
  github?: string;
  /** 목업 카드의 지표 2박스 (value + label) */
  stats?: { value: string; label: string }[];
}

export interface CareerItem {
  company: string;
  role: string;
  period: string;
  duration: string;
  description: string;
  stack: string;
}

export interface CertificateItem {
  name: string;
  issuer: string;
  date: string;
}

export interface Translation {
  nav: {
    home: string;
    profile: string;
    introduce: string;
    skills: string;
    project: string;
    career: string;
    menu: string;
    contact: string;
  };
  hero: {
    sub: string;
    tagline: string;
    badge: string;
    /** {accent}로 강조 단어 표시 */
    headline: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: { value: string; label: string }[];
  };
  profile: {
    sectionTitle: string;
    name: string;
    nameEn: string;
    role: string;
    email: string;
    phone: string;
    location: string;
    github: string;
    portfolio: string;
    portfolioUrl: string;
    expandContact: string;
    collapseContact: string;
    offerButton: string;
    offerModalTitle: string;
    offerSubject: string;
    offerSubjectPlaceholder: string;
    offerBody: string;
    offerBodyPlaceholder: string;
    offerAmount: string;
    offerAmountPlaceholder: string;
    offerAmountError: string;
    offerCc: string;
    offerCcPlaceholder: string;
    offerSubmit: string;
    offerClose: string;
    resumeDownload: string;
    portfolioDownload: string;
  };
  introduce: {
    sectionTitle: string;
    title: string;
    paragraphs: string[];
    summary: string;
  };
  skills: {
    sectionTitle: string;
    primaryStack: string;
    experiencedWith: string;
    toolsAndEnvironment: string;
    prev: string;
    next: string;
    list: {
      primaryStack: string[];
      experiencedWith: string[];
      toolsAndEnvironment: string[];
    };
    /** 스킬명 → 호버 툴팁 설명 (키: list와 동일한 문자열) */
    descriptions: Record<string, string>;
  };
  projects: {
    sectionTitle: string;
    whatIdid: string;
    stack: string;
    github: string;
    periodLabel: string;
    typeLabel: string;
    expandProject: string;
    collapseProject: string;
    tabWork: string;
    tabPersonal: string;
    items: ProjectItem[];
  };
  career: {
    sectionTitle: string;
    dashboard: {
      companies: string;
      certificates: string;
      current: string;
      chartTitle: string;
      chartHint: string;
      /** 카드 라벨: 경력, 주요 프로젝트, 도메인 경험 */
      careers: string;
      projects: string;
      domains: string;
      /** 도메인 경험 상세 목록 (카드 클릭 시 노출) */
      domainList: string[];
      /** 연수 단위 (항목별 년수 표시용) */
      yearUnit: string;
      /** 개월 단위 (경력 합계 표시용) */
      monthUnit: string;
      /** 경력 상세 모달: 년수 합계 라벨 */
      totalCareerYearsLabel: string;
      /** 역량 레이더 차트 제목 */
      radarTitle: string;
      /** 역량 레이더 차트 힌트 */
      radarHint: string;
      /** 역량 레이더 축 라벨 (7개, 값과 순서 일치) */
      radarAxes: string[];
      /** 핵심 성과 섹션 제목 */
      achievementsTitle: string;
      /** 핵심 성과 하이라이트 카드 */
      achievements: { title: string; desc: string }[];
    };
    certificatesTitle: string;
    hopeTitle: string;
    hopeLabels: {
      employment: string;
      location: string;
      salary: string;
      position: string;
    };
    items: CareerItem[];
    hope: {
      employment: string;
      location: string;
      salary: string;
      position: string;
    };
    certificates: CertificateItem[];
  };
  footer: {
    copyright: string;
    downloadTitle: string;
    career: string;
    portfolio: string;
    skill: string;
    contactTitle: string;
    contactSubtitle: string;
    emailCta: string;
    resumeCta: string;
  };
}
