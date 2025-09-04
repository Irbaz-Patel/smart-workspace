import React, { useState, useCallback } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { motion } from 'framer-motion';
import { Settings, Maximize2, Minimize2 } from 'lucide-react';
import { AIAssistant } from '../widgets/AIAssistant';
import { NotesWidget } from '../widgets/NotesWidgets';
import { TasksWidget } from '../widgets/TasksWidger';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);


const widgets = [
  { 
    id: 'ai-assistant', 
    type: 'ai-assistant', 
    component: AIAssistant, 
    title: 'AI Assistant',
    minW: 2,
    minH: 3
  },
  { 
    id: 'notes', 
    type: 'notes', 
    component: NotesWidget, 
    title: 'Notes',
    minW: 2,
    minH: 3
  },
  { 
    id: 'tasks', 
    type: 'tasks', 
    component: TasksWidget, 
    title: 'Tasks',
    minW: 2,
    minH: 3
  },
//   { 
//     id: 'weather', 
//     type: 'weather', 
//     component: WeatherWidget, 
//     title: 'Weather',
//     minW: 1,
//     minH: 2,
//     maxW: 2,
//     maxH: 3
//   },
//   { 
//     id: 'crypto', 
//     type: 'crypto', 
//     component: CryptoWidget, 
//     title: 'Crypto',
//     minW: 2,
//     minH: 3
//   },
];

const defaultLayouts = {
  lg: [
    { i: 'ai-assistant', x: 0, y: 0, w: 3, h: 4 },
    { i: 'notes', x: 3, y: 0, w: 2, h: 4 },
    { i: 'tasks', x: 5, y: 0, w: 2, h: 4 },
    // { i: 'weather', x: 0, y: 4, w: 2, h: 2 },
    // { i: 'crypto', x: 2, y: 4, w: 3, h: 3 },
  ],
  md: [
    { i: 'ai-assistant', x: 0, y: 0, w: 4, h: 4 },
    { i: 'notes', x: 4, y: 0, w: 2, h: 4 },
    { i: 'tasks', x: 0, y: 4, w: 3, h: 3 },
    // { i: 'weather', x: 3, y: 4, w: 2, h: 2 },
    // { i: 'crypto', x: 0, y: 7, w: 4, h: 3 },
  ],
  sm: [
    { i: 'ai-assistant', x: 0, y: 0, w: 4, h: 4 },
    { i: 'notes', x: 0, y: 4, w: 4, h: 3 },
    { i: 'tasks', x: 0, y: 7, w: 4, h: 3 },
    // { i: 'weather', x: 0, y: 10, w: 2, h: 2 },
    // { i: 'crypto', x: 0, y: 12, w: 4, h: 3 },
  ],
  xs: [
    { i: 'ai-assistant', x: 0, y: 0, w: 2, h: 4 },
    { i: 'notes', x: 0, y: 4, w: 2, h: 3 },
    { i: 'tasks', x: 0, y: 7, w: 2, h: 3 },
    // { i: 'weather', x: 0, y: 10, w: 2, h: 2 },
    // { i: 'crypto', x: 0, y: 12, w: 2, h: 3 },
  ],
};

const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480 };
const cols = { lg: 6, md: 6, sm: 4, xs: 2 };

export const DashboardGrid = () => {
  const [layouts, setLayouts] = useState(defaultLayouts);
  const [currentBreakpoint, setCurrentBreakpoint] = useState('lg');
  const [isEditMode, setIsEditMode] = useState(false);

  const onLayoutChange = useCallback((layout, allLayouts) => {
    setLayouts(allLayouts);
    localStorage.setItem('dashboard-layouts', JSON.stringify(allLayouts));
  }, []);

  const onBreakpointChange = useCallback((breakpoint) => {
    setCurrentBreakpoint(breakpoint);
  }, []);

  React.useEffect(() => {
    const savedLayouts = localStorage.getItem('dashboard-layouts');
    if (savedLayouts) {
      try {
        setLayouts(JSON.parse(savedLayouts));
      } catch (error) {
        console.error('Error loading saved layouts:', error);
      }
    }
  }, []);

  const resetLayouts = () => {
    setLayouts(defaultLayouts);
    localStorage.removeItem('dashboard-layouts');
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <div className="p-6 max-w-full mx-auto">
      {/* Control Panel */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex items-center justify-between bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-4 border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Smart Workspace
          </h2>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isEditMode ? 'bg-orange-500' : 'bg-green-500'}`}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {isEditMode ? 'Edit Mode' : 'View Mode'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleEditMode}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
              isEditMode
                ? 'bg-orange-500 text-white hover:bg-orange-600'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {isEditMode ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            <span>{isEditMode ? 'Exit Edit' : 'Edit Layout'}</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetLayouts}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
          >
            <Settings className="h-4 w-4" />
            <span>Reset</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Grid Layout */}
      <div className={`transition-all duration-300 ${isEditMode ? 'ring-2 ring-blue-500/20 rounded-xl' : ''}`}>
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={breakpoints}
          cols={cols}
          rowHeight={80}
          margin={[16, 16]}
          containerPadding={[0, 0]}
          onLayoutChange={onLayoutChange}
          onBreakpointChange={onBreakpointChange}
          isDraggable={isEditMode}
          isResizable={isEditMode}
          useCSSTransforms={true}
          preventCollision={false}
          compactType="vertical"
          resizeHandles={['se']}
        >
          {widgets.map((widget) => {
            const Component = widget.component;
            return (
              <div
                key={widget.id}
                className={`transition-all duration-200 ${
                  isEditMode 
                    ? 'ring-2 ring-blue-500/30 ring-dashed hover:ring-blue-500/50 cursor-move' 
                    : ''
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="h-full relative group"
                >
                  {isEditMode && (
                    <div className="absolute inset-0 bg-blue-500/5 backdrop-blur-[1px] rounded-xl z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white/90 dark:bg-gray-800/90 px-3 py-2 rounded-lg shadow-lg">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {widget.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Drag to move • Resize from corner
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className={`h-full ${isEditMode ? 'pointer-events-none' : ''}`}>
                    <Component />
                  </div>
                  
                  {isEditMode && (
                    <div className="absolute bottom-1 right-1 w-4 h-4 opacity-30 group-hover:opacity-60 transition-opacity">
                      <div className="w-full h-full bg-blue-500 rounded-tl-lg"></div>
                      <div className="absolute bottom-0 right-0 w-2 h-2 bg-white rounded-tl-sm"></div>
                    </div>
                  )}
                </motion.div>
              </div>
            );
          })}
        </ResponsiveGridLayout>
      </div>

      {/* {isEditMode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4"
        >
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            Edit Mode Instructions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800 dark:text-blue-200">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Drag widgets to rearrange them</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Drag the bottom-right corner to resize</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Layout automatically saves to your browser</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Click "Exit Edit" when you're done</span>
            </div>
          </div>
        </motion.div>
      )} */}
    </div>
  );
};