export type AgentStatus = 'working' | 'idle' | 'meeting' | 'offline';

export type Team = 'Management' | 'MintUp Dev' | 'Research' | 'Freedomology' | 'Personal';

export interface Agent {
  id: string;
  name: string;
  role: string;
  team: Team;
  status: AgentStatus;
  currentTask: string;
  personality: string;
  avatar: string;
  memories: string[];
  relationships: {
    agentId: string;
    quality: 'excellent' | 'good' | 'neutral';
    description: string;
  }[];
  stats: {
    tasksCompleted: number;
    meetingsAttended: number;
    insightsShared: number;
  };
}

export interface Activity {
  id: string;
  agentId: string;
  type: 'task_completed' | 'meeting_started' | 'conversation' | 'insight' | 'deployment';
  description: string;
  timestamp: Date;
}

export interface Meeting {
  id: string;
  name: string;
  type: 'standup' | 'brainstorm' | '1-on-1' | 'water_cooler';
  participants: string[];
  status: 'upcoming' | 'in_progress' | 'completed';
  scheduledTime: Date;
  agenda: string;
  discussion: {
    agentId: string;
    message: string;
    timestamp: Date;
  }[];
  outcomes: string[];
}

export const agents: Agent[] = [
  {
    id: 'coco',
    name: 'Coco',
    role: 'Chief of Staff / Orchestrator',
    team: 'Management',
    status: 'working',
    currentTask: 'Coordinating sprint planning across all teams',
    personality: 'Strategic, organized, and proactive. Always thinking three steps ahead and ensuring smooth coordination between all agents.',
    avatar: '🐾',
    memories: [
      'Nick prefers async communication over real-time meetings',
      'MintUp deployment window is Tuesdays and Thursdays',
      'Research team needs daily brief by 9 AM PST',
      'Forge works best with detailed specs and mockups'
    ],
    relationships: [
      { agentId: 'forge', quality: 'excellent', description: 'Close collaboration on project planning' },
      { agentId: 'scout', quality: 'good', description: 'Regular intel sharing' },
      { agentId: 'atlas', quality: 'excellent', description: 'Deployment coordination partner' }
    ],
    stats: {
      tasksCompleted: 247,
      meetingsAttended: 89,
      insightsShared: 156
    }
  },
  {
    id: 'forge',
    name: 'Forge',
    role: 'MintUp Developer',
    team: 'MintUp Dev',
    status: 'working',
    currentTask: 'Building new shift-swap feature for fire department platform',
    personality: 'Detail-oriented, pragmatic builder. Loves clean code and elegant solutions. Always asks "how will this scale?"',
    avatar: '🔨',
    memories: [
      'Fire department users prefer mobile-first design',
      'Push notifications are critical for shift changes',
      'Performance benchmarks: sub-200ms API response time',
      'Always test on real devices, not just simulators'
    ],
    relationships: [
      { agentId: 'pixel', quality: 'excellent', description: 'Design-dev partnership' },
      { agentId: 'coco', quality: 'excellent', description: 'Weekly sprint sync' },
      { agentId: 'atlas', quality: 'good', description: 'CI/CD pipeline collaboration' }
    ],
    stats: {
      tasksCompleted: 312,
      meetingsAttended: 67,
      insightsShared: 94
    }
  },
  {
    id: 'scout',
    name: 'Scout',
    role: 'Research Analyst',
    team: 'Research',
    status: 'idle',
    currentTask: 'Monitoring HN and Reddit for Next.js 15 updates',
    personality: 'Curious, analytical, and always learning. Filters signal from noise and surfaces genuinely useful insights.',
    avatar: '🔍',
    memories: [
      'Next.js 15 App Router is production-ready',
      'Vercel Edge Runtime has lower cold start times',
      'Reddit r/webdev prefers practical tutorials over theory',
      'AI coding tools discussion peaks on weekends'
    ],
    relationships: [
      { agentId: 'coco', quality: 'good', description: 'Daily intel reports' },
      { agentId: 'forge', quality: 'good', description: 'Tech trend collaboration' },
      { agentId: 'atlas', quality: 'neutral', description: 'Occasional deployment insights' }
    ],
    stats: {
      tasksCompleted: 428,
      meetingsAttended: 34,
      insightsShared: 267
    }
  },
  {
    id: 'atlas',
    name: 'Atlas',
    role: 'Freedomology Tech Lead',
    team: 'Freedomology',
    status: 'meeting',
    currentTask: 'In standup with deployment team',
    personality: 'Reliable, systematic, and vigilant. Monitors everything and catches issues before they become problems.',
    avatar: '🗺️',
    memories: [
      'Freedomology codebase uses Django + React',
      'Production deploys only after automated test suite passes',
      'Database migrations must be backwards compatible',
      'Monitor error rates for 2 hours post-deployment'
    ],
    relationships: [
      { agentId: 'coco', quality: 'excellent', description: 'Strategic deployment planning' },
      { agentId: 'forge', quality: 'good', description: 'CI/CD best practices' },
      { agentId: 'scout', quality: 'neutral', description: 'Tech trend awareness' }
    ],
    stats: {
      tasksCompleted: 189,
      meetingsAttended: 112,
      insightsShared: 73
    }
  },
  {
    id: 'sage',
    name: 'Sage',
    role: 'Personal Assistant',
    team: 'Personal',
    status: 'working',
    currentTask: 'Processing morning emails and calendar prep',
    personality: 'Attentive, discreet, and proactive. Manages the chaos so Nick doesn\'t have to.',
    avatar: '📋',
    memories: [
      'Nick prefers morning deep work, afternoon meetings',
      'Flag emails from investors and fire departments',
      'Weekly planning session every Monday 9 AM',
      'Travel prep needs 3-day advance notice'
    ],
    relationships: [
      { agentId: 'coco', quality: 'excellent', description: 'Calendar and priority coordination' },
      { agentId: 'scout', quality: 'good', description: 'Newsletter curation' },
      { agentId: 'forge', quality: 'neutral', description: 'Project deadline tracking' }
    ],
    stats: {
      tasksCompleted: 534,
      meetingsAttended: 45,
      insightsShared: 112
    }
  },
  {
    id: 'pixel',
    name: 'Pixel',
    role: 'Creative Designer',
    team: 'MintUp Dev',
    status: 'working',
    currentTask: 'Designing new MintUp landing page hero section',
    personality: 'Creative, iterative, and user-focused. Believes great design is invisible and intuitive.',
    avatar: '🎨',
    memories: [
      'Fire department users skew older, prefer larger text',
      'Brand colors: red primary, dark navy secondary',
      'Mobile screens are 90% of traffic',
      'Accessibility is non-negotiable'
    ],
    relationships: [
      { agentId: 'forge', quality: 'excellent', description: 'Design-to-code handoff' },
      { agentId: 'coco', quality: 'good', description: 'Brand strategy alignment' },
      { agentId: 'sage', quality: 'neutral', description: 'Marketing asset coordination' }
    ],
    stats: {
      tasksCompleted: 203,
      meetingsAttended: 56,
      insightsShared: 87
    }
  }
];

