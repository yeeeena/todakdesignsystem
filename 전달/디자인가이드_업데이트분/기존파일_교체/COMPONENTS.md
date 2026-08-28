# 토닥토닥 — 컴포넌트 인벤토리

> 소스: `prototype/todaktodak-working.html` (단일 파일 · CSS 클래스 152종 · 화면 16종)
> 화면 번호는 Copy Master의 `screen_order`(01–16)를 따른다.
> 시각 사양은 [reference-board.html](reference-board.html)에서 실제 렌더로 확인.
> `[레거시]` = CSS는 남아 있으나 현재 화면에서 미사용. `[크롬]` = 프로토타입 셸, 제품 아님.

## 화면 맵

| # | id | 화면 | 전용 컴포넌트 |
|---|---|---|---|
| 01 | `landing` | 시작 | landing-art · btn-pill(네오브루탈) |
| 02 | `deities` | 토착신 리스트 | shelf-* · sheet(신 소개 바텀시트) |
| 03 | `deityDetail` | 토착신 상세 | symbol · card 스택 · cta-stack |
| 04 | `input` | 공통 고민 입력 | step-* · sheet-panel · textarea · chips |
| 05 | `capacity` | 오늘 가능한 정도 | step-* · card tappable |
| 06 | `summary` | 정리 확인 | step-* · card 3종 |
| 07 | `loading` | 결과 생성 중 | loading-bg · loader-* · checklist |
| 08 | `result` | 상담 결과 | result-* · rcard · result-peek |
| 09 | `talismanLoading` | 부적 생성 중 | 07과 동일 세트 |
| 10 | `talisman` | 나만의 부적 | flip-* · bottom-bar |
| 11 | `share` | 저장/공유 | share-* (블러 배경 + 카드) |
| 12 | `talismanFeedback` | 부적 피드백 | score · chips · btn-row |
| 13 | `resultFeedback` | 전체 피드백 | score · chips · btn-row |
| 14 | `safe` | 안전 안내 | card + critical 라벨 · **문구 전체 safety_locked** |
| 15 | `asset` | 내부 요청 안내 | card + 라벨 · **문구 전체 safety_locked** |
| 16 | `error` | 생성 실패/지연 | card + warning 라벨 |

---

## 1. 파운데이션

### 1-1. 컬러 토큰 (`:root`)

| 토큰 | 값 | 역할 |
|---|---|---|
| `--cream` | `#f7f4ed` | 페이지 배경 |
| `--surface` | `#FFFDFC` | 카드·버튼 표면 |
| `--charcoal` | `#1c1c1c` | 잉크·다크 버튼 (순검정 금지) |
| `--offwhite` | `#fcfbf8` | 다크 위 텍스트 |
| `--ink-83/-82` | rgba(28,28,28,.83/.82) | 강조 보조/본문 |
| `--muted` | `#5f5f5d` | 설명·캡션 |
| `--ink-40/-08/-04/-03` | rgba 사다리 | 테두리/헤어라인/틴트/오버레이 |
| critical | `#fa342c` (SEED red-700) | 안전·실패 텍스트 |
| critical-contrast | `#921708` (red-900) | critical-weak 배경 위 |
| critical-weak | `#fdf0f0` (red-100) | 경고 배경 |
| warning | `oklch(0.748 0.183 56)` | 지연 라벨 |

SEED 역할 토큰(`--seed-color-*`)이 위 값을 감싸고, 레거시 TDS 별칭(`--blue-500` 등)이 다시 SEED를 참조한다. **새 코드는 SEED 역할 토큰을 사용할 것.**

### 1-2. 신별 테마 (deityResult)

| 신 | key | 딥컬러 `bg` | 라벨톤 `label` |
|---|---|---|---|
| 서낭신 | seonang | `#497dba` | `#4478b4` |
| 문신 | munsin | `#b52c2e` | `#b52c2e` |
| 산신 | sansin | `#4d8884` | `#477e7b` |
| 삼신할미 | samsin | `#de8f96` | `#c94854` |
| 용왕 | yongwang | `#7eb4d8` | `#337aa9` |
| 칠성신 | chilseong | `#8279b1` | `#766ca9` |

