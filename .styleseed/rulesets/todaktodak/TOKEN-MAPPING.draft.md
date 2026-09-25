# 토큰 정리 매핑표 — 초안 (검수 전)

> 이 문서의 토큰 이름은 2026-09-25 개편 전의 옛 이름이다. 지난 판단의 기록으로 남겨 두며, 지금 쓰는 이름은 DESIGN.md 의 frontmatter 를 본다.

> 2026-09-19 부분 적용: 판단이 필요 없는 부분(① 미사용 삭제, ② 값이 같은 치환, ③ 원시 토큰 치환)을 코드에 반영했다. 이름만 바꾼 104곳은 화면 67개 상태에서 계산된 스타일이 한 곳도 달라지지 않았다. 옛 별칭은 25개를 지우고 6개가 남았다.
> 남은 것은 아래 🔶 판단 4가지와 그에 달린 치환, 씬 토큰 신설이다.
> 토큰 이름은 판단이고 판단은 사람의 것이라, 🔶 표시 항목을 검수받은 뒤 적용합니다.
> 작성 2026-09-19 · 근거 `prototype/todaktodak-working.html` `:root` 전수 + 사용처 집계

---

## 한눈에

| | 지금 | 정리 후 |
|---|---|---|
| `:root` 토큰 수 | **81** | 55 (색 36 + 비색상 19) |
| **새 코드가 쓸 수 있는 색 이름** | 사실상 제한 없음 | **SEED 20개 + 씬 색 5개** |
| "보조 텍스트" 한 용도의 이름 | **11개** (실사용 6) | **2개** |
| 이름과 값이 다른 토큰 | 8개 (`--blue-500` = 차콜 등) | **0개** |
| `:root` 밖 원시 HEX | 14곳 | 0곳 (프로토타입 셸 2곳 제외) |

**화면 변화: 🔶 항목을 빼면 0입니다.** 별칭은 전부 SEED를 `var()`로 참조하고 있어서, 이름만 바꿔도 계산된 값이 같습니다.

---

## 원칙 — SEED 이름은 바꾸지 않습니다

스킬 린터(`lint_tokens.py`)는 SEED 20개 중 16개를 지적했습니다(`weak`·`muted`·`subtle`이 순서를 추론할 수 없는 변형 이름이라는 이유).
그러나 SEED는 **당근 공개 디자인 시스템의 표준 어휘**라 이름을 바꾸면 SEED 문서·스킬(`seed-design`)과 연결이 끊깁니다.

그래서 **이름을 고치는 대신 "쓸 수 있는 이름을 20개로 좁히는"** 쪽을 택했습니다.
순서가 이름에 없는 문제는 아래 표로 보완합니다 — AI는 이 표를 읽고 고르면 됩니다.

| 용도 | 1순위 (가장 강함) | 2순위 | 3순위 |
|---|---|---|---|
| 글자 (fg) | `fg-neutral` 차콜 100% | `fg-neutral-muted` 82% | `fg-neutral-subtle` #5f5f5d |
| 선 (stroke) | `stroke-neutral-strong` 40% | `stroke-neutral` 8% | — |
| 면 (bg) | `bg-layer-default` 크림 | `bg-neutral-solid` 표면 | `bg-neutral-weak` 4% → `bg-layer-fill` 3% |

---

## 층 구조 (정리 후)

```
원시 팔레트 (11)  cream · surface · charcoal · offwhite · ink-83/82/40/08/04/03 · muted
      ↑ 참조만. 새 코드에서 직접 쓰지 않는다
SEED 역할 (20)    --seed-color-{fg|bg|stroke}-{역할}-{변형}     ← 새 코드는 여기만
씬 색 (5, 신규)   --scene-*   특정 화면 전용 (신단 배경 등)
비색상 (19)       --r-* · --dur-* · --ease* · --shadow-* · --phone-w · 상태 2종   ← 이번 범위 밖, 유지
```

별칭 층(`--grey-*`, `--blue-*`, `--text-*` 등 31개)은 **없앱니다.**

---

## ① 바로 삭제 — 미사용 별칭 12개

