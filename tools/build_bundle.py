#!/usr/bin/env python3
"""토닥토닥 공유용 단일 HTML 빌더.

사용: python3 tools/build_bundle.py
출력: prototype/토닥토닥_프로토타입_단일파일.html (깃 추적 안 함) + SHA-256

assets/ 전 파일을 data URI로 내장하고 그대로 쓴다. blob URL로 바꾸면 미리보기·샌드박스 뷰어에서 막힌다.
경로가 템플릿 리터럴로 조립되는 곳이 있어 문자열 단위 치환이 필요하다.

용량 규칙 (공유가 목적이라 파일 하나가 메일·메신저를 통과해야 한다)
  1) 알파가 거의 없는 이미지(투명 1% 미만, 사실상 둥근 모서리뿐)는 JPEG로 평탄화한다.
     모서리는 CSS border-radius가 이미 잘라내므로 흰 모서리가 보이지 않는다.
  2) 진짜 투명한 컷은 PNG를 유지하고 표시 크기의 2배로 줄인다(MAXDIM).

주의
  - 시트(openSheet, openDeityPicker)를 연 뒤 innerHTML을 다시 쓰면 방금 붙인 클릭
    핸들러가 날아가 버튼이 죽는다(2026-08-02 회귀). 시트는 deityMap[].icon만 참조하고
    그건 미리 data URI로 바꾸므로 시트 내용은 건드리지 않는다.
  - 결과 파일이 바뀌면 SHA-256도 바뀐다. 문구 관리 문서에 등록된 해시를 갱신한다.
"""
import base64, hashlib, json, os, struct, subprocess, sys, tempfile, unicodedata, zlib

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'prototype')
ROOT = os.path.normpath(ROOT)
SRC = os.path.join(ROOT, 'todaktodak-working.html')
OUT = os.path.join(ROOT, '토닥토닥_프로토타입_단일파일.html')
TMP = tempfile.mkdtemp(prefix='todak-bundle-')

MAXDIM = {'talisman': 1000, 'talisman-card': 700, 'result-peek': 320, 'loading': 320, 'deities': 160,
          'result-bg': 800, 'steps': 800, 'loading-bg': 900, 'root': 1600}
JPEG_Q = {'root': '70'}


def alpha_ratio(path):
    d = open(path, 'rb').read()
    if d[:8] != b'\x89PNG\r\n\x1a\n':
        return 1.0
    pos, idat, w, h, depth, ctype = 8, bytearray(), None, None, None, None
    while pos < len(d):
        ln = struct.unpack('>I', d[pos:pos + 4])[0]
        typ, body = d[pos + 4:pos + 8], d[pos + 8:pos + 8 + ln]
        if typ == b'IHDR':
            w, h, depth, ctype = struct.unpack('>IIBB', body[:10])
        elif typ == b'IDAT':
            idat += body
        elif typ == b'IEND':
            break
        pos += 12 + ln
    if ctype != 6 or depth != 8:
        return 1.0
    raw = zlib.decompress(bytes(idat))
    stride, prev, i, clear = w * 4, bytearray(w * 4), 0, 0
    while i < len(raw):
        f = raw[i]; i += 1
        line = bytearray(raw[i:i + stride]); i += stride
        if f == 1:
            for x in range(4, stride): line[x] = (line[x] + line[x - 4]) & 255
        elif f == 2:
            for x in range(stride): line[x] = (line[x] + prev[x]) & 255
        elif f == 3:
            for x in range(stride):
                a = line[x - 4] if x >= 4 else 0
                line[x] = (line[x] + ((a + prev[x]) >> 1)) & 255
        elif f == 4:
            for x in range(stride):
                a = line[x - 4] if x >= 4 else 0
                c = prev[x - 4] if x >= 4 else 0
                b = prev[x]
                pa, pb, pc = abs(b - c), abs(a - c), abs(a + b - 2 * c)
                pr = a if (pa <= pb and pa <= pc) else (b if pb <= pc else c)
                line[x] = (line[x] + pr) & 255
        clear += sum(1 for a in line[3::4] if a < 250)
        prev = line
    return clear / float(w * h)


