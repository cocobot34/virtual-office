'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { agents, getAgentsByTeam } from '@/lib/data';

export default function OrgChartPage() {
  const coco = agents.find(a => a.id === 'coco')!;
  const teams = [
    { name: 'MintUp Dev', color: 'emerald' },
    { name: 'Research', color: 'blue' },
    { name: 'Freedomology', color: 'purple' },
    { name: 'Personal', color: 'yellow' }
  ] as const;

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">
                Organization Chart
              </h1>
              <p className="text-gray-400">Reporting structure and team hierarchy</p>
            </div>
            <Link href="/" className="text-sm px-4 py-2 glass-hover rounded-lg">
              ← Back to Office
            </Link>
          </div>
        </div>

        {/* Org Chart */}
        <div className="max-w-6xl mx-auto">
          {/* CEO Level */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center mb-12"
          >
            <div className="glass rounded-2xl p-6 w-80 text-center border-2 border-emerald-500/30">
              <div className="text-6xl mb-3">👨‍💼</div>
              <div className="text-2xl font-bold mb-1">Nick Vadini</div>
              <div className="text-emerald-400 font-semibold mb-2">CEO / Founder</div>
              <div className="text-sm text-gray-400">
                Visionary leader building AI-powered fire department solutions
              </div>
            </div>
          </motion.div>

          {/* Connection Line */}
          <div className="flex justify-center mb-8">
            <div className="w-0.5 h-16 bg-gradient-to-b from-emerald-500/50 to-transparent" />
          </div>

          {/* Chief of Staff */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-12"
          >
            <Link href={`/agents/${coco.id}`} className="block w-80">
              <div className="glass-hover rounded-2xl p-6 text-center border-2 border-emerald-500/20">
                <div className="text-5xl mb-3">{coco.avatar}</div>
                <div className="text-xl font-bold mb-1">{coco.name}</div>
                <div className="text-emerald-400 font-semibold mb-2">{coco.role}</div>
                <div className="text-sm text-gray-400 mb-3">{coco.team}</div>
                <div className="text-xs text-gray-500">
                  Orchestrates all agent activities and reports to Nick
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Connection Lines to Teams */}
          <div className="flex justify-center mb-8">
            <div className="relative w-full max-w-4xl">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-emerald-500/30" />
              <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
              <div className="grid grid-cols-4 gap-4">
                {teams.map((_, index) => (
                  <div key={index} className="flex justify-center">
                    <div className="w-0.5 h-8 bg-emerald-500/30" style={{ marginTop: '2rem' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Teams */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teams.map((team, teamIndex) => {
              const teamAgents = getAgentsByTeam(team.name);
              const colorClasses = {
                emerald: 'border-emerald-500/20',
                blue: 'border-blue-500/20',
                purple: 'border-purple-500/20',
                yellow: 'border-yellow-500/20'
              };

              return (
                <motion.div
                  key={team.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (teamIndex * 0.1) }}
                  className={`glass rounded-2xl p-6 border-2 ${colorClasses[team.color]}`}
                >
                  <h3 className="text-lg font-semibold mb-4 text-center">{team.name}</h3>
                  <div className="space-y-3">
                    {teamAgents.map((agent, index) => (
                      <Link
                        key={agent.id}
                        href={`/agents/${agent.id}`}
                        className="block glass-hover rounded-lg p-3"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-3xl">{agent.avatar}</span>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm">{agent.name}</div>
                            <div className="text-xs text-gray-400 truncate">{agent.role}</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 glass rounded-2xl p-6"
          >
            <h3 className="font-semibold mb-4 text-center">Reporting Structure</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span><strong>Nick (CEO)</strong> - Strategic vision and direction</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span><strong>Coco (Chief of Staff)</strong> - Day-to-day operations and coordination</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-400" />
                  <span><strong>Team Leads</strong> - Specialized domain experts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-gray-400" />
                  <span>All agents report through Coco to Nick</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
