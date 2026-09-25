# 에셋 스튜디오 구현 계획 (1차: 시험, 보기, 업로드·확정, 동기화)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 토닥토닥 에셋 60칸을 보고, 외부 이미지를 후보로 올려 확정하고, 확정분을 main과 Figma에 동기화하는 Claude 아티팩트 관리자 페이지를 만든다.

**Architecture:** 페이지(`tools/asset-studio/index.html` + `lib.js`)는 claude.ai 아티팩트로 올리고 `db`·`assets`·`user` 능력을 쓴다. 칸 목록과 규격은 파이썬(`slots.py`, `seed.py`)이 레포에서 읽어 `db`에 넣는다. GitHub·Figma 반영은 Claude Code가 `SYNC.md` 절차와 `sync.py`로 한다.

**Tech Stack:** 순수 HTML/JS(빌드 없음), Python 3 표준 라이브러리 + Pillow 11, unittest, Artifact·ArtifactData 도구, Figma MCP(`use_figma`).

**설계 문서:** `docs/superpowers/specs/2026-09-25-asset-studio-design.md`

**이번 계획에서 뺀 것:** 주제·아이템·생성(설계 4장 2~4, 6장 `topics`). Task 1 시험 결과를 본 뒤 2차 계획으로 쓴다.

---

## 작업 환경

* 작업은 저장소 안의 git worktree에서 한다(원래 폴더에는 다른 사람이 작업 중인 변경이 있다). Artifact 도구와 프리뷰가 작업 폴더 안의 파일만 다루므로 `.worktrees/`에 둔다. `.gitignore`에 `.worktrees/`를 먼저 추가한다.
  `git worktree add .worktrees/asset-studio -b asset-studio 6189976`
* 동기화 대상 브랜치: 선행 조건 참조. 동기화용 worktree는 `.worktrees/sync`.
* 프리뷰는 원래 폴더 루트에서 뜨므로 테스트 주소는 `http://localhost:4173/.worktrees/asset-studio/tools/asset-studio/test.html`.
* 모든 커밋 메시지 끝에 `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>` 줄을 붙인다.
* 페이지(Task 1, 7~9)를 쓰기 전에 `artifact-design`과 `artifact-capabilities` 스킬을 불러오고, 능력 API는 그 스킬의 타입 정의(`0.2.58/db.d.ts`, `assets.d.ts`, `user.d.ts`, `mcp.d.ts`)를 따른다. 아래 코드의 API 이름은 그 정의로 검증한 뒤 쓴다.
* 에셋 주소는 추측하지 않는다. 업로드 결과의 `id`와 `url`을 둘 다 저장하고, 화면에는 `url`을 그대로, 동기화의 `Artifact read`에는 `id`를 쓴다.

## 선행 조건 (사용자 결정 필요)

main은 2026-07-28에 멈춰 있고 `design-guide-and-figma-sync`가 36커밋 앞서 있다(main 쪽 새 커밋은 0). 새 에셋 30장과 그것을 쓰는 화면 정본이 main에 없다. Task 10 전에 둘 중 하나를 사용자가 정한다.
* 이 브랜치를 main에 빨리감기(fast-forward) 병합하고 푸시한 뒤 main에 동기화한다.
* 동기화 대상을 `design-guide-and-figma-sync`로 바꾼다.

스튜디오 코드(`tools/asset-studio/`)도 동기화 대상 브랜치에 병합해 두어야 `.worktrees/sync`에서 `sync.py`를 쓸 수 있다(Task 11 Step 1).
* 테스트: `python3 -m unittest discover -s tools/asset-studio/tests -v` (pytest 없음, node 없음).
* JS 순수 함수는 `tools/asset-studio/test.html`을 프리뷰(`.claude/launch.json`의 `토닥토닥`, :4173)로 열어 확인한다.
* 신 id와 한글 이름: sansin 산신, yongwang 용왕, chilseong 칠성신, samsin 삼신할미, seonang 서낭신, munsin 문신.

## 파일 구조

* `tools/asset-studio/slots.py` — 60칸 목록(칸 id, 신, 종류, 레포 경로, 투명 여부). 순수 데이터와 함수.
* `tools/asset-studio/seed.py` — 레포 원본에서 크기와 git blob SHA를 읽어 `seed.json`(db에 넣을 slots 문서) 생성.
* `tools/asset-studio/sync.py` — 동기화의 파일 쪽: 대기 항목 고르기, blob SHA 비교, 규격 재검사, 파일 쓰기, 커밋 메시지 만들기.
* `tools/asset-studio/lib.js` — 페이지의 순수 함수: 파일명 매칭, 규격 검사, 자르기 계산.
* `tools/asset-studio/index.html` — 페이지(화면, db·assets 연결).
* `tools/asset-studio/test.html` — lib.js 브라우저 테스트.
* `tools/asset-studio/figma-map.json` — 60칸과 Figma 노드 id 대응(Task 2 산출).
* `tools/asset-studio/SYNC.md` — Claude Code 동기화 절차.
* `tools/asset-studio/tests/test_slots.py`, `test_seed.py`, `test_sync.py`.

