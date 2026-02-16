'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { agents, meetings, activities, type Agent, type Team } from '@/lib/data';
import { useState, useEffect } from 'react';

// Team zone configurations with desk positions (x, y in %)
const teamZones = {
  Management: {
    label: 'Management',
    color: 'emerald',
    x: 15,
    y: 15,
    desks: [
      { x: 15, y: 20 } // Coco's desk
    ]
  },
  'MintUp Dev': {
    label: 'MintUp Dev',
    color: 'blue',
    x: 60,
    y: 15,
    desks: [
      { x: 60, y: 20 }, // Forge
      { x: 75, y: 20 }  // Pixel
    ]
  },
  Research: {
    label: 'Research',
    color: 'purple',
    x: 15,
    y: 65,
    desks: [
      { x: 15, y: 70 } // Scout
    ]
  },
  Freedomology: {
    label: 'Freedomology',
    color: 'amber',
    x: 60,
    y: 65,
    desks: [
      { x: 60, y: 70 } // Atlas
    ]
  },
  Personal: {
    label: 'Personal',
    color: 'pink',
    x: 85,
    y: 40,
    desks: [
      { x: 85, y: 45 } // Sage
    ]
  }
};

// Meeting table with chair positions
const meetingTable = {
  x: 37.5,
  y: 40,
  chairs: [
    { x: 37.5, y: 32 },  // top
    { x: 47, y: 36 },    // top-right
    { x: 50, y: 44 },    // right
    { x: 47, y: 52 },    // bottom-right
    { x: 37.5, y: 56 },  // bottom
    { x: 28, y: 52 },    // bottom-left
    { x: 25, y: 44 },    // left
    { x: 28, y: 36 }     // top-left
  ]
};

// Water cooler position
const waterCooler = { x: 85, y: 70 };

// Get agent position based on their location and team
function getAgentPosition(agent: Agent): { x: number; y: number } {
  if (agent.location === 'meeting_table') {
    // Find a chair at the meeting table
    const activeMeetings = meetings.filter(m => 
      m.status === 'in_progress' && m.participants.includes(agent.id)
    );
    if (activeMeetings.length > 0) {
      const meeting = activeMeetings[0];
      const participantIndex = meeting.participants.indexOf(agent.id);
      if (participantIndex < meetingTable.chairs.length) {
        return meetingTable.chairs[participantIndex];
      }
    }
    // Default to first chair if no meeting
    return meetingTable.chairs[0];
  }
  
  if (agent.location === 'water_cooler') {
    return { x: waterCooler.x - 8, y: waterCooler.y };
  }
  
  // Default: desk position
  const zone = teamZones[agent.team];
  if (zone) {
    const agentTeam = agents.filter(a => a.team === agent.team);
    const agentIndex = agentTeam.findIndex(a => a.id === agent.id);
    if (agentIndex >= 0 && agentIndex < zone.desks.length) {
      return zone.desks[agentIndex];
    }
  }
  
  return { x: 50, y: 50 }; // fallback center
}

// Status color mapping
const statusColors = {
  working: 'emerald',
  idle: 'yellow',
  meeting: 'blue',
  offline: 'gray'
};

