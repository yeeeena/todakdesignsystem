import {VStack, HStack} from '@astryxdesign/core/Layout';
import {Text, Heading} from '@astryxdesign/core/Text';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {Badge} from '@astryxdesign/core/Badge';
import {Divider} from '@astryxdesign/core/Divider';
import {transcript, memo} from '../data';

export function MeetingNotes() {
  return (
    <VStack padding={6} gap={4} maxWidth={860} width="100%" style={{marginInline: 'auto'}}>
      <HStack justify="between" vAlign="center">
        <VStack gap={0.5}>
          <Heading level={2}>📝 미팅 노트</Heading>
          <Text type="supporting">픽스 영업 — 2026.07.09</Text>
        </VStack>
        <HStack gap={2}>
          <Button label="복사" variant="secondary" />
          <Button label=".md 저장" variant="secondary" />
          <Button label="정리 재생성" variant="primary" />
        </HStack>
      </HStack>

      {/* 내 메모 */}
      <Card padding={3} variant="yellow">
        <VStack gap={1}>
          <Text type="label">📌 내 메모</Text>
          <Text>{memo}</Text>
        </VStack>
      </Card>

      {/* AI 정리 */}
      <Card padding={5}>
        <VStack gap={3}>
          <HStack gap={2} vAlign="center">
            <Heading level={3}>AI 미팅 정리</Heading>
            <Badge variant="green" label="Haiku 4.5" />
          </HStack>

          <VStack gap={1}>
            <Text type="label">한 줄 요약</Text>
            <Text>15인 규모 팀의 협업 툴 교체 검토 미팅. 가격(Team 플랜)과 보안 인증에 관심.</Text>
          </VStack>
          <Divider />

          <VStack gap={1}>
            <Text type="label">주요 논의 내용</Text>
            <VStack gap={0.5}>
              <Text color="secondary">• 현재 협업 툴 교체를 검토 중이며 팀 규모는 약 15명</Text>
              <Text color="secondary">• Team 플랜(월 29만원, 연간 시 실질 24만원) 안내</Text>
              <Text color="secondary">• 보안 인증(SOC2 Type II, ISO 27001)과 국내 리전 저장 옵션 논의</Text>
            </VStack>
          </VStack>
          <Divider />

          <VStack gap={1}>
            <Text type="label">결정된 사항</Text>
            <Text color="secondary">• 14일 무료 체험으로 먼저 도입 검토하기로 함</Text>
          </VStack>
          <Divider />

          <VStack gap={1}>
            <Text type="label">액션 아이템</Text>
            <VStack gap={0.5}>
              <Text color="secondary">• (나) 제안서 + 무료 체험 링크 내일 오전까지 발송</Text>
              <Text color="secondary">• (나) 국내 리전 저장 옵션 상세 자료 준비</Text>
            </VStack>
          </VStack>
          <Divider />

          <VStack gap={1}>
            <Text type="label">미해결 질문</Text>
            <Text color="secondary">• 도입 예상 시기 및 예산 확정 여부 (다음 분기 언급, 미확정)</Text>
          </VStack>
        </VStack>
      </Card>

      {/* 전체 녹취록 */}
      <VStack gap={2}>
        <Text type="label" color="secondary">전체 녹취록</Text>
        <Card padding={4}>
          <VStack gap={2}>
            {transcript.map((t, i) => (
              <HStack key={i} gap={3}>
                <Text type="supporting" hasTabularNumbers>{t.time}</Text>
                <Text>{t.text}</Text>
              </HStack>
            ))}
          </VStack>
        </Card>
      </VStack>
    </VStack>
  );
}