어디서도 참조하지 않아 지워도 아무 일도 없습니다. 검수 없이 진행 가능합니다.

| 토큰 | 값 | 비고 |
|---|---|---|
| `--blue-600` · `--blue-700` | 차콜 | 이름은 파랑 |
| `--grey-700` · `--grey-600` | SEED 보조 텍스트 | |
| `--red-500` | critical | `--fg-critical-primary`로 충분 |
| `--green-500` | **차콜** | 이름은 초록 |
| `--orange-500` | warning | `--fg-warning-primary`과 같은 값 |
| `--yellow-500` · `--yellow-300` · `--orange-300` | **크림** | 이름은 노랑·주황 |
| `--line-subtle` · `--fill-secondary` | 3% · 4% | |

---

## ② 치환 — 사용 중인 별칭 19개 → SEED

값이 같아서 **화면 변화 없음.** 괄호는 사용 횟수(총 **88곳**).

| 지금 | → SEED | 사용 | 주의 |
|---|---|---|---|
| `--text-primary` | `--fg-neutral-primary` | 18 | |
| `--text-secondary` | `--fg-neutral-secondary` | 15 | |
| `--fg-tertiary` | `--fg-neutral-tertiary` | 9 | |
| `--grey-500` | `--fg-neutral-tertiary` | 1 | |
| `--grey-900` | `--fg-neutral-primary` | 3 | |
| `--text-brand` | `--fg-brand-primary` | 6 | |
| `--border-secondary` | `--stroke-neutral-primary` | 6 | |
| `--grey-200` | `--stroke-neutral-primary` | 2 | |
| `--grey-400` · `--grey-300` | `--stroke-neutral-secondary` | 3 | |
| `--grey-50` | `--bg-layer-secondary` | 6 | |
| `--grey-100` | `--bg-neutral-secondary` | 1 | |
| `--white` | `--bg-neutral-primary` | 5 | ⚠️ 이름은 흰색, 실제는 표면색 `#FFFDFC` |
| `--blue-50` | `--bg-neutral-secondary` | 4 | ⚠️ 이름은 파랑, 실제는 차콜 4% |
| `--blue-500` | `--stroke-brand-primary` | 2 | ⚠️ 이름은 파랑, 실제는 **차콜** |
| `--fill-brand` | `--bg-brand-primary` | 2 | |
| `--bg-overlay` | `--bg-overlay-primary` | 1 | 같은 값이 두 이름으로 정의돼 있었음 |
| `--grey-800` | 🔶 아래 판단 1 | 2 | |
| `--fg-quaternary` | 🔶 아래 판단 2 | 2 | |

---

## ③ 원시 팔레트 직접 참조 → SEED (33곳)

| 지금 | → SEED | 사용 |
|---|---|---|
| `--charcoal` | 글자면 `fg-neutral` · 채움이면 `bg-brand-solid` · 선이면 `stroke-brand-solid` | 13 |
| `--surface` | `--bg-neutral-primary` (글자로 쓰인 곳은 `fg-neutral-inverted`) | 10 |
| `--ink-04` | `--bg-neutral-secondary` | 3 |
| `--ink-82` | `--fg-neutral-secondary` | 2 |
| `--muted` | `--fg-neutral-tertiary` | 2 |
| `--ink-08` | `--stroke-neutral-primary` | 1 |
| `--ink-03` | `--bg-layer-secondary` | 1 |
| `--ink-83` | 🔶 아래 판단 1 | 1 |

`--charcoal`·`--surface`는 **쓰인 속성(`color`/`background`/`border`)을 보고** 대상을 고릅니다. 기계 치환이 아니라 한 곳씩 확인합니다.

---

## ④ `:root` 밖 원시 HEX 14곳

