---
# Google Labs design.md 포맷. frontmatter = 정확한 값(AI용), 본문 = 언제·왜(사람용)
# 출처: prototype/todaktodak-working.html (화면 정본 SHA-256 bbcd1ee7…와 같은 소스) · 2026-09-19 실측
title: 토닥토닥 디자인
last_updated: 2026-09-19
figma_file: ow7XywHI2I3ucWMc13002C   # 디자인 시스템 파일. 페이지는 1 Foundation, 2 Element, 3 Component, 4 Screen(부품으로 조립한 화면). 화면 시안 파일은 ZnDrdZztaeO9qjmG3ckgL5 다
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
  quote-sm:      { fontFamily: Pretendard Variable, fontSize: 14px, fontWeight: 600, lineHeight: 1.55 }
  card-title:    { fontFamily: Pretendard Variable, fontSize: 17px, fontWeight: 600, lineHeight: 1.45, letterSpacing: -0.01em }
  list-title:    { fontFamily: Pretendard Variable, fontSize: 15px, fontWeight: 700, lineHeight: 1.45 }
  body:          { fontFamily: Pretendard Variable, fontSize: 15px, fontWeight: 500, lineHeight: 1.5,  letterSpacing: -0.005em }
  body-sm:       { fontFamily: Pretendard Variable, fontSize: 14px, fontWeight: 500, lineHeight: 1.6 }
  section-label: { fontFamily: Pretendard Variable, fontSize: 14px, fontWeight: 600, lineHeight: 1.3 }
  mini-title:    { fontFamily: Pretendard Variable, fontSize: 13px, fontWeight: 600, lineHeight: 1.25 }
  caption:       { fontFamily: Pretendard Variable, fontSize: 12px, fontWeight: 500, lineHeight: 1.4 }
  link:          { fontFamily: Pretendard Variable, fontSize: 14px, fontWeight: 600 }
  link-sm:       { fontFamily: Pretendard Variable, fontSize: 12px, fontWeight: 600 }
  button-lg:     { fontFamily: Pretendard Variable, fontSize: 18px, fontWeight: 700, lineHeight: 1.33 }
  button-md:     { fontFamily: Pretendard Variable, fontSize: 16px, fontWeight: 700 }
  hud:           { fontFamily: Pretendard Variable, fontSize: 12px, fontWeight: 600, lineHeight: 1.6 }
spacing:
  # 2026-09-19 신설. 코드의 간격 선언 189곳에서 쓰인 값 중 상위 13개(91.5%)를 척도로 삼았다.
  # 2026-09-19 화면 정본 일괄 수정 때 :root 에 추가했다
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
  --shadow-toast: "0 8px 24px rgba(0,0,0,0.16)"
motion:
  --ease: "cubic-bezier(0.22,0.61,0.36,1)"
  --ease-out: "cubic-bezier(0.16,1,0.3,1)"
  --dur-fast: 120ms
  --dur-base: 200ms
  --dur-slow: 320ms
layout:
  --phone-w: 390px
  # 최소 폭은 2026-09-19 결정. :root 토큰이 아니라 검증 기준이다
  min-width: 360px
---

이 문서는 AI와 사람이 토닥토닥 화면을 만들 때 따르는 판단 기준이다. 위 frontmatter는 정확한 값이고, 본문은 언제 왜 쓰는지다. 값과 규칙은 최종본 화면(prototype/todaktodak-working.html)을 실측해 뽑았고, 승인된 것만 담았다. 주제별 기준은 목차 docs/design-guide/INDEX.md 에서 찾고, 아직 정하지 않은 항목은 docs/design-guide/확인사항.md 에 있다.

코드와 이 문서가 다르면 화면 구성과 흐름은 코드를, 토큰과 스타일은 이 문서를 따르고, 그 차이를 보고한다(2026-09-19 결정). 화면 상태와 분기, 고정 문구, 신별 콘텐츠는 이 문서가 다루지 않는다.

## Overview

토닥토닥은 토착신이 사용자의 고민을 읽고 작은 실천과 부적으로 남겨주는 감정 케어 서비스다. 인상은 크림 바탕과 차콜 잉크의 따뜻한 무채색이다. 몰입 화면에서는 일러스트가 화면의 절반을 차지한다. 색은 신별 몰입 순간에 아껴 쓰고, 그 밖의 위계는 잉크 농도와 굵기로 나눈다.

흐름은 선형이다. 한 화면의 주 행동은 하나이고, 여러 선택지를 대시보드처럼 펼치지 않는다. 시작 화면(01)만 예외로, 고민부터 시작하는 버튼과 신부터 보는 버튼을 같은 위계로 둔다(2026-09-19 결정). 하단 탭바를 두지 않는다.

## Colors

새 코드는 semantic 의 SEED 역할 토큰만 쓴다. atomic 은 SEED가 참조하는 값이라 직접 쓰지 않는다. :root 에 남은 옛 별칭 여섯 개(grey 계열 넷, fg-quaternary, border-secondary)는 판단을 기다리는 정리 대상이므로 새로 쓰지 않는다.