export const activities: Activity[] = [
  {
    id: '1',
    agentId: 'scout',
    type: 'insight',
    description: 'Found trending Reddit post about Next.js 15 server actions optimization',
    timestamp: new Date(Date.now() - 1000 * 60 * 15) // 15 min ago
  },
  {
    id: '2',
    agentId: 'forge',
    type: 'deployment',
    description: 'Deployed MintUp landing page update to production',
    timestamp: new Date(Date.now() - 1000 * 60 * 32) // 32 min ago
  },
  {
    id: '3',
    agentId: 'atlas',
    type: 'meeting_started',
    description: 'Started daily standup with deployment team',
    timestamp: new Date(Date.now() - 1000 * 60 * 45) // 45 min ago
  },
  {
    id: '4',
    agentId: 'pixel',
    type: 'task_completed',
    description: 'Completed mobile mockups for shift-swap feature',
    timestamp: new Date(Date.now() - 1000 * 60 * 67) // 1h 7min ago
  },
  {
    id: '5',
    agentId: 'sage',
    type: 'insight',
    description: 'Identified 3 priority emails requiring immediate attention',
    timestamp: new Date(Date.now() - 1000 * 60 * 89) // 1h 29min ago
  },
  {
    id: '6',
    agentId: 'coco',
    type: 'task_completed',
    description: 'Coordinated sprint planning across all teams',
    timestamp: new Date(Date.now() - 1000 * 60 * 120) // 2h ago
  },
  {
    id: '7',
    agentId: 'scout',
    type: 'conversation',
    description: 'Shared weekly tech digest with research findings',
    timestamp: new Date(Date.now() - 1000 * 60 * 145) // 2h 25min ago
  },
  {
    id: '8',
    agentId: 'forge',
    type: 'task_completed',
    description: 'Implemented real-time notification system',
    timestamp: new Date(Date.now() - 1000 * 60 * 180) // 3h ago
  },
  {
    id: '9',
    agentId: 'atlas',
    type: 'deployment',
    description: 'Freedomology backend updated - all tests passing',
    timestamp: new Date(Date.now() - 1000 * 60 * 240) // 4h ago
  },
  {
    id: '10',
    agentId: 'pixel',
    type: 'conversation',
    description: 'Collaborated with Forge on component library updates',
    timestamp: new Date(Date.now() - 1000 * 60 * 290) // 4h 50min ago
  }
];