---

### Task 1: 시험 — 페이지에서 커넥터·업로드·결과 저장이 되는지

설계 9장 1·2·3·6번. 결과는 2차 계획(생성)의 입력이다. 이 태스크는 코드를 레포에 남기지 않는다(스크래치패드에서 한다).

**Files:**
- Create: `<scratchpad>/spike/index.html`

- [ ] **Step 1: 도구 스키마 확인**

ToolSearch로 Higgsfield `media_upload`, `media_confirm`, `generate_image`, `remove_background`, `jobs_wait`와 Krea `get_upload_url`, `generate_image`, `get_job`, `list_models` 스키마를 불러와 입력 이름을 적어둔다. 결과 모양은 Claude Code에서 안전한 읽기 호출(`models_explore list`, Krea `list_models`)로만 확인한다. 생성 호출은 비용이 드므로 사용자에게 먼저 묻는다.

- [ ] **Step 2: 시험 페이지 작성**

버튼 하나마다 한 단계를 시험하고, 결과(성공 여부, 오류 코드, 걸린 시간)를 화면과 `db`의 `spike/results` 문서에 쓴다.

1. `claude.use("mcp")` 후 `listTools()` — 두 커넥터가 보이는지, `fileArgs`가 있는지.
2. `assets.upload`로 `sansin-front.png`(1264×1992, 레포 원본)를 올리고 걸린 시간.
3. Higgsfield `media_upload`로 받은 presigned URL에 페이지에서 `fetch(PUT)` — 성공 또는 CSP 오류.
4. Krea `get_upload_url`로 받은 URL에 `fetch(POST multipart)` — 성공 또는 CSP 오류.
5. 3이나 4가 되면 그 참고 이미지로 `generate_image` 1장(가장 싼 모델, 사용자 동의 후).
6. 결과 이미지 URL을 `fetch` → Blob → `assets.upload` — 성공 또는 CSP 오류. 안 되면 `<img src>` 표시만 되는지.
7. 결과에 `remove_background` 1회.
8. `assets.upload` 결과의 `url`로 `<img>`를 캔버스에 그리고 `getImageData`와 `toBlob('image/png')`가 되는지(교차 출처 오염 여부).
9. `db` 쓰기·`onSnapshot`, `user` 식별자 읽기가 타입 정의대로 되는지.

이 시험 페이지는 버리는 스크래치 페이지라 CLAUDE.md 하네스(규칙 보고) 대상에서 뺀다.

- [ ] **Step 3: 올리고 사용자에게 열어달라고 하기**

`Artifact` publish, `capabilities: {db:{}, assets:{}, mcp:{servers:[{server:"higgsfield", tools:[...]},{server:"krea", tools:[...]}]}}`. 사용자에게 링크를 주고 버튼을 차례로 눌러달라고 한다.

- [ ] **Step 4: 결과 읽기와 기록**

`ArtifactData get spike/results`로 결과를 읽고 `docs/superpowers/specs/2026-09-25-asset-studio-design.md` 9장 아래에 "시험 결과(날짜)"로 한 단락씩 적는다. 커밋.

```bash
git add docs/superpowers/specs/2026-09-25-asset-studio-design.md
git commit -m "에셋 스튜디오: 페이지 시험 결과 기록"
```

---

### Task 2: 시험 — Figma 원본과 60칸 대응, 이미지 교체

설계 9장 4번.

**Files:**
- Create: `tools/asset-studio/figma-map.json`

- [ ] **Step 1:** figma-use 스킬을 불러온다. `get_metadata`로 파일 `ow7XywHI2I3ucWMc13002C`의 Element 페이지에서 일러스트 원본 72장 노드를 찾는다.
- [ ] **Step 2:** 60칸 각각을 노드 id에 대응시켜 `figma-map.json`에 `{"sansin-talisman-front": "123:456", ...}`로 쓴다. 대응이 안 되는 칸은 `null`로 두고 목록을 사용자에게 보고한다.
- [ ] **Step 3:** 원본이 아닌 **복제 노드** 하나에 `use_figma`로 이미지 채우기 교체를 시험하고, 확인 후 복제 노드를 지운다. 로컬 PNG 바이트를 Figma로 넘기는 방법(`upload_assets` 등)도 여기서 정한다. 성공한 코드 조각을 `tools/asset-studio/SYNC.md` 초안의 "Figma 교체" 절에 바로 적는다.
- [ ] **Step 4:** 커밋.

```bash
git add tools/asset-studio/figma-map.json tools/asset-studio/SYNC.md
git commit -m "에셋 스튜디오: Figma 원본 노드 대응표"
```

---

### Task 3: 칸 목록 `slots.py`

**Files:**
- Create: `tools/asset-studio/slots.py`
- Test: `tools/asset-studio/tests/test_slots.py`

- [ ] **Step 1: 실패하는 테스트**

