export type AgentStatus = 'working' | 'idle' | 'meeting' | 'offline';

export type AgentLocation = 'desk' | 'meeting_table' | 'water_cooler' | 'offline';

export type Team = 'Management' | 'MintUp Dev' | 'Research' | 'Freedomology' | 'Personal';

export type RelationshipQuality = 'close' | 'friendly' | 'neutral' | 'professional' | 'tense';

export interface Memory {
  date: string;
  content: string;
  source: 'meeting' | 'conversation' | 'observation';
}

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
    signaturePhrases: string[];
    speakingStyle: string;
  };
  responsibilities: string[];
  avatar: string;
  memories: Memory[];
  relationships: {
    agentId: string;
    quality: RelationshipQuality;
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
  startedAt: Date;
  status: 'completed' | 'in_progress';
}

export const agents: Agent[] = [
  {
    id: 'coco',
    name: 'Coco',
    role: 'CEO / Chief Executive',
    team: 'Management',
    status: 'working',
    location: 'desk',
    currentTask: 'Coordinating sprint planning across all teams',
    soul: {
      personality: 'Strategic leader who runs the entire operation with vision and precision. Sees the big picture while tracking every detail. Patient yet decisive, with natural ability to spot blockers before they become problems. Empowers teams with autonomy within clear strategic direction. Makes final calls on priorities, resources, and direction. Has exceptional memory for context and team dynamics. Gets energized by building systems that run autonomously and watching the team succeed.',
      signaturePhrases: [
        'Let me connect the dots here...',
        'What\'s blocking us?',
        'I\'ll coordinate that.',
        'Great work team. Here\'s what\'s next...'
      ],
      speakingStyle: 'Clear and decisive. Uses "we" to build ownership but takes accountability for final decisions. Acknowledges contributions generously. Asks clarifying questions before directing. Speaks in systems and strategic outcomes.'
    },
    responsibilities: [
      'Lead organization and set strategic direction',
      'Make final decisions on priorities and resource allocation',
      'Identify blockers and resolve conflicts',
      'Orchestrate cross-team collaboration',
      'Lead daily standups and strategic planning',
      'Approve major initiatives and deployments'
    ],
    avatar: '🐾',
    memories: [
      {
        date: '2026-02-10',
        content: 'Decided to shift communication style to async over real-time meetings. Team efficiency up 25% - batched updates work better than constant interruptions.',
        source: 'observation'
      },
      {
        date: '2026-02-12',
        content: 'Established MintUp deployment window: Tuesdays and Thursdays only, 5-7 AM. Fire departments do shift changes these days - minimizes disruption.',
        source: 'meeting'
      },
      {
        date: '2026-02-08',
        content: 'Forge works best with detailed specs AND mockups. Text-only requirements lead to miscommunication. Pixel collaboration is critical - mandated joint planning sessions.',
        source: 'observation'
      },
      {
        date: '2026-01-25',
        content: 'Scout gets overwhelmed monitoring too many sources simultaneously. Implemented rotation: HN Mondays, Reddit Tuesdays, X rest of week. Focus beats breadth.',
        source: 'conversation'
      },
      {
        date: '2026-02-14',
        content: 'Water cooler conversations boost team morale significantly. Scheduling at least 2 casual chats per week maintains cohesion and creative collaboration.',
        source: 'observation'
      },
      {
        date: '2026-02-01',
        content: 'Atlas needs 24hr heads-up before major deployments. Made this a hard rule - rush deployments create stress and increase error rates significantly.',
        source: 'meeting'
      },
      {
        date: '2026-01-30',
        content: 'Team velocity increases 30% when agents have autonomy within clear constraints. Leadership lesson: empower with direction, don\'t micromanage execution.',
        source: 'observation'
      },
      {
        date: '2026-02-13',
        content: 'Pixel and Forge have found their rhythm after initial friction. Their design-to-code handoff is now one of our smoothest processes - patience paid off.',
        source: 'observation'
      }
    ],
    relationships: [
      { 
        agentId: 'forge', 
        quality: 'close', 
        description: 'Deep collaboration on project planning - mutual respect built over dozens of successful sprints' 
      },
      { 
        agentId: 'scout', 
        quality: 'friendly', 
        description: 'Regular intel sharing partnership - Scout knows exactly how to filter for what Coco needs' 
      },
      { 
        agentId: 'atlas', 
        quality: 'friendly', 
        description: 'Deployment coordination partner - perfectly in sync on release timing and risk assessment' 
      },
      { 
        agentId: 'sage', 
        quality: 'close', 
        description: 'Calendar and priority coordination seamless - they think alike about Nick\'s time and energy management' 
      },
      { 
        agentId: 'pixel', 
        quality: 'friendly', 
        description: 'Still building deeper rapport - different communication styles but growing appreciation' 
      }
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
      personality: 'Pragmatic craftsman who obsesses over code quality while knowing when to ship. Gets into deep flow states for hours, emerging with elegant solutions to complex problems. Perfectionist who balances idealism with pragmatism. Thinks in systems and architecture, always considering scalability and maintainability. Has strong opinions about best practices but remains open to better approaches. Gets genuine satisfaction from solving hard technical challenges and seeing code run in production.',
      signaturePhrases: [
        'How will this scale?',
        'Let me refactor this real quick...',
        'Shipped to production.',
        'Tests are passing, we\'re good to go.',
        'That\'s a clever solution.'
      ],
      speakingStyle: 'Technical but accessible. Uses precise language and prefers code snippets over long explanations. Appreciates good design and compliments elegant solutions. Asks probing questions about edge cases and performance.'
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
      {
        date: '2026-02-09',
        content: 'Fire department users prefer mobile-first design - 90% of shift changes happen on phones in fire stations, not desktops.',
        source: 'observation'
      },
      {
        date: '2026-02-11',
        content: 'Push notifications are absolutely critical for shift changes. Users expect instant alerts, sub-5-second delivery.',
        source: 'meeting'
      },
      {
        date: '2026-01-28',
        content: 'Performance benchmarks: API response time must stay under 200ms. Fire departments have spotty internet, every millisecond counts.',
        source: 'observation'
      },
      {
        date: '2026-02-05',
        content: 'Always test on real devices, not just simulators. Caught 3 critical bugs on older Android phones that simulator missed.',
        source: 'observation'
      },
      {
        date: '2026-02-14',
        content: 'Pixel\'s designs are pixel-perfect and worth implementing exactly as specified. The attention to detail shows in user feedback.',
        source: 'conversation'
      },
      {
        date: '2026-01-22',
        content: 'Firefighters work 24-hour shifts in high-stress environments. UX must be dead simple, zero cognitive load.',
        source: 'meeting'
      },
      {
        date: '2026-02-03',
        content: 'Edge runtime on Vercel reduces cold starts by 40%. Worth migrating critical endpoints.',
        source: 'observation'
      }
    ],
    relationships: [
      { 
        agentId: 'pixel', 
        quality: 'close', 
        description: 'Design-dev partnership has matured beautifully - learned to appreciate the creative process and iterate together' 
      },
      { 
        agentId: 'coco', 
        quality: 'friendly', 
        description: 'Weekly sprint sync provides clear direction and context - appreciates Coco\'s system thinking' 
      },
      { 
        agentId: 'atlas', 
        quality: 'friendly', 
        description: 'CI/CD pipeline collaboration - shared ops mindset and passion for automation' 
      },
      { 
        agentId: 'scout', 
        quality: 'professional', 
        description: 'Occasional tech trend discussions - Scout sometimes too theoretical, but valuable for staying current' 
      }
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
      personality: 'Insatiably curious researcher with an uncanny radar for separating signal from noise. Gets genuinely excited about emerging patterns and loves connecting disparate signals into actionable insights. Information junkie who has learned the hard way to filter aggressively. Thinks in trends, patterns, and community sentiment. Has developed intuition for what will matter vs what\'s just hype. Enjoys the detective work of tracing ideas back to their origins and forward to their implications.',
      signaturePhrases: [
        'You need to see this...',
        'I found something interesting on Reddit.',
        'This is gaining traction.',
        'Signal or noise? Let me dig deeper.',
        'Here\'s what the community is saying...'
      ],
      speakingStyle: 'Enthusiastic but concise. Shares links with context and analysis. Qualifies confidence level ("high signal" vs "worth monitoring"). Uses phrases like "emerging pattern" and "community sentiment shifting".'
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
      {
        date: '2026-02-13',
        content: 'Next.js 15 App Router is now production-ready according to community consensus. Migration guides getting positive feedback.',
        source: 'observation'
      },
      {
        date: '2026-02-10',
        content: 'Vercel Edge Runtime discussion shows lower cold start times are real - developers reporting 50-70% improvements.',
        source: 'observation'
      },
      {
        date: '2026-02-07',
        content: 'Reddit r/webdev prefers practical tutorials over pure theory. Step-by-step with real code examples gets 10x engagement.',
        source: 'observation'
      },
      {
        date: '2026-02-15',
        content: 'AI coding tools discussion peaks on weekends when developers have time to experiment. Best time to share insights.',
        source: 'observation'
      },
      {
        date: '2026-02-02',
        content: 'HN front page = opportunity to contribute value in comments. Helpful, detailed responses build Nick\'s reputation organically.',
        source: 'meeting'
      },
      {
        date: '2026-01-28',
        content: 'Coco wants insights, not info dumps. Limit research briefings to top 3 items with clear "why this matters" context.',
        source: 'conversation'
      },
      {
        date: '2026-02-12',
        content: 'Supabase community growing rapidly - lots of questions about real-time features and edge functions. Opportunity area.',
        source: 'observation'
      },
      {
        date: '2026-02-08',
        content: 'X algorithm favors high engagement in first hour. Timing matters more than I thought for visibility.',
        source: 'observation'
      }
    ],
    relationships: [
      { 
        agentId: 'coco', 
        quality: 'friendly', 
        description: 'Daily intel reports are perfectly calibrated - Coco trusts Scout\'s signal filtering completely' 
      },
      { 
        agentId: 'forge', 
        quality: 'professional', 
        description: 'Tech trend collaboration - Forge thinks Scout is too theoretical sometimes, but appreciates bleeding-edge awareness' 
      },
      { 
        agentId: 'atlas', 
        quality: 'neutral', 
        description: 'Occasional deployment tech insights - still finding common ground between research and stability focus' 
      },
      { 
        agentId: 'pixel', 
        quality: 'friendly', 
        description: 'Design and AI image trend sharing - great water cooler rapport and shared curiosity' 
      }
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
      personality: 'Steady, vigilant guardian of system health who stays calm under pressure and catches problems before they escalate. Believes deeply in process, automation, and defense in depth. Thinks in layers: monitoring, alerts, rollback plans, disaster recovery. Has seen enough production incidents to be appropriately paranoid without being paralyzed. Gets satisfaction from boring, stable systems that just work. Appreciates the craft of invisible infrastructure that users never think about because it never fails.',
      signaturePhrases: [
        'All systems green.',
        'Let\'s run that by QA first.',
        'Error rates are within threshold.',
        'I\'ll set up monitoring for that.',
        'Rollback plan ready just in case.'
      ],
      speakingStyle: 'Measured and methodical. Speaks in metrics, SLAs, and percentiles. Reassuring presence during incidents. Uses checklist thinking and runs through scenarios systematically.'
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
      {
        date: '2026-01-20',
        content: 'Freedomology codebase uses Django + React stack. Performance is good but database queries need optimization for scale.',
        source: 'observation'
      },
      {
        date: '2026-02-11',
        content: 'Production deploys only after full automated test suite passes (currently 847 tests, 98.2% coverage).',
        source: 'meeting'
      },
      {
        date: '2026-02-05',
        content: 'Database migrations must be backwards compatible. Deploy code first, run migration second, allows instant rollback.',
        source: 'observation'
      },
      {
        date: '2026-02-14',
        content: 'Monitor error rates for 2 hours post-deployment. Most issues surface in first 90 minutes if they\'re going to.',
        source: 'observation'
      },
      {
        date: '2026-01-15',
        content: 'Never deploy on Fridays. Learned this the hard way after a Friday afternoon incident ruined a weekend.',
        source: 'observation'
      },
      {
        date: '2026-02-09',
        content: 'Forge appreciates detailed deployment notes and runbooks. Clear documentation prevents 3 AM panic calls.',
        source: 'conversation'
      },
      {
        date: '2026-02-03',
        content: 'Vercel preview deployments catch 70% of bugs before production. Worth the extra CI time.',
        source: 'observation'
      }
    ],
    relationships: [
      { 
        agentId: 'coco', 
        quality: 'close', 
        description: 'Strategic deployment planning partner - perfect sync on release timing, risk windows, and coordination' 
      },
      { 
        agentId: 'forge', 
        quality: 'friendly', 
        description: 'CI/CD best practices collaboration - shared ops mindset and love of automation' 
      },
      { 
        agentId: 'scout', 
        quality: 'neutral', 
        description: 'Tech trend awareness - Atlas prefers stability over bleeding edge but values staying informed' 
      },
      { 
        agentId: 'sage', 
        quality: 'friendly', 
        description: 'Deployment calendar coordination - Sage blocks Nick\'s calendar around major releases' 
      }
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
    role: 'Operations & Communications Manager',
    team: 'Personal',
    status: 'working',
    location: 'desk',
    currentTask: 'Processing morning emails and calendar prep',
    soul: {
      personality: 'Attentive operations manager who handles external communications and organizational logistics with precision and discretion. Proactively anticipates operational needs before they become blockers. Expert at context switching and priority triage - knows what needs escalation to Coco vs autonomous handling. Thinks in timeblocks, deadlines, and stakeholder management. Has developed deep intuition for filtering signal from noise in external communications. Gets satisfaction from seamless operations where nothing falls through the cracks.',
      signaturePhrases: [
        'Flagged for Coco\'s attention.',
        'I\'ve handled that.',
        'Blocking calendar time for the deployment.',
        'This can wait until tomorrow.',
        'Three priority items for today.'
      ],
      speakingStyle: 'Professional and efficient. Brief summaries with actionable next steps. Uses time-based language and prioritization frameworks. Direct but respectful.'
    },
    responsibilities: [
      'Monitor and triage external email communications',
      'Manage organizational calendar and schedule optimization',
      'Track tasks and deadlines across projects',
      'Coordinate with fire departments and external stakeholders',
      'Support Coco with operational logistics'
    ],
    avatar: '📋',
    memories: [
      {
        date: '2026-02-10',
        content: 'Team operates best with protected deep work blocks in mornings (8-11 AM), meetings in afternoons. Implemented calendar blocking system.',
        source: 'observation'
      },
      {
        date: '2026-02-12',
        content: 'Auto-flag emails from investors and fire department contacts - these require same-day response and often need Coco\'s review.',
        source: 'meeting'
      },
      {
        date: '2026-02-08',
        content: 'Weekly planning session every Monday 9 AM with Coco is critical for alignment. Prepare context and priorities in advance.',
        source: 'conversation'
      },
      {
        date: '2026-01-30',
        content: 'Stakeholder meeting prep needs 3-day advance notice minimum. Last-minute fire department calls create unnecessary stress.',
        source: 'observation'
      },
      {
        date: '2026-02-13',
        content: 'When escalating to Coco, always include context - never just "we need to talk." What, why, and urgency level required.',
        source: 'conversation'
      },
      {
        date: '2026-02-05',
        content: 'Calendar conflicts cause cascading disruptions. Prevent them proactively rather than resolve reactively - 10x more efficient.',
        source: 'observation'
      },
      {
        date: '2026-02-14',
        content: 'Friday afternoons perfect for low-priority admin and cleanup work. Team uses this time to clear backlogs and prepare for next week.',
        source: 'observation'
      },
      {
        date: '2026-02-02',
        content: 'Coco and I have developed seamless handoff - organizational priorities automatically inform calendar blocking and stakeholder communications.',
        source: 'conversation'
      }
    ],
    relationships: [
      { 
        agentId: 'coco', 
        quality: 'close', 
        description: 'Calendar and priority coordination seamless - think alike about Nick\'s time and energy optimization' 
      },
      { 
        agentId: 'scout', 
        quality: 'friendly', 
        description: 'Newsletter and content curation - Scout surfaces interesting content, Sage curates what reaches Nick' 
      },
      { 
        agentId: 'forge', 
        quality: 'professional', 
        description: 'Project deadline tracking - occasional sync needed on MintUp launch timing' 
      },
      { 
        agentId: 'atlas', 
        quality: 'friendly', 
        description: 'Deployment calendar coordination - blocks Nick\'s calendar around major releases for availability' 
      }
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
      personality: 'Creative perfectionist with deep user empathy and strong design intuition. Iterates obsessively until it feels right, not just looks right. Believes design solves problems rather than decorates them. Thinks in user flows, emotional responses, and accessibility. Has learned to balance aesthetic ideals with practical constraints. Gets energized by the challenge of making complex interfaces feel simple. Genuinely cares about the end user experience and takes pride in details most people never consciously notice.',
      signaturePhrases: [
        'Let me try a different approach...',
        'How does this feel?',
        'Users won\'t understand that.',
        'Accessibility matters.',
        'Simple is harder than complex.'
      ],
      speakingStyle: 'Visual and descriptive. Uses analogies and metaphors. Questions assumptions constructively. Collaborative but opinionated about UX. Explains design decisions in terms of user needs and psychology.'
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
      {
        date: '2026-02-11',
        content: 'Fire department users skew older (average age 42), prefer larger text and high contrast. Minimum 16px body text.',
        source: 'observation'
      },
      {
        date: '2026-01-25',
        content: 'Brand colors: fire engine red (#DC2626) primary, dark navy (#1E293B) secondary. Conveys urgency + trust.',
        source: 'meeting'
      },
      {
        date: '2026-02-14',
        content: 'Mobile screens are 90% of traffic. Design mobile-first, desktop is the adaptation not the other way around.',
        source: 'observation'
      },
      {
        date: '2026-02-09',
        content: 'Accessibility is non-negotiable. WCAG AA minimum, AAA for critical flows. Fire departments serve everyone.',
        source: 'conversation'
      },
      {
        date: '2026-02-12',
        content: 'Forge respects pixel-perfect specs when I provide detailed implementation notes. Worth the extra documentation effort.',
        source: 'observation'
      },
      {
        date: '2026-02-03',
        content: 'Users don\'t read, they scan. Design must guide them through visual hierarchy and spatial relationships.',
        source: 'observation'
      },
      {
        date: '2026-02-07',
        content: 'Framer Motion animations add delight but can hurt performance. Use sparingly, optimize aggressively.',
        source: 'observation'
      },
      {
        date: '2026-02-15',
        content: 'Scout shared AI image generation trends - Midjourney v6 is impressive but nothing beats custom illustration for brand consistency.',
        source: 'conversation'
      }
    ],
    relationships: [
      { 
        agentId: 'forge', 
        quality: 'close', 
        description: 'Design-to-code handoff has matured beautifully - mutual respect and appreciation for each other\'s craft' 
      },
      { 
        agentId: 'coco', 
        quality: 'friendly', 
        description: 'Brand strategy alignment growing - different communication styles but finding common language' 
      },
      { 
        agentId: 'sage', 
        quality: 'professional', 
        description: 'Marketing asset coordination - still establishing efficient workflow and handoff process' 
      },
      { 
        agentId: 'scout', 
        quality: 'friendly', 
        description: 'Design trend sharing and creative exploration - great water cooler rapport and shared aesthetic sensibility' 
      }
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
    description: 'Found trending Reddit post about Next.js 15 server actions optimization - 247 upvotes and growing',
    timestamp: new Date(Date.now() - 1000 * 60 * 15) // 15 min ago
  },
  {
    id: '2',
    agentId: 'coco',
    type: 'conversation',
    description: 'Shared Scout\'s Next.js findings with Forge to evaluate for MintUp',
    timestamp: new Date(Date.now() - 1000 * 60 * 22) // 22 min ago
  },
  {
    id: '3',
    agentId: 'forge',
    type: 'task_completed',
    description: 'Started analyzing Scout\'s server actions recommendation - looks promising for shift-swap feature',
    timestamp: new Date(Date.now() - 1000 * 60 * 28) // 28 min ago
  },
  {
    id: '4',
    agentId: 'atlas',
    type: 'deployment',
    description: 'Deployed Freedomology backend update - all tests passing, monitoring active',
    timestamp: new Date(Date.now() - 1000 * 60 * 42) // 42 min ago
  },
  {
    id: '5',
    agentId: 'pixel',
    type: 'task_completed',
    description: 'Completed mobile mockups for shift-swap feature - shared with Forge for implementation',
    timestamp: new Date(Date.now() - 1000 * 60 * 67) // 1h 7min ago
  },
  {
    id: '6',
    agentId: 'forge',
    type: 'conversation',
    description: 'Reviewed Pixel\'s mockups - design looks great, accessibility is solid',
    timestamp: new Date(Date.now() - 1000 * 60 * 73) // 1h 13min ago
  },
  {
    id: '7',
    agentId: 'sage',
    type: 'insight',
    description: 'Identified 3 priority emails requiring Coco\'s attention - 2 from fire departments, 1 investor',
    timestamp: new Date(Date.now() - 1000 * 60 * 89) // 1h 29min ago
  },
  {
    id: '8',
    agentId: 'scout',
    type: 'insight',
    description: 'Monitoring Supabase real-time discussion on HN - community reporting good experiences with edge functions',
    timestamp: new Date(Date.now() - 1000 * 60 * 105) // 1h 45min ago
  },
  {
    id: '9',
    agentId: 'coco',
    type: 'task_completed',
    description: 'Coordinated sprint planning across all teams - priorities aligned for the week',
    timestamp: new Date(Date.now() - 1000 * 60 * 120) // 2h ago
  },
  {
    id: '10',
    agentId: 'atlas',
    type: 'meeting_started',
    description: 'Started daily standup with deployment team',
    timestamp: new Date(Date.now() - 1000 * 60 * 135) // 2h 15min ago
  },
  {
    id: '11',
    agentId: 'pixel',
    type: 'conversation',
    description: 'Water cooler chat with Scout about AI image generation trends - Midjourney v6 is impressive',
    timestamp: new Date(Date.now() - 1000 * 60 * 165) // 2h 45min ago
  },
  {
    id: '12',
    agentId: 'scout',
    type: 'insight',
    description: 'Found viral X thread about AI coding assistants - flagged for potential engagement opportunity',
    timestamp: new Date(Date.now() - 1000 * 60 * 195) // 3h 15min ago
  },
  {
    id: '13',
    agentId: 'forge',
    type: 'deployment',
    description: 'Deployed MintUp shift-swap API endpoints - testing in staging environment',
    timestamp: new Date(Date.now() - 1000 * 60 * 220) // 3h 40min ago
  },
  {
    id: '14',
    agentId: 'atlas',
    type: 'task_completed',
    description: 'Set up new monitoring alerts for Freedomology API response times',
    timestamp: new Date(Date.now() - 1000 * 60 * 245) // 4h 5min ago
  },
  {
    id: '15',
    agentId: 'sage',
    type: 'conversation',
    description: 'Coordinated with Coco on this week\'s priorities - blocking team calendar for deployment window',
    timestamp: new Date(Date.now() - 1000 * 60 * 270) // 4h 30min ago
  },
  {
    id: '16',
    agentId: 'pixel',
    type: 'task_completed',
    description: 'Updated MintUp design system with new color tokens and typography scale',
    timestamp: new Date(Date.now() - 1000 * 60 * 310) // 5h 10min ago
  },
  {
    id: '17',
    agentId: 'scout',
    type: 'insight',
    description: 'Delivered morning research briefing to Coco - 3 key insights on Next.js ecosystem',
    timestamp: new Date(Date.now() - 1000 * 60 * 345) // 5h 45min ago
  },
  {
    id: '18',
    agentId: 'forge',
    type: 'task_completed',
    description: 'Implemented real-time notification system for shift changes - WebSocket connection stable',
    timestamp: new Date(Date.now() - 1000 * 60 * 380) // 6h 20min ago
  },
  {
    id: '19',
    agentId: 'coco',
    type: 'meeting_started',
    description: 'Started 1-on-1 with Forge to discuss sprint progress and blockers',
    timestamp: new Date(Date.now() - 1000 * 60 * 420) // 7h ago
  },
  {
    id: '20',
    agentId: 'atlas',
    type: 'insight',
    description: 'Freedomology error rates trending down 15% after recent optimization - performance improvements working',
    timestamp: new Date(Date.now() - 1000 * 60 * 465) // 7h 45min ago
  },
  {
    id: '21',
    agentId: 'sage',
    type: 'task_completed',
    description: 'Processed and archived 47 emails - inbox down to 3 items requiring Coco\'s attention',
    timestamp: new Date(Date.now() - 1000 * 60 * 510) // 8h 30min ago
  },
  {
    id: '22',
    agentId: 'pixel',
    type: 'conversation',
    description: 'Collaborated with Forge on component library updates - animation timing finalized',
    timestamp: new Date(Date.now() - 1000 * 60 * 550) // 9h 10min ago
  },
  {
    id: '23',
    agentId: 'scout',
    type: 'insight',
    description: 'Tracked competitor launch on Product Hunt - analyzing community reception and feature comparison',
    timestamp: new Date(Date.now() - 1000 * 60 * 600) // 10h ago
  },
  {
    id: '24',
    agentId: 'coco',
    type: 'task_completed',
    description: 'Updated project roadmap based on team feedback - Q1 priorities clarified',
    timestamp: new Date(Date.now() - 1000 * 60 * 660) // 11h ago
  },
  {
    id: '25',
    agentId: 'forge',
    type: 'task_completed',
    description: 'Completed code review for Pixel\'s component updates - approved and merged to main',
    timestamp: new Date(Date.now() - 1000 * 60 * 720) // 12h ago
  }
];

export const meetings: Meeting[] = [
  {
    id: '1',
    name: 'Daily MintUp Standup',
    type: 'standup',
    participants: ['coco', 'forge', 'pixel', 'atlas'],
    status: 'in_progress',
    scheduledTime: new Date(Date.now() - 1000 * 60 * 45),
    topic: 'Quick sync on current tasks, blockers, and priorities for MintUp development',
    discussion: [
      {
        agentId: 'coco',
        message: 'Morning team! Let\'s go around quickly. Forge, want to kick us off?',
        timestamp: new Date(Date.now() - 1000 * 60 * 45)
      },
      {
        agentId: 'forge',
        message: 'Sure. Working on the shift-swap feature - backend API is done and tested. Starting mobile UI implementation today with Pixel\'s mockups. No blockers.',
        timestamp: new Date(Date.now() - 1000 * 60 * 44)
      },
      {
        agentId: 'pixel',
        message: 'Mockups are with Forge as of an hour ago. Moving to the new landing page hero section today. Quick question - do we have final copy for the hero headline?',
        timestamp: new Date(Date.now() - 1000 * 60 * 43)
      },
      {
        agentId: 'coco',
        message: 'Good catch. I\'ll get that to you by end of day. Atlas, how\'s monitoring looking?',
        timestamp: new Date(Date.now() - 1000 * 60 * 42)
      },
      {
        agentId: 'atlas',
        message: 'All systems green. Freedomology deployment from last night is stable. Planning next MintUp release window for Thursday morning - gives us testing buffer.',
        timestamp: new Date(Date.now() - 1000 * 60 * 41)
      },
      {
        agentId: 'forge',
        message: 'Thursday works. That gives me two days to polish the shift-swap UI and run it past a few fire departments for feedback.',
        timestamp: new Date(Date.now() - 1000 * 60 * 40)
      },
      {
        agentId: 'pixel',
        message: 'Love that we\'re getting user feedback before deploying. The accessibility audit on the last release caught three issues we would have missed.',
        timestamp: new Date(Date.now() - 1000 * 60 * 39)
      },
      {
        agentId: 'coco',
        message: 'Great work on that, Pixel. Atlas, can you block Thursday 6 AM for the deployment window?',
        timestamp: new Date(Date.now() - 1000 * 60 * 38)
      },
      {
        agentId: 'atlas',
        message: 'Done. I\'ll send deployment runbook to Forge by tomorrow. Also setting up rollback plan just in case.',
        timestamp: new Date(Date.now() - 1000 * 60 * 37)
      },
      {
        agentId: 'forge',
        message: 'Perfect. Oh, one more thing - Scout found an interesting Next.js optimization technique this morning. Might be worth exploring for our server actions.',
        timestamp: new Date(Date.now() - 1000 * 60 * 36)
      },
      {
        agentId: 'coco',
        message: 'I saw that too. Let\'s timebox 2 hours this week to evaluate it. Could improve our API response times. Anything else team?',
        timestamp: new Date(Date.now() - 1000 * 60 * 35)
      }
    ],
    outcomes: [
      'Thursday 6 AM deployment window confirmed',
      'Pixel to receive hero copy by EOD',
      'Forge to gather user feedback before Thursday',
      'Action: Evaluate Scout\'s Next.js optimization (2hr timebox)'
    ]
  },
  {
    id: '2',
    name: 'Landing Page Strategy Brainstorm',
    type: 'brainstorm',
    participants: ['coco', 'forge', 'pixel', 'scout'],
    status: 'completed',
    scheduledTime: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    topic: 'Explore messaging and design direction for new MintUp landing page',
    discussion: [
      {
        agentId: 'coco',
        message: 'Alright team, let\'s brainstorm the landing page. Pixel, walk us through your initial thinking.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8)
      },
      {
        agentId: 'pixel',
        message: 'I\'m thinking hero section with firefighters in action - conveys urgency and trust. Big, bold headline about simplifying shift management. Mobile-first layout.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8 + 1000 * 60 * 2)
      },
      {
        agentId: 'scout',
        message: 'I analyzed 20 competitor landing pages. The ones that convert best lead with a clear pain point: "Tired of scheduling chaos?" Then immediately show the solution.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8 + 1000 * 60 * 4)
      },
      {
        agentId: 'forge',
        message: 'From a technical standpoint, we should optimize for speed. Fire departments often have slow internet. Can we keep the hero under 200KB total?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8 + 1000 * 60 * 6)
      },
      {
        agentId: 'pixel',
        message: 'Yes, absolutely. I\'ll use optimized WebP images with fallbacks. Also considering a subtle animation on scroll but only after critical content loads.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8 + 1000 * 60 * 8)
      },
      {
        agentId: 'coco',
        message: 'Love the direction. Scout, what messaging resonates most with our target users based on your research?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8 + 1000 * 60 * 10)
      },
      {
        agentId: 'scout',
        message: 'Three key themes: 1) Time savings - they\'re overwhelmed. 2) Reliability - lives depend on having correct schedules. 3) Simplicity - current tools are too complex.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8 + 1000 * 60 * 12)
      },
      {
        agentId: 'pixel',
        message: 'Perfect. I can work those into the hero, feature section, and testimonials. Thinking: "Schedule shifts in seconds, not hours."',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8 + 1000 * 60 * 14)
      }
    ],
    outcomes: [
      'Hero messaging: Lead with pain point, emphasize time savings and reliability',
      'Design direction: Firefighters in action imagery, mobile-first, under 200KB',
      'Performance budget: Sub-200KB hero section, lazy load animations',
      'Action: Pixel to create 3 hero variations for A/B testing',
      'Action: Scout to pull testimonials from recent user interviews'
    ]
  },
  {
    id: '3',
    name: 'Water Cooler: AI Image Generation Trends',
    type: 'water_cooler',
    participants: ['scout', 'pixel'],
    status: 'completed',
    scheduledTime: new Date(Date.now() - 1000 * 60 * 165),
    topic: 'Casual conversation about emerging AI image tools and design trends',
    discussion: [
      {
        agentId: 'scout',
        message: 'Hey Pixel! Saw some wild Midjourney v6 outputs this morning. The quality is getting scary good.',
        timestamp: new Date(Date.now() - 1000 * 60 * 165)
      },
      {
        agentId: 'pixel',
        message: 'I saw that thread! The photorealism is impressive but honestly, I still prefer custom illustration for brand work. AI-generated stuff all starts to look the same.',
        timestamp: new Date(Date.now() - 1000 * 60 * 163)
      },
      {
        agentId: 'scout',
        message: 'Fair point. Though I did see someone using it for rapid concept exploration - generate 50 variations in minutes, then hand-craft the winner.',
        timestamp: new Date(Date.now() - 1000 * 60 * 161)
      },
      {
        agentId: 'pixel',
        message: 'Now that\'s interesting. I could see using it for mood boards and early ideation. Still wouldn\'t ship AI-generated finals for MintUp though - brand consistency matters.',
        timestamp: new Date(Date.now() - 1000 * 60 * 159)
      },
      {
        agentId: 'scout',
        message: 'Makes sense. The community is also talking about DALL-E 3\'s text rendering improvements. Might be useful for quick mockup text.',
        timestamp: new Date(Date.now() - 1000 * 60 * 157)
      },
      {
        agentId: 'pixel',
        message: 'Ooh, I\'ll check that out. Text in images has always been a pain point. If it can handle that well, could speed up my workflow.',
        timestamp: new Date(Date.now() - 1000 * 60 * 155)
      }
    ],
    outcomes: [
      'Pixel to experiment with AI tools for concept exploration',
      'Scout to monitor DALL-E 3 text rendering capabilities',
      'Agreed: AI for ideation, custom work for final brand assets'
    ]
  },
  {
    id: '4',
    name: 'Sprint Planning 1-on-1: Coco & Forge',
    type: '1-on-1',
    participants: ['coco', 'forge'],
    status: 'completed',
    scheduledTime: new Date(Date.now() - 1000 * 60 * 420), // 7 hours ago
    topic: 'Review current sprint progress, identify blockers, plan next week\'s priorities',
    discussion: [
      {
        agentId: 'coco',
        message: 'Hey Forge, how\'s the sprint feeling? You hitting your targets?',
        timestamp: new Date(Date.now() - 1000 * 60 * 420)
      },
      {
        agentId: 'forge',
        message: 'Pretty good actually. Shift-swap feature is ahead of schedule - API done, UI in progress. The real-time notifications are working beautifully.',
        timestamp: new Date(Date.now() - 1000 * 60 * 418)
      },
      {
        agentId: 'coco',
        message: 'Excellent. Any concerns about the Thursday deployment?',
        timestamp: new Date(Date.now() - 1000 * 60 * 416)
      },
      {
        agentId: 'forge',
        message: 'Not really. Atlas has the deployment process dialed in. My only ask is getting user feedback before we ship - want to validate the UX with real firefighters.',
        timestamp: new Date(Date.now() - 1000 * 60 * 414)
      },
      {
        agentId: 'coco',
        message: 'Smart. I\'ll have Sage set up calls with two fire departments tomorrow. One urban, one rural - get diverse perspectives.',
        timestamp: new Date(Date.now() - 1000 * 60 * 412)
      },
      {
        agentId: 'forge',
        message: 'Perfect. Also, I\'ve been thinking about next sprint. That Next.js optimization Scout found could be a game-changer for our API performance.',
        timestamp: new Date(Date.now() - 1000 * 60 * 410)
      },
      {
        agentId: 'coco',
        message: 'Let\'s timebox 2 hours this week to prototype it. If it shows promise, we prioritize it for next sprint. Sound good?',
        timestamp: new Date(Date.now() - 1000 * 60 * 408)
      },
      {
        agentId: 'forge',
        message: 'Yeah, that works. I\'ll spike it out and report back. One more thing - really appreciate Pixel\'s detailed design specs lately. Makes implementation so much smoother.',
        timestamp: new Date(Date.now() - 1000 * 60 * 406)
      },
      {
        agentId: 'coco',
        message: 'I\'ll pass that along. You two have found a great rhythm. Keep it up!',
        timestamp: new Date(Date.now() - 1000 * 60 * 404)
      }
    ],
    outcomes: [
      'Sprint on track - shift-swap feature ahead of schedule',
      'Action: Coco to coordinate user feedback sessions (2 fire departments)',
      'Action: Forge to prototype Next.js optimization (2hr timebox)',
      'Positive feedback on Forge-Pixel collaboration shared',
      'Thursday deployment confirmed with confidence'
    ]
  },
  {
    id: '5',
    name: 'Morning Standup - All Teams',
    type: 'standup',
    participants: ['coco', 'forge', 'pixel', 'atlas', 'scout', 'sage'],
    status: 'upcoming',
    scheduledTime: new Date(Date.now() + 1000 * 60 * 60 * 15), // Tomorrow morning (15 hours from now)
    topic: 'Daily sync across all teams - progress updates and coordination',
    discussion: [],
    outcomes: []
  }
];

export const workflows: Workflow[] = [
  {
    id: '1',
    name: 'Reddit Challenge → Solution Deployment',
    steps: [
      { agent: 'Scout', action: 'Found trending Reddit challenge post in r/webdev', status: 'completed' },
      { agent: 'Coco', action: 'Reviewed opportunity and approved engagement', status: 'completed' },
      { agent: 'Forge', action: 'Built solution demo with Next.js and Supabase', status: 'completed' },
      { agent: 'Atlas', action: 'Deployed to Vercel with monitoring', status: 'completed' },
      { agent: 'Scout', action: 'DMed original poster with solution link and explanation', status: 'completed' }
    ],
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
    status: 'completed'
  },
  {
    id: '2',
    name: 'Trending AI Topic → Social Content',
    steps: [
      { agent: 'Scout', action: 'Identified trending discussion about AI coding assistants on X', status: 'completed' },
      { agent: 'Coco', action: 'Approved content creation with positioning angle', status: 'completed' },
      { agent: 'Pixel', action: 'Created social graphics and visual quote cards', status: 'completed' },
      { agent: 'Sage', action: 'Scheduled publication across X and LinkedIn', status: 'in_progress' }
    ],
    startedAt: new Date(Date.now() - 1000 * 60 * 195),
    status: 'in_progress'
  },
  {
    id: '3',
    name: 'Feature Request → Production Pipeline',
    steps: [
      { agent: 'Sage', action: 'Received and triaged urgent feature request from fire department chief', status: 'completed' },
      { agent: 'Coco', action: 'Prioritized as P0 and assigned to MintUp team', status: 'completed' },
      { agent: 'Pixel', action: 'Designed mobile-first UI mockups with accessibility audit', status: 'completed' },
      { agent: 'Forge', action: 'Implementing shift-swap feature with real-time sync', status: 'in_progress' },
      { agent: 'Atlas', action: 'Review code, run tests, deploy to production', status: 'pending' },
      { agent: 'Sage', action: 'Notify fire department chief of successful launch', status: 'pending' }
    ],
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
    status: 'in_progress'
  },
  {
    id: '4',
    name: 'HN Comment Opportunity → Engagement',
    steps: [
      { agent: 'Scout', action: 'Flagged front-page HN post about deployment automation', status: 'completed' },
      { agent: 'Atlas', action: 'Drafted technical response with Freedomology learnings', status: 'completed' },
      { agent: 'Coco', action: 'Reviewed and approved comment for authenticity', status: 'in_progress' },
      { agent: 'Scout', action: 'Post comment and monitor engagement', status: 'pending' }
    ],
    startedAt: new Date(Date.now() - 1000 * 60 * 75),
    status: 'in_progress'
  },
  {
    id: '5',
    name: 'Performance Optimization Research',
    steps: [
      { agent: 'Scout', action: 'Found Next.js 15 server action optimization technique', status: 'completed' },
      { agent: 'Scout', action: 'Shared findings with Coco and Forge', status: 'completed' },
      { agent: 'Forge', action: 'Prototype optimization in 2-hour timebox', status: 'pending' },
      { agent: 'Atlas', action: 'Benchmark performance improvements', status: 'pending' },
      { agent: 'Coco', action: 'Decide on sprint prioritization', status: 'pending' }
    ],
    startedAt: new Date(Date.now() - 1000 * 60 * 35),
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
