# Key Code Snippets - Office Floor Plan

## 1. Team Zone Configuration

```typescript
const teamZones = {
  Management: {
    label: 'Management',
    color: 'emerald',
    x: 15, y: 15,
    desks: [{ x: 15, y: 20 }]
  },
  'MintUp Dev': {
    label: 'MintUp Dev',
    color: 'blue',
    x: 60, y: 15,
    desks: [
      { x: 60, y: 20 },
      { x: 75, y: 20 }
    ]
  },
  // ... 3 more teams
};
```

## 2. Meeting Table with Chairs

```typescript
const meetingTable = {
  x: 37.5,
  y: 40,
  chairs: [
    { x: 37.5, y: 32 },  // top
    { x: 47, y: 36 },    // top-right
    { x: 50, y: 44 },    // right
    // ... 5 more chair positions
  ]
};
```

## 3. Dynamic Agent Positioning

```typescript
function getAgentPosition(agent: Agent): { x: number; y: number } {
  if (agent.location === 'meeting_table') {
    const activeMeetings = meetings.filter(m => 
      m.status === 'in_progress' && m.participants.includes(agent.id)
    );
    if (activeMeetings.length > 0) {
      const participantIndex = meeting.participants.indexOf(agent.id);
      return meetingTable.chairs[participantIndex];
    }
  }
  
  if (agent.location === 'water_cooler') {
    return { x: waterCooler.x - 8, y: waterCooler.y };
  }
  
  // Default: desk position based on team
  const zone = teamZones[agent.team];
  const agentIndex = agents.filter(a => a.team === agent.team)
                           .findIndex(a => a.id === agent.id);
  return zone.desks[agentIndex];
}
```

## 4. Animated Agent Avatar

```typescript
<motion.div
  className="absolute cursor-pointer z-20"
  style={{
    left: `${pos.x}%`,
    top: `${pos.y}%`,
    transform: 'translate(-50%, -50%)'
  }}
  initial={{ opacity: 0, scale: 0, y: 20 }}
  animate={{ 
    opacity: 1, 
    scale: isHovered ? 1.15 : 1,
    y: agent.status === 'offline' ? 0 : [0, -4, 0]
  }}
  transition={{
    y: {
      duration: 2 + Math.random(),
      repeat: Infinity,
      ease: "easeInOut"
    }
  }}
>
  {/* Status glow ring */}
  <motion.div
    className={`absolute inset-0 rounded-full bg-${statusColor}-500/30 blur-lg`}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.6, 0.3]
    }}
  />
  
  {/* Avatar circle */}
  <div className={`w-14 h-14 rounded-full border-2 border-${statusColor}-500/50`}>
    {agent.avatar}
  </div>
  
  {/* Name label */}
  <div className="absolute -bottom-6 text-xs">
    {agent.name}
  </div>
</motion.div>
```

## 5. Meeting Table SVG

```typescript
<svg viewBox="0 0 100 100" className="w-full h-full">
  <ellipse
    cx="50" cy="50" rx="45" ry="38"
    className={activeMeetings.length > 0 
      ? 'fill-blue-500/10 stroke-blue-500/50' 
      : 'fill-white/5 stroke-white/10'}
  />
  {activeMeetings.length > 0 && (
    <motion.div
      className="absolute inset-0 rounded-full bg-blue-500/5"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  )}
</svg>
```

## 6. Activity Ticker

```typescript
<motion.div className="fixed bottom-20 left-0 right-0 z-10">
  <div className="glass border-t border-white/10 py-3">
    <div className="flex items-center gap-2 mb-2">
      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
      <span className="text-xs font-semibold">LIVE ACTIVITY FEED</span>
    </div>
    {recentActivities.map((activity, idx) => (
      <motion.div
        key={activity.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9 + idx * 0.1 }}
        className="flex items-center gap-3"
      >
        <span>{agent?.avatar}</span>
        <span className="truncate">{activity.description}</span>
        <span className="text-xs">{timeAgo}m ago</span>
      </motion.div>
    ))}
  </div>
</motion.div>
```

## 7. CSS Animations

```css
/* Grid pattern with pulse */
.office-grid {
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  animation: gridPulse 8s ease-in-out infinite;
}

@keyframes gridPulse {
  0%, 100% { opacity: 0.15; }
  50% { opacity: 0.25; }
}

/* Team zone glow */
.team-zone-emerald::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(16, 185, 129, 0.1) 0%, transparent 70%);
  border-radius: 1rem;
  animation: zonePulse 3s ease-in-out infinite;
}

@keyframes zonePulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

/* Ambient floor glow */
.office-floor::before {
  content: '';
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 30% 30%, rgba(16, 185, 129, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 70% 70%, rgba(59, 130, 246, 0.05) 0%, transparent 50%);
  animation: ambientGlow 10s ease-in-out infinite;
}

@keyframes ambientGlow {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
}
```

## 8. Floating Particles

```typescript
useEffect(() => {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100
  }));
  setFloatingParticles(particles);
}, []);

// Render
{floatingParticles.map(particle => (
  <motion.div
    key={particle.id}
    className="absolute w-1 h-1 bg-emerald-500/30 rounded-full"
    style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
    animate={{
      y: [0, -30, 0],
      opacity: [0.3, 0.6, 0.3]
    }}
    transition={{
      duration: 3 + Math.random() * 2,
      repeat: Infinity,
      delay: Math.random() * 2
    }}
  />
))}
```

## 9. Responsive Layout

```typescript
<motion.div
  className="relative w-full mx-auto"
  style={{ 
    maxWidth: '1400px',
    aspectRatio: '16/10',
    minHeight: '600px'
  }}
>
  {/* Office floor content */}
</motion.div>
```

## 10. Hover Tooltip

```typescript
{isHovered && (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 10, scale: 0.9 }}
    className="absolute -top-20 left-1/2 -translate-x-1/2 z-40"
  >
    <div className="glass rounded-xl p-3 min-w-[200px]">
      <div className="text-sm font-semibold">{agent.name}</div>
      <div className="text-xs text-gray-400">{agent.role}</div>
      <div className="text-xs text-gray-300">{agent.currentTask}</div>
    </div>
  </motion.div>
)}
```

---

## Performance Optimizations

1. **Percentage-based positioning** - Scales naturally on all screen sizes
2. **CSS animations** - Hardware accelerated (transform, opacity)
3. **Framer Motion layoutId** - Smooth transitions for active states
4. **AnimatePresence** - Graceful enter/exit animations
5. **Random delays** - Prevents animation sync (more natural feel)
6. **Low particle count** - Only 12 floating particles
7. **Conditional rendering** - Tooltips only render when hovered

---

## Status Color Mapping

```typescript
const statusColors = {
  working: 'emerald',  // Green glow
  idle: 'yellow',      // Yellow glow
  meeting: 'blue',     // Blue glow
  offline: 'gray'      // Gray glow (no pulse)
};
```

Used for:
- Agent glow ring
- Border color
- Name label background
- Status indicator dot