```python
# tools/asset-studio/tests/test_slots.py
import os, sys, unittest
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
import slots


class SlotsTest(unittest.TestCase):
    def test_sixty_unique_slots(self):
        s = slots.all_slots()
        self.assertEqual(len(s), 60)
        self.assertEqual(len({x['id'] for x in s}), 60)
        self.assertEqual(len({x['path'] for x in s}), 60)

    def test_paths(self):
        by = {x['id']: x for x in slots.all_slots()}
        self.assertEqual(by['sansin-character']['path'], 'prototype/assets/deities/산신.png')
        self.assertEqual(by['munsin-talisman-back']['path'], 'prototype/assets/talisman/munsin-back.png')
        self.assertEqual(by['samsin-step-05']['path'], 'prototype/assets/steps/samsin-05@2x.png')
        self.assertEqual(by['seonang-result-bg']['path'], 'prototype/assets/result-bg/seonang@2x.png')

    def test_transparent_is_fixed_list(self):
        t = [x for x in slots.all_slots() if x['transparent']]
        self.assertEqual(len(t), 18)
        self.assertEqual({x['kind'] for x in t}, {'character', 'loading', 'result-peek'})

    def test_every_path_exists(self):
        root = os.path.join(os.path.dirname(__file__), '..', '..', '..')
        for x in slots.all_slots():
            self.assertTrue(os.path.exists(os.path.join(root, x['path'])), x['path'])


if __name__ == '__main__':
    unittest.main()
```

- [ ] **Step 2: 실패 확인**

Run: `python3 -m unittest discover -s tools/asset-studio/tests -v`
Expected: `ModuleNotFoundError: No module named 'slots'`

- [ ] **Step 3: 구현**

```python
# tools/asset-studio/slots.py
"""에셋 스튜디오의 60칸 목록. 설계 3장.

투명 여부는 원본 알파 채널로 판정하지 않는다. 부적·결과 배경도 알파 채널이 있어서다.
"""

DEITIES = [
    ('sansin', '산신'), ('yongwang', '용왕'), ('chilseong', '칠성신'),
    ('samsin', '삼신할미'), ('seonang', '서낭신'), ('munsin', '문신'),
]

# (kind, 한글 이름, 경로 틀, 투명)
KINDS = [
    ('character', '캐릭터', 'deities/{ko}.png', True),
    ('loading', '로딩', 'loading/{id}.png', True),
    ('result-bg', '결과 배경', 'result-bg/{id}@2x.png', False),
    ('result-peek', '결과 미리보기', 'result-peek/{id}.png', True),
    ('step-04', '단계 04', 'steps/{id}-04@2x.png', False),
    ('step-05', '단계 05', 'steps/{id}-05@2x.png', False),
    ('step-06', '단계 06', 'steps/{id}-06@2x.png', False),
    ('talisman-front', '부적 앞', 'talisman/{id}-front.png', False),
    ('talisman-back', '부적 뒤', 'talisman/{id}-back.png', False),
    ('talisman-card', '부적 카드', 'talisman-card/{id}@2x.png', False),
]

# 둥근 모서리 알파를 원본에서 입히는 종류 (설계 3장)
CORNER_ALPHA = {'talisman-front', 'talisman-back'}


def all_slots():
    out = []
    for did, ko in DEITIES:
        for kind, kind_ko, tpl, transparent in KINDS:
            out.append({
                'id': f'{did}-{kind}',
                'deity': did,
                'deityKo': ko,
                'kind': kind,
                'kindKo': kind_ko,
                'path': 'prototype/assets/' + tpl.format(id=did, ko=ko),
                'transparent': transparent,
                'cornerAlpha': kind in CORNER_ALPHA,
            })
    return out
```

- [ ] **Step 4: 통과 확인**

Run: `python3 -m unittest discover -s tools/asset-studio/tests -v`
Expected: 4 tests OK. `test_every_path_exists`가 한글 경로에서 실패하면 macOS NFD 문제이므로 `unicodedata.normalize('NFC', ...)`로 비교한다(`build_bundle.py`와 같은 이유).

- [ ] **Step 5: 커밋**

```bash
git add tools/asset-studio/slots.py tools/asset-studio/tests/test_slots.py
git commit -m "에셋 스튜디오: 60칸 목록"
```

---

### Task 4: 초기 적재 데이터 `seed.py`

**Files:**
- Create: `tools/asset-studio/seed.py`
- Test: `tools/asset-studio/tests/test_seed.py`

- [ ] **Step 1: 실패하는 테스트**

```python
# tools/asset-studio/tests/test_seed.py
import os, subprocess, sys, unittest
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
import seed

ROOT = os.path.normpath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))


class SeedTest(unittest.TestCase):
    def test_blob_sha_matches_git(self):
        p = 'prototype/assets/talisman/sansin-front.png'
        want = subprocess.check_output(['git', 'hash-object', p], cwd=ROOT, text=True).strip()
        self.assertEqual(seed.blob_sha(os.path.join(ROOT, p)), want)

    def test_slot_doc(self):
        docs = {d['id']: d for d in seed.build(ROOT)}
        d = docs['sansin-talisman-front']
        self.assertEqual((d['width'], d['height']), (1264, 1992))
        self.assertEqual(d['version'], 1)
        self.assertIsNone(d['currentAssetId'])
        self.assertEqual(len(d['blobSha']), 40)
        self.assertEqual(d['history'], [])
        self.assertEqual(docs['sansin-character']['width'], 288)


if __name__ == '__main__':
    unittest.main()
```

