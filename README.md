# 유지혁 포트폴리오

풀스택 개발자 유지혁의 포트폴리오 사이트입니다.

- **기술 스택**: React 18, TypeScript, Vite
- **참고**: [ssongmi.github.io](https://ssongmi.github.io/) 스타일 반영

## PDF 파일

플로팅 버튼에서 사용하는 파일:

- **이력서 다운로드**: `public/이력서_20260214.pdf` (직접 추가)
- **포트폴리오 PDF**: `public/portfolio.pdf` — `src/data.ts` 기준으로 자동 생성

포트폴리오 PDF 재생성:

```bash
npm run generate-pdf
```

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:5173 으로 접속합니다.

## 빌드

```bash
npm run build
```

`dist` 폴더에 정적 파일이 생성됩니다.

## GitHub Pages 배포

### 사전 조건

- **Git 저장소 + GitHub 원격 필수**: `npm run deploy`는 `git remote origin`이 있어야 동작합니다.
- GitHub에 빈 저장소를 만든 뒤:
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
  git branch -M main
  git push -u origin main
  ```
- 원격 없이 한 번만 배포하려면:  
  `npx gh-pages -d dist -r https://github.com/YOUR_USERNAME/portfolio.git`  
  (YOUR_USERNAME을 본인 GitHub 사용자명으로 바꾸세요.)

### 방법 1: gh-pages 패키지 (수동 배포)

1. 저장소 설정에서 **Settings → Pages** 에서 Source를 **Deploy from a branch** 로 두고, Branch는 **gh-pages** / **(root)** 로 설정합니다(스크립트가 `gh-pages` 브랜치에 푸시합니다).

2. **Repository name**이 `portfolio`인 경우  
   `vite.config.ts`의 `base: '/portfolio/'` 를 유지합니다.

3. **Repository name**이 `{username}.github.io` 인 경우(사용자/조직 페이지)  
   `vite.config.ts`에서 `base: '/'` 로 변경한 뒤 빌드합니다.

4. 배포 실행:

```bash
npm run deploy
```

최초 1회 GitHub 인증이 필요할 수 있습니다. 배포 후 주소는 다음과 같습니다.

- `https://{username}.github.io/portfolio/` (repo 이름이 portfolio일 때)
- `https://{username}.github.io/` (repo 이름이 {username}.github.io일 때)

### 방법 2: GitHub Actions (자동 배포)

`main` 브랜치에 푸시할 때마다 자동으로 GitHub Pages에 배포하려면 `.github/workflows/deploy.yml` 이 포함되어 있습니다.  
저장소 **Settings → Pages** 에서 Source를 **GitHub Actions** 로 선택하면 됩니다.

## 프로젝트 구조

```
src/
  components/   # Hero, Profile, Introduce, Skills, Projects, Career, Footer, Nav
  data.ts       # 프로필·경력·프로젝트 데이터
  App.tsx
  main.tsx
  index.css
```

이력서 내용은 `src/data.ts` 에서 수정할 수 있습니다.
