'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { agents, getAgentsByTeam, meetings, type Team } from '@/lib/data';

const teams: Team[] = ['Management', 'MintUp Dev', 'Research', 'Freedomology', 'Personal'];

const statusConfig = {
  working: { label: 'Working', className: 'status-working' },
  idle: { label: 'Idle', className: 'status-idle' },
  meeting: { label: 'In Meeting', className: 'status-meeting' },
  offline: { label: 'Offline', className: 'status-offline' },
};

export default function OfficePage() {
  const activeMeetings = meetings.filter(m => m.status === 'in_progress');

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">
            Virtual Office
          </h1>
          <p className="text-gray-400">Nick's AI Agent Organization</p>
        </div>

        {/* Active Meetings Section */}
        {activeMeetings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-6 mb-8"
          >
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">🎯</span>
              <h2 className="text-xl font-semibold">Active Meetings</h2>
              <div className="ml-3 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            </div>
            <div className="space-y-3">
              {activeMeetings.map((meeting) => (
                <Link
                  key={meeting.id}
                  href={`/meetings`}
                  className="block glass-hover rounded-xl p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium mb-1">{meeting.name}</div>
                      <div className="text-sm text-gray-400">{meeting.agenda}</div>
                      <div className="flex items-center mt-2 space-x-2">
                        {meeting.participants.map((id) => {
                          const agent = agents.find(a => a.id === id);
                          return agent ? (
                            <span key={id} className="text-lg" title={agent.name}>
                              {agent.avatar}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">
                      Live
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Teams Grid */}
        <div className="space-y-6">
          {teams.map((team, teamIndex) => {
            const teamAgents = getAgentsByTeam(team);
            
            return (
              <motion.div
                key={team}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: teamIndex * 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <h2 className="text-lg font-semibold mb-4 text-emerald-400">{team}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {teamAgents.map((agent, agentIndex) => (
                    <motion.div
                      key={agent.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (teamIndex * 0.1) + (agentIndex * 0.05) }}
                    >
                      <Link
                        href={`/agents/${agent.id}`}
                        className="block glass-hover rounded-xl p-4 h-full"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="text-4xl">{agent.avatar}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold truncate">{agent.name}</h3>
                              <div
                                className={`status-dot ${statusConfig[agent.status].className}`}
                                title={statusConfig[agent.status].label}
                              />
                            </div>
                            <p className="text-sm text-gray-400 mb-2">{agent.role}</p>
                            <p className="text-xs text-gray-500 line-clamp-2">
                              {agent.currentTask}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 glass rounded-2xl p-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-emerald-400">{agents.length}</div>
              <div className="text-sm text-gray-400">Active Agents</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400">
                {agents.filter(a => a.status === 'working').length}
              </div>
              <div className="text-sm text-gray-400">Working Now</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400">
                {activeMeetings.length}
              </div>
              <div className="text-sm text-gray-400">Live Meetings</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400">
                {agents.reduce((sum, a) => sum + a.stats.tasksCompleted, 0)}
              </div>
              <div className="text-sm text-gray-400">Tasks Completed</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