- [ ] **Step 2: 실패 확인** — `ModuleNotFoundError: No module named 'seed'`

- [ ] **Step 3: 구현**

```python
# tools/asset-studio/seed.py
"""원본 60장에서 db의 slots 문서를 만든다.

사용: python3 tools/asset-studio/seed.py > tools/asset-studio/seed.json
currentAssetId는 비워 둔다. 원본을 artifact assets에 올린 뒤 Claude가 채운다(SYNC.md 초기 적재).
"""
import hashlib, json, os, sys
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import slots


def blob_sha(path):
    data = open(path, 'rb').read()
    return hashlib.sha1(b'blob %d\0' % len(data) + data).hexdigest()


def build(root):
    out = []
    for s in slots.all_slots():
        p = os.path.join(root, s['path'])
        w, h = Image.open(p).size
        out.append({**s, 'width': w, 'height': h, 'blobSha': blob_sha(p),
                    'currentAssetId': None, 'version': 1, 'history': []})
    return out


if __name__ == '__main__':
    root = os.path.normpath(os.path.join(os.path.dirname(__file__), '..', '..'))
    json.dump(build(root), sys.stdout, ensure_ascii=False, indent=1)
```

- [ ] **Step 4: 통과 확인** — 6 tests OK.
- [ ] **Step 5: 커밋** (`seed.json`은 산출물이라 커밋하지 않고 `.gitignore`에 `tools/asset-studio/seed.json` 추가)

```bash
git add tools/asset-studio/seed.py tools/asset-studio/tests/test_seed.py .gitignore
git commit -m "에셋 스튜디오: 초기 적재 데이터 생성"
```

---

### Task 5: 화면 규칙 보고 (CLAUDE.md 하네스)

코드를 쓰지 않는다. 사용자 확인 전에는 Task 6으로 넘어가지 않는다.

- [ ] **Step 1:** `docs/design-guide/DESIGN.md`와 `docs/design-guide/컴포넌트/`의 버튼, 입력과 선택 문서를 읽는다.
- [ ] **Step 2:** 사용자에게 한국어로 보고한다.
  * 핵심 행동: 칸 고르기 → 후보 올리기 → 확정.
  * 적용할 규칙: 배경 `--seed-color-bg-layer-default`, 카드 면 `--seed-color-bg-neutral-solid` + 선 `--seed-color-stroke-neutral`, 카드 반경 `--r-xl`, 버튼 `--r-m`, 칩 `--r-full`, 글자 Pretendard 500·600·700과 역할 스타일, 간격은 spacing 토큰만, 선택 표시는 차콜 채움·테두리, 주 행동 하나.
  * 규칙에 없어 정해야 하는 것: 데스크톱 폭(390 기준 문서라 관리자 화면 폭이 없다), 6×10 격자 칸 크기, 상태 표시(후보 있음, Figma 대기, 동기화 실패)의 색. 경고색은 "안전 안내와 생성 실패에만"이라 동기화 실패에 써도 되는지.
  * 부딪히는 것: "여러 신을 나란히 비교하는 목록에는 신별 색을 쓰지 않는다" → 격자에 신별 색을 넣지 않는다. "대시보드처럼 펼치지 않는다"는 제품 화면 규칙인데 에셋 격자는 본질이 대시보드다. 아티팩트 규약은 다크 모드 토큰과 폰 폭(16px 여백, 가로 스크롤 없음)을 요구하는데 DESIGN.md에는 다크 모드가 없고 기준 폭이 390이다. 6×10 격자를 좁은 폭에서 어떻게 보일지(신별 한 줄 가로 스크롤 영역만 허용 등).
- [ ] **Step 3:** 답을 설계 문서 4장에 한 줄씩 적고 커밋.

---

### Task 6: 페이지 순수 함수 `lib.js`

**Files:**
- Create: `tools/asset-studio/lib.js`
- Create: `tools/asset-studio/test.html`

- [ ] **Step 1: 실패하는 테스트 페이지**