밝은 배경의 글자는 fg-neutral, fg-neutral-muted, fg-neutral-subtle 세 단계로 위계를 나눈다. 강조하려고 유채색을 쓰지 않고, 순검정도 쓰지 않는다.

신별 딥컬러(deity 의 bg)는 상담 결과와 저장/공유 화면의 배경에만 쓴다. 그 화면을 그 신의 공간으로 바꾸는 장치라서, 버튼이나 테두리로 흩어 쓰면 몰입 전환이 약해진다. 여러 신을 나란히 비교하는 목록에는 신별 색을 쓰지 않고 이름도 차콜로 둔다. 한 신만 튀면 추천을 강요하는 것처럼 읽힌다.

위험과 경고 색은 안전 안내와 생성 실패 화면에만 쓴다. 사용자가 멈춰서 확인해야 하는 순간을 알리는 색이라, 일반 강조로 쓰면 그 신호가 약해진다.

신별 라벨 색(deity 의 label)을 어디에 쓰는지와 어두운 배경 위 흰 글자의 기준은 아직 정하지 않았다. 필요하면 쓰기 전에 묻는다.

## Typography

글꼴은 Pretendard 하나다. 굵기는 500, 600, 700만 쓰고 Regular(400)는 쓰지 않는다. 크림 바탕에서 400은 흐리게 읽힌다. 자간은 0 이하로 두고, 양수 자간과 대문자 오버라인을 쓰지 않는다.

역할이 정해진 스타일을 쓴다. 화면 제목은 page-title, 시트 제목은 sheet-title, 신의 한마디는 quote-lg, 신의 짧은 말투 인용은 quote-sm 이다. 카드 제목은 card-title, 목록 안의 이름은 list-title, 본문은 body 다. 보조 문단과 시트 제목 아래 설명, 칩은 body-sm 이다. 입력 섹션 이름은 section-label, 카드 안 작은 제목은 mini-title, 면책과 힌트와 태그 줄은 caption 이다. 텍스트 링크는 link, 카드 안의 작은 링크는 link-sm 이고 둘 다 밑줄을 긋는다. 단독 CTA 라벨은 button-lg, 나란히 놓인 두 버튼의 라벨은 button-md, 일러스트 위 진행 표시는 hud 다(역할 16개, 2026-09-19 결정). 맞는 스타일이 없으면 새로 만들지 말고 먼저 묻는다.

## Layout & Spacing

캔버스는 phone-w 폭을 기준으로 하고, 최소 360 폭에서도 글자가 넘치거나 겹치지 않아야 한다(2026-09-19 결정). 화면 위 여백은 spacing-28 하나로 통일한다(2026-09-25 결정). 본문 좌우 여백은 spacing-24, 카드 안쪽 여백은 spacing-18, 카드 사이는 spacing-12, 칩 묶음 사이는 spacing-8 이다. 작은 제목과 질문과 답하는 자리가 모두 있는 카드는 그 사이가 spacing-8 과 spacing-12 다(2026-09-25 결정). 본문 세로 리듬은 상단바와 첫 요소 사이 spacing-8, 제목과 리드 사이 spacing-8, 제목 블록과 첫 덩어리 사이 spacing-20, 앞 덩어리와 구역 이름 사이 spacing-24, 구역 이름과 그 아래 spacing-10 이다(2026-09-25 실측). 리드 없이 제목 바로 아래 내용이 오는 화면은 spacing-24 다. 신단과 부적과 로딩 둘은 이 리듬을 따르지 않는다. 간격은 빈 칸을 끼워 만들지 않고 자식 사이 간격과 안쪽 여백으로 만든다. 간격은 spacing 척도 안의 값만 쓰고, 척도 밖 값을 새로 만들지 않는다.

새 코드의 간격은 var(--spacing-24) 처럼 spacing 토큰으로 쓴다.

고민 정리 3단계(04~06)의 하단 시트는 상단 위치를 화면 폭에 비례시킨다. 높이 기준으로 두면 기기마다 일러스트와 시트가 겹치는 정도가 달라진다.

콘텐츠가 넘치는 화면은 하단 행동 영역을 고정한다. 스크롤 위치와 상관없이 주 행동이 손 닿는 곳에 있어야 한다.

고민 정리 3단계의 상단 일러스트는 신단(02)에서 신을 골라 들어왔을 때만 신별 그림을 쓴다. 이 경로에서 입력 화면의 신을 바꾸면 일러스트도 새 신으로 바뀐다(2026-09-19 결정). 고민부터 들어왔다면 신을 바꿔도 공통 일러스트를 유지한다(2026-08-05 결정). 아직 신의 공간에 들어온 적이 없는 사용자에게 배경이 통째로 바뀌면 화면이 넘어간 것처럼 읽힌다.

## Elevation & Depth

