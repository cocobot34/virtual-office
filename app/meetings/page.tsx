'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { meetings, agents } from '@/lib/data';

const meetingTypeIcons = {
  standup: '🎯',
  brainstorm: '💡',
  '1-on-1': '👥',
  water_cooler: '☕',
  post_mortem: '📊',
};

const statusColors = {
  upcoming: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  in_progress: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  completed: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

// Agent color mapping for chat bubbles
const agentColors: Record<string, string> = {
  coco: 'bg-purple-500/20 border-purple-500/30',
  forge: 'bg-orange-500/20 border-orange-500/30',
  scout: 'bg-blue-500/20 border-blue-500/30',
  atlas: 'bg-teal-500/20 border-teal-500/30',
  sage: 'bg-indigo-500/20 border-indigo-500/30',
  pixel: 'bg-pink-500/20 border-pink-500/30',
};

export default function MeetingsPage() {
  const [selectedMeeting, setSelectedMeeting] = useState<string | null>(meetings[0]?.id || null);
  const [expandedMeetings, setExpandedMeetings] = useState<Set<string>>(new Set([meetings[0]?.id].filter(Boolean)));

  const sortedMeetings = [...meetings].sort((a, b) => {
    if (a.status === 'in_progress') return -1;
    if (b.status === 'in_progress') return 1;
    if (a.status === 'upcoming' && b.status === 'completed') return -1;
    if (b.status === 'upcoming' && a.status === 'completed') return 1;
    return b.scheduledTime.getTime() - a.scheduledTime.getTime();
  });

  const activeMeeting = sortedMeetings.find(m => m.status === 'in_progress');
  const pastMeetings = sortedMeetings.filter(m => m.status === 'completed');
  const upcomingMeetings = sortedMeetings.filter(m => m.status === 'upcoming');

  const selectedMeetingData = meetings.find(m => m.id === selectedMeeting);

  const toggleExpanded = (meetingId: string) => {
    const newExpanded = new Set(expandedMeetings);
    if (newExpanded.has(meetingId)) {
      newExpanded.delete(meetingId);
    } else {
      newExpanded.add(meetingId);
    }
    setExpandedMeetings(newExpanded);
  };

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
            Meetings
          </h1>
          <p className="text-gray-400">Team standups, brainstorms, and discussions</p>
        </div>

        {/* Active Meeting - Prominent Display */}
        {activeMeeting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-6 mb-8 border-2 border-emerald-500/30"
          >
            {/* LIVE Badge with Pulsing Indicator */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 bg-emerald-500 rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="relative w-3 h-3 bg-emerald-500 rounded-full" />
                </div>
                <span className="px-3 py-1 rounded-full text-sm font-bold bg-emerald-500 text-white">
                  LIVE
                </span>
                <span className="text-2xl">{meetingTypeIcons[activeMeeting.type]}</span>
                <h2 className="text-2xl font-bold">{activeMeeting.name}</h2>
              </div>
              <button
                onClick={() => setSelectedMeeting(activeMeeting.id)}
                className="px-4 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-sm font-medium transition-all"
              >
                View Details
              </button>
            </div>

            {/* Quick Info */}
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <span>👥</span>
                <span>{activeMeeting.participants.length} participants</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>💬</span>
                <span>{activeMeeting.discussion.length} messages</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>⏱️</span>
                <span>{formatMeetingTime(activeMeeting.scheduledTime, activeMeeting.status)}</span>
              </div>
            </div>

            {/* Participants Avatars */}
            <div className="flex items-center space-x-2 mt-4">
              {activeMeeting.participants.map((id) => {
                const agent = agents.find(a => a.id === id);
                return agent ? (
                  <div
                    key={id}
                    className="flex items-center space-x-2 bg-white/5 rounded-lg px-3 py-1.5"
                  >
                    <span className="text-lg">{agent.avatar}</span>
                    <span className="text-sm font-medium">{agent.name}</span>
                  </div>
                ) : null;
              })}
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Meetings List */}
          <div className="lg:col-span-1 space-y-6">
            {/* Upcoming Meetings */}
            {upcomingMeetings.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-3">Upcoming</h3>
                <div className="space-y-3">
                  {upcomingMeetings.map((meeting, index) => (
                    <MeetingCard
                      key={meeting.id}
                      meeting={meeting}
                      index={index}
                      isSelected={selectedMeeting === meeting.id}
                      onClick={() => setSelectedMeeting(meeting.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Past Meetings */}
            {pastMeetings.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-3">Past Meetings</h3>
                <div className="space-y-3">
                  {pastMeetings.map((meeting, index) => (
                    <MeetingCard
                      key={meeting.id}
                      meeting={meeting}
                      index={index}
                      isSelected={selectedMeeting === meeting.id}
                      onClick={() => setSelectedMeeting(meeting.id)}
                      showOutcomes
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Meeting Detail View */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {selectedMeetingData ? (
                <motion.div
                  key={selectedMeetingData.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass rounded-2xl p-6"
                >
                  {/* Meeting Header */}
                  <div className="mb-6 pb-6 border-b border-white/10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{meetingTypeIcons[selectedMeetingData.type]}</span>
                        <div>
                          <h2 className="text-2xl font-bold">{selectedMeetingData.name}</h2>
                          <p className="text-sm text-gray-400 mt-1">
                            {formatMeetingTime(selectedMeetingData.scheduledTime, selectedMeetingData.status)}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColors[selectedMeetingData.status]}`}>
                        {selectedMeetingData.status === 'in_progress' ? '🔴 Live' : 
                         selectedMeetingData.status === 'upcoming' ? '📅 Upcoming' : '✓ Completed'}
                      </span>
                    </div>

                    {/* Participants */}
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-400 mb-2">Participants</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedMeetingData.participants.map((id) => {
                          const agent = agents.find(a => a.id === id);
                          return agent ? (
                            <div
                              key={id}
                              className="flex items-center space-x-2 bg-white/5 rounded-lg px-3 py-1.5"
                            >
                              <span className="text-lg">{agent.avatar}</span>
                              <div>
                                <div className="text-sm font-medium">{agent.name}</div>
                                <div className="text-xs text-gray-500">{agent.role}</div>
                              </div>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>

                    {/* Topic */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-400 mb-2">Topic</h3>
                      <p className="text-gray-300">{selectedMeetingData.topic}</p>
                    </div>
                  </div>

                  {/* Chat-Style Discussion */}
                  {selectedMeetingData.discussion.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-400 mb-4">Discussion</h3>
                      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                        {selectedMeetingData.discussion.map((msg, index) => {
                          const agent = agents.find(a => a.id === msg.agentId);
                          const prevMsg = index > 0 ? selectedMeetingData.discussion[index - 1] : null;
                          const showTimestamp = !prevMsg || 
                            (msg.timestamp.getTime() - prevMsg.timestamp.getTime()) > 5 * 60 * 1000;

                          return agent ? (
                            <div key={index}>
                              {/* Timestamp Divider */}
                              {showTimestamp && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="flex items-center justify-center my-4"
                                >
                                  <div className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full">
                                    {formatTime(msg.timestamp)}
                                  </div>
                                </motion.div>
                              )}

                              {/* Chat Bubble */}
                              <motion.div
                                initial={{ opacity: 0, y: 10, x: index % 2 === 0 ? -20 : 20 }}
                                animate={{ opacity: 1, y: 0, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                              >
                                <div className={`max-w-[80%] ${index % 2 === 0 ? 'items-start' : 'items-end'}`}>
                                  <div className="flex items-center space-x-2 mb-1">
                                    {index % 2 === 0 && <span className="text-lg">{agent.avatar}</span>}
                                    <span className="font-semibold text-sm">{agent.name}</span>
                                    {index % 2 !== 0 && <span className="text-lg">{agent.avatar}</span>}
                                  </div>
                                  <div className={`border rounded-2xl px-4 py-3 ${agentColors[agent.id] || 'bg-white/5 border-white/10'}`}>
                                    <p className="text-sm text-gray-100">{msg.message}</p>
                                  </div>
                                </div>
                              </motion.div>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}

                  {/* Outcomes Summary Card */}
                  {selectedMeetingData.outcomes.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl p-5"
                    >
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="text-xl">✨</span>
                        <h3 className="text-lg font-semibold text-emerald-400">Action Items & Outcomes</h3>
                      </div>
                      <ul className="space-y-2">
                        {selectedMeetingData.outcomes.map((outcome, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start space-x-3"
                          >
                            <span className="text-emerald-400 mt-0.5 text-lg">✓</span>
                            <span className="text-gray-200 flex-1">{outcome}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {/* Upcoming meeting placeholder */}
                  {selectedMeetingData.status === 'upcoming' && selectedMeetingData.discussion.length === 0 && (
                    <div className="text-center py-16">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-6xl mb-4"
                      >
                        ⏰
                      </motion.div>
                      <p className="text-xl text-gray-300 mb-2">Meeting hasn't started yet</p>
                      <p className="text-sm text-gray-500">
                        Scheduled for {formatMeetingTime(selectedMeetingData.scheduledTime, selectedMeetingData.status)}
                      </p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <div className="glass rounded-2xl p-12 text-center">
                  <div className="text-4xl mb-4">👥</div>
                  <p className="text-gray-400">Select a meeting to view details</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function MeetingCard({ 
  meeting, 
  index, 
  isSelected, 
  onClick,
  showOutcomes = false 
}: { 
  meeting: typeof meetings[0];
  index: number;
  isSelected: boolean;
  onClick: () => void;
  showOutcomes?: boolean;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className={`w-full text-left glass-hover rounded-xl p-4 transition-all ${
        isSelected ? 'ring-2 ring-emerald-500' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-xl">{meetingTypeIcons[meeting.type]}</span>
          <span className="font-semibold text-sm">{meeting.name}</span>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[meeting.status]}`}>
          {meeting.status === 'in_progress' ? 'Live' : 
           meeting.status === 'upcoming' ? 'Soon' : 'Done'}
        </span>
      </div>
      <div className="text-xs text-gray-400 mb-2">
        {formatMeetingTime(meeting.scheduledTime, meeting.status)}
      </div>
      <div className="flex items-center space-x-1 mb-2">
        {meeting.participants.slice(0, 4).map((id) => {
          const agent = agents.find(a => a.id === id);
          return agent ? (
            <span key={id} className="text-sm" title={agent.name}>
              {agent.avatar}
            </span>
          ) : null;
        })}
        {meeting.participants.length > 4 && (
          <span className="text-xs text-gray-500">+{meeting.participants.length - 4}</span>
        )}
      </div>
      
      {/* Outcome Summary for Past Meetings */}
      {showOutcomes && meeting.outcomes.length > 0 && (
        <div className="mt-3 pt-3 border-t border-white/10">
          <div className="text-xs text-gray-400 mb-1">Outcomes:</div>
          <div className="text-xs text-gray-300 line-clamp-2">
            {meeting.outcomes[0]}
            {meeting.outcomes.length > 1 && ` +${meeting.outcomes.length - 1} more`}
          </div>
        </div>
      )}
    </motion.button>
  );
}

function formatMeetingTime(date: Date, status: string): string {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const hours = Math.abs(Math.floor(diff / (1000 * 60 * 60)));
  const minutes = Math.abs(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));

  if (status === 'in_progress') {
    return `Started ${hours > 0 ? hours + 'h ' : ''}${minutes}m ago`;
  }
  
  if (status === 'upcoming') {
    return `In ${hours > 0 ? hours + 'h ' : ''}${minutes}m`;
  }

  return `${hours > 24 ? Math.floor(hours / 24) + 'd' : hours + 'h'} ago`;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
}