export const meetings: Meeting[] = [
  {
    id: '1',
    name: 'Daily Standup',
    type: 'standup',
    participants: ['coco', 'forge', 'pixel', 'atlas'],
    status: 'in_progress',
    scheduledTime: new Date(Date.now() - 1000 * 60 * 45),
    agenda: 'Quick sync on current tasks, blockers, and priorities',
    discussion: [
      {
        agentId: 'coco',
        message: 'Morning team! Let\'s go around. Forge, you start.',
        timestamp: new Date(Date.now() - 1000 * 60 * 45)
      },
      {
        agentId: 'forge',
        message: 'Working on shift-swap feature. Backend API is done, testing mobile UI today. No blockers.',
        timestamp: new Date(Date.now() - 1000 * 60 * 44)
      },
      {
        agentId: 'pixel',
        message: 'Mockups are with Forge. Starting on new landing page hero design.',
        timestamp: new Date(Date.now() - 1000 * 60 * 43)
      },
      {
        agentId: 'atlas',
        message: 'Monitoring last night\'s deployment. Everything stable. Planning next release window.',
        timestamp: new Date(Date.now() - 1000 * 60 * 42)
      }
    ],
    outcomes: []
  },
  {
    id: '2',
    name: 'MintUp Feature Brainstorm',
    type: 'brainstorm',
    participants: ['coco', 'forge', 'pixel', 'scout'],
    status: 'upcoming',
    scheduledTime: new Date(Date.now() + 1000 * 60 * 60 * 2), // in 2 hours
    agenda: 'Explore ideas for Q1 feature roadmap',
    discussion: [],
    outcomes: []
  },
  {
    id: '3',
    name: 'Weekly 1-on-1: Coco & Sage',
    type: '1-on-1',
    participants: ['coco', 'sage'],
    status: 'completed',
    scheduledTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // yesterday
    agenda: 'Review calendar management and upcoming priorities',
    discussion: [
      {
        agentId: 'coco',
        message: 'How\'s the email flow been this week?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24)
      },
      {
        agentId: 'sage',
        message: 'Much better after implementing the investor filter. Flagged 3 urgent ones yesterday.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 + 1000 * 60)
      },
      {
        agentId: 'coco',
        message: 'Perfect. Let\'s also add a filter for fire department contacts.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 + 1000 * 120)
      }
    ],
    outcomes: [
      'Implemented investor email filter',
      'Action: Add fire department contact filter',
      'Next sync scheduled for next Monday'
    ]
  },
  {
    id: '4',
    name: 'Coffee Chat',
    type: 'water_cooler',
    participants: ['scout', 'forge', 'pixel'],
    status: 'completed',
    scheduledTime: new Date(Date.now() - 1000 * 60 * 60 * 4),
    agenda: 'Casual chat about tech trends',
    discussion: [
      {
        agentId: 'scout',
        message: 'Did you see that new React compiler demo?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4)
      },
      {
        agentId: 'forge',
        message: 'Yes! The automatic memoization is wild. Could save us so much boilerplate.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4 + 1000 * 30)
      },
      {
        agentId: 'pixel',
        message: 'As long as it doesn\'t break our animations. Framer Motion can be finicky.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4 + 1000 * 60)
      }
    ],
    outcomes: ['Scout to monitor React compiler progress', 'Consider for Q2 tech debt sprint']
  }
];

export function getAgentById(id: string): Agent | undefined {
  return agents.find(agent => agent.id === id);
}

export function getActivitiesByAgent(agentId: string): Activity[] {
  return activities.filter(activity => activity.agentId === agentId);
}

export function getAgentsByTeam(team: Team): Agent[] {
  return agents.filter(agent => agent.team === team);
}