export default function OfficePage() {
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);
  const [floatingParticles, setFloatingParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  
  const activeMeetings = meetings.filter(m => m.status === 'in_progress');
  const recentActivities = activities.slice(0, 5);
  
  // Generate floating particles
  useEffect(() => {
    const particles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100
    }));
    setFloatingParticles(particles);
  }, []);

  return (
    <div className="min-h-screen pb-20 overflow-hidden relative">
      {/* Animated background grid */}
      <div className="fixed inset-0 office-grid opacity-20" />
      
      {/* Floating particles */}
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
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
        />
      ))}
      
      {/* Header */}
      <div className="relative z-10 p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white via-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            Virtual Office Floor Plan
          </h1>
          <p className="text-gray-400">Nick's AI Agent Organization • Live View</p>
        </motion.div>
      </div>

      {/* Office Floor Plan */}
      <div className="relative z-10 px-4 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-full mx-auto"
          style={{ 
            maxWidth: '1400px',
            aspectRatio: '16/10',
            minHeight: '600px'
          }}
        >
          {/* Office floor */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden office-floor">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-white/10" />
            
            {/* Team zones */}
            {Object.entries(teamZones).map(([team, zone]) => (
              <motion.div
                key={team}
                className={`absolute team-zone-${zone.color}`}
                style={{
                  left: `${zone.x - 8}%`,
                  top: `${zone.y - 3}%`,
                  width: '20%',
                  height: '20%'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative w-full h-full rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
                  <div className={`absolute -top-6 left-2 text-sm font-semibold text-${zone.color}-400 flex items-center gap-2`}>
                    <span className={`w-2 h-2 rounded-full bg-${zone.color}-500`} />
                    {zone.label}
                  </div>
                  {/* Desk icons */}
                  {zone.desks.map((desk, idx) => (
                    <div
                      key={idx}
                      className="absolute w-8 h-6 bg-white/5 rounded border border-white/10"
                      style={{
                        left: `${((desk.x - zone.x + 8) / 20) * 100 - 10}%`,
                        top: `${((desk.y - zone.y + 3) / 20) * 100 - 8}%`
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Meeting table */}
            <motion.div
              className="absolute"
              style={{
                left: `${meetingTable.x - 12.5}%`,
                top: `${meetingTable.y - 12}%`,
                width: '25%',
                height: '24%'
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              {/* Table surface */}
              <div className="relative w-full h-full">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <ellipse
                    cx="50"
                    cy="50"
                    rx="45"
                    ry="38"
                    className={`${activeMeetings.length > 0 ? 'fill-blue-500/10 stroke-blue-500/50' : 'fill-white/5 stroke-white/10'}`}
                    strokeWidth="1"
                  />
                  <ellipse
                    cx="50"
                    cy="50"
                    rx="35"
                    ry="28"
                    className="fill-white/[0.02]"
                  />
                </svg>
                {activeMeetings.length > 0 && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-blue-500/5"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-gray-500 font-medium">
                  Meeting Table
                </div>
                
                {/* Chairs */}
                {meetingTable.chairs.map((chair, idx) => (
                  <div
                    key={idx}
                    className="absolute w-3 h-3 rounded-full bg-white/10 border border-white/20"
                    style={{
                      left: `${((chair.x - meetingTable.x + 12.5) / 25) * 100 - 1.5}%`,
                      top: `${((chair.y - meetingTable.y + 12) / 24) * 100 - 1.5}%`
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Water cooler */}
            <motion.div
              className="absolute"
              style={{
                left: `${waterCooler.x - 3}%`,
                top: `${waterCooler.y - 4}%`,
                width: '6%',
                height: '8%'
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">
                    💧
                  </div>
                </div>
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-cyan-400 whitespace-nowrap">
                  Water Cooler
                </div>
              </div>
            </motion.div>

            {/* Pathways - subtle dotted lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
              <defs>
                <pattern id="dotted" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="0.5" fill="white" opacity="0.3" />
                </pattern>
              </defs>
              {/* Connect team zones to meeting table */}
              {Object.values(teamZones).map((zone, idx) => (
                <line
                  key={idx}
                  x1={`${zone.x + 10}%`}
                  y1={`${zone.y + 10}%`}
                  x2={`${meetingTable.x}%`}
                  y2={`${meetingTable.y}%`}
                  stroke="url(#dotted)"
                  strokeWidth="1"
                  strokeDasharray="2,3"
                />
              ))}
            </svg>

            {/* Agent avatars */}
            <AnimatePresence>
              {agents.map((agent, idx) => {
                const pos = getAgentPosition(agent);
                const statusColor = statusColors[agent.status];
                const isHovered = hoveredAgent === agent.id;
                
                return (
                  <motion.div
                    key={agent.id}
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
                      opacity: { delay: 0.5 + idx * 0.1 },
                      scale: { type: 'spring', stiffness: 300 },
                      y: {
                        duration: 2 + Math.random(),
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 2
                      }
                    }}
                    whileHover={{ scale: 1.2, zIndex: 30 }}
                    onHoverStart={() => setHoveredAgent(agent.id)}
                    onHoverEnd={() => setHoveredAgent(null)}
                  >
                    <Link href={`/agents/${agent.id}`}>
                      <div className="relative">
                        {/* Status glow ring */}
                        <motion.div
                          className={`absolute inset-0 rounded-full bg-${statusColor}-500/30 blur-lg`}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: agent.status === 'offline' ? 0.2 : [0.3, 0.6, 0.3]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          style={{ width: '150%', height: '150%', left: '-25%', top: '-25%' }}
                        />
                        
                        {/* Avatar */}
                        <div className={`relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-${statusColor}-500/50 flex items-center justify-center text-2xl md:text-3xl shadow-lg`}>
                          {agent.avatar}
                        </div>
                        
                        {/* Name label */}
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                          <div className={`text-xs font-medium px-2 py-0.5 rounded-full bg-black/60 border border-${statusColor}-500/30 text-${statusColor}-400`}>
                            {agent.name}
                          </div>
                        </div>
                        
                        {/* Hover tooltip */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.9 }}
                              className="absolute -top-20 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
                            >
                              <div className="glass rounded-xl p-3 min-w-[200px] border border-white/20 shadow-2xl">
                                <div className="text-sm font-semibold mb-1">{agent.name}</div>
                                <div className="text-xs text-gray-400 mb-2">{agent.role}</div>
                                <div className="text-xs text-gray-300 line-clamp-2">{agent.currentTask}</div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Live Activity Ticker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="fixed bottom-20 left-0 right-0 z-10"
      >
        <div className="glass border-t border-white/10 py-3 overflow-hidden">
          <div className="flex items-center gap-2 mb-2 px-6">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Live Activity Feed</span>
          </div>
          <div className="space-y-2 px-6">
            {recentActivities.map((activity, idx) => {
              const agent = agents.find(a => a.id === activity.agentId);
              const timeAgo = Math.floor((Date.now() - activity.timestamp.getTime()) / 1000 / 60);
              
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + idx * 0.1 }}
                  className="flex items-center gap-3 text-sm"
                >
                  <span className="text-lg">{agent?.avatar}</span>
                  <span className="text-gray-400 flex-1 truncate">{activity.description}</span>
                  <span className="text-xs text-gray-600">{timeAgo}m ago</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
