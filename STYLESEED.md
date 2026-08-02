# StyleSeed — Design Lock
<!-- Locked design decisions for this project. The agent re-reads this every prompt and
     must obey it. Change a value here to change it project-wide. -->
- Product:           토닥토닥 — 토착신 AI 고민 처방 (감정 케어 · 고민 정리 · 부적 생성)
- App domain:        health/wellness (emotional care) + AI/chat secondary
- Surface:           mobile-app (390px, product-ui adapter)
- Page type:         onboarding / form / detail (flow product, not dashboard)
- Output grammar:    reference:todaktodak
- Grammar path:      .styleseed/rulesets/todaktodak/RULESET.md
- Grammar fallback:  consumer-service
- Reference confidence: high
- Components doc:    .styleseed/rulesets/todaktodak/COMPONENTS.md
- Visual board:      .styleseed/rulesets/todaktodak/reference-board.html  # 이미지 내장 단일 파일
- Aesthetic profile: editorial (soft · airy · warm-muted · silk) — one display-type moment
- Mood:              soft · minimal · airy · calm-warm   # edges · feel · density · tone
- Skin:              custom (warm-paper) — NOT default indigo
- Primary action:    #9B5132 terracotta-brown (pressed #7F3F27, tint 10%)
- Font:              Pretendard (UI/body) + Noto Serif KR (display — 토착신 인용문 전용)
- Radius personality: soft — controls 10px · cards 16px · inner panels 12px
- Elevation:         light=layered ≤8% above-left; card 0 1px 3px 4% · elevated 0 4px 12px 6% · modal 0 8px 24px 10%
- Motion seed:       Float (gentle fade-up reveals, 100/200/350ms) — health playbook
- Type scale:        mobile-tight (page h1 23px · section 18px · body 15px · caption 12–13px)
- Density:           airy (px-6 · space-y-6 · 8px grid)
- Imagery palette:   hanji #F1E6D4 · persimmon #C97B4A · ink #4A4038 · pine #6B7F6A  # 일러스트/부적 전용 content tones, not accents
- Semantic resolve:  accent(적갈)과 destructive(적색) 충돌 → destructive #D0342C는 안전/실패 화면에만; 일반 진행·완료는 accent 또는 neutral grey
- Signature move:    토착신이 말하는 인용문에만 Noto Serif KR 명조 디스플레이 (one treatment, not a uniform)
- Korean rules:      해요체 통일 · 버튼은 "~하기" 행동명 · letter-spacing ≤0 · uppercase overline 없음(크기·굵기·색으로 라벨)
- No-go:             emoji as UI icons · pure #000 · key-color 대면적 배경 · rainbow status · skeleton shimmer 대신 3-dot
- Locked:            2026-07-27