```html
<!-- tools/asset-studio/test.html -->
<!doctype html><meta charset="utf-8"><title>lib.js 테스트</title>
<pre id="out"></pre>
<script src="lib.js"></script>
<script>
const out = []; let fail = 0;
const eq = (name, got, want) => { const ok = JSON.stringify(got) === JSON.stringify(want); if (!ok) fail++; out.push((ok ? 'PASS ' : 'FAIL ') + name + (ok ? '' : ' got=' + JSON.stringify(got))); };
const S = [
  { id: 'sansin-character', path: 'prototype/assets/deities/산신.png', width: 288, height: 288, transparent: true },
  { id: 'sansin-loading', path: 'prototype/assets/loading/sansin.png', width: 608, height: 608, transparent: true },
  { id: 'sansin-result-peek', path: 'prototype/assets/result-peek/sansin.png', width: 556, height: 596, transparent: true },
  { id: 'sansin-talisman-front', path: 'prototype/assets/talisman/sansin-front.png', width: 1264, height: 1992, transparent: false },
];
eq('unique basename', AS.matchFile('sansin-front.png', S), { slotId: 'sansin-talisman-front', candidates: [] });
eq('korean basename', AS.matchFile('산신.png', S), { slotId: 'sansin-character', candidates: [] });
eq('ambiguous', AS.matchFile('sansin.png', S), { slotId: null, candidates: ['sansin-loading', 'sansin-result-peek'] });
eq('folder path', AS.matchFile('loading/sansin.png', S), { slotId: 'sansin-loading', candidates: [] });
eq('no match', AS.matchFile('moon_v3.jpg', S), { slotId: null, candidates: [] });
eq('nfd name', AS.matchFile('산신.png'.normalize('NFD'), S).slotId, 'sansin-character');
eq('spec ok', AS.checkSpec({ width: 1264, height: 1992, type: 'image/png', transparentRatio: 0.001 }, S[3]), []);
eq('spec size', AS.checkSpec({ width: 1000, height: 1992, type: 'image/png', transparentRatio: 0 }, S[3]), ['크기 1000×1992 → 1264×1992 필요']);
eq('spec alpha', AS.checkSpec({ width: 288, height: 288, type: 'image/png', transparentRatio: 0 }, S[0]), ['투명 배경 필요']);
eq('spec type', AS.checkSpec({ width: 288, height: 288, type: 'image/jpeg', transparentRatio: 0.5 }, S[0]), ['PNG 필요']);
eq('cover crop wide', AS.coverCrop(2000, 1000, 1000, 1000, 0.5), { sx: 500, sy: 0, sw: 1000, sh: 1000 });
eq('cover crop tall offset', AS.coverCrop(1000, 3000, 1000, 1000, 0), { sx: 0, sy: 0, sw: 1000, sh: 1000 });
document.getElementById('out').textContent = out.join('\n') + '\n' + (fail ? fail + ' FAILED' : 'ALL PASS');
</script>
```

- [ ] **Step 2: 실패 확인** — `preview_start {name:"토닥토닥"}` 후 `http://localhost:4173/tools/asset-studio/test.html`, `get_page_text`. Expected: 콘솔 `AS is not defined`.

- [ ] **Step 3: 구현**

```js
// tools/asset-studio/lib.js — 에셋 스튜디오 순수 함수. 화면·db를 모른다.
(function (g) {
  const nfc = (s) => s.normalize('NFC');
  const base = (p) => nfc(p).split('/').pop();
  const tail2 = (p) => nfc(p).split('/').slice(-2).join('/');

  // 폴더째면 '폴더/파일명'으로, 아니면 파일명이 한 칸에만 맞을 때만 맞춘다 (설계 7장)
  function matchFile(name, slots) {
    const n = nfc(name);
    if (n.includes('/')) {
      const hit = slots.filter((s) => tail2(s.path) === tail2(n));
      if (hit.length === 1) return { slotId: hit[0].id, candidates: [] };
    }
    const hit = slots.filter((s) => base(s.path) === base(n));
    if (hit.length === 1) return { slotId: hit[0].id, candidates: [] };
    return { slotId: null, candidates: hit.map((s) => s.id) };
  }

  // info: {width, height, type, transparentRatio} — 최종 PNG 기준
  function checkSpec(info, slot) {
    const errs = [];
    if (info.type !== 'image/png') errs.push('PNG 필요');
    if (info.width !== slot.width || info.height !== slot.height)
      errs.push(`크기 ${info.width}×${info.height} → ${slot.width}×${slot.height} 필요`);
    if (slot.transparent && info.transparentRatio < 0.01) errs.push('투명 배경 필요');
    return errs;
  }

  // 원본 비율을 유지한 채 목표 비율로 꽉 채우는 잘라내기. pos 0~1은 남는 방향의 위치
  function coverCrop(srcW, srcH, dstW, dstH, pos) {
    const scale = Math.max(dstW / srcW, dstH / srcH);
    const sw = Math.round(dstW / scale), sh = Math.round(dstH / scale);
    return { sx: Math.round((srcW - sw) * pos), sy: Math.round((srcH - sh) * pos), sw, sh };
  }

  g.AS = { matchFile, checkSpec, coverCrop };
})(window);
```

- [ ] **Step 4: 통과 확인** — 페이지 새로고침, `ALL PASS`.
- [ ] **Step 5: 커밋**

```bash
git add tools/asset-studio/lib.js tools/asset-studio/test.html
git commit -m "에셋 스튜디오: 파일명 매칭·규격 검사·자르기 함수"
```

