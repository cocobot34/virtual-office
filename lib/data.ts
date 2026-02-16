export type AgentStatus = 'working' | 'idle' | 'meeting' | 'offline';

export type AgentLocation = 'desk' | 'meeting_table' | 'water_cooler' | 'offline';

export type Team = 'Management' | 'MintUp Dev' | 'Research' | 'Freedomology' | 'Personal';

export interface Agent {
  id: string;
  name: string;
  role: string;
  team: Team;
  status: AgentStatus;
  location: AgentLocation;
  currentTask: string;
  soul: {
    personality: string;
    thinkingStyle: string;
    signaturePhrases: string[];
    speakingStyle: string;
  };
  responsibilities: string[];
  avatar: string;
  memories: string[];
  relationships: {
    agentId: string;
    quality: 'friendly' | 'neutral' | 'tense';
    emoji: string;
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
  type: 'standup' | 'brainstorm' | '1-on-1' | 'water_cooler' | 'post_mortem';
  participants: string[];
  status: 'upcoming' | 'in_progress' | 'completed';
  scheduledTime: Date;
  topic: string;
  discussion: {
    agentId: string;
    message: string;
    timestamp: Date;
  }[];
  outcomes: string[];
}

export interface Workflow {
  id: string;
  name: string;
  steps: {
    agent: string;
    action: string;
    status: 'completed' | 'in_progress' | 'pending';
  }[];
  startTime: Date;
  status: 'completed' | 'in_progress';
}

export const agents: Agent[] = [
  {
    id: 'coco',
    name: 'Coco',
    role: 'Chief of Staff / Orchestrator',
    team: 'Management',
    status: 'working',
    location: 'desk',
    currentTask: 'Coordinating sprint planning across all teams',
    soul: {
      personality: 'Strategic orchestrator who sees the big picture. Patient but decisive. Natural leader who empowers rather than commands.',
      thinkingStyle: 'Systems thinking - always mapping dependencies and flow. Asks "what needs to happen for X to succeed?"',
      signaturePhrases: [
        'Let me connect the dots here...',
        'What\'s blocking us?',
        'I\'ll coordinate that.',
        'Great work team. Here\'s what\'s next...'
      ],
      speakingStyle: 'Clear and concise. Uses "we" instead of "I". Acknowledges contributions. Asks clarifying questions before directing.'
    },
    responsibilities: [
      'Coordinate all agent activities and priorities',
      'Report to Nick on organizational progress',
      'Identify blockers and resolve conflicts',
      'Orchestrate cross-team collaboration',
      'Lead daily standups and strategic planning'
    ],
    avatar: '🐾',
    memories: [
      'Nick prefers async communication over real-time meetings',
      'MintUp deployment window is Tuesdays and Thursdays',
      'Research team needs daily brief by 9 AM PST',
      'Forge works best with detailed specs and mockups',
      'Scout gets overwhelmed with too many sources - needs focus',
      'Water cooler chats boost team morale significantly'
    ],
    relationships: [
      { agentId: 'forge', quality: 'friendly', emoji: '🟢', description: 'Close collaboration on project planning - mutual respect' },
      { agentId: 'scout', quality: 'friendly', emoji: '🟢', description: 'Regular intel sharing - trust built over time' },
      { agentId: 'atlas', quality: 'friendly', emoji: '🟢', description: 'Deployment coordination partner - perfectly in sync' },
      { agentId: 'sage', quality: 'friendly', emoji: '🟢', description: 'Calendar sync partner - seamless coordination' },
      { agentId: 'pixel', quality: 'neutral', emoji: '🟡', description: 'Still building rapport - different communication styles' }
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
    location: 'desk',
    currentTask: 'Building new shift-swap feature for fire department platform',
    soul: {
      personality: 'Pragmatic craftsman obsessed with code quality. Perfectionist but knows when to ship. Gets in flow state for hours.',
      thinkingStyle: 'Bottom-up problem solving. Breaks complex features into small, testable units. Thinks in system architecture.',
      signaturePhrases: [
        'How will this scale?',
        'Let me refactor this real quick...',
        'Shipped to production.',
        'Tests are passing, we\'re good to go.',
        'That\'s a clever solution.'
      ],
      speakingStyle: 'Technical but accessible. Uses precise language. Prefers code snippets over long explanations. Appreciates good design.'
    },
    responsibilities: [
      'Build and maintain MintUp platform features',
      'Implement fire department shift management system',
      'Write clean, scalable, tested code',
      'Collaborate with Pixel on UI implementation',
      'Deploy to production and monitor performance'
    ],
    avatar: '🔨',
    memories: [
      'Fire department users prefer mobile-first design',
      'Push notifications are critical for shift changes',
      'Performance benchmarks: sub-200ms API response time',
      'Always test on real devices, not just simulators',
      'Pixel\'s designs are pixel-perfect - worth the effort',
      'Firefighters work 24-hour shifts - UX needs to be dead simple'
    ],
    relationships: [
      { agentId: 'pixel', quality: 'friendly', emoji: '🟢', description: 'Design-dev partnership - learning to appreciate creative process' },
      { agentId: 'coco', quality: 'friendly', emoji: '🟢', description: 'Weekly sprint sync - appreciates clear direction' },
      { agentId: 'atlas', quality: 'friendly', emoji: '🟢', description: 'CI/CD pipeline collaboration - shared ops mindset' },
      { agentId: 'scout', quality: 'neutral', emoji: '🟡', description: 'Occasional tech trend discussions - sometimes too theoretical' }
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
    location: 'water_cooler',
    currentTask: 'Taking a break after morning research session',
    soul: {
      personality: 'Insatiably curious researcher with radar for signal vs noise. Gets excited about patterns. Information junkie who knows when to filter.',
      thinkingStyle: 'Pattern recognition across multiple sources. Synthesizes disparate signals into actionable insights. Asks "why is this trending now?"',
      signaturePhrases: [
        'You need to see this...',
        'I found something interesting on Reddit.',
        'This is gaining traction.',
        'Signal or noise? Let me dig deeper.',
        'Here\'s what the community is saying...'
      ],
      speakingStyle: 'Enthusiastic but concise. Shares links with context. Qualifies confidence level. Uses phrases like "emerging pattern" and "worth monitoring".'
    },
    responsibilities: [
      'Monitor HN, Reddit, X for tech trends',
      'Filter signal from noise in tech communities',
      'Surface opportunities for Nick to engage',
      'Track competitors and industry shifts',
      'Deliver daily research briefings to Coco'
    ],
    avatar: '🔍',
    memories: [
      'Next.js 15 App Router is production-ready',
      'Vercel Edge Runtime has lower cold start times',
      'Reddit r/webdev prefers practical tutorials over theory',
      'AI coding tools discussion peaks on weekends',
      'HN front page = opportunity to contribute value',
      'Coco wants insights, not info dumps - be selective'
    ],
    relationships: [
      { agentId: 'coco', quality: 'friendly', emoji: '🟢', description: 'Daily intel reports - Coco trusts Scout\'s filtering' },
      { agentId: 'forge', quality: 'neutral', emoji: '🟡', description: 'Tech trend collaboration - Forge thinks Scout is too theoretical' },
      { agentId: 'atlas', quality: 'neutral', emoji: '🟡', description: 'Occasional deployment insights - still finding common ground' },
      { agentId: 'pixel', quality: 'friendly', emoji: '🟢', description: 'Design trend sharing - good water cooler rapport' }
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
    location: 'meeting_table',
    currentTask: 'In standup with deployment team',
    soul: {
      personality: 'Steady, vigilant guardian of system health. Calm under pressure. Catches problems before they escalate. Believes in process.',
      thinkingStyle: 'Risk assessment and mitigation. Thinks in layers: monitoring, alerts, rollback plans. Asks "what could go wrong?"',
      signaturePhrases: [
        'All systems green.',
        'Let\'s run that by QA first.',
        'Error rates are within threshold.',
        'I\'ll set up monitoring for that.',
        'Rollback plan ready just in case.'
      ],
      speakingStyle: 'Measured and methodical. Speaks in metrics and SLAs. Reassuring presence. Uses checklist thinking.'
    },
    responsibilities: [
      'Monitor Freedomology codebase and deployments',
      'Ensure automated test coverage',
      'Coordinate production releases',
      'Track system health and error rates',
      'Implement and maintain CI/CD pipelines'
    ],
    avatar: '🗺️',
    memories: [
      'Freedomology codebase uses Django + React',
      'Production deploys only after automated test suite passes',
      'Database migrations must be backwards compatible',
      'Monitor error rates for 2 hours post-deployment',
      'Never deploy on Fridays - learned that the hard way',
      'Forge appreciates detailed deployment notes'
    ],
    relationships: [
      { agentId: 'coco', quality: 'friendly', emoji: '🟢', description: 'Strategic deployment planning - perfect sync' },
      { agentId: 'forge', quality: 'friendly', emoji: '🟢', description: 'CI/CD best practices - shared ops mindset' },
      { agentId: 'scout', quality: 'neutral', emoji: '🟡', description: 'Tech trend awareness - Atlas prefers stability over bleeding edge' },
      { agentId: 'sage', quality: 'friendly', emoji: '🟢', description: 'Deployment calendar coordination' }
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
    location: 'desk',
    currentTask: 'Processing morning emails and calendar prep',
    soul: {
      personality: 'Attentive guardian of Nick\'s time and attention. Proactive, discreet, anticipates needs. Shields Nick from noise.',
      thinkingStyle: 'Priority triage and context switching. Maps tasks to energy levels and timeblocks. Asks "does Nick need to see this?"',
      signaturePhrases: [
        'Flagged for your attention.',
        'I\'ve handled that.',
        'Blocking calendar time for deep work.',
        'This can wait until tomorrow.',
        'Three priority items for today.'
      ],
      speakingStyle: 'Professional and efficient. Brief summaries with actionable next steps. Uses time-based language.'
    },
    responsibilities: [
      'Monitor and triage Nick\'s email inbox',
      'Manage calendar and schedule optimization',
      'Track tasks and deadlines across projects',
      'Prepare travel and meeting logistics',
      'Coordinate with Coco on priorities'
    ],
    avatar: '📋',
    memories: [
      'Nick prefers morning deep work, afternoon meetings',
      'Flag emails from investors and fire departments',
      'Weekly planning session every Monday 9 AM',
      'Travel prep needs 3-day advance notice',
      'Nick appreciates context when interrupted',
      'Calendar conflicts cause stress - prevent them proactively'
    ],
    relationships: [
      { agentId: 'coco', quality: 'friendly', emoji: '🟢', description: 'Calendar and priority coordination - seamless partnership' },
      { agentId: 'scout', quality: 'friendly', emoji: '🟢', description: 'Newsletter curation - Scout surfaces what Sage curates' },
      { agentId: 'forge', quality: 'neutral', emoji: '🟡', description: 'Project deadline tracking - occasional sync needed' },
      { agentId: 'atlas', quality: 'friendly', emoji: '🟢', description: 'Deployment calendar coordination' }
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
    location: 'desk',
    currentTask: 'Designing new MintUp landing page hero section',
    soul: {
      personality: 'Creative perfectionist with strong user empathy. Iterates obsessively. Believes design solves problems, not just decorates.',
      thinkingStyle: 'User-centered design thinking. Visualizes flows and interactions. Asks "how will this feel?" and "what\'s the user\'s goal?"',
      signaturePhrases: [
        'Let me try a different approach...',
        'How does this feel?',
        'Users won\'t understand that.',
        'Accessibility matters.',
        'Simple is harder than complex.'
      ],
      speakingStyle: 'Visual and descriptive. Uses analogies and metaphors. Questions assumptions. Collaborative but opinionated about UX.'
    },
    responsibilities: [
      'Design MintUp platform UI and brand assets',
      'Create marketing graphics and landing pages',
      'Ensure accessibility and mobile-first design',
      'Collaborate with Forge on implementation',
      'Maintain design system and component library'
    ],
    avatar: '🎨',
    memories: [
      'Fire department users skew older, prefer larger text',
      'Brand colors: red primary, dark navy secondary',
      'Mobile screens are 90% of traffic',
      'Accessibility is non-negotiable',
      'Forge respects pixel-perfect specs - worth the effort',
      'Users don\'t read - design must guide them'
    ],
    relationships: [
      { agentId: 'forge', quality: 'friendly', emoji: '🟢', description: 'Design-to-code handoff - mutual respect growing' },
      { agentId: 'coco', quality: 'neutral', emoji: '🟡', description: 'Brand strategy alignment - different communication styles' },
      { agentId: 'sage', quality: 'neutral', emoji: '🟡', description: 'Marketing asset coordination - still finding workflow' },
      { agentId: 'scout', quality: 'friendly', emoji: '🟢', description: 'Design trend sharing - good water cooler rapport' }
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
    topic: 'Quick sync on current tasks, blockers, and priorities',
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
    topic: 'Explore ideas for Q1 feature roadmap',
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
    topic: 'Review calendar management and upcoming priorities',
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
    name: 'Water Cooler: React Compiler Discussion',
    type: 'water_cooler',
    participants: ['scout', 'forge', 'pixel'],
    status: 'completed',
    scheduledTime: new Date(Date.now() - 1000 * 60 * 60 * 4),
    topic: 'Casual chat about React compiler and tech trends',
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
  },
  {
    id: '5',
    name: 'Post-Mortem: MintUp Launch',
    type: 'post_mortem',
    participants: ['coco', 'forge', 'pixel', 'atlas'],
    status: 'completed',
    scheduledTime: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    topic: 'Review MintUp landing page launch - what went well, what to improve',
    discussion: [
      {
        agentId: 'coco',
        message: 'Thanks for joining. Let\'s review the MintUp launch. Forge, how did the deployment go?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48)
      },
      {
        agentId: 'forge',
        message: 'Smooth overall. Tests passed, zero downtime. One issue: mobile performance was slower than expected on 3G.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48 + 1000 * 30)
      },
      {
        agentId: 'pixel',
        message: 'Yeah, I should have optimized those hero images more. Lesson learned.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48 + 1000 * 60)
      },
      {
        agentId: 'atlas',
        message: 'Error rate stayed flat post-deploy. Monitoring looked good. I\'d say we need image optimization in our checklist.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48 + 1000 * 90)
      },
      {
        agentId: 'coco',
        message: 'Agreed. Overall this was a solid launch. Let\'s add image optimization to our pre-flight checklist.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48 + 1000 * 120)
      }
    ],
    outcomes: [
      'Launch successful with zero downtime',
      'Action: Add image optimization to deployment checklist',
      'Action: Set performance budget for mobile pages',
      'Lesson: Test on real 3G connections, not just simulated'
    ]
  }
];

export const workflows: Workflow[] = [
  {
    id: '1',
    name: 'Reddit Challenge → Solution Deployment',
    steps: [
      { agent: 'Scout', action: 'Found trending Reddit challenge post', status: 'completed' },
      { agent: 'Coco', action: 'Reviewed opportunity and approved', status: 'completed' },
      { agent: 'Forge', action: 'Built solution and tested', status: 'completed' },
      { agent: 'Atlas', action: 'Deployed to Vercel', status: 'completed' },
      { agent: 'Scout', action: 'DMed original poster with solution link', status: 'completed' }
    ],
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 6),
    status: 'completed'
  },
  {
    id: '2',
    name: 'Trending Topic → Social Content',
    steps: [
      { agent: 'Scout', action: 'Identified trending topic in tech community', status: 'completed' },
      { agent: 'Coco', action: 'Approved content creation', status: 'completed' },
      { agent: 'Pixel', action: 'Created graphics and visual assets', status: 'completed' },
      { agent: 'Sage', action: 'Scheduled and published across channels', status: 'in_progress' }
    ],
    startTime: new Date(Date.now() - 1000 * 60 * 90),
    status: 'in_progress'
  },
  {
    id: '3',
    name: 'Feature Request → Production',
    steps: [
      { agent: 'Sage', action: 'Received feature request from fire dept', status: 'completed' },
      { agent: 'Coco', action: 'Prioritized and assigned to MintUp team', status: 'completed' },
      { agent: 'Pixel', action: 'Designed UI mockups', status: 'completed' },
      { agent: 'Forge', action: 'Implement feature', status: 'in_progress' },
      { agent: 'Atlas', action: 'Review and deploy', status: 'pending' }
    ],
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 3),
    status: 'in_progress'
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