- **딥컬러 `bg`** — 08 결과 배경·11 공유 딤. 배경 전용, 컨트롤 색으로 쓰지 않는다.
- **라벨톤 `label`** — 딥컬러를 surface(`#FFFDFC`) 위 WCAG AA(4.5:1) 통과값으로 어둡게 조정한 것.
  08·10 미니타이틀, 04 신 컨텍스트의 이름 강조에만. **목록·비교 UI에서는 금지**(6신이 동등해야 함).
  문신은 두 값이 같아 룰셋 §6의 "배경 전용"과 충돌해 보인다 — `evidence.json` 미해결 참조.

씬 전용: 02 신단 `#5c281e` · 랜딩 하단 그라디언트 `#e3c5a7` · HUD 트랙 `#4d515c`.

### 1-3. 라운딩 · 그림자 · 모션

- radius: `--r-s`8 `--r-m`12 `--r-l`14 `--r-xl`16 `--r-2xl`20 `--r-3xl`24 `--r-4xl`32 `--r-full`999
- shadow-2 `0 4px 12px 4% + 0 1px 2px 4%` · shadow-3 `0 12px 32px 10%` · toast `0 8px 24px 16%`
- ease `(0.22,0.61,0.36,1)` · ease-out `(0.16,1,0.3,1)` · dur 120/200/320ms
- press 오버레이: 밝은 버튼 `rgba(0,0,0,.26)` · 다크 버튼 `rgba(252,251,248,.16)`

### 1-4. 타입 램프

| 클래스 | 크기/행간/굵기 | 용도 |
|---|---|---|
| `.h-page` | 24/1.3/700, -0.02em | 페이지 타이틀 (shelf-dark에선 23px) |
| `.result-quote`·`.big-quote` | 20/1.45/700 | 신의 한마디 |
| `h3`·`.quote`·`.sheet-name` | 17–20/600–700 | 카드 제목 |
| `.lead`·`.body-text` | 15/1.5 | 본문 |
| `.section-title` | 14/600 | 폼 섹션 라벨 |
| `.mini-title`·`.deity-fit` | 13/600, muted | 카드 미니라벨 |
| `.caption`·`.landing-caption` | 12/500 | 면책·힌트 |
| step-hud | 12 SemiBold(흰) | 진행 표시 |

---

## 2. 컴포넌트

### 2-1. 버튼

| 변형 | 스펙 | 사용처 |
|---|---|---|
| `.btn.btn-xl/-l` `.btn-primary` | 52px · r12 · 16–18/700 · charcoal 채움 | 모든 주 CTA |
| `.btn-secondary` | 52px · surface + 1px ink-40 테두리 | 보조 행동 |
| `.btn-m .btn-ghost` | 40px · r8 · 14/700 · 투명 | 3차 행동(바로 결과 보기 등) |
| `.btn-pill` | 56px · r16 · 1px charcoal 테두리 · **하드섀도 4px 4px 0** · press translate(3,3) | 랜딩 전용 |
| `.btn-row`·`.bb-btns` | gap 9–12, flex:1, 페어는 16px 라벨 | 하단 페어 |
| `.bb-stack` | 주 CTA 1개(전폭) 위 + 보조 2개 한 줄 아래, gap 10 | 하단 3버튼(10) |
| `.share-save`/`.share-sub` | 56/48px · r14 | 11 저장/공유 |
| `.landing-link`·`.result-link` | 14/600 underline (result는 흰색) | 텍스트 링크 |
| `.icon-btn` | 40×40 · r12 · 24px SVG stroke 1.8 (`backSvg` 셰브런 / `closeSvg` X) | 뒤로·닫기 — 문자 글리프 금지 |

### 2-2. 카드

| 변형 | 스펙 |
|---|---|
| `.card` | surface · 1px ink-08 · r16 · pad 18 · 카드 간 12px |
| `.card-soft` | ink-03 배경, 테두리 없음 |
| `.card-brand` | ink-04 틴트 (모노 브랜드) |
| `.card.tappable` | cursor + active 시 grey-50 |
| `.rcard` (08 전용) | surface · **2px charcoal** · r16 · pad 20/18 · 내부 `.rule`(1px ink-08 구분선) · 섹션 gap 16 |
| `.line-sample` | grey-50 박스 · r12 · 14/600 — 말투 미리보기 |

