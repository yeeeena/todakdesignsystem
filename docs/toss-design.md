---
name: 토스
slug: toss
category: finance
last_updated: "2026-05-29"
created_at: "2026-05-11"
sources:
  - https://toss.tech
  - https://toss.tech/article/toss-design-system
  - https://toss.tech/article/tds-color-system-update
  - https://toss.tech/article/tds-component-making
  - https://tossmini-docs.toss.im/tds-mobile/
  - https://developers-apps-in-toss.toss.im/design/miniapp-branding-guide.html
  - https://github.com/toss/tossface
  - https://toss.im/tossfeed/article/beginning-of-tps
  - https://developers-apps-in-toss.toss.im/design/components.html
  - https://toss.tech/article/introducing-toss-error-message-system
  - https://toss.im
related_services: []
lang: ko
logo: https://getdesign.kr/logos/toss.png
---

> [인수인계 메모] 이 문서는 프로젝트 초기에 사용자가 채팅으로 전달한 디자인 가이드 원문이다.
> `prototype/todaktodak-tds-v1.html`이 이 가이드를 그대로 적용한 버전이며,
> 이후 브랜드 방향이 Cream/Charcoal 웜 모노 팔레트로 바뀌면서 현재는 **구조 참고용**으로만 쓴다.
> ⚠️ 2026-07-27부터 프로젝트의 디자인 기본 근간은 이 문서가 아니라
> **당근 SEED Design 스킬**(`.agents/skills/seed-design/`)이다. docs/HANDOFF.md 참조.

# 토스 (Toss) — design.md

> 비바리퍼블리카가 운영하는 한국 최대 핀테크 슈퍼앱. 송금·결제·은행·증권·보험·세금·부동산·자동차 관리 등 금융 전반을 단일 모바일 셸로 묶고, "Apps in Toss" 미니앱 플랫폼까지 같은 디자인 시스템 위에 얹는다 [src:2]. 본 문서는 Toss Design System 핸드오프 번들을 1차 출처로 합성한 결과이며, 공개된 toss.tech 보고서와 toss.im 미니앱 가이드, TDS Mobile docs를 보조 출처로 사용했다.

## Brand & Style

토스는 자신을 **"은행에 다니는 유능한 친구"** 로 포지셔닝한다 — 조용히 일을 처리하고, 사용자의 시간을 낭비시키지 않는다는 어조다. 대상 사용자는 일반 소비자 전 연령대이지만, 디자인 시스템(TDS) 자체는 약 2,000명 규모의 메이커가 단일 시스템 위에서 일한다는 전제로 설계되었다 [src:2]. 컴포넌트는 "레고 블록"으로 비유되며, 새 컴포넌트 결정은 A/B 테스트 결과로 검증된다 [src:4].

전체 무드는 **차갑고 절제된, 거의 무채색에 가까운 화이트 캔버스 + 선명한 토스 블루 단일 강조색**. cool-blue 중성색(grey-900~100)이 표면 전체를 차지하고, 브랜드 블루(blue-500)는 화면당 하나의 가장 중요한 액션에만 예약된다. 모서리는 공격적으로 둥글지만 결코 귀엽지 않다 — 버튼·카드에 16~32px 라운드, chips·primary CTA에 999px full pill. 배경은 평면이 기본이며 그라디언트는 3가지 문서화된 예외만 허용된다.

Voice는 **해요체(대화형 존댓말) + 위임형 + 일상어** [src:10]. 격식체(~니다)도 단정형 `-다`도 사용하지 않는다.

## Colors

TDS 컬러 시스템은 4계층 구조: Target(fill/text/border) → Role → Variant → Level(base→semantic→component) [src:3]. 2025년 HSL→OKLCH 마이그레이션 발표.

```yaml
blue-500: oklch(0.624 0.176 254)   # 카노니컬 Toss Blue
blue-600: oklch(0.522 0.176 257)
blue-700: oklch(0.476 0.174 259)
blue-50:  oklch(0.965 0.020 250)
grey-900: oklch(0.234 0.030 254)   # primary text, never pure black
grey-800: oklch(0.342 0.030 253)
grey-700: oklch(0.452 0.028 253)   # secondary text
grey-600: oklch(0.555 0.022 253)
grey-500: oklch(0.652 0.020 252)
grey-400: oklch(0.752 0.016 251)   # disabled text
grey-300: oklch(0.840 0.012 248)
grey-200: oklch(0.913 0.008 247)   # default divider
grey-150: oklch(0.918 0.007 247)
grey-100: oklch(0.957 0.005 247)   # secondary surface
grey-50:  oklch(0.978 0.003 247)
red-500:   oklch(0.628 0.218 22)   # error
green-500: oklch(0.493 0.143 154)  # success
orange-500: oklch(0.748 0.183 56)  # warning
yellow-500: oklch(0.853 0.156 86)  # illustration only
fg-tertiary:   oklch(0.155 0.060 261 / 0.58)
fg-quaternary: oklch(0.155 0.060 261 / 0.28)
line-subtle:   oklch(0 0 0 / 0.08)
bg-overlay:    oklch(0 0 0 / 0.56)
press-overlay: oklch(0 0 0 / 0.26)
disabled-opacity: 0.30
```

