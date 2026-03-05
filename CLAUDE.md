# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 언어 및 커뮤니케이션 규칙

- **응답 언어**: 한국어
- **코드 주석**: 한국어
- **커밋 메시지**: 한국어
- **문서화**: 한국어
- **변수명/함수명**: 영어 (코드 표준 준수)

## 개요

이 프로젝트는 **레거시 디자인 시스템(before)을 현대적인 디자인 시스템(after)으로 마이그레이션**하는 학습 과제입니다. pnpm 워크스페이스 기반의 모노레포 구조로 구성되어 있습니다.

## 주요 명령어

루트에서 두 패키지 모두 대상으로 실행:

```bash
pnpm dev:before        # before 패키지 개발 서버 (기본 pnpm dev와 동일)
pnpm dev:after         # after 패키지 개발 서버
pnpm build             # 전체 빌드
pnpm lint              # 전체 린트
pnpm test              # 전체 테스트 (watch 모드)
pnpm test:run          # 전체 테스트 (1회 실행)
pnpm storybook         # after 패키지 Storybook 실행
```

특정 패키지만 테스트:

```bash
pnpm test:run:before   # before 패키지 테스트만 실행
pnpm test:run:after    # after 패키지 테스트만 실행
```

패키지 내에서 직접 실행:

```bash
cd packages/before && pnpm test:run   # 특정 파일은 vitest run <파일경로>
```

## 아키텍처

### 모노레포 구조

```
packages/
├── before/   # 레거시 시스템 (분석/학습 대상, 수정 금지)
└── after/    # 현대적 디자인 시스템 (구현 대상)
```

두 패키지는 동일한 기술 스택(React 19, TypeScript, Vite, Vitest)을 사용하며, `@front_lite_chapter3-1/before`와 `@front_lite_chapter3-1/after`로 식별됩니다.

### before 패키지 - 레거시 구조

Atomic Design 패턴을 잘못 적용한 레거시 시스템으로, 다음 문제점들을 의도적으로 포함합니다:

- **혼재된 스타일링**: 인라인 `style={{}}`, CSS Modules(`className={styles.xxx}`), 하드코딩된 색상값(`#007bff`, `#d32f2f`) 혼용
- **불일치한 컴포넌트 API**: `FormInput`은 `helpText`, `FormSelect`는 `help`, `FormTextarea`는 `description` 같이 동일 역할의 prop이 컴포넌트마다 이름이 다름
- **서비스 레이어**: `postService`, `userService`가 `localStorage`를 직접 사용해 데이터 영속화

테스트는 `packages/before/src/pages/__tests__/ManagementPage.test.tsx`에 있으며, `localStorage.clear()`를 `beforeEach`에서 호출하는 패턴으로 상태를 격리합니다.

### after 패키지 - 목표 구조

README에서 정의한 목표 구조:

```
src/
├── components/ui/   # shadcn/ui 컴포넌트 (atoms/molecules 구분 없이 flat 구조)
├── tokens/          # 디자인 토큰
├── hooks/           # Custom Hooks
└── stories/         # Storybook stories
```

구현 목표: TailwindCSS + CVA(Class Variance Authority)를 이용한 variants 패턴, shadcn/ui 기반 컴포넌트, Radix UI 접근성, Storybook 문서화.

### 설정 공통사항

- `vite.config.ts`에 `@` → `./src` 경로 별칭 설정 (두 패키지 모두 동일)
- Vitest 환경: `jsdom`, globals 활성화, `src/test/setup.ts`에서 `@testing-library/jest-dom` 초기화
- ESLint: flat config 방식(`eslint.config.js`), typescript-eslint + react-hooks + react-refresh 플러그인
