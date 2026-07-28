import {useState} from 'react';
import {DropdownMenu} from '@astryxdesign/core/DropdownMenu';

const PROJECTS = ['픽스 영업', '투자자 미팅 · A벤처스', 'CS 응대 스크립트'];

export function ProjectPicker() {
  const [current, setCurrent] = useState(PROJECTS[0]);

  return (
    <DropdownMenu
      hasChevron
      button={{label: `🗂 ${current}`, variant: 'ghost', size: 'sm'}}
      items={[
        ...PROJECTS.map((p) => ({label: p, onClick: () => setCurrent(p)})),
        {type: 'divider'} as const,
        {label: '＋ 새 프로젝트', onClick: () => {}},
        {label: '✏️ 이름 변경', onClick: () => {}},
        {label: '🗑 삭제', onClick: () => {}},
      ]}
    />
  );
}
