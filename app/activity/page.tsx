'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { activities, agents, type Team } from '@/lib/data';

const activityIcons = {
  task_completed: '✅',
  meeting_started: '👥',
  conversation: '💬',
  insight: '💡',
  deployment: '🚀',
};

const teams: (Team | 'All')[] = ['All', 'Management', 'MintUp Dev', 'Research', 'Freedomology', 'Personal'];

export default function ActivityPage() {
  const [selectedTeam, setSelectedTeam] = useState<Team | 'All'>('All');
  const [selectedAgent, setSelectedAgent] = useState<string | 'All'>('All');

  const filteredActivities = activities
    .filter((activity) => {
      const agent = agents.find(a => a.id === activity.agentId);
      if (!agent) return false;
      
      if (selectedAgent !== 'All' && activity.agentId !== selectedAgent) return false;
      if (selectedTeam !== 'All' && agent.team !== selectedTeam) return false;
      
      return true;
    })
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  const teamAgents = selectedTeam === 'All' 
    ? agents 
    : agents.filter(a => a.team === selectedTeam);

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
            Activity Feed
          </h1>
          <p className="text-gray-400">Real-time updates from your agent organization</p>
        </div>

        {/* Filters */}
        <div className="glass rounded-2xl p-4 mb-6">
          <div className="space-y-4">
            {/* Team Filter */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Filter by Team</label>
              <div className="flex flex-wrap gap-2">
                {teams.map((team) => (
                  <button
                    key={team}
                    onClick={() => {
                      setSelectedTeam(team);
                      setSelectedAgent('All');
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedTeam === team
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {team}
                  </button>
                ))}
              </div>
            </div>

            {/* Agent Filter */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Filter by Agent</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedAgent('All')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedAgent === 'All'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  All Agents
                </button>
                {teamAgents.map((agent) => (
                  <button
                    key={agent.id}
                    onClick={() => setSelectedAgent(agent.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
                      selectedAgent === agent.id
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    <span>{agent.avatar}</span>
                    <span>{agent.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Activity List */}
        <div className="space-y-3">
          {filteredActivities.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-gray-400">No activities found for the selected filters</p>
            </div>
          ) : (
            filteredActivities.map((activity, index) => {
              const agent = agents.find(a => a.id === activity.agentId);
              if (!agent) return null;

              const timeAgo = getTimeAgo(activity.timestamp);

              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-hover rounded-xl p-4"
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl flex-shrink-0">{agent.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">{agent.name}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400">
                            {agent.team}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>{activityIcons[activity.type]}</span>
                          <span>{timeAgo}</span>
                        </div>
                      </div>
                      <p className="text-gray-300">{activity.description}</p>
                      <div className="mt-2 text-xs text-gray-500 capitalize">
                        {activity.type.replace('_', ' ')}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
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
