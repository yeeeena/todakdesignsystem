---
# Google Labs design.md 포맷. frontmatter = 정확한 값(AI용), 본문 = 언제·왜(사람용)
# 출처: prototype/todaktodak-working.html (화면 정본 SHA-256 bbcd1ee7…와 같은 소스) · 2026-09-19 실측
title: 토닥토닥 디자인
last_updated: 2026-09-19
figma_file: ZnDrdZztaeO9qjmG3ckgL5
colors:
  atomic:
    --cream: "#f7f4ed"
    --surface: "#FFFDFC"
    --charcoal: "#1c1c1c"
    --offwhite: "#fcfbf8"
    --muted: "#5f5f5d"
    --ink-83: "rgba(28,28,28,0.83)"
    --ink-82: "rgba(28,28,28,0.82)"
    --ink-40: "rgba(28,28,28,0.40)"
    --ink-08: "rgba(28,28,28,0.08)"
    --ink-04: "rgba(28,28,28,0.04)"
    --ink-03: "rgba(28,28,28,0.03)"
  semantic:
    --seed-color-fg-neutral: "var(--charcoal)"
    --seed-color-fg-neutral-muted: "var(--ink-82)"
    --seed-color-fg-neutral-subtle: "var(--muted)"
    --seed-color-fg-neutral-inverted: "var(--offwhite)"
    --seed-color-fg-brand: "var(--charcoal)"
    --seed-color-fg-critical: "#fa342c"
    --seed-color-fg-critical-contrast: "#921708"
    --seed-color-fg-warning: "oklch(0.748 0.183 56)"
    --seed-color-bg-layer-default: "var(--cream)"
    --seed-color-bg-layer-fill: "var(--ink-03)"
    --seed-color-bg-neutral-solid: "var(--surface)"
    --seed-color-bg-neutral-weak: "var(--ink-04)"
    --seed-color-bg-brand-solid: "var(--charcoal)"
    --seed-color-bg-brand-solid-pressed: "#33302a"
    --seed-color-bg-critical-weak: "#fdf0f0"
    --seed-color-bg-warning-weak: "oklch(0.968 0.025 80)"
    --seed-color-bg-overlay: "rgba(0,0,0,0.56)"
    --seed-color-stroke-neutral: "var(--ink-08)"
    --seed-color-stroke-neutral-strong: "var(--ink-40)"
    --seed-color-stroke-brand-solid: "var(--charcoal)"
  # 신별 색 — CSS 변수가 아니라 코드 데이터 deityResult[id].bg / .label. 화면에는 --dbg / --dlabel로 주입된다
  deity:
    seonang:   { bg: "#497dba", label: "#4478b4" }
    munsin:    { bg: "#b52c2e", label: "#b52c2e" }
    sansin:    { bg: "#4d8884", label: "#477e7b" }
    samsin:    { bg: "#de8f96", label: "#c94854" }
    yongwang:  { bg: "#7eb4d8", label: "#337aa9" }
    chilseong: { bg: "#8279b1", label: "#766ca9" }
typography:
  # 공유 CSS 클래스에 고정된 값. fontFamily는 전부 "Pretendard Variable"
  page-title:    { fontFamily: Pretendard Variable, fontSize: 24px, fontWeight: 700, lineHeight: 1.3,  letterSpacing: -0.02em }
  sheet-title:   { fontFamily: Pretendard Variable, fontSize: 20px, fontWeight: 700, lineHeight: 1.3,  letterSpacing: -0.015em }
  quote-lg:      { fontFamily: Pretendard Variable, fontSize: 20px, fontWeight: 700, lineHeight: 1.45, letterSpacing: -0.015em }
  card-title:    { fontFamily: Pretendard Variable, fontSize: 17px, fontWeight: 600, lineHeight: 1.45, letterSpacing: -0.01em }
  body:          { fontFamily: Pretendard Variable, fontSize: 15px, fontWeight: 500, lineHeight: 1.5,  letterSpacing: -0.005em }
  body-sm:       { fontFamily: Pretendard Variable, fontSize: 14px, fontWeight: 500, lineHeight: 1.6 }
  section-label: { fontFamily: Pretendard Variable, fontSize: 14px, fontWeight: 600, lineHeight: 1.3 }
  mini-title:    { fontFamily: Pretendard Variable, fontSize: 13px, fontWeight: 600, lineHeight: 1.25 }
  caption:       { fontFamily: Pretendard Variable, fontSize: 12px, fontWeight: 500, lineHeight: 1.4 }
  button-lg:     { fontFamily: Pretendard Variable, fontSize: 18px, fontWeight: 700, lineHeight: 1.33 }
  button-md:     { fontFamily: Pretendard Variable, fontSize: 16px, fontWeight: 700 }
  hud:           { fontFamily: Pretendard Variable, fontSize: 12px, fontWeight: 600, lineHeight: 1.6 }
