import {useState} from 'react';
import {Layout, LayoutPanel, VStack, HStack} from '@astryxdesign/core/Layout';
import {Text, Heading} from '@astryxdesign/core/Text';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {IconButton} from '@astryxdesign/core/IconButton';
import {Badge} from '@astryxdesign/core/Badge';
import {StatusDot} from '@astryxdesign/core/StatusDot';
import {Divider} from '@astryxdesign/core/Divider';
import {TextInput} from '@astryxdesign/core/TextInput';
import {TextArea} from '@astryxdesign/core/TextArea';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {Icon} from '@astryxdesign/core/Icon';
import {
  knowledgeBase,
  transcript,
  answers,
  memo as initialMemo,
  KB_TYPE_META,
} from '../data';

const SectionLabel = ({children}: {children: React.ReactNode}) => (
  <Text type="label" color="secondary">
    {children}
  </Text>
);

export function LiveMeeting() {
  const [listening, setListening] = useState(true);
  const [manual, setManual] = useState('');
  const [memo, setMemo] = useState(initialMemo);

  const opening = knowledgeBase.find((k) => k.type === 'opening');
  const closing = knowledgeBase.find((k) => k.type === 'closing');
  const checklist = knowledgeBase.filter((k) => k.type === 'check' || k.type === 'question');

  return (
    <Layout
      height="fill"
      start={<MeetingGuide opening={opening} closing={closing} checklist={checklist} />}
      end={<AnswerPanel memo={memo} setMemo={setMemo} />}
      content={
        <VStack height="100%" gap={0}>
          {/* 컨트롤 바 */}
          <HStack
            padding={4}
            gap={3}
            vAlign="center"
            justify="between"
            style={{borderBottom: '1px solid var(--color-border)'}}
          >
            <HStack gap={2} vAlign="center">
              {listening ? (
                <Button
                  label="듣기 중지"
                  variant="destructive"
                  icon={<Icon icon="stop" />}
                  onClick={() => setListening(false)}
                />
              ) : (
                <Button
                  label="듣기 시작"
                  variant="primary"
                  icon={<Icon icon="microphone" />}
                  onClick={() => setListening(true)}
                />
              )}
              {listening && (
                <HStack gap={1} vAlign="center">
                  <StatusDot variant="error" label="녹음 중" isPulsing />
                  <Text type="supporting">인식 중… (ko-KR)</Text>
                </HStack>
              )}
            </HStack>
            <Badge variant="neutral" label="발언 3건" />
          </HStack>

          {/* 녹취록 */}
          <VStack isScrollable padding={4} gap={3} height="100%">
            <SectionLabel>실시간 음성 인식</SectionLabel>
            {transcript.map((t, i) => (
              <Card key={i} padding={3} variant={i === transcript.length - 1 ? 'muted' : 'default'}>
                <VStack gap={1}>
                  <HStack gap={2} vAlign="center">
                    <Text type="supporting" hasTabularNumbers>
                      {t.time}
                    </Text>
                    {t.src === 'manual' && <Badge variant="blue" label="⌨ 직접 입력" />}
                    <span style={{marginInlineStart: 'auto'}}>
                      <Button label="답변 재생성" variant="ghost" size="sm" />
                    </span>
                  </HStack>
                  <Text>{t.text}</Text>
                </VStack>
              </Card>
            ))}
            {listening && (
              <Card padding={3} variant="muted">
                <Text color="placeholder">
                  <em>그러면 도입은 다음 분기 정도로 보고 있는데…</em>
                </Text>
              </Card>
            )}
          </VStack>

          {/* 직접 입력 */}
          <HStack
            padding={3}
            gap={2}
            vAlign="end"
            style={{borderTop: '1px solid var(--color-border)'}}
          >
            <span style={{flex: 1}}>
              <TextInput
                label="직접 입력"
                isLabelHidden
                value={manual}
                onChange={setManual}
                placeholder="음성 대신 텍스트로 질문 입력 (테스트·무음 환경용)"
              />
            </span>
            <Button label="전송" variant="secondary" isDisabled={!manual} />
          </HStack>
        </VStack>
      }
    />
  );
}

