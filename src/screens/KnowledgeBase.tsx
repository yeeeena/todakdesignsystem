import {useState} from 'react';
import {VStack, HStack} from '@astryxdesign/core/Layout';
import {Text, Heading} from '@astryxdesign/core/Text';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {IconButton} from '@astryxdesign/core/IconButton';
import {Badge} from '@astryxdesign/core/Badge';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {Icon} from '@astryxdesign/core/Icon';
import {knowledgeBase, KB_TYPE_META, KBType} from '../data';

const FILTERS: {value: string; label: string}[] = [
  {value: 'all', label: '전체'},
  {value: 'info', label: '📘 정보'},
  {value: 'question', label: '❓ 질문'},
  {value: 'check', label: '✅ 확인'},
  {value: 'opening', label: '🎬 오프닝'},
  {value: 'closing', label: '🏁 클로징'},
];

const badgeVariant: Record<KBType, string> = {
  info: 'blue',
  question: 'purple',
  check: 'green',
  opening: 'orange',
  closing: 'teal',
};

export function KnowledgeBase() {
  const [filter, setFilter] = useState('all');
  const items = knowledgeBase.filter((k) => filter === 'all' || k.type === filter);

  return (
    <VStack padding={6} gap={4} maxWidth={900} width="100%" style={{marginInline: 'auto'}}>
      <HStack justify="between" vAlign="center">
        <VStack gap={0.5}>
          <Heading level={2}>📚 지식 베이스</Heading>
          <Text type="supporting">미팅 전에 입력해두는 1차 정보 저장소</Text>
        </VStack>
        <HStack gap={2}>
          <Button label="MD 가져오기" variant="secondary" />
          <Button label="JSON" variant="secondary" />
          <Button label="＋ 항목 추가" variant="primary" icon={<Icon icon="check" />} />
        </HStack>
      </HStack>

      <SegmentedControl value={filter} onChange={setFilter} label="유형 필터">
        {FILTERS.map((f) => (
          <SegmentedControlItem key={f.value} value={f.value} label={f.label} />
        ))}
      </SegmentedControl>

      <VStack gap={3}>
        {items.map((item) => {
          const meta = KB_TYPE_META[item.type];
          return (
            <Card key={item.id} padding={4}>
              <HStack gap={3} justify="between">
                <VStack gap={1.5}>
                  <HStack gap={2} vAlign="center">
                    <Badge variant={badgeVariant[item.type] as 'blue'} label={`${meta.emoji} ${meta.label}`} />
                    <Heading level={4}>{item.title}</Heading>
                  </HStack>
                  <Text color="secondary">{item.content}</Text>
                </VStack>
                <HStack gap={1}>
                  <IconButton label="편집" icon={<Icon icon="wrench" />} variant="ghost" size="sm" />
                  <IconButton label="삭제" icon={<Icon icon="close" />} variant="ghost" size="sm" />
                </HStack>
              </HStack>
            </Card>
          );
        })}
      </VStack>
    </VStack>
  );
}