spacing:
  # 2026-09-19 신설. 코드의 간격 선언 189곳에서 쓰인 값 중 상위 13개(91.5%)를 척도로 삼았다.
  # ⚠️ 아직 :root에 없다 — 화면 정본 일괄 수정 때 추가된다. 그 전까지 var()로 쓰지 말 것(값이 비어 레이아웃이 깨짐)
  --spacing-2: 2px
  --spacing-4: 4px
  --spacing-6: 6px
  --spacing-8: 8px
  --spacing-10: 10px
  --spacing-12: 12px
  --spacing-14: 14px
  --spacing-16: 16px
  --spacing-18: 18px
  --spacing-20: 20px
  --spacing-24: 24px
  --spacing-28: 28px
  --spacing-32: 32px
rounded:
  --r-s: 8px
  --r-m: 12px
  --r-l: 14px
  --r-xl: 16px
  --r-2xl: 20px
  --r-3xl: 24px
  --r-4xl: 32px
  --r-full: 999px
elevation:
  --shadow-2: "0 4px 12px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)"
  --shadow-3: "0 12px 32px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)"
  --shadow-toast: "0 8px 24px rgba(0,0,0,0.16)"
motion:
  --ease: "cubic-bezier(0.22,0.61,0.36,1)"
  --ease-out: "cubic-bezier(0.16,1,0.3,1)"
  --dur-fast: 120ms
  --dur-base: 200ms
  --dur-slow: 320ms
layout:
  --phone-w: 390px
---

<!--
근거: 2026-09-19 D-1 초안 수집에서 사용자가 승인한 규칙만 담았다(관찰 1–26 중 17번은 컴포넌트 계약 쪽으로 보냄).
제외: 신별 라벨톤의 쓰임새, 어두운 배경 위 흰 글자 기준 — 사용자 결정 대기.
제외: 접근성 일반 문장 — 코드와 다른 문장이 섞여 있어 뺐다. 과제는 FOLLOWUP.md.
화면 상태·분기·문구·신별 콘텐츠는 이 문서의 범위가 아니다(각각 기능명세 · Copy Master · 구현 기준 문서).
-->

## Overview

토착신이 고민을 읽고 부적으로 남겨주는 감정 케어 서비스다. **크림 바탕과 차콜 잉크의 따뜻한 무채색 위에 일러스트가 화면의 절반을 차지하는 인상**이어야 한다. 색은 신별 몰입 순간을 위해 아껴 두고, 그 외의 위계는 잉크 농도와 굵기로 만든다.

흐름은 선형이다. **한 화면에서 사용자가 내리는 주 행동은 하나**이고, 대시보드처럼 여러 선택지를 펼쳐 놓지 않는다. 하단 탭바를 두지 않는다.

## Colors

