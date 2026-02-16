'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { workflows, agents } from '@/lib/data';

const statusColors = {
  completed: 'bg-emerald-500',
  in_progress: 'bg-blue-500',
  pending: 'bg-gray-500'
};

const statusLabels = {
  completed: '✓ Completed',
  in_progress: '⟳ In Progress',
  pending: '○ Pending'
};

export default function WorkflowsPage() {
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
                Autonomous Workflows
              </h1>
              <p className="text-gray-400">See how agents collaborate on end-to-end tasks</p>
            </div>
            <Link href="/" className="text-sm px-4 py-2 glass-hover rounded-lg">
              ← Back to Office
            </Link>
          </div>
        </div>

        {/* Active Workflows */}
        <div className="space-y-6">
          {workflows.map((workflow, workflowIndex) => {
            const isActive = workflow.status === 'in_progress';

            return (
              <motion.div
                key={workflow.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: workflowIndex * 0.1 }}
                className={`glass rounded-2xl p-6 ${isActive ? 'ring-2 ring-emerald-500/30' : ''}`}
              >
                {/* Workflow Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h2 className="text-xl font-semibold">{workflow.name}</h2>
                      {isActive && (
                        <div className="flex items-center space-x-2 text-sm">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                          <span className="text-emerald-400">Active</span>
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-gray-400">
                      Started {getTimeAgo(workflow.startTime)}
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    workflow.status === 'completed' 
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {workflow.status === 'completed' ? '✓ Complete' : '⟳ In Progress'}
                  </div>
                </div>

                {/* Workflow Steps */}
                <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-white/10" />
                  <div 
                    className="absolute left-8 top-4 w-0.5 bg-emerald-500 transition-all duration-1000"
                    style={{ 
                      height: `${(workflow.steps.filter(s => s.status === 'completed').length / workflow.steps.length) * 100}%` 
                    }}
                  />

                  {/* Steps */}
                  <div className="space-y-4">
                    {workflow.steps.map((step, stepIndex) => {
                      const agent = agents.find(a => a.name === step.agent);
                      const isCompleted = step.status === 'completed';
                      const isInProgress = step.status === 'in_progress';
                      const isPending = step.status === 'pending';

                      return (
                        <motion.div
                          key={stepIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (workflowIndex * 0.1) + (stepIndex * 0.05) }}
                          className="relative flex items-start space-x-4"
                        >
                          {/* Step Indicator */}
                          <div className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${
                            isCompleted ? 'bg-emerald-500' :
                            isInProgress ? 'bg-blue-500 animate-pulse' :
                            'bg-gray-500/50'
                          }`}>
                            {agent && (
                              <span className="text-2xl">{agent.avatar}</span>
                            )}
                          </div>

                          {/* Step Content */}
                          <div className="flex-1 bg-white/5 rounded-xl p-4 mt-2">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <div className="font-semibold mb-1">{step.agent}</div>
                                <div className="text-sm text-gray-300">{step.action}</div>
                              </div>
                              <div className={`text-xs px-2 py-1 rounded-full ${
                                isCompleted ? 'bg-emerald-500/20 text-emerald-400' :
                                isInProgress ? 'bg-blue-500/20 text-blue-400' :
                                'bg-gray-500/20 text-gray-400'
                              }`}>
                                {statusLabels[step.status]}
                              </div>
                            </div>

                            {agent && (
                              <Link
                                href={`/agents/${agent.id}`}
                                className="inline-flex items-center text-xs text-gray-400 hover:text-emerald-400 transition-colors mt-2"
                              >
                                View {agent.name}'s profile →
                              </Link>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Workflow Stats */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div>
                      <div className="text-2xl font-bold text-emerald-400">
                        {workflow.steps.filter(s => s.status === 'completed').length}
                      </div>
                      <div className="text-gray-400">Completed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-400">
                        {workflow.steps.filter(s => s.status === 'in_progress').length}
                      </div>
                      <div className="text-gray-400">In Progress</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-400">
                        {workflow.steps.filter(s => s.status === 'pending').length}
                      </div>
                      <div className="text-gray-400">Pending</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* How Workflows Work */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 glass rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold mb-4">How Autonomous Workflows Work</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
            <div>
              <h4 className="font-semibold text-emerald-400 mb-2">🔍 Discovery</h4>
              <p className="text-gray-400">
                Agents like Scout monitor the web for opportunities - trending posts, challenges, or requests
                that align with Nick's goals.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-emerald-400 mb-2">✅ Approval</h4>
              <p className="text-gray-400">
                Coco reviews opportunities and decides whether to proceed, coordinating with Nick on
                strategic decisions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-emerald-400 mb-2">🔨 Execution</h4>
              <p className="text-gray-400">
                Specialized agents (Forge, Pixel, Atlas) build, design, and deploy solutions with minimal
                human intervention.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-emerald-400 mb-2">🚀 Deployment</h4>
              <p className="text-gray-400">
                Completed work is deployed, shared, or delivered automatically - closing the loop from
                discovery to impact.
              </p>
            </div>
          </div>
        </motion.div>
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
