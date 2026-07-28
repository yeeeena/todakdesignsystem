import {useState} from 'react';
import {AppShell} from '@astryxdesign/core/AppShell';
import {TopNav} from '@astryxdesign/core/TopNav';
import {TabList, Tab} from '@astryxdesign/core/TabList';
import {StatusDot} from '@astryxdesign/core/StatusDot';
import {LiveMeeting} from './screens/LiveMeeting';
import {KnowledgeBase} from './screens/KnowledgeBase';
import {MeetingNotes} from './screens/MeetingNotes';
import {Settings} from './screens/Settings';
import {ProjectPicker} from './components/ProjectPicker';

type TabKey = 'kb' | 'live' | 'notes' | 'settings';

export function App() {
  const [tab, setTab] = useState<TabKey>('live');

  return (
    <AppShell
      height="fill"
      contentPadding={0}
      variant="section"
      mobileNav={false}
      topNav={
        <TopNav
          label="미팅 어시스턴트"
          heading={<ProjectPicker />}
          centerContent={
            <TabList value={tab} onChange={(v) => setTab(v as TabKey)}>
              <Tab value="kb" label="📚 지식 베이스" />
              <Tab value="live" label="🎙️ 라이브 미팅" />
              <Tab value="notes" label="📝 미팅 노트" />
              <Tab value="settings" label="⚙️ 설정" />
            </TabList>
          }
          endContent={
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--spacing-1)',
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-secondary)',
                paddingInline: 'var(--spacing-2)',
              }}
            >
              <StatusDot variant="success" label="연결됨" isPulsing />
              Claude Haiku 4.5
            </span>
          }
        />
      }
    >
      {tab === 'live' && <LiveMeeting />}
      {tab === 'kb' && <KnowledgeBase />}
      {tab === 'notes' && <MeetingNotes />}
      {tab === 'settings' && <Settings />}
    </AppShell>
  );
}