- **글자 위계는 잉크 단계로 만든다.** 밝은 배경에서 `fg-neutral`(가장 강함) → `fg-neutral-muted` → `fg-neutral-subtle` 순서로 내려간다. 강조하려고 유채색을 쓰지 않는다. 순검정은 쓰지 않는다.
- **새 코드는 `semantic`의 SEED 역할 토큰만 쓴다.** `atomic`은 SEED가 참조하는 값 층이라 직접 쓰지 않는다. `:root`에 남아 있는 옛 별칭(`--grey-*`, `--blue-*`, `--text-*` 등)은 정리 대상이라 새로 쓰지 않는다.
- **신별 딥컬러(`deity.*.bg`)는 상담 결과와 저장/공유 화면의 배경에만 쓴다.** 그 화면에 들어서는 순간을 "그 신의 공간"으로 바꾸는 장치라, 버튼·테두리·작은 요소로 흩어 쓰면 몰입 전환의 힘이 사라진다.
- **신을 나란히 비교하는 목록에서는 신별 색을 쓰지 않는다.** 이름도 차콜로 통일한다. 한 신만 튀면 추천을 강요하는 것처럼 읽힌다.
- **위험·경고 색은 안전 안내와 생성 실패 화면에만.** 이 서비스에서 빨강은 "지금 도움이 필요하다"는 신호라, 일반 강조로 쓰면 그 신호가 약해진다.

## Typography

- 글꼴은 Pretendard 하나만 쓴다.
- **굵기는 500·600·700만.** Regular(400)는 쓰지 않는다(2026-08-02 결정). 크림 바탕 위에서 400은 흐리게 읽힌다.
- **자간은 0 이하.** 양수 자간과 대문자 오버라인을 쓰지 않는다.
- 스타일 선택:
  - 화면 제목 → `page-title` · 시트 제목 → `sheet-title` · 신의 한마디 → `quote-lg`
  - 카드 제목 → `card-title` · 본문 → `body` · 보조 문단·칩 → `body-sm`
  - 입력 섹션 이름 → `section-label` · 카드 안 작은 제목 → `mini-title` · 면책·힌트 → `caption`
  - 단독 CTA 라벨 → `button-lg` · 두 개 나란히 놓인 버튼 라벨 → `button-md` · 일러스트 위 진행 표시 → `hud`
- 스타일을 새로 만들기 전에 위 12개 중에서 고른다. 없으면 만들지 말고 먼저 묻는다.

## Layout & Spacing

- 캔버스 폭은 `--phone-w` 하나를 목표로 한다.
- **본문 좌우 여백은 `--spacing-24`**, **카드 안쪽 여백은 `--spacing-18`**, **카드 사이는 `--spacing-12`**. 전 화면에서 이 값으로 통일돼 있다.
- 간격은 `spacing` 척도 안의 값만 쓴다. 척도 밖 값(코드에 몇 곳 남아 있는 홀수 값 등)을 새로 만들지 않는다.
- **고민 정리 3단계(04–06)의 하단 시트는 상단 위치를 화면 폭에 비례시킨다.** 높이 기준으로 두면 기기마다 일러스트와 시트의 겹침이 달라진다.
- **콘텐츠가 넘치는 화면은 하단 행동 영역을 고정한다.** 스크롤 위치와 상관없이 주 행동이 손 닿는 곳에 있어야 한다.
- 고민 정리 3단계의 상단 일러스트는 **신 목록에서 신을 골라 들어왔을 때만** 그 신의 것을 쓰고, 그 외에는 공통 일러스트를 쓴다(2026-08-05 결정). 입력 화면에서 신을 바꿔도 공통을 유지한다 — 배경이 통째로 바뀌면 화면이 넘어간 것처럼 읽힌다.

## Elevation & Depth

- 떠 있는 요소는 적다. 카드와 시트는 그림자보다 **면 색 차이와 얇은 선**으로 구분한다.
- 그림자는 `--shadow-2`(카드성 요소)와 `--shadow-toast`(토스트)만 쓴다.
- **하드 섀도는 시작 화면의 버튼 한 곳만 쓰는 예외다.** 첫인상을 위한 장치라 다른 화면으로 번지게 하지 않는다.

## Shapes