### 2-3. 입력

- `.textarea`: 136px min · r16 · surface · 1px ink-08, focus 시 2px charcoal. placeholder ink-40.
- `.chips .chip`: 36px 필(r999) · 14/500 · 선택 시 charcoal 채움 + 700 굵기.
- `.score`: 1–5 필 버튼, 선택 시 ink-04 틴트 + charcoal 테두리.

### 2-4. 진행·피드백

- `.progress`: 4px 트랙(ink 8%) + charcoal 채움 [레거시 — step-hud로 대체]
- `.step-hud` + `.step-bar`: 일러스트 위 흰 라벨("고민정리 N/3") + 180×6 바(트랙 `#4d515c`, 채움 cream). 채움 폭 = N×60px.
- `.dots`: 3-dot 바운스 로더 [레거시 — 마크업 미사용. 로딩 표준은 §2-5 캐릭터 링 로더]
- `.checklist .check`: ink-04 박스 r14 + 20px charcoal 체크 원
- `.toast`: grey-900 · r14 · 하단 22px 플로팅 · 2s 자동 소멸 · 체크 원 포함

### 2-5. 캐릭터 링 로더 (07·09) — 로딩 표준

- `.loading-bg`: 산수 배경 절대배치(top 16px, 100% 폭) — `assets/loading-bg/loading-scene@4x.png`
- `.loader-wrap` 170×170: `.loader-ring`(SVG 원, stroke 5, `ringFill` 4.6s dashoffset)
  + `.loader-avatar`(148px 원형 클립, 1s 간격 6신 순환 `assets/loading/*.png`)

### 2-6. 신단 (02)

- `.screen.shelf-dark`: 배경 `#5c281e`, 타이틀 23px 흰색.
- `.shelf-wrap`: 풀블리드(inset 0, translateY(-4px)) — `assets/deities-screen@4x.png`(390×844 좌표계).
- `.shelf-pop`: **배경 이미지를 SVG 알파 마스크로 오려낸 팝 조각**. 평소 opacity 0 →
  탭 시 `charPop`(scale 1.06 · 280ms · drop-shadow) → 150ms 후 소개 시트. 마스크는 6px 팽창분 포함.
- `.shelf-cell`: 캐릭터영역 좌표(피그마 188:4329) 그대로의 투명 탭 타깃.
- 좌표 데이터: `SHELF{w:390,h:844}` + `shelfChars{x,y,w,h}` — %-변환은 `pct()`.

### 2-7. 바텀시트 2종

- **글로벌 시트** `.sheet`(+`.sheet-veil`): phone 루트에 상주. r24 상단 · max-height 76% ·
  translateY(103%)→0, 320ms ease-out. 내용 = `.sheet-head`(64px symbol + 이름/역할) + fit 태그 + line-sample + CTA 2개.
- **스텝 시트** `.sheet-panel`(04–06): 상단이 `top:93.333cqw`(=피그마 364/390) — 화면 높이가 아니라
  **폭에 비례**해야 일러스트와의 겹침이 기기 폭을 따라 유지된다. r20 상단 ·
  `.sheet-scroll`(내부 스크롤, pad 32/24) + `.sheet-foot`(고정, 상단 1px 헤어라인).
- **신 선택 시트**(04, `.picker-*`): 글로벌 시트를 재사용하고 내용만 6신 목록으로 갈아끼운다.
  `.picker-item` = 카드 문법 그대로(surface + 1px ink-08 + r16 · pad 16 · 목록 gap 12) ·
  40px symbol + `.picker-body` + `.picker-go`(**20px SVG 셰브런**, 문자 `›` 아님).
  본문은 `.picker-name`(15/700 **charcoal**) · `.picker-fit`(12 muted, `fitMap`)
  · `.line-sample`(14/600 grey-50 박스, `sampleLine` — 신 소개 시트와 **같은 부품 재사용**).
  **이름에 신별 색을 쓰지 않는다** — 목록에서 6신이 동등하게 읽혀야 한다.
  현재 추천 신만 `.current` = chip·score와 같은 선택 관용구(**charcoal 테두리 + ink-04 틴트**) + `지금 추천` 배지.
  고르면 `selectedDeity`만 바꾸고 `deityEntry`는 건드리지 않는다(아트는 common 유지) → 04 재렌더, 입력값 보존.

