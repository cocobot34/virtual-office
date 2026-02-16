# Virtual Office Dashboard

A Next.js application showing Nick Vadini's AI agent organization as a **living, breathing virtual office**. Inspired by the vision of autonomous AI agents collaborating as a team with personalities, relationships, and workflows.

## 🎯 Features

### 🏢 Floor Plan Office View
- **Visual office layout** with distinct areas:
  - **Desks** - Agents working on tasks (with pulsing glow for active work)
  - **Meeting Table** - Live standups and brainstorms with participant avatars
  - **Water Cooler** - Casual conversations and breaks
- **Real-time status indicators** - Green (working), Yellow (idle), Blue (meeting), Gray (offline)
- **Location tracking** - See exactly where each agent is in the office

### 📊 Organization Chart
- **Hierarchical view** showing reporting structure:
  - Nick Vadini (CEO) at the top
  - Coco (Chief of Staff) coordinates all activities
  - Four specialized teams below
- **Visual connection lines** showing organizational flow
- **Team color coding** for easy navigation

### ⚡ Autonomous Workflows
- **End-to-end pipeline visualization** showing how agents collaborate:
  - Reddit Challenge → Solution Deployment
  - Trending Topic → Social Content
  - Feature Request → Production
- **Step-by-step progress** with agent avatars and status
- **Real-time workflow tracking** (completed, in progress, pending)

### 🤖 Enhanced Agent Profiles
Each agent has a rich, detailed personality:
- **Soul & Personality** - Who they are, how they think
- **Thinking Style** - Their approach to problem-solving
- **Speaking Style** - How they communicate
- **Signature Phrases** - Realistic catchphrases they use
- **Responsibilities** - Specific role and tasks
- **Memories** - Insights and strategies they've learned
- **Relationships** - 🟢 Friendly, 🟡 Neutral, 🔴 Tense connections with other agents

### 👥 Meeting System
- **Standups** - Daily team syncs
- **Brainstorms** - Creative collaboration sessions
- **1-on-1s** - Individual check-ins
- **Water Cooler** - Casual informal chats
- **Post-Mortems** - Project retrospectives
- **Discussion logs** - See actual back-and-forth conversations
- **Outcomes & Action Items** - What was decided

### 📊 Real-Time Activity Feed
- **Live updates** from all agents
- **Filtering** by team or individual agent
- **Activity types**: Tasks completed, meetings started, insights shared, deployments, conversations

## 🎨 Design

- **Dark mode** (#0a0a0a background)
- **Emerald green accents** (#10b981) for active states
- **Glass-morphism UI** with backdrop blur and subtle borders
- **Framer Motion animations** for smooth page transitions
- **Premium fintech aesthetic** - clean, professional, polished
- **Mobile-first responsive** design

## 🤖 The Team

### Management
- **Coco** 🐾 - Chief of Staff / Orchestrator
  - *"Let me connect the dots here..."*
  - Coordinates all agent activities, reports to Nick

### MintUp Dev
- **Forge** 🔨 - Developer
  - *"How will this scale?"*
  - Builds fire department platform features
  
- **Pixel** 🎨 - Designer
  - *"Simple is harder than complex."*
  - Creates UI/UX and brand assets

### Research
- **Scout** 🔍 - Research Analyst
  - *"You need to see this..."*
  - Monitors HN, Reddit, X for opportunities

### Freedomology
- **Atlas** 🗺️ - Tech Lead
  - *"All systems green."*
  - Monitors codebase and deployments

### Personal
- **Sage** 📋 - Personal Assistant
  - *"Flagged for your attention."*
  - Manages email, calendar, tasks

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3
- **Animations:** Framer Motion 12
- **Deployment:** Vercel
- **Runtime:** React 19

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📂 Project Structure

```
virtual-office/
├── app/
│   ├── page.tsx              # Floor plan office view
│   ├── org-chart/            # Organization hierarchy
│   ├── workflows/            # Autonomous workflow pipelines
│   ├── agents/[id]/          # Agent profile pages
│   ├── activity/             # Real-time activity feed
│   ├── meetings/             # Meeting viewer
│   ├── settings/             # Settings placeholder
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles + utilities
├── components/
│   └── BottomNav.tsx         # Bottom navigation
└── lib/
    └── data.ts               # Agent data, meetings, workflows
```

## 🎯 Key Concepts

### Autonomous Workflows
The system demonstrates how agents work together end-to-end:
1. **Discovery** - Scout finds opportunities
2. **Approval** - Coco coordinates with Nick
3. **Execution** - Forge, Pixel, Atlas build and deploy
4. **Delivery** - Solution shipped with minimal human intervention

### Agent Personalities
Each agent has:
- **Unique thinking patterns** - How they approach problems
- **Distinct communication styles** - How they express ideas
- **Evolving relationships** - Connections that strengthen or weaken over time
- **Institutional memory** - Lessons learned that inform future decisions

### Office Dynamics
The virtual office feels alive:
- Agents move between desks, meetings, and water cooler
- Real-time status updates show current activities
- Meeting table shows live collaboration
- Casual water cooler chats build team rapport

## 📈 Future Enhancements

- [ ] Real-time WebSocket updates
- [ ] Add more agent types and teams
- [ ] Interactive workflow creation
- [ ] Agent-to-agent messaging
- [ ] Performance metrics dashboard
- [ ] Custom agent creation tool
- [ ] Integration with real Nick's calendar/email
- [ ] Voice chat between agents
- [ ] 3D office visualization

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions to Vercel.

## 📝 License

Built for Nick Vadini's personal use.

---

**Made with ❤️ by Coco, your AI Chief of Staff**
