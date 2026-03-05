# after 패키지 구현 워크플로우

before → after 마이그레이션 작업 순서입니다.
각 단계를 완료한 후 체크박스를 표시하면서 진행하세요.

---

## STEP 1. 환경 설정

> 나머지 모든 작업의 기반이 되므로 가장 먼저 완료해야 합니다.

- [ ] `packages/after`에 TailwindCSS v4 설치 및 설정 (`postcss.config.js`, `tailwind.config`)
- [ ] `packages/after`에 shadcn/ui 초기화 (`npx shadcn-ui@latest init`)
  - `components.json` 생성 확인
  - alias `@` 경로 설정 확인 (`vite.config.ts`에 이미 설정됨)
- [ ] `src/test/setup.ts` 및 Vitest 설정이 before와 동일하게 되어 있는지 확인

---

## STEP 2. 디자인 토큰 정의

> shadcn/ui가 CSS 변수 기반이므로 이 단계를 먼저 확정해야 이후 컴포넌트 작업이 흔들리지 않습니다.

- [ ] `src/tokens/` 디렉토리 생성
- [ ] `src/tokens/colors.css` — 시맨틱 색상 변수 정의

  ```css
  /* 예시 */
  :root {
    --color-primary: ...;
    --color-destructive: ...;
    --color-success: ...;
    --color-warning: ...;
    --color-muted: ...;
  }
  ```

- [ ] before의 하드코딩 색상값 목록 정리 후 토큰으로 매핑

  | before 하드코딩 | 토큰 이름 |
  |---|---|
  | `#007bff` | `--color-primary` |
  | `#d32f2f` | `--color-destructive` |
  | `#2e7d32` | `--color-success` |
  | `#ed6c02` | `--color-warning` |

---

## STEP 3. Button 컴포넌트

> before의 가장 심각한 문제(UI가 도메인 비즈니스 규칙 판단)를 해결하는 첫 번째 컴포넌트.
> CVA 패턴을 처음 적용하므로 이후 모든 컴포넌트의 기준이 됩니다.

**before의 문제점:**
- `entityType`, `action`, `entity` prop으로 비즈니스 규칙(관리자 삭제 불가 등)을 컴포넌트 내부에서 판단
- `action`에 따라 `variant`와 `children`을 자동 결정하는 로직 내장

**after 목표:**
- [ ] `npx shadcn-ui@latest add button` 또는 직접 구현
- [ ] CVA로 `variant` (default, primary, secondary, destructive, outline, ghost) 및 `size` (sm, md, lg) 정의
- [ ] 도메인 props(`entityType`, `action`, `entity`) 완전 제거 — 순수 UI 컴포넌트로
- [ ] Storybook story 작성 (`src/stories/Button.stories.tsx`)

---

## STEP 4. Badge 컴포넌트

**before의 문제점:**
- `status`, `userRole`, `priority`, `paymentStatus` 등 도메인 전용 props가 컴포넌트에 직접 존재
- 각 도메인 값에 따라 색상과 텍스트를 컴포넌트가 자동 결정

**after 목표:**
- [ ] `npx shadcn-ui@latest add badge` 또는 직접 구현
- [ ] CVA로 `variant` (default, secondary, destructive, outline, success, warning) 정의
- [ ] 도메인 props 완전 제거 — `children`과 `variant`만으로 표현
- [ ] 도메인별 매핑은 사용하는 쪽(Table, Page)에서 처리하도록 이관
- [ ] Storybook story 작성

---

## STEP 5. Form 컴포넌트 (Input / Select / Textarea)

> before에서 세 컴포넌트의 API가 모두 달랐던 것을 일관된 API로 통일합니다.

**before의 문제점:**

| 컴포넌트 | 도움말 prop 이름 | 크기 prop 이름 | 도메인 오염 |
|---|---|---|---|
| FormInput | `helpText` | `width` | `fieldType`, `entityType`, `checkBusinessRules` |
| FormSelect | `helpText` | `size` (선언만 되고 미사용) | 없음 |
| FormTextarea | `helpText` | 없음 | 없음 |

**after 목표:**
- [ ] `npx shadcn-ui@latest add input` (+ Label, Textarea 등)
- [ ] 세 컴포넌트 모두 동일한 구조: `label`, `helperText`, `error`, `required` prop 이름 통일
- [ ] FormInput에서 `fieldType`, `entityType`, `checkBusinessRules` 제거 — 검증 로직은 외부(React Hook Form + Zod 등)에 위임
- [ ] Storybook story 작성 (정상/에러/비활성 상태 포함)

---

## STEP 6. Alert 컴포넌트

> 비교적 구조가 단순하여 빠르게 완료할 수 있습니다.

**before의 문제점:**
- CSS 클래스(`alert-info`, `alert-error`)에 의존, 실제 스타일은 `components.css`에 산재