### 2-8. 스텝 화면 (04–06)

`.step-screen`(container-type:inline-size) = `.step-art`(상단 일러스트, 신별 `stepArt` 맵 7세트:
common + 6신 전부) + `.step-hud` + `.sheet-panel`. 일러스트는 `assets/steps/{set}-0N@2x.png`.

**아트는 진입 경로를 따른다** — `appState.deityEntry`(02 신단에서 골라 들어왔는지)가 기준이지
`selectedDeity`가 아니다. 공통 입력으로 들어와 04에서 신을 바꾼 경우는 배경이 통째로 갈리면
화면이 바뀐 것처럼 보이므로 common 세트를 유지한다. '뒤로 가기' 목적지(deities/landing)도 같은 값을 쓴다.

**신 컨텍스트 블록**(04, `.deity-ctx`): 텍스트필드 바로 아래.
`.deity-ctx-head`(symbol + `.deity-ctx-name` + `.deity-ctx-swap` "다른 신 의견 듣기")
· `.deity-ctx-fit` · `.deity-ctx-line`. 스왑 버튼이 위 신 선택 시트를 연다.

표시 조건이 경로마다 다르다 — **확인할 게 정해졌으면 바로, 아니면 읽고 나서**:

| 경로 | 입력 전 | 문구 |
|---|---|---|
| 신을 이미 고름(신단 진입·시트 교체) | **바로 표시** | 확정형 "○○이 이 고민을 들을 거예요" |
| 공통 입력 | 숨김 | 입력하면 `matchKeywords`→`matchDeity()`로 추천형 "이 고민은 ○○이 잘 맞아요" |

하단 안내 문구도 같은 기준으로 갈린다 — 신을 골랐으면 "적은 고민은 ○○이 읽어요.",
아니면 "고민부터 시작했든, 토착신을 먼저 골랐든…". 이름 조사는 `josa()`.

### 2-9. 상담 결과 (08)

- `.result-screen`: `--dbg` 신별 딥컬러 + `background-image` 패턴(`assets/result-bg/{id}@2x.png`, cover).
- `.result-hero`(min 140px): eyebrow 13/600 rgba(surface,.8) + quote 20/1.45 surface. 이름 조사는 `josa()`.
- `.result-peek`: **139×149 절대배치(right 24), 카드와 9px 겹침** — `assets/result-peek/{id}.png`(556×596 @4x, 투명).
- `.rcard` ×2 (마음의 결/고민 이름 · 새 문장/작은 실천 + `.rsteps` 번호 리스트).
- `.result-foot`: sticky bottom · `--dbg` 채움 · 페어 버튼(새로운 고민 상담하기 / 부적 만들기).
- 콘텐츠: `deityResult[id]` — hanmadi·maeum·gomin·gominNote·munjang·silcheon*·steps (현재 기준: 구현 기준 문서 A/B/02. `참고자료/신별_동적화_설계.md`는 과거 설계 배경).

### 2-10. 나만의 부적 (10)

- `.flip-scene`(316px) > `.flip-card`(316×498, perspective 1400): 탭/엔터로 rotateY 180°, 640ms.
- 진입 1회 `peek` 힌트(-20° 기울임). `.flip-hint` 캡션이 상태 문구 토글.
- 앞/뒷면: `assets/talisman/{id}-front|back.png`(1264×1992 @4x).
- 카드가 하단 고정 바에 가리지 않도록 상단 압축(`:has(.flip-scene)` 규칙, 카드-바 간격 7px).
- 하단 3버튼 `.bb-stack`: **11 저장/공유(`.share-foot`)와 같은 위계** — 주 행동(저장/공유하기, primary)이
  위 한 줄 전체 폭, 아래 `.bb-btns` 한 줄에 보조 둘(새로운 고민 상담하기 / 상담 결과 다시 보기, secondary).
  08로 되돌아가는 경로는 이 버튼과 상단 바 `상담 결과로` 두 곳.

