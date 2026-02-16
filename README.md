# Virtual Office Dashboard

A Next.js application showing Nick Vadini's AI agent organization as a visual office. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- 🏢 **Office View** - Visual dashboard of all agents organized by team
- 📊 **Activity Feed** - Real-time activity log with filtering by team and agent
- 👥 **Meetings** - View standups, brainstorms, and discussions
- 🤖 **Agent Profiles** - Detailed view of each agent's personality, memories, and relationships
- 🎨 **Premium Design** - Dark mode with emerald green accents and glass-morphism effects

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Deployment:** Vercel

## Getting Started

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

## Agents

- **Coco** - Chief of Staff / Orchestrator (Management)
- **Forge** - MintUp Developer (MintUp Dev)
- **Scout** - Research Analyst (Research)
- **Atlas** - Freedomology Tech Lead (Freedomology)
- **Sage** - Personal Assistant (Personal)
- **Pixel** - Creative Designer (MintUp Dev)

## Project Structure

```
virtual-office/
├── app/                    # Next.js app directory
│   ├── agents/[id]/       # Agent profile pages
│   ├── activity/          # Activity feed page
│   ├── meetings/          # Meetings page
│   ├── settings/          # Settings page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Office view (home)
│   └── globals.css        # Global styles
├── components/            # React components
│   └── BottomNav.tsx     # Bottom navigation
├── lib/                   # Utilities and data
│   └── data.ts           # Mock agent data
└── public/               # Static assets
```

## Deployment

This application is deployed on Vercel. Any push to the main branch automatically triggers a deployment.

## License

Built for Nick Vadini's personal use.