---

### Task 7: 에셋 보기 화면과 초기 적재

**Files:**
- Create: `tools/asset-studio/index.html`

Task 7~9는 CLAUDE.md 하네스 3단계대로 구조 → 내용 → 스타일 순서로 한 번에 하나씩 고치고, 각 태스크 끝에 `docs/design-guide/checks.md`로 점검한다.

- [ ] **Step 1: 뼈대**

`index.html`: `<title>토닥 에셋 스튜디오</title>`, Pretendard(`cdn.jsdelivr.net/npm/pretendard`), `:root`에 Task 5에서 확인한 SEED 토큰만 정의, `<script src="lib.js">`. 화면 틀은 상단바(왼쪽 아이콘 자리, 가운데 "에셋 스튜디오") + 본문. 다크 모드와 좁은 폭 처리는 Task 5에서 사용자가 정한 대로 한다.

- [ ] **Step 2: db 연결**

```js
const db = await claude.use('db');
const assets = await claude.use('assets'); // 쓰기 권한 없는 사람은 null → 업로드·확정 숨김
db.collection('slots').onSnapshot((snap) => { state.slots = snap.docs.map((d) => d.data()); render(); });
```

격자: 행 = 신 6, 열 = 종류 10. 칸 이미지는 `currentAssetUrl`(없으면 빈 자리). 칸마다 후보 수(`candidates`에서 `slotId`별 개수, `status in [후보, 채택 후보]`)와 Figma 대기 표시. 칸을 누르면 오른쪽 패널에 원본, 후보, 이력.

- [ ] **Step 3: 올리기** — `Artifact` publish, `file_path: tools/asset-studio/index.html`, `files: {"lib.js": "tools/asset-studio/lib.js"}`, `capabilities: {db:{}, assets:{}, user:{}}`, `icon: "image"`. 받은 URL을 `SYNC.md` 맨 위에 적는다.

- [ ] **Step 4: 초기 적재**

1. `python3 tools/asset-studio/seed.py > tools/asset-studio/seed.json`
2. 원본 60장을 `Artifact` publish `asset: true`, `file_paths`(25개씩 3번)로 올리고 받은 id를 칸에 맞춘다.
3. `seed.json`의 `currentAssetId`와 `currentAssetUrl`을 채워 `ArtifactData batch`로 `slots/{id}` 60개를 쓴다.
4. `ArtifactData list slots` → 60개 확인.

- [ ] **Step 5: 확인** — 사용자에게 링크를 열어달라고 하고, 60칸이 원본과 같은지 스크린샷을 받는다(아티팩트는 claude.ai 안에서만 능력이 붙어서 로컬 프리뷰로는 db가 `null`이다). 로컬 프리뷰에서는 db가 `null`일 때 "claude.ai에서 여세요" 안내가 뜨는지만 본다.

- [ ] **Step 6: 커밋**

```bash
git add tools/asset-studio/index.html tools/asset-studio/SYNC.md
git commit -m "에셋 스튜디오: 에셋 보기 화면과 초기 적재"
```

---

### Task 8: 가져오기(업로드)

**Files:**
- Modify: `tools/asset-studio/index.html`

- [ ] **Step 1:** 가져오기 패널: 끌어놓기 영역(`webkitRelativePath`가 있으면 폴더 경로로 매칭), 출처 선택(Midjourney, 직접 그림, 외주, 기타), 파일별 행(미리보기, `AS.matchFile` 결과, 신·칸 선택, 규격 상태).
- [ ] **Step 2:** "후보로 올리기": 파일마다 `assets.upload(file)` → `db.collection('candidates').add({slotId, topicId: null, sourceAssetId: id, sourceAssetUrl: url, finalAssetId: null, finalAssetUrl: null, source: {type:'upload', note, filename}, createdBy: user.id(), createdAt: Date.now(), status: 'candidate', crop: null})`. 매칭 안 된 파일은 칸을 고르기 전까지 올리지 않는다.
- [ ] **Step 3:** 확인 — 사용자와 함께 파일 3장(자동 매칭 1, 애매함 1, 안 됨 1)을 올려 애매한 파일은 칸을 고른 뒤에 올라가고 매칭 안 된 파일은 칸을 고르기 전까지 올라가지 않는지 `ArtifactData list candidates`로 본다.
- [ ] **Step 4:** 커밋 `에셋 스튜디오: 이미지 가져오기`.

---

### Task 9: 확정(규격 맞추기와 확정 기록)

**Files:**
- Modify: `tools/asset-studio/index.html`