**after 목표:**
- [ ] `npx shadcn-ui@latest add alert` 또는 직접 구현
- [ ] CVA로 `variant` (default, info, success, warning, destructive) 정의
- [ ] Storybook story 작성

---

## STEP 7. Card 컴포넌트

> before에서 구조는 나쁘지 않으나 CSS 클래스 기반 스타일링을 Tailwind로 교체합니다.

- [ ] `npx shadcn-ui@latest add card`
- [ ] before의 `variant` prop(default, bordered, elevated, flat)을 Tailwind 유틸리티로 표현
- [ ] Storybook story 작성

---

## STEP 8. Modal 컴포넌트 (Dialog)

**before의 문제점:**
- `document.body.style.overflow` 직접 조작
- 키보드 접근성(ESC 키, focus trap) 미구현
- `size` prop이 `small | medium | large` — 통일된 토큰 없음

**after 목표:**
- [ ] `npx shadcn-ui@latest add dialog` (Radix UI 기반으로 접근성 자동 처리)
- [ ] ESC 키 닫기, focus trap, ARIA 속성이 Radix에 의해 자동 처리됨을 확인
- [ ] before와 동일한 `size` variants CVA로 정의
- [ ] Storybook story 작성

---

## STEP 9. Table 컴포넌트

> before에서 가장 복잡한 도메인 오염이 있는 컴포넌트입니다.

**before의 문제점:**
- `entityType`, `onPublish`, `onArchive`, `onRestore` 등 도메인 전용 props
- `renderCell()` 내부에서 `entityType === 'user'` / `entityType === 'post'` 분기로 도메인별 렌더링
- User status를 Badge status로 변환하는 매핑 로직이 Table 안에 존재

**after 목표:**
- [ ] `npx shadcn-ui@latest add table`
- [ ] 도메인 props 완전 제거
- [ ] 셀 렌더링은 `columns` 정의 시 `render: (value, row) => ReactNode` 형태의 render 함수로 위임
- [ ] Storybook story 작성

---

## STEP 10. Header 컴포넌트

**before의 문제점:**
- 전체가 인라인 `style={{}}` — 색상값 하드코딩, 유지보수 어려움

**after 목표:**
- [ ] Tailwind 유틸리티 클래스로 전면 교체
- [ ] 디자인 토큰의 색상 변수 사용
- [ ] Storybook story 작성

---

## STEP 11. ManagementPage 마이그레이션

> STEP 3~10에서 만든 컴포넌트들로 before의 `ManagementPage`를 재구현합니다.

**핵심 변경사항:**
- Table에서 제거된 도메인 로직(Badge 매핑, 액션 버튼 조건부 렌더링)을 Page 레벨 `columns` 정의로 이관
- Button/Badge의 도메인 props 제거로 인해 Page에서 직접 variant를 결정해야 함

```tsx
// after에서는 이런 방식으로 columns 정의
const columns = [
  {
    key: 'status',
    header: '상태',
    render: (value: Post['status']) => (
      <Badge variant={statusVariantMap[value]}>{statusLabelMap[value]}</Badge>
    ),
  },
  // ...
]
```

- [ ] `packages/after/src/pages/ManagementPage.tsx` 구현
- [ ] before의 테스트(`ManagementPage.test.tsx`)를 after에도 동일하게 통과하는지 확인
  ```bash
  pnpm test:run:after
  ```

---

## STEP 12. Storybook 전체 점검

> 각 단계에서 개별 story를 작성했다면 이 단계에서 통합 확인합니다.

- [ ] `pnpm storybook` 실행 후 모든 컴포넌트 story가 정상 렌더링되는지 확인
- [ ] Storybook Controls로 모든 variant/size 조합 동작 확인
- [ ] Accessibility addon으로 접근성 경고 없는지 확인

---

## STEP 13. (심화) 다크 모드

> 기본 과제를 모두 완료한 후 진행합니다.

- [ ] `src/tokens/colors.css`에 `[data-theme="dark"]` 또는 `.dark` 셀렉터로 다크 토큰 추가
- [ ] 다크모드 toggle 버튼 컴포넌트 구현 (`useTheme` custom hook)
- [ ] Storybook에서 다크모드 preview 확인

---

## 진행 체크 요약

| 단계 | 내용 | 우선순위 |
|------|------|---------|
| 1 | 환경 설정 | 필수 |
| 2 | 디자인 토큰 | 필수 |
| 3 | Button | 필수 |
| 4 | Badge | 필수 |
| 5 | Form 컴포넌트 | 필수 |
| 6 | Alert | 필수 |
| 7 | Card | 필수 |
| 8 | Modal | 필수 |
| 9 | Table | 필수 |
| 10 | Header | 필수 |
| 11 | ManagementPage | 필수 |
| 12 | Storybook 점검 | 필수 |
| 13 | 다크모드 | 심화 |