Semantic alias: fill-brand=blue-500, fill-secondary=grey-100, text-primary=grey-900, text-secondary=grey-700, border-primary=blue-500(focus), border-secondary=grey-200.

## Typography

본문/UI 서체는 Toss Product Sans(자체 라이선스, 재배포 불가) — 외부 substitute는 **Pretendard** [src:8].

```yaml
display-1:  56/1.30/-0.005em/700    h1: 28/1.30/-0.02em/700
display-2:  40/1.20/-0.020em/700    h2: 24/1.30/-0.02em/700
h3: 22/1.30/-0.015em/700            h4: 20/1.35/-0.015em/700
title-1: 18/1.45/-0.01em/600        title-2: 17/1.45/-0.01em/600
body-1: 17/1.50/400   body-2: 15/1.50/400   body-3: 13/1.50/400
label-l: 17/1.25/700  label-m: 15/1.25/600  label-s: 13/1.25/600
caption: 12/1.40/500  caption-s: 11/1.40/500
```

실시간 금융 데이터는 tabular-nums, 강조는 proportional-nums 분리 [src:8]. 이모지는 Tossface 폰트 [src:7].

## Spacing / Rounded / Elevation / Motion

- 스페이싱: 4px 베이스, 4~80px 12단계. 룰 오브 섬: 24px 화면 outer padding, 16px list-row 간격, 8px 밀접 요소.
- 라운드: xs4/s8/m12/l14/xl16/2xl20/3xl24/4xl32/full999. 버튼 사이즈-라운드 페어: XL16/L14/M12/S10.
- 그림자: floating/modal만. shadow-1(menu)/2(tooltip)/3(dialog)/toast — navy-900 베이스 저알파. pressed는 overlay(검정 26%)이지 shadow가 아님.
- 모션: ease cubic-bezier(0.22,0.61,0.36,1) / ease-out cubic-bezier(0.16,1,0.3,1), dur 120/200/320ms. 바운스·parallax·skeleton shimmer 없음(3-dot loader 사용).

## Components (요약)

- button: XL56/L48/M40/S32, pressed=overlay 26%, disabled=노드 전체 0.3
- bottom-cta: 화면 최하단 고정 56pt + white→transparent 보호 그라디언트
- text-field: 48px, r12, grey-100 resting → focus 흰 배경+1.5px blue-500
- chip: 34px full pill / badge: 22px r6 washed 배경
- list-row: 44px 아바타(r14)+타이틀 스택+우측 amount(tabular)
- dialog: r20, 24px padding / bottom-sheet가 모바일 1차 대체
- toast: grey-900 표면+흰 라벨 r14 / menu: trigger 위치에 즉시 펼침 [src:4]
- 아이콘: outline(*-mono)+fill 2종, 16/20/24/32, currentColor 상속 필수

## Do's and Don'ts (핵심)

**Do**: 시맨틱 alias로만 색 호출 · 화면당 단일 강조색 · 버튼 사이즈-라운드 페어 · 본문 body-2(15/1.5) · 해요체 · "Navigating error" 원칙 · 금액 `1,000원` 표기 · pressed=overlay, disabled=0.3
**Don't**: 챗봇톤/마케팅 과장 · 격식체/단정형 · 강조색 2개 이상 · 그라디언트(3개 예외 외) · squircle · 2px 장식 보더 · skeleton shimmer · 320ms 초과 fade · inner shadow · 이모지 inline 사용 · button-primary와 bottom-cta 동시 배치 · 토스 금융 도메인 개념 이식(차용할 것은 시각 언어)

## Known Gaps

다크 모드 alias 미공개 · 전체 컬러 step ladder 일부만 공개 · TPS 라이선스(Pretendard 대체) · 공식 breakpoint 토큰 없음(mobile-first)
