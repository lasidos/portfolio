/**
 * 포트폴리오 데이터로 HTML을 만들고 Puppeteer로 public/portfolio.pdf 생성
 * 실행: npx tsx scripts/generate-portfolio-pdf.ts
 */
import puppeteer from 'puppeteer';
import { profile, introduce, skills, projects, certificates } from '../src/data';
import type { ProjectItem } from '../src/data';

/** period에서 시작 연도 추출 (최신순 정렬용). 없으면 0 */
function projectStartYear(period: string): number {
  const m = period.match(/\d{4}/);
  return m ? parseInt(m[0], 10) : 0;
}

/** 프로젝트 최신순 정렬 */
function projectsLatestFirst(): ProjectItem[] {
  return [...projects].sort((a, b) => projectStartYear(b.period) - projectStartYear(a.period));
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildHtml(): string {
  const sections: string[] = [];

  sections.push(`
    <header style="margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 2px solid #6366f1;">
      <h1 style="margin: 0; font-size: 1.75rem; font-weight: 700;">${escapeHtml(profile.name)}</h1>
      <p style="margin: 0.25rem 0 0; font-size: 0.95rem; color: #64748b;">${escapeHtml(profile.nameEn)} · ${escapeHtml(profile.role)}</p>
      <p style="margin: 0.5rem 0 0; font-size: 0.85rem; color: #64748b;">${escapeHtml(profile.email)} | ${escapeHtml(profile.phone)} | ${escapeHtml(profile.location)}</p>
    </header>
  `);

  sections.push(`
    <section style="margin-bottom: 1.5rem;">
      <h2 style="margin: 0 0 0.5rem; font-size: 1rem; font-weight: 700; color: #6366f1; text-transform: uppercase; letter-spacing: 0.05em;">Introduce</h2>
      <h3 style="margin: 0 0 0.75rem; font-size: 1.1rem;">${escapeHtml(introduce.title)}</h3>
      ${introduce.paragraphs.map((p) => `<p style="margin: 0 0 0.5rem; font-size: 0.9rem; line-height: 1.6;">${escapeHtml(p)}</p>`).join('')}
      <p style="margin: 0.5rem 0 0; font-size: 0.9rem; font-weight: 600;">${escapeHtml(introduce.summary)}</p>
    </section>
  `);

  sections.push(`
    <section style="margin-bottom: 1.5rem;">
      <h2 style="margin: 0 0 0.5rem; font-size: 1rem; font-weight: 700; color: #6366f1; text-transform: uppercase;">Skills</h2>
      <p style="margin: 0 0 0.25rem; font-size: 0.8rem; color: #64748b;">주력</p>
      <p style="margin: 0 0 0.75rem; font-size: 0.9rem;">${escapeHtml(skills.familiar.join(', '))}</p>
      <p style="margin: 0 0 0.25rem; font-size: 0.8rem; color: #64748b;">경험</p>
      <p style="margin: 0; font-size: 0.9rem;">${escapeHtml(skills.tried.join(', '))}</p>
    </section>
  `);

  const sortedProjects = projectsLatestFirst();
  sections.push(`
    <section style="margin-bottom: 1.5rem;">
      <h2 style="margin: 0 0 0.75rem; font-size: 1rem; font-weight: 700; color: #6366f1; text-transform: uppercase;">Project</h2>
      ${sortedProjects
        .map(
          (pr) => `
        <div style="margin-bottom: 1rem; padding: 0.75rem; background: #f8fafc; border-radius: 6px;">
          <p style="margin: 0 0 0.25rem; font-size: 0.95rem; font-weight: 600;">${escapeHtml(pr.title)}</p>
          <p style="margin: 0; font-size: 0.8rem; color: #64748b;">${escapeHtml(pr.period)} · ${escapeHtml(pr.type)}</p>
          <p style="margin: 0.5rem 0 0; font-size: 0.85rem; line-height: 1.5;">${escapeHtml(pr.description)}</p>
          <ul style="margin: 0.5rem 0 0 1.25rem; font-size: 0.85rem; line-height: 1.5;">
            ${pr.achievements.map((a) => `<li>${escapeHtml(a)}</li>`).join('')}
          </ul>
          <p style="margin: 0.5rem 0 0; font-size: 0.8rem; color: #64748b;">${escapeHtml(pr.stack)}</p>
        </div>
      `
        )
        .join('')}
    </section>
  `);

  sections.push(`
    <section>
      <h2 style="margin: 0 0 0.5rem; font-size: 1rem; font-weight: 700; color: #6366f1; text-transform: uppercase;">Certificates</h2>
      ${certificates.map((c) => `<p style="margin: 0 0 0.25rem; font-size: 0.9rem;">${escapeHtml(c.name)} (${escapeHtml(c.issuer)}, ${escapeHtml(c.date)})</p>`).join('')}
    </section>
  `);

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(profile.name)} - Portfolio</title>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: 'Noto Sans KR', sans-serif;
      font-size: 10pt;
      line-height: 1.5;
      color: #334155;
      margin: 0;
      padding: 24px 32px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    a { text-decoration: none; }
    h1, h2, h3 { font-family: 'Noto Sans KR', sans-serif; }
  </style>
</head>
<body>
  ${sections.join('\n')}
</body>
</html>`;
}

async function main(): Promise<void> {
  const html = buildHtml();
  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setContent(html, {
      waitUntil: 'networkidle0',
      timeout: 10000,
    });
    await page.pdf({
      path: 'public/portfolio.pdf',
      format: 'a4',
      margin: { top: '20mm', right: '18mm', bottom: '20mm', left: '18mm' },
      printBackground: true,
    });
    console.log('Generated public/portfolio.pdf');
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
