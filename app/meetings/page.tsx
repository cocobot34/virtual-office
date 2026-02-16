'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { meetings, agents } from '@/lib/data';

const meetingTypeIcons = {
  standup: '🎯',
  brainstorm: '💭',
  '1-on-1': '🤝',
  water_cooler: '☕',
};

const statusColors = {
  upcoming: 'bg-blue-500/20 text-blue-400',
  in_progress: 'bg-emerald-500/20 text-emerald-400',
  completed: 'bg-gray-500/20 text-gray-400',
};

export default function MeetingsPage() {
  const [selectedMeeting, setSelectedMeeting] = useState<string | null>(meetings[0]?.id || null);

  const sortedMeetings = [...meetings].sort((a, b) => {
    if (a.status === 'in_progress') return -1;
    if (b.status === 'in_progress') return 1;
    if (a.status === 'upcoming' && b.status === 'completed') return -1;
    if (b.status === 'upcoming' && a.status === 'completed') return 1;
    return b.scheduledTime.getTime() - a.scheduledTime.getTime();
  });

  const selectedMeetingData = meetings.find(m => m.id === selectedMeeting);

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Meetings List */}
          <div className="lg:col-span-1 space-y-3">
            {sortedMeetings.map((meeting, index) => (
              <motion.button
                key={meeting.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedMeeting(meeting.id)}
                className={`w-full text-left glass-hover rounded-xl p-4 transition-all ${
                  selectedMeeting === meeting.id ? 'ring-2 ring-emerald-500' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{meetingTypeIcons[meeting.type]}</span>
                    <span className="font-semibold text-sm">{meeting.name}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[meeting.status]}`}>
                    {meeting.status === 'in_progress' ? 'Live' : 
                     meeting.status === 'upcoming' ? 'Upcoming' : 'Done'}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mb-2">
                  {formatMeetingTime(meeting.scheduledTime, meeting.status)}
                </div>
                <div className="flex items-center space-x-1">
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
              </motion.button>
            ))}
          </div>

          {/* Meeting Detail */}
          <div className="lg:col-span-2">
            {selectedMeetingData ? (
              <motion.div
                key={selectedMeetingData.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl p-6"
              >
                {/* Meeting Header */}
                <div className="mb-6">
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
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[selectedMeetingData.status]}`}>
                      {selectedMeetingData.status === 'in_progress' ? 'Live' : 
                       selectedMeetingData.status === 'upcoming' ? 'Upcoming' : 'Completed'}
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
                            <span className="text-sm font-medium">{agent.name}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>

                  {/* Agenda */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">Agenda</h3>
                    <p className="text-gray-300">{selectedMeetingData.agenda}</p>
                  </div>
                </div>

                {/* Discussion */}
                {selectedMeetingData.discussion.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-400 mb-3">Discussion</h3>
                    <div className="space-y-3">
                      {selectedMeetingData.discussion.map((msg, index) => {
                        const agent = agents.find(a => a.id === msg.agentId);
                        return agent ? (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/5 rounded-lg p-3"
                          >
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-lg">{agent.avatar}</span>
                              <span className="font-semibold text-sm">{agent.name}</span>
                              <span className="text-xs text-gray-500">
                                {formatTime(msg.timestamp)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-300 ml-7">{msg.message}</p>
                          </motion.div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                {/* Outcomes */}
                {selectedMeetingData.outcomes.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-3">Outcomes</h3>
                    <ul className="space-y-2">
                      {selectedMeetingData.outcomes.map((outcome, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-2 text-sm"
                        >
                          <span className="text-emerald-400 mt-0.5">✓</span>
                          <span className="text-gray-300">{outcome}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Upcoming meeting placeholder */}
                {selectedMeetingData.status === 'upcoming' && selectedMeetingData.discussion.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">⏰</div>
                    <p className="text-gray-400">This meeting hasn't started yet</p>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="glass rounded-2xl p-12 text-center">
                <div className="text-4xl mb-4">👥</div>
                <p className="text-gray-400">Select a meeting to view details</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
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
