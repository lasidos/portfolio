export const profile = {
  name: '유지혁',
  nameEn: 'YOO JIHYEOK',
  role: 'Full Stack Developer',
  email: 'lasidos@naver.com',
  phone: '010-4523-6314',
  github: 'https://github.com/lasidos',
  portfolioRepo: 'https://github.com/lasidos/DataCrawling_Web',
  location: '인천 서구 불로동',
} as const;

export const introduce = {
  title: '개발로 성과를 만드는 사람',
  paragraphs: [
    '광고대행사를 운영하며 조직의 전반적인 업무 흐름과 시스템 구조를 직접 설계하고 개선해왔습니다. 마케팅·영업·운영·정산 등 각 파트의 연결 지점을 이해하며, 비효율을 줄이기 위한 방법으로 개발을 시작했습니다.',
    '필요에 의해 시작했지만, 개발은 단순한 도구가 아닌 핵심 역량이 되었습니다. 서비스 기획부터 설계, 구현, 운영까지 전 과정을 수행하며 풀스택 개발자로 성장했습니다. 단순히 기능을 만드는 것이 아니라, 확장성과 유지보수를 고려한 구조를 설계하는 개발을 지향합니다.',
    '실무 기반의 경력 개발자로서 핵심 기능을 직접 구현하는 동시에, 프로젝트 상황에 따라 PL·PM 역할도 수행해왔습니다. 요구사항을 구체화하고 일정과 리소스를 조율하며 리스크를 사전에 관리하는 실행형 리딩을 경험했습니다.',
    '최근에는 Kafka 기반 이벤트 처리 구조를 설계하고, WebSocket 및 SSE를 활용한 실시간 제조 모니터링 시스템을 구축했습니다. Cursor, Claude Code 등 AI 기반 개발 도구를 활용해 설계 검증, 코드 리팩토링, 테스트 보완을 수행하고 있습니다.',
  ],
  summary: '코드로 결과를 만드는 개발자이면서, 필요하다면 팀을 이끌 수 있는 실행형 기술 리더입니다.',
} as const;

export const skills = {
  familiar: ['Java', 'Spring Boot', 'ASP.NET', 'React', 'React Native', 'JavaScript', 'TypeScript', 'MSSQL', 'Oracle', 'MyBatis', 'Kafka', 'WebSocket', 'REST API'],
  tried: ['Python', 'Node.js', 'Android(Java)', 'Swift', 'Jenkins', 'GCP', 'Jira', 'GitHub', 'MSA', 'Dapper', 'Entity Framework', 'Hibernate'],
  language: ['JavaScript', 'TypeScript', 'Java', 'C#', 'SQL', 'Python'],
} as const;

export interface ProjectItem {
  title: string;
  period: string;
  type: string;
  description: string;
  achievements: string[];
  stack: string;
  github?: string;
}

export const projects: ProjectItem[] = [
  {
    title: 'TCC Steel BDP-SCM System',
    period: '2025.07 ~ 재직 중',
    type: '프리랜서',
    description: 'Big Data Platform 기반 제조 통합 관리 시스템. 설비·공정·생산·알람 통합 모니터링 및 관리.',
    achievements: [
      'Kafka 기반 이벤트 처리 및 WebSocket·SSE 실시간 데이터 전송 구조 구축',
      '설비·라인·태그 매핑 구조 설계 및 공정 흐름 시각화 기능 구현',
      'Cron/Interval 기반 배치 스케줄러 설계 및 실행 이력 관리 체계 구축',
    ],
    stack: 'Java, Spring Boot, MyBatis, React, Kafka, WebSocket, SAP JCo, Oracle, Jenkins, GCP',
  },
  {
    title: '스마트OTP / 쿠팡 설치기사 앱 (WHOSCM)',
    period: '2021.01 ~ 2022.12',
    type: '팀 프로젝트',
    description: 'OTP 기반 보안 인증 시스템 및 렌탈·배송·설치 기사 업무 시스템 개발 및 고도화.',
    achievements: [
      '구글 OTP 기반 인증 및 Windows 잠금화면 연동 기능 구현',
      '인증 관리 웹 시스템 설계 및 개발',
      '웹·API·모바일 애플리케이션 기능 개발 및 기사 업무 프로세스 개선',
    ],
    stack: 'ASP.NET MVC, WebForm, React Native, Android(Java), MSSQL, JavaScript, jQuery',
  },
  {
    title: '교원FC다이렉트',
    period: '경력 포함',
    type: '서비스 개발',
    description: '보험/금융 상품 관리 및 결제 시스템 개발.',
    achievements: [
      '상품 관리 및 결제 기능 구현',
      'React Native 기반 모바일 애플리케이션 개발',
      '서비스 운영 중 기능 개선 및 안정화 작업 수행',
    ],
    stack: 'React Native, ASP.NET, MSSQL',
  },
  {
    title: '잡코리아 / 천재교과서 CRM / ASE코리아 CRM',
    period: '2021 ~ 2025',
    type: '웹 서비스 운영',
    description: '채용 플랫폼·교육 CRM·문서/품질 CRM 웹 서비스 운영 및 구조 개선.',
    achievements: [
      'API 구조 정비 및 쿼리 개선을 통한 성능 안정화',
      'JSP/ASP.NET 기반 웹사이트 리뉴얼 및 유지보수',
      '사용자 피드백 기반 기능 개선 및 UI 고도화',
    ],
    stack: 'ASP.NET MVC, JSP, MyBatis, Hibernate, Oracle, MSSQL, JavaScript, jQuery',
  },
  {
    title: 'DataCrawling_Web',
    period: '-',
    type: '개인 프로젝트',
    description: '데이터 수집·크롤링 웹 프로젝트.',
    achievements: ['데이터 수집·처리 프로세스 구현'],
    stack: 'Web Crawling, Data Processing',
    github: 'https://github.com/lasidos/DataCrawling_Web',
  },
];