- 반경은 `rounded` 사다리 안에서만 고른다.
- 요소별로 정해져 있다: **카드 `--r-xl` · 버튼 `--r-m` · 칩과 필 `--r-full` · 고민 정리 시트 상단 `--r-2xl` · 전역 바텀시트 상단 `--r-3xl`.**
- 같은 종류의 요소는 화면이 달라도 같은 반경을 쓴다.

## Components

개별 스펙(크기·상태·수치)은 `COMPONENTS.md`에 있다(컴포넌트별 계약 파일은 아직 없다). 여기서는 **무엇을 언제 고르는지**만 정한다.

**하단 행동 영역 — 화면 유형으로 고른다**

| 화면 유형 | 쓰는 것 | 화면 |
|---|---|---|
| 일반 스크롤 화면 | `cta-bar` | 03 · 12 · 13 · 14 · 15 · 16 |
| 고민 정리 단계(하단 시트) | `sheet-foot` | 04 · 05 · 06 |
| 신별 딥컬러 결과 | `result-foot` | 08 |
| 부적 (고지 + 버튼 3개) | `bottom-bar` | 10 |
| 부적 공유 (흐린 부적 배경) | `share-foot` | 11 |

새 화면은 가장 가까운 유형의 것을 쓴다. 맞는 유형이 없으면 새로 만들지 말고 먼저 묻는다.

**버튼 위계**
- 주 행동은 화면당 **하나**, 차콜 채움 버튼으로.
- 버튼이 세 개 필요하면 **주 행동 하나를 전폭으로 위에, 보조 둘을 한 줄로 아래에** 둔다(10 · 11). 같은 위계의 버튼 세 개를 한 줄에 늘어놓지 않는다.
- 스펙: `COMPONENTS.md` §2-1 (계약 미작성)

**선택 표시**
- 칩 · 점수 · 신 선택 목록 모두 **차콜 채움 또는 차콜 테두리**로 선택을 표시한다. 선택 상태에 유채색을 쓰지 않는다.
- 스펙: `COMPONENTS.md` §2-3 · §2-7 (계약 미작성)

**아이콘**
- 뒤로 · 닫기 · 셰브런은 SVG 선 아이콘으로 통일한다(굵기 1.8). 문자 기호나 이모지를 아이콘 대신 쓰지 않는다.

**로딩**
- 기다리는 화면은 **캐릭터 링 로더**(링이 채워지는 동안 신 아바타가 순환)를 쓴다. 스켈레톤이나 무한 회전 스피너를 쓰지 않는다.
- 스펙: `COMPONENTS.md` §2-5 (계약 미작성)

**바텀시트**
- 전역 시트(신 소개 · 신 선택)와 고민 정리 시트를 구분한다. 목록형 시트의 항목은 카드 문법을 그대로 쓴다.
- 스펙: `COMPONENTS.md` §2-7 (계약 미작성)

**고정 문구의 자리**
- Copy Master에서 안전 검토 대상으로 잠긴 문구(`safety_locked`)가 붙는 자리 — 시작 · 고민 입력 · 나만의 부적 · 저장/공유 · 안전 안내 · 내부 요청 안내 — 를 디자인 변경으로 없애거나 가리지 않는다. 문구 자체는 Copy Master가 정한다.

## Do's and Don'ts

- **Do** 새 화면을 만들기 전에 가장 가까운 기존 화면 유형을 찾고, 그 유형의 하단 영역·버튼 위계를 따른다.
- **Do** 신별로 달라지는 화면은 여섯 신 모두에서 확인한다.
- **Don't** 순검정, 옛 별칭 토큰, 척도 밖 간격·반경을 새로 쓰지 않는다.
- **Don't** 신별 딥컬러를 배경 외의 용도로 쓰거나, 신 비교 목록에 신별 색을 넣지 않는다.
- **Don't** 한 화면에 주 행동 버튼을 둘 이상 두지 않는다.
- **Don't** 규칙에 없는 판단을 일반적인 패턴으로 채우지 않는다. 문서에 없으면 멈추고 묻는다.