/* ── 왼쪽: 미팅 가이드 ── */
function MeetingGuide({
  opening,
  closing,
  checklist,
}: {
  opening?: {content: string};
  closing?: {content: string};
  checklist: {id: string; title: string; content: string; type: string}[];
}) {
  const [checks, setChecks] = useState<Record<string, boolean>>({kb7: true});
  const done = Object.values(checks).filter(Boolean).length;

  return (
    <LayoutPanel width={300} hasDivider isScrollable padding={4}>
      <VStack gap={4}>
        <HStack justify="between" vAlign="center">
          <Heading level={3}>미팅 가이드</Heading>
          <Button label="새 미팅 시작" variant="ghost" size="sm" />
        </HStack>

        <VStack gap={2}>
          <SectionLabel>🎬 오프닝 멘트</SectionLabel>
          <Card padding={3} variant="blue">
            <Text>{opening?.content}</Text>
          </Card>
        </VStack>

        <Divider />

        <VStack gap={2}>
          <HStack justify="between" vAlign="center">
            <SectionLabel>✅ 확인 체크리스트</SectionLabel>
            <Badge variant="success" label={`확인 ${done}/${checklist.length}`} />
          </HStack>
          <VStack gap={2}>
            {checklist.map((item) => {
              const meta = KB_TYPE_META[item.type as keyof typeof KB_TYPE_META];
              const checked = !!checks[item.id];
              return (
                <div key={item.id} style={{opacity: checked ? 0.55 : 1}}>
                  <CheckboxInput
                    label={`${meta.emoji} ${item.title}`}
                    description={item.content}
                    value={checked}
                    onChange={(v) => setChecks((c) => ({...c, [item.id]: v}))}
                  />
                </div>
              );
            })}
          </VStack>
        </VStack>

        <Divider />

        <VStack gap={2}>
          <SectionLabel>🏁 클로징 멘트</SectionLabel>
          <Card padding={3} variant="teal">
            <Text>{closing?.content}</Text>
          </Card>
        </VStack>
      </VStack>
    </LayoutPanel>
  );
}

/* ── 오른쪽: 답변 제안 + 메모 ── */
function AnswerPanel({memo, setMemo}: {memo: string; setMemo: (v: string) => void}) {
  return (
    <LayoutPanel width={380} hasDivider isScrollable padding={4}>
      <VStack gap={4}>
        <HStack justify="between" vAlign="center">
          <Heading level={3}>답변 제안</Heading>
          <Badge variant="green" label="AI 모드" />
        </HStack>

        {answers.map((a) => (
          <Card key={a.id} padding={3}>
            <VStack gap={2}>
              <Text type="supporting" maxLines={1}>
                Q. {a.question}
              </Text>
              <Divider />
              <Text>{a.body}</Text>
              {a.followUp && (
                <Card padding={2} variant="yellow">
                  <Text type="label">💬 지금 묻기 좋은 질문</Text>
                  <Text>{a.followUp}</Text>
                </Card>
              )}
              <HStack justify="between" vAlign="center">
                <Badge variant="neutral" label={a.model ?? ''} />
                <IconButton label="복사" icon={<Icon icon="copy" />} variant="ghost" size="sm" />
              </HStack>
            </VStack>
          </Card>
        ))}

        <Divider />

        <VStack gap={2}>
          <HStack justify="between" vAlign="center">
            <SectionLabel>📝 내 메모</SectionLabel>
            <Text type="supporting" color="accent">
              ✓ 저장됨
            </Text>
          </HStack>
          <TextArea
            label="내 메모"
            isLabelHidden
            value={memo}
            onChange={setMemo}
            rows={5}
            placeholder="상대 반응, 후속 할 일 등을 자유롭게 적어두세요"
          />
        </VStack>
      </VStack>
    </LayoutPanel>
  );
}