| 위치 | 지금 | 제안 |
|---|---|---|
| `.screen.shelf-dark` · `.shelf-dark .topbar` | `#5c281e` | **신규** `--scene-shelf-bg` (tokens.json `sceneColor.shelfDark`와 같은 값) |
| `.step-bar` | `#4d515c` | **신규** `--scene-hud-track` (`sceneColor.hudTrack`) |
| `.btn-pill` | `#fffdfa` | **신규** `--scene-landing-pill` (`sceneColor.neoBrutalSurface`) |
| `.landing` 그라디언트 | `#e7d0d0` · `#e4c9c9` … | **신규** `--scene-landing-from` · `--scene-landing-to` 🔶 판단 4 |
| `.loader-avatar` | `#e9e6df` | 🔶 판단 4 |
| `.toast` · `.step-hud b` | `#fff` | `--fg-neutral-inverted` 🔶 판단 3 |
| `.shelf-dark .icon-btn` · `.shelf-dark .h-page` | `#fffdfc` | `--fg-neutral-inverted` 🔶 판단 3 |
| `.talisman-art` · `.landing-grad` | `#eee9dc` · `#e3c5a7` | **클래스째 삭제** — 마크업에서 쓰이지 않는 레거시 |
| `body` · `.navchips button.active` | `#efece3` · `#fff` | 제외 — 프로토타입 셸(화면 선택 칩), 제품 아님 |

`tokens.json`에는 씬 색이 이미 기록돼 있는데 CSS 변수로는 없어서, 문서와 코드가 따로 놀고 있었습니다. 이번에 맞춥니다.

---

## 🔶 검수가 필요한 판단 4가지

**1. `--ink-83`을 `--ink-82`로 합칠까요?**
83%와 82%, 차이 1%입니다. 눈으로 구분되지 않는데 이름은 둘입니다.
쓰이는 곳: 시작 화면 리드 문구, 아이콘 버튼 색, 레거시 부적 프레임.
→ **제안: 합친다** (`fg-neutral-muted`로). 시각 변화: 불투명도 1%.

**2. `--fg-quaternary`는 무엇인가요?**
이름은 "4번째 글자색"인데 실제로는 **선 토큰(`stroke-neutral-strong`, 40%)** 을 가리킵니다.
쓰이는 곳은 텍스트영역 placeholder와 신 선택 시트의 셰브런 — 둘 다 **"비활성·보조 표시"** 성격입니다.
→ **제안 A**: SEED 관례대로 `--seed-color-fg-placeholder`를 신설(값 동일). 글자색은 글자 토큰에서 고른다는 원칙이 지켜짐.
→ 제안 B: 그대로 `stroke-neutral-strong`을 씀. 토큰 수는 안 늘지만 글자에 선 토큰을 쓰게 됨.
→ **A를 권합니다.**

**3. 흰 글자 `#fff` · `#fffdfc` → `fg-neutral-inverted`(`#fcfbf8`)로 통일할까요?**
딥컬러·어두운 배경 위 흰 글자가 세 가지 값으로 흩어져 있습니다.
→ **제안: 통일.** 시각 변화: 흰색이 아주 약간 따뜻해짐(`#fff` → `#fcfbf8`).

**4. 랜딩 그라디언트·로더 아바타 배경을 토큰으로 만들까요?**
두 곳에서만 쓰는 일러스트 보조색입니다.
→ 제안: 랜딩 그라디언트는 씬 토큰으로(화면 인상을 좌우하는 색). 로더 아바타 배경 1곳은 `bg-layer-fill`로 흡수할지, 씬 토큰으로 둘지 결정 필요.

---

## 적용 순서 (검수 후)

1. ① 미사용 12개 삭제 · ② 19개 치환 · ③ 33곳 치환 — **값이 같으므로 화면 변화 없음**
2. 🔶 판단 결과 반영 · ④ 씬 토큰 신설
3. **16화면 × 6신 스크린샷을 적용 전후로 비교** — 판단 1·3 외에 픽셀 차이가 나오면 치환 실수
4. `DESIGN.md` frontmatter `colors`에 씬 색 추가(본문 Colors에는 이미 "새 코드는 SEED 역할 토큰만"이 있음), `tokens.json` · `카테고리/색상 체계.md` 갱신
5. ⚠️ `todaktodak-working.html`이 바뀌므로 **화면 정본 SHA-256이 달라집니다.**
   공유용 단일 파일 재빌드 + 문구 관리 문서의 등록 해시 갱신이 필요합니다.
