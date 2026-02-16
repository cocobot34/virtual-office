'use client';

import { motion } from 'framer-motion';

export default function SettingsPage() {
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
            Settings
          </h1>
          <p className="text-gray-400">Configure your virtual office</p>
        </div>

        <div className="glass rounded-2xl p-8 text-center">
          <div className="text-6xl mb-4">⚙️</div>
          <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Settings and configuration options will be available in a future update.
            For now, enjoy exploring your agent organization!
          </p>
        </div>
      </motion.div>
    </div>
  );
}