### 2-11. 저장/공유 (11)

- `.share-screen`: `--dbg` + `.share-bgwrap`(overflow 격리) > `.share-bg`(카드 아트 blur 48px scale 1.15) + `.share-dim`(신색 50%).
- `.share-card`: 폭 81.03%(=316/390) · **r16 클립**(익스포트 모서리 크림색 제거) — `assets/talisman-card/{id}@2x.png`(632×996).
- `.share-foot`: sticky bottom · 투명→`--dbg` 그라디언트 · 저장하기(56) + 다시 하기/부적 공유하기(48).

### 2-12. 랜딩 (01)

- `.landing`: 배경 그라디언트(#e7d0d0→#e4c5c4) 위 `.landing-art` 풀블리드
  (`assets/landing-screen@2x.png`, 780×1688, translateY(14px)).
- 타이틀 24 중앙 · 리드 15/1.4/600 · `.landing-btns` 페어 `.btn-pill` · 링크 · 캡션 12.

### 2-13. 기타

- `.symbol`: 48px(상세 72px) r14 원각 아이콘 박스 — `assets/deities/{한글}.png`.
- `.selected-deity` [레거시], `.deity-card` [레거시 — 02 신단으로 대체], `.badges/.badge` [레거시],
  `.hero/.mascot` [레거시], `.entry-choice/.choice-grid` [레거시], `.talisman-art` [레거시 — flip으로 대체].
- `.phone/.notch/.navchips/.proto-head/.stage/.wrap` [크롬].

---

## 3. 모션 카탈로그

| 이름 | 스펙 | 대상 |
|---|---|---|
| `charPop` | scale 1→1.06(45%)→1 · 280ms · drop-shadow 0 4px 9px 28% | 02 캐릭터 팝 |
| 시트 오픈 | translateY 103%→0 · 320ms ease-out + 베일 페이드 200ms | .sheet |
| 플립 | rotateY 180° · 640ms (.2,.7,.3,1) | .flip-card |
| `peek` | rotateY 0→-20°→0 · 1.1s · 진입 0.9s 지연 1회 | .flip-card 힌트 |
| `ringFill` | dashoffset 534→0 · 4.6s linear | 로더 링 |
| `dot` | translateY -4px 바운스 · 1.2s 무한 | 3-dot |
| press | 오버레이 120ms / btn-pill translate(3,3) | 전 버튼 |

모든 모션은 `prefers-reduced-motion: reduce`에서 비활성.

---

## 4. 자산 인벤토리 (72종)

| 폴더 | 파일 | 해상도 | 스케일 | 용도 |
|---|---|---|---|---|
| assets/ | landing-screen@2x.png | 780×1688 | @2x | 01 풀스크린 |
| assets/ | deities-screen@4x.png | 1560×3376 | @4x | 02 풀스크린 신단 |
| deities/ | {6신 한글}.png ×6 | 288×288 | — | 아바타 아이콘(03·시트) |
| loading/ | {id}.png ×6 | 608×608 | — | 로더 아바타 순환 |
| shelf/ | mask-{id}.svg ×6 | 벡터 | — | 02 팝 실루엣(6px 팽창) |
| steps/ | {common·6신}-{04·05·06}@2x.png ×21 | 780×763–882 | @2x | 04–06 상단 일러스트 |
| loading-bg/ | loading-scene@4x.png | 1560×1358 | @4x | 07·09 배경(top 16px) |
| result-peek/ | {id}.png ×6 | 556×596 | @4x | 08 빼꼼 캐릭터(투명) |
| result-bg/ | {id}@2x.png ×6 | 780×1936 | @2x | 08 딥컬러+패턴 배경 |
| talisman-card/ | {id}@2x.png ×6 | 632×996 | @2x | 11 부적 카드(r16 클립 필요) |
| talisman/ | {id}-front·back.png ×12 | 1264×1992 | @4x | 10 플립 앞/뒷면 |

명명 규약: 영문 신 key(`seonang`…) + `@{scale}x`. 아바타 아이콘만 한글 파일명(레거시).
steps는 6신 전 세트 완비(21장). **02 신단 진입일 때만 신별 세트, 그 외엔 common**(§2-8).

### 공유용 단일 HTML 빌드

`prototype/토닥토닥_프로토타입_단일파일.html` — 자산 72종을 data URI로 내장해 파일 하나로 도는 산출물.
빌드 결과물이라 깃에서 제외한다(`.gitignore`).

- 알파가 거의 없는 컷(투명 <1% = 둥근 모서리뿐)은 **JPEG로 평탄화**. 모서리는 CSS `border-radius`가
  이미 잘라내므로 흰 모서리가 보이지 않는다. 부적 12장이 여기 해당(10.2MB → 1.2MB).
- 진짜 투명한 컷만 PNG 유지, **표시 크기의 2배**로 축소(부적 1000 · 로더/빼꼼 320 · 심볼 160).
- 결과 8.2MB(이전 21MB). 런타임에 data URI → blob URL로 바꾸고 문자열 단위로 경로를 치환한다.
- ⚠️ 시트를 연 **뒤에** `innerHTML`을 다시 쓰면 방금 붙인 클릭 핸들러가 날아간다. 시트 2종은
  `deityMap[].icon`만 참조하고 그건 미리 blob으로 교체되므로, 시트 내용은 건드리지 않는다.

---

## 5. 부록 — 보조·상태 클래스 색인

위 섹션에서 다루지 않은 파생 클래스 전체. (합쳐서 CSS 클래스 152종 = 전수)

**상태 토글**
`.active`(칩·네브 선택) · `.on`(score 선택) · `.open`(시트/베일) · `.show`(토스트)
· `.flipped`(부적 뒤집힘) · `.peek`(플립 진입 힌트) · `.pop`(신단 팝 재생 중)

**공통 구조**
`.topbar`(56px 상단 바, sticky) · `.ctx`(상단 우측 컨텍스트 라벨 13/600 muted)
· `.cta-bar`(하단 CTA — 상단 26px 보호 그라디언트, 문서화된 예외 1) · `.cta-stack`(CTA 2단)
· `.btn-l`(52px 단독 보조 버튼) · `.btn-xl`과 동일 지오메트리 · `.divider`(-24px 블리드 헤어라인)
· `.spacer`(flex 여백) · `.sep`(네브칩 "예외" 구분 라벨)

**화면 파생**
- 랜딩: `.landing-title`(24 중앙) · `.landing-lead`(15/1.4/600) · `.landing-spacer`(flex:1)
  · `.landing-grad`[레거시 — 그라디언트가 이미지에 포함되며 마크업에서 제거]
- 결과(08): `.result-body`(카드 컬럼) · `.result-eyebrow`(13/600 rgba(surface,.8))
- 시트: `.sheet-grab`(44×4 그래버) · `.sheet-role`(13 muted 역할 한 줄)
- 신 선택 시트(04): `.picker-head`/`.picker-sub`(sheet-name·role 재사용, 여백만 목록용)
  · `.picker-list`(세로 12px) · `.picker-body`(이름·fit·예시 컬럼)
- 공유(11): `.share-head`(타이틀 24 + 서브 15, 흰색)
- 로딩(07·09): `.has-bg-art`(screen 배경 아트 모드 — topbar 투명화)
- 플립(10): `.flip-face`/`.flip-back`(양면 공통/뒷면 회전) · `.frame`[레거시 talisman-art 내부]
  · `.gilsang-closing`(길상화 "당신에게" 강조 14/600 — **좌측 라인 없음**, 굵기로만 강조)

**텍스트 보조**
`.info-svg`(캡션 앞 15px 인포 아이콘) · `.sub-text`(14/1.6 보조 문단) · `.meta`(rcard 실천 메타 13 muted)
· `.dim`(본문 안 보조톤 스팬) · `.deity-name`/`.deity-role`[레거시 deity-card 하위]
· `.glyph`·`.mascot-title`[레거시]