- [ ] **Step 1: 규격 맞추기** — 후보 이미지를 캔버스에 `AS.coverCrop`으로 그린다. 위치 슬라이더(0~1). `cornerAlpha` 칸은 원본(`currentAssetUrl`)의 알파 채널을 픽셀 단위로 복사해 입힌다. `canvas.toBlob('image/png')` → 투명 비율 계산 → `AS.checkSpec`.
- [ ] **Step 2: 확정** — 오류가 없으면 버튼이 켜진다. 규격을 통과한 다른 칸의 후보도 체크해 여러 칸을 함께 확정할 수 있다(주제 묶음은 2차). 누르면 최종 PNG마다 `assets.upload` → 후보에 `finalAssetId`, `status:'confirmed'` → `confirmations.add({by, at, revert:false, commit:null, bundleSha:null, items:[{slotId, candidateId, assetId, assetUrl, github:'pending', figma:'pending', reason:null}]})` → 칸마다 `slots/{id}.update({currentAssetId, currentAssetUrl, version: v+1, history:[...old, {assetId, assetUrl, confirmationId, at}]})`.
- [ ] **Step 3: 상태 표시** — 칸 패널에 항목별 GitHub·Figma 상태.
- [ ] **Step 4: 되돌리기** — 이력에서 이전 `assetId`를 고르면 같은 방식으로 `revert:true`, 항목 하나짜리 확정 묶음을 만든다.
- [ ] **Step 5: 확인** — 사용자와 산신 부적 앞 1칸 확정, `ArtifactData list confirmations`로 항목 상태가 `pending`인지 확인.
- [ ] **Step 6:** 커밋 `에셋 스튜디오: 확정과 되돌리기`.

---

### Task 10: 동기화 파일 처리 `sync.py`

**Files:**
- Create: `tools/asset-studio/sync.py`
- Test: `tools/asset-studio/tests/test_sync.py`

- [ ] **Step 1: 실패하는 테스트**

```python
# tools/asset-studio/tests/test_sync.py
import io, os, sys, tempfile, unittest
from PIL import Image
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
import sync


def png(w, h, alpha=255):
    b = io.BytesIO(); Image.new('RGBA', (w, h), (1, 2, 3, alpha)).save(b, 'PNG'); return b.getvalue()


class PickTest(unittest.TestCase):
    def test_latest_per_slot_wins(self):
        confs = [
            {'id': 'c1', 'at': 1, 'items': [{'slotId': 'a', 'github': 'pending'}, {'slotId': 'b', 'github': 'pending'}]},
            {'id': 'c2', 'at': 2, 'items': [{'slotId': 'a', 'github': 'pending'}]},
            {'id': 'c0', 'at': 0, 'items': [{'slotId': 'c', 'github': 'done'}]},
        ]
        apply, superseded = sync.pick(confs)
        self.assertEqual(sorted((c, s) for c, s in apply), [('c1', 'b'), ('c2', 'a')])
        self.assertEqual(superseded, [('c1', 'a')])

    def test_failed_is_retried(self):
        confs = [{'id': 'c1', 'at': 1, 'items': [{'slotId': 'a', 'github': 'failed'}]}]
        self.assertEqual(sync.pick(confs), ([('c1', 'a')], []))


class CheckTest(unittest.TestCase):
    slot = {'width': 4, 'height': 2, 'transparent': True}

    def test_ok(self):
        self.assertEqual(sync.check(png(4, 2, 0), self.slot), [])

    def test_size_and_alpha(self):
        self.assertEqual(sync.check(png(3, 2, 255), self.slot), ['크기 3×2 → 4×2 필요', '투명 배경 필요'])


class WriteTest(unittest.TestCase):
    def test_blob_mismatch_refuses(self):
        with tempfile.TemporaryDirectory() as d:
            p = os.path.join(d, 'x.png'); open(p, 'wb').write(b'old')
            with self.assertRaises(sync.Conflict):
                sync.write(d, 'x.png', b'new', expected_blob='0' * 40)
            self.assertEqual(open(p, 'rb').read(), b'old')

    def test_write_returns_new_blob(self):
        with tempfile.TemporaryDirectory() as d:
            p = os.path.join(d, 'x.png'); open(p, 'wb').write(b'old')
            new = sync.write(d, 'x.png', b'new', expected_blob=sync.blob_sha(p))
            self.assertEqual(open(p, 'rb').read(), b'new')
            self.assertEqual(new, sync.blob_sha(p))


class MessageTest(unittest.TestCase):
    def test_message(self):
        m = sync.message('추석', '확정한 사람', ['산신 부적 앞', '산신 부적 뒤', '산신 부적 카드'])
        self.assertEqual(m.splitlines()[0], '에셋 확정: 추석 — 산신 부적 앞·산신 부적 뒤 외 1칸 (확정한 사람)')  # 설계 7장 예시도 이 형식으로 고친다
        self.assertIn('* 산신 부적 카드', m)


if __name__ == '__main__':
    unittest.main()
```

- [ ] **Step 2: 실패 확인** — `No module named 'sync'`

- [ ] **Step 3: 구현**