떠 있는 요소는 적다. 카드와 시트는 그림자보다 면 색 차이와 얇은 선으로 구분한다. 그림자는 뒤집히는 부적 카드에 shadow-2, 토스트에 shadow-toast 를 쓴다. 일반 카드에는 그림자가 없다. 신단 캐릭터가 눌릴 때 잠깐 생기는 그림자 말고는 새로 넣지 않는다. 하드 섀도는 시작 화면 버튼 한 곳의 예외이고, 다른 화면으로 번지지 않게 한다.

## Shapes

반경은 rounded 사다리 안에서 고른다. 카드는 r-xl, 버튼은 r-m, 칩과 필은 r-full, 고민 정리 시트 상단은 r-2xl, 전역 바텀시트 상단은 r-3xl 이다. 같은 종류의 요소는 화면이 달라도 같은 반경을 쓴다.

## Components

부품의 크기와 상태, 수치는 docs/design-guide/컴포넌트/ 의 부품별 문서에 있다. 코드에서 부르는 법과 넘기는 값은 docs/design-guide/컴포넌트/계약/ 의 계약 문서에 있다. 이 저장소는 파일 이름을 한글로 쓰므로 계약 문서의 이름이 CONTRACT.md 가 아니라 부품 이름이다. 여기서는 무엇을 언제 고르는지만 정한다.

하단 행동 영역은 화면 유형으로 고른다. 일반 스크롤 화면(03, 12~16)은 cta-bar, 고민 정리 단계(04~06)는 sheet-foot, 신별 딥컬러 결과(08)는 result-foot, 부적(10)은 bottom-bar, 부적 공유(11)는 share-foot 를 쓴다. 새 화면은 가장 가까운 유형을 따르고, 맞는 유형이 없으면 새로 만들지 말고 먼저 묻는다.

주 행동은 화면당 하나이고 차콜 채움 버튼으로 둔다. 시작 화면(01)의 두 진입 버튼은 예외다. 버튼이 세 개 필요하면 주 행동 하나를 전폭으로 위에, 보조 둘을 한 줄로 아래에 둔다(10, 11). 같은 위계의 버튼 세 개를 한 줄에 늘어놓지 않는다.

칩, 점수, 신 선택 목록은 모두 차콜 채움이나 차콜 테두리로 선택을 표시한다. 선택 상태에 유채색을 쓰지 않는다.

상단바는 왼쪽에 아이콘, 가운데에 화면 이름을 둔다(2026-09-25 결정). 아이콘이 없는 화면도 왼쪽에 같은 크기의 빈 자리를 두어 이름이 화면 가운데에 온다.

뒤로, 닫기, 셰브런은 굵기 1.8의 SVG 선 아이콘으로 통일한다. 문자 기호나 이모지를 아이콘 대신 쓰지 않는다.

기다리는 화면은 캐릭터 링 로더를 쓴다. 링이 채워지는 동안 신 아바타가 순환한다. 스켈레톤과 무한 회전 스피너는 쓰지 않는다.

바텀시트는 전역 시트(신 소개, 신 선택)와 고민 정리 시트로 나뉜다. 목록형 시트의 항목은 카드 문법을 그대로 쓴다.

Copy Master에서 안전 검토 대상으로 잠긴 문구가 붙는 자리는 디자인을 바꿔도 없애거나 가리지 않는다. 해당 화면은 시작, 고민 입력, 나만의 부적, 저장/공유, 안전 안내, 내부 요청 안내다. 문구 자체는 Copy Master가 정한다.

* [상단바](./컴포넌트/상단바.md) · [계약](./컴포넌트/계약/상단바.md)
* [버튼](./컴포넌트/버튼.md) · [계약](./컴포넌트/계약/버튼.md)
* [하단 행동 영역](./컴포넌트/하단%20행동%20영역.md) · [계약](./컴포넌트/계약/하단%20행동%20영역.md)
* [입력과 선택](./컴포넌트/입력과%20선택.md) · [계약](./컴포넌트/계약/입력과%20선택.md)
* [바텀시트](./컴포넌트/바텀시트.md) · [계약](./컴포넌트/계약/바텀시트.md)
* [캐릭터 링 로더](./컴포넌트/캐릭터%20링%20로더.md) · [계약](./컴포넌트/계약/캐릭터%20링%20로더.md)
* [진행과 피드백](./컴포넌트/진행과%20피드백.md) · [계약](./컴포넌트/계약/진행과%20피드백.md)
* 나머지 부품은 [컴포넌트 목록](./카테고리/컴포넌트.md) 에 있다.

## Do's and Don'ts

* Do: 새 화면은 가장 가까운 기존 화면 유형을 찾아 그 하단 영역과 버튼 위계를 따른다.
* Do: 신별로 달라지는 화면은 여섯 신 모두에서 확인한다.
* Don't: 순검정, 옛 별칭 토큰, 척도 밖 간격과 반경을 새로 쓰지 않는다.
* Don't: 신별 딥컬러를 배경 밖에 쓰거나, 신 비교 목록에 신별 색을 넣지 않는다.
* Don't: 한 화면에 주 행동 버튼을 둘 이상 두지 않는다.
* Don't: 규칙에 없는 판단을 일반적인 패턴으로 채우지 않는다. 문서에 없으면 멈추고 묻는다.
