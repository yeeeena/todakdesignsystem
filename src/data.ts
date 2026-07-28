// PRD 데이터 스키마 기반 샘플 데이터 (픽스 영업 시나리오)

export type KBType = 'info' | 'question' | 'check' | 'opening' | 'closing';

export interface KBItem {
  id: string;
  type: KBType;
  title: string;
  content: string;
}

export interface TranscriptItem {
  time: string;
  text: string;
  src: 'voice' | 'manual';
}

export interface Answer {
  id: string;
  question: string;
  body: string;
  followUp?: string;
  mode: 'ai' | 'local';
  model?: string;
}

export const KB_TYPE_META: Record<KBType, {emoji: string; label: string}> = {
  info: {emoji: '📘', label: '정보'},
  question: {emoji: '❓', label: '질문'},
  check: {emoji: '✅', label: '확인 항목'},
  opening: {emoji: '🎬', label: '오프닝 멘트'},
  closing: {emoji: '🏁', label: '클로징 멘트'},
};

export const knowledgeBase: KBItem[] = [
  {
    id: 'kb1',
    type: 'opening',
    title: '오프닝 멘트',
    content:
      '안녕하세요, 픽스(PiiX) 세일즈를 맡고 있는 ○○○입니다. 오늘 30분 정도 픽스가 어떻게 도움이 될 수 있을지 편하게 이야기 나눠보겠습니다.',
  },
  {
    id: 'kb2',
    type: 'info',
    title: '가격 정책',
    content:
      'Starter 월 9만원(5인) · Team 월 29만원(20인) · Enterprise 별도 견적. 연간 결제 시 2개월 무료. 14일 무료 체험 제공.',
  },
  {
    id: 'kb3',
    type: 'info',
    title: '핵심 강점',
    content:
      '① 실시간 협업 응답속도 업계 1위(평균 40ms) ② SOC2 Type II·ISO 27001 보안 인증 보유 ③ 노션·슬랙 네이티브 연동.',
  },
  {
    id: 'kb4',
    type: 'info',
    title: '보안 인증',
    content:
      'SOC2 Type II, ISO 27001 인증 보유. 데이터 국내 리전 저장 옵션 제공. 전송·저장 구간 AES-256 암호화.',
  },
  {
    id: 'kb5',
    type: 'question',
    title: '도입 예상 시기',
    content: '도입을 검토 중이신 예상 시기가 언제인지? (예산 얘기가 나올 때 자연스럽게)',
  },
  {
    id: 'kb6',
    type: 'check',
    title: '의사결정 구조 확인',
    content: '최종 의사결정에 관여하는 담당자와 승인 단계를 확인할 것.',
  },
  {
    id: 'kb7',
    type: 'check',
    title: '현재 사용 툴 확인',
    content: '현재 쓰고 있는 협업 툴과 불편한 점을 파악할 것.',
  },
  {
    id: 'kb8',
    type: 'closing',
    title: '클로징 멘트',
    content:
      '오늘 말씀 주신 내용 정리해서 제안서와 무료 체험 링크를 내일 오전까지 보내드리겠습니다. 추가로 궁금하신 점 있으실까요?',
  },
];

export const transcript: TranscriptItem[] = [
  {time: '14:02:11', text: '네 반갑습니다. 저희가 요즘 협업 툴을 좀 바꿔볼까 고민 중이에요.', src: 'voice'},
  {time: '14:03:40', text: '가격이 어떻게 되나요? 팀이 한 15명 정도 됩니다.', src: 'voice'},
  {time: '14:05:02', text: '예산은 아직 확정은 아니고요, 보안 인증 같은 건 확실히 챙겨야 해서요.', src: 'voice'},
];

export const answers: Answer[] = [
  {
    id: 'a1',
    question: '가격이 어떻게 되나요? 팀이 한 15명 정도 됩니다.',
    body:
      '15명 규모시면 Team 플랜이 딱 맞습니다. 월 29만원에 20인까지 커버되고요, 연간 결제하시면 2개월이 무료라 실질적으로 월 24만원 정도예요. 부담 없이 14일 무료로 먼저 써보실 수 있습니다.',
    followUp: '도입 예상 시기가 언제쯤인지 여쭤봐도 될까요?',
    mode: 'ai',
    model: 'Haiku 4.5',
  },
  {
    id: 'a2',
    question: '보안 인증 같은 건 확실히 챙겨야 해서요.',
    body:
      '보안은 저희 강점입니다. SOC2 Type II와 ISO 27001 인증을 모두 보유하고 있고, 원하시면 데이터를 국내 리전에 저장하는 옵션도 드려요. 전송·저장 전 구간 AES-256으로 암호화됩니다.',
    mode: 'ai',
    model: 'Haiku 4.5',
  },
];

export const memo =
  '담당자가 보안 인증에 관심 많음. 팀 15명 규모, 현재 툴 불만 있음 → 마이그레이션 지원 강조 필요.';
