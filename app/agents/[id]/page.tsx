'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { agents, getActivitiesByAgent, getAgentById } from '@/lib/data';

const statusConfig = {
  working: { label: 'Working', className: 'bg-emerald-500/20 text-emerald-400', dot: 'status-working' },
  idle: { label: 'Idle', className: 'bg-yellow-500/20 text-yellow-400', dot: 'status-idle' },
  meeting: { label: 'In Meeting', className: 'bg-blue-500/20 text-blue-400', dot: 'status-meeting' },
  offline: { label: 'Offline', className: 'bg-gray-500/20 text-gray-400', dot: 'status-offline' },
};

const relationshipColors = {
  friendly: 'text-emerald-400',
  neutral: 'text-yellow-400',
  tense: 'text-red-400',
};

const locationLabels = {
  desk: 'At desk',
  meeting_table: 'Meeting table',
  water_cooler: 'Water cooler',
  offline: 'Offline'
};

export default function AgentProfilePage() {
  const params = useParams();
  const agentId = params.id as string;
  
  const agent = getAgentById(agentId);
  const activities = getActivitiesByAgent(agentId);

  if (!agent) {
    return (
      <div className="min-h-screen p-4 md:p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🤷</div>
          <h1 className="text-2xl font-bold mb-2">Agent Not Found</h1>
          <p className="text-gray-400 mb-6">This agent doesn't exist in the organization</p>
          <Link href="/" className="px-6 py-3 bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors">
            Back to Office
          </Link>
        </div>
      </div>
    );
  }

  const relatedAgents = agent.relationships.map(rel => ({
    ...rel,
    agent: agents.find(a => a.id === rel.agentId)!
  })).filter(rel => rel.agent);

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <span className="mr-2">←</span>
          Back to Office
        </Link>

        {/* Agent Header */}
        <div className="glass rounded-2xl p-6 mb-6">
          <div className="flex items-start space-x-6">
            <div className="text-6xl">{agent.avatar}</div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h1 className="text-3xl font-bold mb-1">{agent.name}</h1>
                  <p className="text-xl text-gray-400 mb-2">{agent.role}</p>
                  <div className="flex items-center space-x-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm">
                      {agent.team}
                    </span>
                    <span className="text-sm text-gray-400">
                      📍 {locationLabels[agent.location]}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`status-dot ${statusConfig[agent.status].dot}`} />
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig[agent.status].className}`}>
                    {statusConfig[agent.status].label}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-400 mb-2">Current Task</h3>
                <p className="text-gray-300">{agent.currentTask}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Soul / Personality */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2">🧠</span>
                Soul & Personality
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-emerald-400 mb-2">Who They Are</h3>
                  <p className="text-gray-300 leading-relaxed">{agent.soul.personality}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-emerald-400 mb-2">How They Think</h3>
                  <p className="text-gray-300 leading-relaxed">{agent.soul.thinkingStyle}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-emerald-400 mb-2">How They Speak</h3>
                  <p className="text-gray-300 leading-relaxed mb-3">{agent.soul.speakingStyle}</p>
                  
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-xs font-semibold text-gray-400 mb-3">Signature Phrases:</div>
                    <div className="flex flex-wrap gap-2">
                      {agent.soul.signaturePhrases.map((phrase, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg text-sm italic"
                        >
                          "{phrase}"
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Responsibilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="glass rounded-2xl p-6"
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2">📋</span>
                Responsibilities
              </h2>
              <ul className="space-y-3">
                {agent.responsibilities.map((responsibility, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + (index * 0.05) }}
                    className="flex items-start space-x-3 bg-white/5 rounded-lg p-3"
                  >
                    <span className="text-emerald-400 mt-0.5">▸</span>
                    <span className="text-gray-300 text-sm">{responsibility}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Memories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-6"
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2">💾</span>
                Key Memories & Insights
              </h2>
              <ul className="space-y-3">
                {agent.memories.map((memory, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (index * 0.05) }}
                    className="flex items-start space-x-3 bg-white/5 rounded-lg p-3"
                  >
                    <span className="text-blue-400 mt-0.5">💡</span>
                    <span className="text-gray-300 text-sm">{memory}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="glass rounded-2xl p-6"
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2">📊</span>
                Recent Activity
              </h2>
              {activities.length > 0 ? (
                <div className="space-y-3">
                  {activities.slice(0, 5).map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + (index * 0.05) }}
                      className="bg-white/5 rounded-lg p-3"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <span className="text-sm font-medium capitalize text-gray-400">
                          {activity.type.replace('_', ' ')}
                        </span>
                        <span className="text-xs text-gray-500">
                          {getTimeAgo(activity.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300">{activity.description}</p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">No recent activity</p>
              )}
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="glass rounded-2xl p-6"
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2">📈</span>
                Stats
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Tasks Completed</span>
                    <span className="text-2xl font-bold text-emerald-400">{agent.stats.tasksCompleted}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${Math.min((agent.stats.tasksCompleted / 500) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Meetings Attended</span>
                    <span className="text-2xl font-bold text-blue-400">{agent.stats.meetingsAttended}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${Math.min((agent.stats.meetingsAttended / 150) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Insights Shared</span>
                    <span className="text-2xl font-bold text-purple-400">{agent.stats.insightsShared}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: `${Math.min((agent.stats.insightsShared / 300) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Relationships */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="glass rounded-2xl p-6"
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2">🤝</span>
                Relationships
              </h2>
              <div className="space-y-3">
                {relatedAgents.map((rel, index) => (
                  <motion.div
                    key={rel.agentId}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.18 + (index * 0.05) }}
                  >
                    <Link
                      href={`/agents/${rel.agentId}`}
                      className="block bg-white/5 hover:bg-white/10 rounded-lg p-3 transition-all"
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{rel.agent.avatar}</span>
                        <div className="flex-1">
                          <div className="font-medium">{rel.agent.name}</div>
                          <div className="flex items-center space-x-1 mt-1">
                            <span>{rel.emoji}</span>
                            <span className={`text-xs font-semibold ${relationshipColors[rel.quality]}`}>
                              {rel.quality.charAt(0).toUpperCase() + rel.quality.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 ml-11">{rel.description}</p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}