```python
# tools/asset-studio/sync.py
"""동기화의 파일 쪽. db 읽기·쓰기와 Figma는 Claude Code가 SYNC.md대로 한다."""
import io, os, sys
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from seed import blob_sha  # noqa: E402


class Conflict(Exception):
    pass


def pick(confirmations):
    """GitHub 대기·실패 항목 중 칸마다 가장 나중 것만 반영한다(실패는 다시 시도, 설계 8장).
    (반영, 대체됨) 목록을 (확정 id, 칸 id)로 준다."""
    latest = {}
    for c in sorted(confirmations, key=lambda c: c['at']):
        for it in c['items']:
            if it['github'] in ('pending', 'failed'):
                if it['slotId'] in latest:
                    latest[it['slotId']].append(c['id'])
                else:
                    latest[it['slotId']] = [c['id']]
    apply = [(ids[-1], sid) for sid, ids in latest.items()]
    superseded = [(cid, sid) for sid, ids in latest.items() for cid in ids[:-1]]
    return apply, superseded


def check(data, slot):
    im = Image.open(io.BytesIO(data))
    errs = []
    if im.size != (slot['width'], slot['height']):
        errs.append(f"크기 {im.size[0]}×{im.size[1]} → {slot['width']}×{slot['height']} 필요")
    if slot['transparent']:
        a = im.convert('RGBA').getchannel('A').histogram()
        if sum(a[:250]) / sum(a) < 0.01:
            errs.append('투명 배경 필요')
    return errs


def write(root, path, data, expected_blob):
    full = os.path.join(root, path)
    if blob_sha(full) != expected_blob:
        raise Conflict(path)
    with open(full, 'wb') as f:
        f.write(data)
    return blob_sha(full)


def message(topic, who, labels):
    head = '·'.join(labels[:2]) + (f' 외 {len(labels) - 2}칸' if len(labels) > 2 else '')
    title = f"에셋 확정: {topic or '주제 없음'} — {head} ({who})"
    return title + '\n\n' + '\n'.join('* ' + l for l in labels)
```

- [ ] **Step 4: 통과 확인** — 전체 테스트 OK.
- [ ] **Step 5:** 커밋 `에셋 스튜디오: 동기화 파일 처리`.

---

### Task 11: 동기화 절차 `SYNC.md`와 첫 동기화

**Files:**
- Create/Modify: `tools/asset-studio/SYNC.md`

- [ ] **Step 0: 선행 조건 처리** — 사용자가 정한 동기화 대상 브랜치에 `asset-studio` 브랜치를 병합하고(사용자 확인 후 푸시), `git worktree add .worktrees/sync <대상 브랜치>`. `sync.py`는 `.worktrees/sync/tools/asset-studio/`에서 쓴다.
- [ ] **Step 1: 절차 작성** — 설계 7장 동기화 1~8단계를 Claude가 그대로 따를 수 있게 쓴다. 내용:
  * 아티팩트 URL, 동기화 worktree 경로(`.worktrees/sync`).
  * `ArtifactData list confirmations` → `sync.pick` → 대체됨 항목 `update`.
  * 칸마다 `Artifact read path=<assetId>`로 PNG 저장 → `sync.check` → `sync.write(root, path, data, slot.blobSha)` (Conflict면 항목 실패, 이유 "레포에서 직접 바뀜").
  * 확정 묶음마다 `git commit -F`(메시지 `sync.message`) + 공동 작성자 줄, 전부 끝나면 `git push origin <대상 브랜치>`.
  * `slots/{id}.update({blobSha})`, `python3 tools/build_bundle.py` 마지막 줄 SHA → 묶음 `bundleSha`.
  * Figma: `figma-map.json`의 노드에 Task 2에서 확인한 코드로 이미지 교체 → 항목 `figma:'done'`.
  * 사용자에게: 반영 칸 수, 커밋, 새 SHA, "문구 관리 문서 해시 갱신 필요".
- [ ] **Step 2: 첫 동기화** — Task 9에서 확정한 산신 부적 앞 1칸으로 절차를 한 번 돈다. **push 전에 사용자에게 확인을 받는다**(main에 처음 쓰는 것이므로).
- [ ] **Step 3: 확인** — main 커밋, 프리뷰에서 결과 흐름의 산신 부적(390·360 폭), Figma 노드, 페이지의 칸 상태가 `done`인지.
- [ ] **Step 4: 되돌리기 동기화** — 같은 칸을 원래 버전으로 되돌려 한 번 더 동기화, 원본과 blob SHA가 같은지 확인.
- [ ] **Step 5:** 커밋 `에셋 스튜디오: 동기화 절차`. 빌드한 새 SHA를 사용자에게 알리고 문구 관리 문서 해시 갱신이 필요하다고 전한다(CLAUDE.md 화면 정본 주의).
- [ ] **Step 6: 평가** — CLAUDE.md "평가" 절대로, 구현하지 않은 새 세션에서 DESIGN.md 기준으로 페이지를 평가한다(표: 위치 / 위반한 규칙 / 실제 근거 / 사용자 영향 / 최소 수정안). `docs/superpowers/specs` 9장에 예약 동기화 가능 여부 기록.

---

## 2차 계획으로 넘길 것

주제·아이템(`sample`), 생성(`mcp`), 배경 제거, 예약 동기화. Task 1·11 결과를 입력으로 쓴다.