files = []
for dirpath, dirnames, filenames in os.walk(os.path.join(ROOT, 'assets')):
    dirnames[:] = [d for d in dirnames if not d.startswith('.')]
    for fn in filenames:
        if not fn.startswith('.'):
            p = os.path.join(dirpath, fn)
            files.append((p, unicodedata.normalize('NFC', os.path.relpath(p, ROOT).replace(os.sep, '/'))))
files.sort(key=lambda t: t[1])

amap, jpeg_n, png_n = {}, 0, 0
for p, key in files:
    parts = key.split('/')
    cat = parts[1] if len(parts) > 2 else 'root'
    safe = key.replace('/', '_')
    if p.lower().endswith('.svg'):
        amap[key] = 'data:image/svg+xml;base64,' + base64.b64encode(open(p, 'rb').read()).decode()
        continue
    cap = str(MAXDIM.get(cat, 1000))
    if alpha_ratio(p) < 0.01:
        dst = os.path.join(TMP, safe + '.jpg')
        subprocess.run(['sips', '-s', 'format', 'jpeg', '-s', 'formatOptions', JPEG_Q.get(cat, '74'),
                        '--resampleHeightWidthMax', cap, p, '--out', dst], capture_output=True)
        amap[key] = 'data:image/jpeg;base64,' + base64.b64encode(open(dst, 'rb').read()).decode()
        jpeg_n += 1
    else:
        dst = os.path.join(TMP, safe + '.png')
        subprocess.run(['sips', '--resampleHeightWidthMax', cap, p, '--out', dst], capture_output=True)
        use = dst if os.path.exists(dst) and os.path.getsize(dst) < os.path.getsize(p) else p
        amap[key] = 'data:image/png;base64,' + base64.b64encode(open(use, 'rb').read()).decode()
        png_n += 1

patch = """
const __ASSETS=%s;
/* blob URL은 메신저·첨부 미리보기·샌드박스 뷰어가 막아 엑박이 된다(2026-09-19). data URI를 그대로 쓴다. */
const __URL=__ASSETS;
const __RES=p=>__URL[p]||__URL[p.normalize?p.normalize('NFC'):p]||p;
const __fixStr=s=>typeof s==='string'
  ? s.replace(/assets\\/[A-Za-z0-9@._\\-\\/가-힣]+?\\.(png|svg|jpg)/g,m=>__RES(m)) : s;
for(const k in deityMap) deityMap[k].icon=__RES(deityMap[k].icon);
for(let i=0;i<loaderImgs.length;i++) loaderImgs[i]=__RES(loaderImgs[i]);
screens.forEach(s=>{const o=s.body; s.body=function(){return __fixStr(o.apply(this,arguments))}});
const __ctxHTML=deityCtxHTML; deityCtxHTML=function(){return __fixStr(__ctxHTML.apply(this,arguments))};
/* 시트 두 종류는 deityMap[].icon만 참조하므로 건드리지 않는다(innerHTML 재작성 금지) */
const __st=document.createElement('style');
__st.textContent=`.shelf-pop{background-image:url("${__URL['assets/deities-screen@4x.png']}")!important}`;
document.head.appendChild(__st);
render('landing');""" % json.dumps(amap, ensure_ascii=False)

html = open(SRC, encoding='utf-8').read()
anchor = "\nrender('landing');"
if html.count(anchor) != 1:
    sys.exit("render('landing') 앵커가 하나가 아니다 — 빌드 중단")
open(OUT, 'w', encoding='utf-8').write(html.replace(anchor, patch))
sha = hashlib.sha256(open(OUT, 'rb').read()).hexdigest()
print(f"자산 {len(files)}종 · jpeg {jpeg_n} · png {png_n} → {os.path.getsize(OUT)/1048576:.1f}MB")
print(f"SHA-256 {sha}")
