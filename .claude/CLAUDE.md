# 토닥토닥

토착신 6명이 사용자의 고민을 읽고 작은 실천과 부적으로 남겨주는 **감정 케어 모바일 웹** 프로토타입.
디자인 시스템: 자체 가이드(warm mono · Cream/Charcoal) + SEED 역할 토큰. 외부 컴포넌트 라이브러리 없음.

## 읽어야 할 문서 (작업 전에)

| 작업 | 먼저 읽을 것 |
|---|---|
| **UI를 만들거나 고치기 전에 (항상)** | `docs/design-guide/DESIGN.md` — frontmatter = 토큰 값, 본문 = 언제·왜 |
| 새 화면을 설계할 때 | `docs/design-guide/RULESET.md` (판단 기준 12축) |
| 화면·컴포넌트를 만들거나 고칠 때 | `docs/design-guide/COMPONENTS.md` · `tokens.json` |
| 작업을 끝냈을 때 | `docs/design-guide/checks.md` (필수·금지·회귀 시나리오) |
| 화면 구성·CTA·인터랙션 | `prototype/todaktodak-working.html` — 화면 정본의 소스 |
| 화면 고정 문구 | **Copy Master (Notion)** — 문구를 새로 정의하지 않는다 |
| 신별 콘텐츠·매칭·상태 분기 | 구현 기준·기능명세 (Notion) — `docs/`의 과거 설계 문서는 기준 아님 |

`docs/design-guide/`는 `.styleseed/rulesets/todaktodak/`의 심링크다. 편집은 어느 쪽에서 해도 같다.

## 디자인 하네스 — UI 작업 순서

UI를 만들기 전에 @docs/design-guide/DESIGN.md 를 읽는다.

읽은 다음 구현을 시작하기 전에 멈추고 아래를 보고한다.
- 이번 화면의 핵심 행동
- 적용할 규칙 (DESIGN.md의 어느 문장인지)
- 규칙에 없어서 임의로 정해야 하는 것
- 규칙과 요구사항이 부딪히는 것

사용자가 확인하기 전에는 코드를 쓰지 않는다.

## 절대 규칙

1. **순검정 `#000` 금지, 새 색은 SEED 역할 토큰(`--seed-color-*`)으로만.** 이유: 위계를 색이 아니라 잉크 불투명도로 만드는 시스템이고, 별칭 토큰 중에는 이름과 값이 다른 것(`--blue-500`=차콜)이 있다.
2. **신별 딥컬러는 배경 전용.** 버튼·테두리·목록의 이름에 쓰지 않는다. 이유: 신 선택처럼 6신을 비교하는 UI에서 한 신만 튀면 안 된다.
3. **아이콘은 24px SVG stroke 1.8.** 문자 글리프(✕ ›)·이모지 금지.
4. **`safety_locked` 문구의 자리(01·04·10·11·14·15)를 없애거나 가리지 않는다.** 문구 자체는 Copy Master 정본.
5. **판단이 필요한데 문서에 없으면 추측하지 말고 묻는다.** 특히 제품 정책·상태 분기·신별 콘텐츠.

## 작업 흐름

1. 계획 먼저 — 바꿀 화면·컴포넌트·토큰을 제시하고 확인을 받는다.
2. 구조 → 내용 → 스타일 순서로. 한 번에 하나씩.
3. 브라우저로 확인한다. 프리뷰는 `.claude/launch.json`의 `토닥토닥` (python http.server :4173).
   신별로 달라지는 화면(04–06·08·10·11)은 **6신 전부** 확인한다.
4. 끝나면 `checks.md`를 통과시키고, 검수 3항목(누락 / UX / 시키지 않은 것)을 점검한다.
5. 리뷰에서 두 번 나온 피드백은 `DESIGN.md` 판단 기록에 추가를 제안한다.

## 주의

- `prototype/todaktodak-working.html`을 바꾸면 **화면 정본 SHA-256이 달라진다.**
  공유용 단일 파일(`prototype/토닥토닥_프로토타입_단일파일.html`)을 다시 빌드하고,
  문구 관리 문서에 등록된 해시도 갱신해야 한다는 점을 사용자에게 알린다.
- 공유용 단일 파일과 `전달/`은 빌드 산출물이라 깃에서 추적하지 않는다.

## 프로젝트 구조

```
.claude/CLAUDE.md            ← 이 문서 (진입점)
STYLESEED.md                 브랜드 락 (과거 결정 기록 — 주색 표기가 현재와 다름)
docs/design-guide/           디자인 가이드 (DESIGN · RULESET · COMPONENTS · checks · tokens …)
prototype/
  todaktodak-working.html    화면 정본 소스 (단일 파일, 화면 16종)
  assets/                    일러스트·캐릭터 72종
.agents/ , .claude/skills/   StyleSeed · SEED 스킬
_workspace/                  임시 산출물 (추적 안 함)
```
