import {useState} from 'react';
import {VStack, HStack} from '@astryxdesign/core/Layout';
import {Text, Heading} from '@astryxdesign/core/Text';
import {Section} from '@astryxdesign/core/Section';
import {Button} from '@astryxdesign/core/Button';
import {Badge} from '@astryxdesign/core/Badge';
import {StatusDot} from '@astryxdesign/core/StatusDot';
import {TextInput} from '@astryxdesign/core/TextInput';
import {TextArea} from '@astryxdesign/core/TextArea';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';

const MODELS = [
  {value: 'opus', label: 'Opus 4.8', hint: '기본'},
  {value: 'sonnet', label: 'Sonnet 4.6', hint: '균형'},
  {value: 'haiku', label: 'Haiku 4.5', hint: '최속 · 실시간 추천'},
];

export function Settings() {
  const [apiKey, setApiKey] = useState('sk-ant-••••••••••••••••');
  const [model, setModel] = useState('haiku');
  const [tone, setTone] = useState('존댓말로, 숫자 먼저 말하기');
  const [autoSuggest, setAutoSuggest] = useState(true);

  return (
    <VStack padding={6} gap={4} maxWidth={720} width="100%" style={{marginInline: 'auto'}}>
      <VStack gap={0.5}>
        <Heading level={2}>⚙️ 설정</Heading>
        <Text type="supporting">전 프로젝트 공통 설정입니다.</Text>
      </VStack>

      <Section padding={5}>
        <VStack gap={2}>
          <HStack justify="between" vAlign="center">
            <Heading level={4}>Anthropic API 키</Heading>
            <HStack gap={1} vAlign="center">
              <StatusDot variant="success" label="연결됨" />
              <Text type="supporting">연결됨</Text>
            </HStack>
          </HStack>
          <TextInput
            label="API 키"
            isLabelHidden
            type="password"
            value={apiKey}
            onChange={setApiKey}
            description="브라우저 localStorage에만 저장됩니다. 미입력 시 로컬 매칭 모드로 동작합니다."
            placeholder="sk-ant-..."
          />
        </VStack>
      </Section>

      <Section padding={5}>
        <VStack gap={3}>
          <Heading level={4}>모델 선택</Heading>
          <SegmentedControl value={model} onChange={setModel} label="모델" layout="fill">
            {MODELS.map((m) => (
              <SegmentedControlItem key={m.value} value={m.value} label={m.label} />
            ))}
          </SegmentedControl>
          <HStack gap={2} vAlign="center">
            <Badge variant="green" label={MODELS.find((m) => m.value === model)?.label ?? ''} />
            <Text type="supporting">{MODELS.find((m) => m.value === model)?.hint}</Text>
          </HStack>
        </VStack>
      </Section>

      <Section padding={5}>
        <VStack gap={2}>
          <Heading level={4}>답변 스타일</Heading>
          <TextArea
            label="답변 스타일"
            isLabelHidden
            value={tone}
            onChange={setTone}
            rows={2}
            description="자유 텍스트로 말투를 지정하면 답변 생성 프롬프트에 반영됩니다."
          />
        </VStack>
      </Section>

      <Section padding={5}>
        <CheckboxInput
          label="자동 답변 생성"
          description="끄면 발언 카드를 클릭할 때만 답변을 생성합니다."
          value={autoSuggest}
          onChange={setAutoSuggest}
        />
      </Section>

      <HStack justify="end">
        <Button label="설정 저장" variant="primary" />
      </HStack>
    </VStack>
  );
}
