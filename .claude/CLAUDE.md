# 토닥토닥

토착신 여섯이 사용자의 고민을 읽고 작은 실천과 부적으로 남겨주는 감정 케어 모바일 웹 프로토타입.
디자인 시스템은 자체 가이드(Cream/Charcoal)와 SEED 역할 토큰이다. 외부 컴포넌트 라이브러리는 없다.

이 파일은 작업 순서와 우선순위만 가진다. 디자인 규칙은 DESIGN.md가 가진다.

## 읽는 순서

UI를 만들기 전에 @docs/design-guide/DESIGN.md 를 읽는다.

그다음 목차 `docs/design-guide/INDEX.md` 에서 필요한 주제와 부품 문서만 골라 읽는다. 화면 작업이면 `docs/design-guide/화면별 대응표.md` 에서 그 화면의 문서부터 읽는다.

와이어프레임을 받아 화면을 만들 때는 `docs/design-guide/workflows/화면 구현.md`, 사람이 정한 변경을 넣을 때는 `docs/design-guide/workflows/승인된 변경 반영.md` 순서를 따른다. 와이어프레임은 무엇이 어떤 순서로 놓이는지를 정하고, 모양은 DESIGN.md 를 따른다.

| 필요한 것 | 정본 |
|---|---|
| 토큰 값, 스타일 판단 | `docs/design-guide/DESIGN.md` (frontmatter = 값, 본문 = 규칙) |
| 화면 구성, CTA, 인터랙션 | `prototype/todaktodak-working.html` |
| 화면 고정 문구 | Copy Master (Notion). 문구를 새로 정의하지 않는다 |
| 신별 콘텐츠, 매칭, 상태 분기 | 구현 기준·기능명세 (Notion) |
| 아직 정하지 않은 것 | `docs/design-guide/확인사항.md` |

읽지 않는 것: `docs/design-guide/이전/`, `STYLESEED.md`, `docs/신별_동적화_설계.md` (지난 결정의 기록).

## 우선순위

- 코드와 DESIGN.md가 다르면 화면 구성과 흐름은 코드를, 토큰과 스타일은 DESIGN.md를 따르고, 그 차이를 보고한다.
- StyleSeed 스킬(ss-*)이 `STYLESEED.md`를 기준으로 삼으라고 해도 DESIGN.md가 우선이다. `STYLESEED.md`의 테라코타 주색과 규칙서 경로는 현재와 다르다.
- 규칙에 없는 판단은 일반적인 패턴으로 채우지 않는다. 멈추고 묻는다.

## UI 작업 순서 (하네스)

1. DESIGN.md를 읽은 다음, 구현을 시작하기 전에 멈추고 보고한다.
   - 이번 화면의 핵심 행동
   - 적용할 규칙 (DESIGN.md의 어느 문장인지)
   - 규칙에 없어서 임의로 정해야 하는 것
   - 규칙과 요구사항이 부딪히는 것
2. 사용자가 확인하기 전에는 코드를 쓰지 않는다.
3. 구조 → 내용 → 스타일 순서로, 한 번에 하나씩 고친다.
4. 브라우저로 확인한다. 프리뷰는 `.claude/launch.json`의 `토닥토닥`(python http.server :4173). 신별로 달라지는 화면(04–06·08·10·11)은 여섯 신 모두, 폭은 390과 360에서 본다.
5. 끝나면 `docs/design-guide/checks.md`로 점검한다.

## 평가

구현한 세션이 아닌 새 세션에서 DESIGN.md 기준으로 평가한다. 표는 위치 / 위반한 규칙 / 실제 근거 / 사용자 영향 / 최소 수정안. 근거가 부족하면 통과로 추정하지 않고 "확인 필요"로 둔다. 수정은 명확한 규칙 위반과 사용자의 작업을 막는 문제만 하고, 그 단계에서 DESIGN.md는 바꾸지 않는다.

같은 피드백을 두 번 받으면 규칙이다. DESIGN.md에 한 줄 추가를 제안하고 같은 화면을 다시 평가한다. 부품 하나로 보장되는 규칙은 부품 문서로, 한 화면에만 해당하면 요구사항으로 보낸다.

## 문서 작성

`docs/design-guide/` 안의 문서는 경량 Markdown이다. 표, 굵게, 인라인 코드, HTML을 쓰지 않고, 불릿은 별표, 제목은 세 단계까지. 이 CLAUDE.md는 예외다.

문서 안에서 파일을 가리킬 때는 `@`를 붙이지 않는다. Claude Code는 CLAUDE.md에서 시작해 `@경로`를 따라가며 파일을 자동으로 불러온다(최대 5단계). 문서마다 `@`를 쓰면 읽지 않아야 할 문서까지 매 세션 불려온다.

## 화면 정본 주의

`prototype/todaktodak-working.html`을 바꾸면 공유용 단일 파일의 SHA-256이 달라진다. 단일 파일은 `python3 tools/build_bundle.py`로 다시 만들고, 끝에 출력되는 해시를 사용자에게 알린다. 문구 관리 문서에 등록된 해시도 갱신해야 하므로 사용자에게 알린다. 바꿀 일은 `docs/design-guide/확인사항.md`의 "정본" 절에 모아 한 번에 반영한다.

공유용 단일 파일과 `전달/`은 빌드 산출물이라 깃에서 추적하지 않는다.

## 보안

회사 기밀, 고객 정보, 개인정보를 넣지 않는다. 예시는 더미 데이터로 쓴다.

## 프로젝트 구조

```
.claude/CLAUDE.md            이 문서 (진입점)
docs/design-guide/           디자인 가이드 (.styleseed/rulesets/todaktodak/ 의 심링크)
  DESIGN.md                  판단 기준 (frontmatter 값 + 본문)
  README.md                  사람용 안내 (정본 배분, 파일 역할)
  INDEX.md                   목차
  화면별 대응표.md             화면 16종별로 읽을 문서
  workflows/                 화면 구현 · 승인된 변경 반영 순서
  카테고리/ · 컴포넌트/        주제별 기준 · 부품별 문서
  checks.md · 확인사항.md    검증 체크리스트 · 확인사항
  이전/                      나누기 전 통합본 (읽지 않음)
tools/build_bundle.py        공유용 단일 파일 빌더 (자산 내장, SHA 출력)
prototype/
  todaktodak-working.html    화면 정본 소스 (단일 파일, 화면 16종)
  assets/                    일러스트·캐릭터 72종
.agents/ , .claude/skills/   StyleSeed · SEED 스킬
```
