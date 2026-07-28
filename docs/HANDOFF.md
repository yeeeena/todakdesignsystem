# 토닥토닥 프로토타입 — 인수인계 문서

> 다른 노트북에서 이어서 작업할 때 Claude에게 이 문서를 먼저 읽히세요.
> 마지막 업데이트: 2026-07-27

## 프로젝트 개요

- **제품**: 토닥토닥 — 토착신 AI 고민 처방 (고민 입력 → 토착신 해석 → 작은 실천 → 부적 생성)
- **현재 산출물**: 클릭스루 HTML 프로토타입 (17개 화면, 390px 모바일)
- **피그마**: https://www.figma.com/design/ZnDrdZztaeO9qjmG3ckgL5/토착신
  - 워크플로: 피그마에서 디자이너가 화면을 다듬음 → 노드 링크를 Claude에게 주면 프로토타입에 반영

## 파일 구조

| 경로 | 내용 |
|---|---|
| `prototype/todaktodak-working.html` | **메인 작업본** — 모든 수정은 여기에 |
| `prototype/assets/` | 랜딩 4x, 6신 아이콘, 로딩 아바타 6종, 부적 카드 12장(6신×앞뒤, 4x) |
| `prototype/todaktodak-tds-v1.html` | 보존용 — 토스 TDS 버전 (수정 금지) |
| `prototype/todaktodak-styleseed-v2.html` | 보존용 — StyleSeed 버전 (수정 금지) |
| `prototype/토닥토닥_프로토타입.zip` · `_단일파일.html` | 팀 공유본 — 수정 후 재빌드 필요 |
| `docs/부적_통합문서.html` | 부적 구조·6신·가변 슬롯 정의 (원본: Downloads) |
| `.agents/skills/seed-design/` | **디자인 기본 근간 — 당근 SEED Design 스킬** (2026-07-27 토스 TDS에서 교체). 파운데이션·컴포넌트·CLI 가이드 포함, 상세는 llms.txt 참조 (https://seed-design.io/foundations/llms.txt) |
| `docs/toss-design.md` | 구(舊) 기반 — 토스 TDS 카탈로그. v1의 기반이었고 현재는 보존/참고용 |
| `STYLESEED.md` | StyleSeed 락 파일 — v2 실험 당시 값, 현재 작업본과 다름(참고용) |
| `.agents/skills/` | StyleSeed 스킬 21종 (npx skills add bitjaru/styleseed) |

## 디자인 근간

**당근 SEED Design** (`npx skills add https://github.com/daangn/seed-design --skill seed-design`)이 기본 근간.
- 원칙: 역할 기반 색상(`--seed-color-fg/bg/stroke-*`) 우선, 팔레트 직접 참조는 예외만
- 타이포 스케일 t1~t10, 파운데이션 상세는 llms.txt (color/typography/spacing/radius/elevation/motion)
- ✅ 작업본 HTML은 SEED 역할 토큰으로 마이그레이션됨 (2026-07-27): 컴포넌트는 `--seed-color-fg/bg/stroke-*`를 참조하고, 값은 브랜드 팔레트(Cream/Charcoal)를 가리킴. 팔레트 값 교체 시 전체 반영.
- [확장] 표기 토큰 3종(`bg-layer-default`, `bg-layer-fill`, `stroke-neutral(-strong)`, `bg-overlay`)은 SEED 공개 문서에 없어 네이밍 규칙에 맞춰 자체 확장한 것 — SEED 공식 layer 토큰명 확인 시 교체.
- 마이그레이션 전 백업: `prototype/.todaktodak-working.pre-seed.bak`

## 디자인 토큰 (작업본 :root — 현재 확정 상태)

- 페이지 배경 `--cream: #f7f4ed` / 카드·버튼 표면 `--surface: #FFFDFC` (분리됨!)
- 텍스트 `--charcoal: #1c1c1c` (100/83/82%), 보조 `--muted: #5f5f5d`
- 인터랙티브 보더 `charcoal 40%`, 헤어라인 `8%`, 틴트 `4%/3%`
- 폰트 Pretendard(CDN). 컴포넌트는 **SEED 실측 스펙** 적용(2026-07-28, @seed-design/css 2.2.1 기준):
  - CTA(ActionButton large): **높이 52 · radius 12 · 18px Bold** (가로 페어 버튼만 16px 예외 — 한글 라벨 줄바꿈 방지) · 양옆 마진 24
  - 중간 버튼(medium): 40 · radius 8 · 14px Bold
  - 칩(ControlChip large): min-height 36 · **full pill** · 14px Medium, 선택 시 Bold
  - 입력창 포커스: 2px 보더
  - ※ 사용자가 이전에 정의했던 "CTA 56px/16px"는 SEED 스펙 적용 결정(2026-07-28)으로 대체됨
- 시맨틱(레드·오렌지)은 안전/실패 화면 전용

## 6신 체계 (구 3신에서 전환됨)

서낭신(관계) · 산신(번아웃/중심) · 삼신할미(시작/비교) · 문신(경계/거절) · 용왕(감정 파도/타이밍) · 칠성신(막막함/숨고르기)
- 한마디 카피: 산신·칠성신 = 통합문서 원문 / 서낭신·문신·용왕 = **Claude 초안 (팀 확정 필요)**
- 신별 실천 기본값은 JS `practiceMap`에 연결됨 (통합문서 §2 기준)

## 화면 상태 (피그마 리파인 반영 여부)

- ✅ 반영됨: 01 시작(일러스트 랜딩) · 02 리스트 · 03 상세 · 04 입력 · 08/10 로딩(차오르는 링+신 순환) · 11 부적(플립 인터랙션)
- ⏳ 미반영(초기 버전): 05 반영확인 · 06 여력 · 07 정리 · 09 상담 결과 · 12 저장/공유 · 13/14 피드백 · 15~17 예외
- 부적 화면: 신별 카드 이미지·실천 문구 동적 교체 구현됨. 단 **고민별 상태 변화(상태 1/3, 한마디/키워드 변형)는 미구현** — 상태별 자산과 "고민 매핑 문서"가 없음 (통합문서 §1 참고)

## 인터랙션 스펙

- 로딩: 12시부터 시계방향으로 차오르는 검정 링(4.6s) + 신 아바타 1초 순환 → 완료 시 자동 전환
- 부적: 카드 탭으로 앞/뒤 플립(640ms 3D), 진입 시 peek 힌트 1회, 힌트 문구 토글
- 하단 CTA: sticky, 보호 그라디언트. 입력/부적 화면은 캡션 포함 2버튼 바(`.bottom-bar`+`.bb-btns`)

## 공유본 재빌드

수정 후 "공유본 다시 만들어줘"라고 하면: ① zip 재생성 ② 단일파일(이미지 2x 다운스케일 → base64 임베드, 동적 참조는 B64 맵 주입) 재생성. 스크립트 패턴은 이 문서를 만든 세션 히스토리 참고, 없으면 Claude가 재작성 가능.

## 미해결 / 다음 할 일

1. 나머지 화면(05~07, 09, 12~17) 피그마 리파인 → 프로토타입 반영
2. 서낭신·문신·용왕 카피 확정
3. 고민 매핑 문서 수급 → 부적 가변 슬롯(상태 1~3) 구현 방식 결정 (통짜 이미지 36장 vs 레이어 합성+라이브 텍스트)
4. 부적 화면 타이틀·"부적에 담은 의미"는 아직 고정 데모 카피
5. Pretendard CDN 의존 — 완전 오프라인 공유가 필요하면 폰트 임베드
