import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '../layout/Header';
import { AIAssistant } from '../widgets/AIAssistant';
import { TasksWidget } from '../widgets/TasksWidger';
import { NotesWidget } from '../widgets/NotesWidgets';
import { DashboardGrid } from './DashBoardGrid';

export const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors"
    >
      <Header />
      {/* <AIAssistant/>
    <div className='mt-20'>
        <TasksWidget/>
        <NotesWidget/>
    </div> */}
     <main className="pt-6">
            <DashboardGrid />
          </main>
    </motion.div>
  );
};