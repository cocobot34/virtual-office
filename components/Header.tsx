'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { agents } from '@/lib/data';

export default function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate overall status
  const activeAgents = agents.filter(a => a.status !== 'offline').length;
  const workingAgents = agents.filter(a => a.status === 'working').length;
  const meetingAgents = agents.filter(a => a.status === 'meeting').length;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 glass border-b border-white/10 z-40">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <span className="text-2xl">🐾</span>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                Coco's Virtual Office
              </h1>
              <p className="text-xs text-gray-400 hidden sm:block">
                Autonomous AI Organization
              </p>
            </div>
          </motion.div>

          {/* Center: Status */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex items-center space-x-4 px-4 py-2 bg-white/5 rounded-lg"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-300">
                {activeAgents}/{agents.length} Active
              </span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center space-x-3 text-xs">
              <span className="text-emerald-400">💼 {workingAgents} working</span>
              <span className="text-blue-400">👥 {meetingAgents} in meetings</span>
            </div>
          </motion.div>

          {/* Right: Clock */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-right"
          >
            <div className="font-mono text-lg font-semibold text-emerald-400">
              {formatTime(time)}
            </div>
            <div className="text-xs text-gray-400 hidden sm:block">
              {formatDate(time)}
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
