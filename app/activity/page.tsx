'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { activities, agents, type Team, type Activity } from '@/lib/data';

const activityIcons: Record<Activity['type'], string> = {
  task_completed: '🔨',
  meeting_started: '🎯',
  conversation: '💬',
  insight: '💡',
  deployment: '🚀',
};

const activityTypeLabels: Record<Activity['type'], string> = {
  task_completed: 'Task',
  meeting_started: 'Meeting',
  conversation: 'Conversation',
  insight: 'Insight',
  deployment: 'Deployment',
};

const teams: (Team | 'All')[] = ['All', 'Management', 'MintUp Dev', 'Research', 'Freedomology', 'Personal'];
const activityTypes: (Activity['type'] | 'All')[] = ['All', 'task_completed', 'meeting_started', 'conversation', 'insight', 'deployment'];

export default function ActivityPage() {
  const [selectedTeam, setSelectedTeam] = useState<Team | 'All'>('All');
  const [selectedType, setSelectedType] = useState<Activity['type'] | 'All'>('All');

  const filteredActivities = activities
    .filter((activity) => {
      const agent = agents.find(a => a.id === activity.agentId);
      if (!agent) return false;
      
      if (selectedTeam !== 'All' && agent.team !== selectedTeam) return false;
      if (selectedType !== 'All' && activity.type !== selectedType) return false;
      
      return true;
    })
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

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

        {/* Filter Bar */}
        <div className="glass rounded-2xl p-6 mb-6 space-y-5">
          {/* Team Filter */}
          <div>
            <label className="text-sm font-semibold text-gray-300 mb-3 block">Filter by Team</label>
            <div className="flex flex-wrap gap-2">
              {teams.map((team, index) => (
                <motion.button
                  key={team}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTeam(team)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedTeam === team
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {team}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Activity Type Filter */}
          <div>
            <label className="text-sm font-semibold text-gray-300 mb-3 block">Filter by Activity Type</label>
            <div className="flex flex-wrap gap-2">
              {activityTypes.map((type, index) => (
                <motion.button
                  key={type}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 + index * 0.03 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center space-x-2 ${
                    selectedType === type
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {type !== 'All' && <span>{activityIcons[type]}</span>}
                  <span>{type === 'All' ? 'All Types' : activityTypeLabels[type]}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Active Filters Summary */}
          {(selectedTeam !== 'All' || selectedType !== 'All') && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between pt-4 border-t border-white/10"
            >
              <div className="text-sm text-gray-400">
                Showing <span className="text-emerald-400 font-semibold">{filteredActivities.length}</span> {filteredActivities.length === 1 ? 'activity' : 'activities'}
              </div>
              <button
                onClick={() => {
                  setSelectedTeam('All');
                  setSelectedType('All');
                }}
                className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>

        {/* Activity List with Stagger Animation */}
        <div className="space-y-3">
          {filteredActivities.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-2xl p-12 text-center"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                🔍
              </motion.div>
              <p className="text-xl text-gray-300 mb-2">No activities found</p>
              <p className="text-sm text-gray-500">Try adjusting your filters</p>
            </motion.div>
          ) : (
            filteredActivities.map((activity, index) => {
              const agent = agents.find(a => a.id === activity.agentId);
              if (!agent) return null;

              const timeAgo = getTimeAgo(activity.timestamp);

              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -30, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ 
                    delay: index * 0.08,
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                  }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="glass-hover rounded-xl p-5 cursor-pointer border border-white/5 hover:border-emerald-500/30"
                >
                  <div className="flex items-start space-x-4">
                    {/* Agent Avatar */}
                    <motion.div 
                      className="text-4xl flex-shrink-0"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {agent.avatar}
                    </motion.div>

                    {/* Activity Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                          <span className="font-semibold text-white">{agent.name}</span>
                          <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10">
                            {agent.team}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm ml-4">
                          <motion.div
                            whileHover={{ scale: 1.2 }}
                            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10"
                          >
                            <span className="text-lg">{activityIcons[activity.type]}</span>
                            <span className="text-xs text-gray-400">{activityTypeLabels[activity.type]}</span>
                          </motion.div>
                          <span className="text-xs text-gray-500 whitespace-nowrap">{timeAgo}</span>
                        </div>
                      </div>

                      {/* Activity Description */}
                      <p className="text-gray-200 leading-relaxed">{activity.description}</p>

                      {/* Activity Metadata Bar */}
                      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          <span className="capitalize">{activity.type.replace('_', ' ')}</span>
                        </div>
                        <div className="text-xs text-gray-600">
                          {activity.timestamp.toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Auto-refresh indicator (visual only) */}
        {filteredActivities.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center space-x-2 text-xs text-gray-500">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-emerald-500 rounded-full"
              />
              <span>Live updates enabled</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  
  if (seconds < 60) return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? 's' : ''} ago`;
}