export interface CareerItem {
  company: string;
  role: string;
  period: string;
  duration: string;
  description: string;
  stack: string;
}

export const careers: CareerItem[] = [
  { company: '리드피플', role: '프리랜서 웹개발자', period: '2025.07 ~ 재직 중', duration: '재직 중', description: 'TCC Steel BDP-SCM System (제조 통합 관리)', stack: 'Java, Spring Boot, React, Kafka, WebSocket, Oracle, GCP' },
  { company: '이유시스템', role: '프리랜서 팀원 웹개발자', period: '2025.02 ~ 2025.06', duration: '5개월', description: 'ASE코리아 문서/품질 CRM 리뉴얼', stack: 'JSP, MyBatis, Hibernate, Oracle' },
  { company: '케스프리', role: '프리랜서 팀원 웹개발자', period: '2025.01 ~ 2025.02', duration: '2개월', description: '천재교과서 CRM 유지보수·성능 최적화', stack: 'ASP.NET MVC, MSSQL, Entity Framework' },
  { company: '엠아이에이치', role: '프리랜서 팀원 웹개발자', period: '2023.01 ~ 2024.12', duration: '2년', description: '잡코리아 웹사이트 유지보수·성능 최적화', stack: 'ASP.NET MVC, MSSQL, Jira' },
  { company: '(주)스마트삼육', role: '책임연구원 웹개발자', period: '2021.07 ~ 2022.12', duration: '1년 6개월', description: 'Smart36 OTP, 쿠팡 설치기사 앱 신규개발·유지보수', stack: 'ASP.NET, React Native, Android, MSSQL' },
  { company: '단감소프트', role: '프리랜서 팀원 웹개발자', period: '2021.01 ~ 2021.06', duration: '6개월', description: 'Smart36 쿠팡 설치기사 앱 신규개발', stack: 'WebForm, React Native, Android, MSSQL' },
  { company: '텔레씽크', role: '미디어플랫폼 과장', period: '2020.09 ~ 2021.01', duration: '5개월', description: 'KT CRM 유지보수·성능 최적화', stack: 'WebForm, MSSQL, MyBatis' },
  { company: '그린에코스', role: '환경계획부 과장', period: '2019.11 ~ 2020.09', duration: '11개월', description: '환경부 과제 C# WinForm·AOS 앱 개발', stack: 'WinForm, MSSQL, Android, Api' },
  { company: '퍼블릭애드', role: '광고플랫폼 과장', period: '2016.01 ~ 2019.09', duration: '3년 9개월', description: 'RPA·CRM C# WinForm·AOS PM 및 개발', stack: 'WinForm, MSSQL, Android, PHP, MySQL' },
  { company: '화담미디어', role: '과장', period: '2015.01 ~ 2016.01', duration: '1년 1개월', description: 'RPA C# WinForm PL 및 신규개발', stack: 'WinForm, MSSQL, Android, Node' },
  { company: '애드인스토어', role: '과장 매니저', period: '2010.09 ~ 2015.01', duration: '4년 5개월', description: 'RPA 및 광고주관리 CRM PM 및 신규개발', stack: 'WinForm, MSSQL, Android, Node, WebForm' },
];

export const hope = {
  employment: '정규직, 계약직, 프리랜서',
  location: '서울 전지역',
  salary: '면접 후 결정',
  position: '백엔드개발자(SI) · 프론트엔드개발자 · 웹개발자 · 앱개발자',
} as const;

export const certificates = [
  { name: 'SQL 개발자', issuer: '한국데이터산업진흥원', date: '2024.06' },
  { name: '1종 보통 운전면허', issuer: '경찰청(운전면허시험관리단)', date: '2002.01' },
] as const;
