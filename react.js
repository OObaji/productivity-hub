import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Home, 
  BookOpen, 
  Target, 
  PenTool, 
  Settings, 
  Search, 
  Bell, 
  Plus, 
  MoreHorizontal, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Brain,
  Layers,
  Calendar as CalendarIcon,
  ChevronRight,
  Sun,
  Moon,
  Filter,
  Zap,
  Coffee,
  Video,
  MapPin,
  RefreshCw,
  MoreVertical,
  Lightbulb,
  Sparkles,
  Trash2
} from 'lucide-react';

// --- FOUNDATION COMPONENTS ---

/**
 * Card Component
 * The basic building block for widgets in our bento grid.
 */
const Card = ({ children, className = "", title, action }) => (
  <div className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 flex flex-col ${className}`}>
    {(title || action) && (
      <div className="flex justify-between items-center mb-4">
        {title && <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{title}</h3>}
        {action}
      </div>
    )}
    {children}
  </div>
);

/**
 * Navigation Item
 */
const NavItem = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
      active 
        ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-lg shadow-zinc-200 dark:shadow-none' 
        : 'text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
    }`}
  >
    <Icon size={20} className={active ? '' : 'stroke-[2px]'} />
    <span className="font-medium">{label}</span>
    {active && <ChevronRight size={16} className="ml-auto opacity-50" />}
  </button>
);

/**
 * Project/Area Row
 */
const ProjectRow = ({ title, progress, color }) => (
  <div className="flex items-center gap-4 py-3 border-b border-zinc-100 dark:border-zinc-800 last:border-0 group cursor-pointer hover:pl-2 transition-all">
    <div className={`w-2 h-2 rounded-full ${color}`} />
    <span className="flex-1 font-medium text-zinc-700 dark:text-zinc-200">{title}</span>
    <div className="w-24 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
      <div 
        className={`h-full rounded-full ${color.replace('bg-', 'bg-')}`} 
        style={{ width: `${progress}%`, backgroundColor: 'currentColor' }} 
      />
    </div>
    <span className="text-xs text-zinc-400 font-mono">{progress}%</span>
  </div>
);

// --- VIEWS ---

/**
 * Dashboard View
 * The main "Home" view with the bento grid.
 */
const DashboardView = ({ noteInput, setNoteInput }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="mb-10">
      <h2 className="text-3xl font-bold mb-1">Good Afternoon.</h2>
      <p className="text-zinc-500 dark:text-zinc-400">Let's make today 1% better.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-min">
      {/* 1. Quick Capture (Main Input) */}
      <Card className="col-span-1 md:col-span-2 lg:col-span-3 row-span-1" title="Quick Capture">
        <div className="relative">
          <textarea 
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            placeholder="What's on your mind? Capture it before it's gone..."
            className="w-full h-32 bg-zinc-50 dark:bg-zinc-950/50 border-0 rounded-xl p-4 resize-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white dark:focus:bg-zinc-900 transition-all placeholder:text-zinc-400"
          />
          <div className="absolute bottom-3 right-3 flex gap-2">
            <button className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-400 transition-colors">
              <Clock size={16} />
            </button>
            <button className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-indigo-500/20">
              Save Note
            </button>
          </div>
        </div>
      </Card>

      {/* 2. Daily Kaizen / Stats */}
      <Card className="col-span-1 md:col-span-1" title="Daily Kaizen">
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-1">
            <span className="text-4xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">85%</span>
            <p className="text-sm text-zinc-500">Daily Focus Score</p>
          </div>
          <div className="space-y-3 mt-4">
            <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300">
              <CheckCircle2 size={16} className="text-green-500" />
              <span>Morning Review</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300">
              <CheckCircle2 size={16} className="text-green-500" />
              <span>Review Priorities</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-400">
              <div className="w-4 h-4 rounded-full border-2 border-zinc-300 dark:border-zinc-700" />
              <span>Evening Reflection</span>
            </div>
          </div>
        </div>
      </Card>

      {/* 4. Active Projects */}
      <Card className="col-span-1 md:col-span-2" title="Active Projects" 
        action={<button className="text-xs font-medium text-indigo-500 hover:text-indigo-400">View All</button>}
      >
        <div className="space-y-1">
          <ProjectRow title="Website Redesign" progress={75} color="text-emerald-500" />
          <ProjectRow title="Q1 Marketing Plan" progress={30} color="text-orange-500" />
          <ProjectRow title="Personal Finance" progress={60} color="text-blue-500" />
          <ProjectRow title="Fitness Routine" progress={90} color="text-red-500" />
        </div>
      </Card>

      {/* 5. Areas / Pillars */}
      <Card className="col-span-1 md:col-span-2" title="Life Pillars">
        <div className="grid grid-cols-2 gap-3 h-full">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-800 flex flex-col items-center justify-center gap-2 text-center group hover:border-indigo-500/50 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-600 flex items-center justify-center mb-1">
              <Target size={20} />
            </div>
            <span className="font-medium text-sm">Health</span>
            <span className="text-xs text-zinc-400">3 Active</span>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-800 flex flex-col items-center justify-center gap-2 text-center group hover:border-indigo-500/50 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center mb-1">
              <BookOpen size={20} />
            </div>
            <span className="font-medium text-sm">Learning</span>
            <span className="text-xs text-zinc-400">12 Notes</span>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-800 flex flex-col items-center justify-center gap-2 text-center group hover:border-indigo-500/50 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center mb-1">
              <PenTool size={20} />
            </div>
            <span className="font-medium text-sm">Creation</span>
            <span className="text-xs text-zinc-400">5 Drafts</span>
          </div>
          <div 
            onClick={() => window.open('https://www.notion.so/Journal-2dee1ae8ad32809da202e904f0055734?source=copy_link', '_blank')}
            className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-800 flex flex-col items-center justify-center gap-2 text-center group hover:border-indigo-500/50 transition-colors cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 flex items-center justify-center mb-1">
              <Brain size={20} />
            </div>
            <span className="font-medium text-sm">Mindset</span>
            <span className="text-xs text-zinc-400">Daily</span>
          </div>
        </div>
      </Card>
      
      {/* 6. Recent Thoughts/Notes */}
      <Card className="col-span-1 md:col-span-4" title="Recent Thoughts">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="group p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/30 border border-zinc-100 dark:border-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono text-zinc-400">10:4{i} AM</span>
                <MoreHorizontal size={16} className="text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 line-clamp-2 leading-relaxed">
                The idea of "Kaizen" isn't just about business, it's about the small incremental changes in daily habits that compound over time...
              </p>
              <div className="mt-3 flex gap-2">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-0.5 rounded">Journal</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

/**
 * Schedule View
 * Integrates Google Calendar via iframe.
 */
const SCHEDULE_ITEMS = [
  { id: 1, time: '09:00', endTime: '10:30', title: 'Deep Work: System Architecture', type: 'focus', energy: 'High', status: 'completed' },
  { id: 2, time: '10:30', endTime: '10:45', title: 'Bio-Break & Hydration', type: 'break', energy: 'Recharge', status: 'completed' },
  { id: 3, time: '11:00', endTime: '12:00', title: 'Team Sync: Q1 Roadmap', type: 'meeting', energy: 'Medium', status: 'active', platform: 'Zoom' },
  { id: 4, time: '12:30', endTime: '13:30', title: 'Lunch & Reading', type: 'personal', energy: 'Recharge', status: 'upcoming' },
  { id: 5, time: '14:00', endTime: '15:30', title: 'Client Workshop', type: 'meeting', energy: 'High', status: 'upcoming', platform: 'Meet' },
  { id: 6, time: '16:00', endTime: '17:00', title: 'Admin & Email Processing', type: 'shallow', energy: 'Low', status: 'upcoming' }
];

const ScheduleView = () => {
  const [viewMode, setViewMode] = useState('smart'); // 'smart' or 'google'

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            Schedule 
            {viewMode === 'smart' && <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">Live</span>}
          </h3>
          <p className="text-zinc-500 text-sm">Manage your time and energy.</p>
        </div>
        
        {/* View Toggle */}
        <div className="flex p-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg">
          <button 
            onClick={() => setViewMode('smart')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${viewMode === 'smart' ? 'bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
          >
            Smart View
          </button>
          <button 
            onClick={() => setViewMode('google')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${viewMode === 'google' ? 'bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
          >
            G-Cal
          </button>
        </div>
      </div>

      {viewMode === 'smart' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          
          {/* Left Column: The HUD (Heads Up Display) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Active Context Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-8 text-white shadow-2xl shadow-indigo-500/20 relative overflow-hidden group">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
              
              <div className="relative z-10 flex justify-between items-start">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-medium tracking-wider uppercase mb-6">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                  Current Focus
                </div>
                <div className="text-right">
                  <div className="text-3xl font-mono font-bold tracking-tight">11:42</div>
                  <div className="text-indigo-200 text-sm">GMT+0</div>
                </div>
              </div>

              <div className="relative z-10 mt-2">
                <h2 className="text-3xl font-bold mb-2">Team Sync: Q1 Roadmap</h2>
                <div className="flex items-center gap-4 text-indigo-100 text-sm">
                  <span className="flex items-center gap-1.5"><Clock size={16} /> 11:00 - 12:00</span>
                  <span className="flex items-center gap-1.5"><Video size={16} /> Zoom Room A</span>
                  <span className="flex items-center gap-1.5"><Zap size={16} className="text-amber-300" /> Med Energy</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative z-10 mt-8">
                <div className="flex justify-between text-xs font-medium text-indigo-200 mb-2">
                  <span>42 mins elapsed</span>
                  <span>18 mins remaining</span>
                </div>
                <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white/90 rounded-full w-[70%] shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
                </div>
              </div>
            </div>

            {/* Upcoming Queue */}
            <Card title="Up Next" className="flex-1">
              <div className="space-y-4">
                {SCHEDULE_ITEMS.filter(item => item.status === 'upcoming').map((item, index) => (
                   <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/50 hover:border-indigo-500/30 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all group">
                     <div className="flex flex-col items-center min-w-[60px]">
                       <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{item.time}</span>
                       <span className="text-xs text-zinc-400">{item.endTime}</span>
                     </div>
                     
                     <div className="w-1 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 group-hover:bg-indigo-500 transition-colors"></div>
                     
                     <div className="flex-1">
                       <h4 className="font-semibold text-zinc-700 dark:text-zinc-200">{item.title}</h4>
                       <div className="flex items-center gap-3 mt-1">
                         <span className={`text-xs px-2 py-0.5 rounded flex items-center gap-1 ${
                           item.energy === 'High' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                           item.energy === 'Recharge' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                           'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                         }`}>
                           <Zap size={10} /> {item.energy}
                         </span>
                         {item.type === 'personal' && <span className="text-xs text-zinc-400 flex items-center gap-1"><Coffee size={12} /> Personal</span>}
                       </div>
                     </div>

                     <button className="p-2 rounded-lg text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors opacity-0 group-hover:opacity-100">
                       <ArrowRight size={18} />
                     </button>
                   </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column: Timeline Visualization */}
          <div className="lg:col-span-1">
            <Card title="Timeline" className="h-full">
              <div className="relative pl-4 space-y-8 mt-2">
                {/* Vertical Line */}
                <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-zinc-100 dark:bg-zinc-800"></div>

                {SCHEDULE_ITEMS.map((item, index) => (
                  <div key={item.id} className={`relative flex gap-4 ${item.status === 'completed' ? 'opacity-50' : ''}`}>
                    {/* Dot */}
                    <div className={`
                      relative z-10 w-3 h-3 rounded-full mt-1.5 border-[3px] 
                      ${item.status === 'active' ? 'bg-indigo-600 border-indigo-200 dark:border-indigo-900 ring-4 ring-indigo-500/20' : 
                        item.status === 'completed' ? 'bg-zinc-300 border-zinc-100 dark:bg-zinc-700 dark:border-zinc-800' : 
                        'bg-white dark:bg-zinc-900 border-indigo-500'}
                    `}></div>
                    
                    <div>
                      <span className={`text-xs font-mono mb-0.5 block ${item.status === 'active' ? 'text-indigo-600 font-bold' : 'text-zinc-400'}`}>
                        {item.time}
                      </span>
                      <p className={`text-sm ${item.status === 'active' ? 'font-semibold text-zinc-900 dark:text-zinc-100' : 'text-zinc-600 dark:text-zinc-400'}`}>
                        {item.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

        </div>
      ) : (
        /* Google Calendar View (Iframe) */
        <Card className="flex-1 p-0 overflow-hidden relative shadow-sm h-[700px] animate-in fade-in zoom-in-95 duration-300">
          <div className="w-full h-full bg-white">
            <iframe 
              src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=UTC&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&src=ZW4udWsjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%230B8043" 
              style={{border: 0}} 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              scrolling="no"
              title="Google Calendar"
              className="w-full h-full"
            ></iframe>
          </div>
        </Card>
      )}
    </div>
  );
};

/**
 * Brainstorm View
 * A digital whiteboard for collecting and organizing ideas.
 */
const BrainstormView = () => {
  const [ideas, setIdeas] = useState([
    { id: 1, text: "AI-generated summaries for my daily journal", color: "bg-amber-200 dark:bg-amber-900/40 border-amber-300 dark:border-amber-800", tag: "Feature", votes: 5 },
    { id: 2, text: "Switch entire backend to Supabase?", color: "bg-blue-200 dark:bg-blue-900/40 border-blue-300 dark:border-blue-800", tag: "Tech", votes: 2 },
    { id: 3, text: "Design a dark mode logo variant", color: "bg-rose-200 dark:bg-rose-900/40 border-rose-300 dark:border-rose-800", tag: "Design", votes: 8 },
    { id: 4, text: "Write weekly newsletter on 'Digital Minimalism'", color: "bg-emerald-200 dark:bg-emerald-900/40 border-emerald-300 dark:border-emerald-800", tag: "Content", votes: 3 },
  ]);

  const [newIdeaText, setNewIdeaText] = useState('');
  
  const addIdea = () => {
    if (!newIdeaText.trim()) return;
    const colors = [
      "bg-amber-200 dark:bg-amber-900/40 border-amber-300 dark:border-amber-800",
      "bg-blue-200 dark:bg-blue-900/40 border-blue-300 dark:border-blue-800", 
      "bg-rose-200 dark:bg-rose-900/40 border-rose-300 dark:border-rose-800",
      "bg-emerald-200 dark:bg-emerald-900/40 border-emerald-300 dark:border-emerald-800"
    ];
    // Random color for demo
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    setIdeas([{
      id: Date.now(),
      text: newIdeaText,
      color: randomColor,
      tag: "New",
      votes: 0
    }, ...ideas]);
    setNewIdeaText('');
  };

  const deleteIdea = (id) => {
    setIdeas(ideas.filter(idea => idea.id !== id));
  };

  const voteIdea = (id) => {
    setIdeas(ideas.map(idea => idea.id === id ? { ...idea, votes: idea.votes + 1 } : idea));
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            Brainstorm
            <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <Sparkles size={12} /> Beta
            </span>
          </h3>
          <p className="text-zinc-500 text-sm">Capture sparks of genius.</p>
        </div>
        
        <div className="flex gap-2">
          <button className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">
            <Filter size={20} />
          </button>
          <button className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Input Area */}
      <div className="mb-8 relative z-10">
        <div className="flex gap-4 p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-lg shadow-zinc-200/50 dark:shadow-none focus-within:ring-2 focus-within:ring-indigo-500/50 transition-all">
          <input 
            type="text" 
            value={newIdeaText}
            onChange={(e) => setNewIdeaText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addIdea()}
            placeholder="Type a new idea and hit Enter..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-zinc-700 dark:text-zinc-200 placeholder:text-zinc-400 px-4"
          />
          <button 
            onClick={addIdea}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-medium transition-colors"
          >
            Add Idea
          </button>
        </div>
      </div>

      {/* Canvas Grid */}
      <div className="flex-1 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 relative overflow-hidden">
        {/* Dot Grid Background */}
        <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.1]" 
             style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        </div>

        <div className="absolute inset-0 overflow-y-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ideas.map((idea) => (
              <div 
                key={idea.id} 
                className={`group relative p-6 rounded-xl border-2 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between min-h-[180px] ${idea.color}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 bg-black/5 dark:bg-white/10 px-2 py-1 rounded-md">
                    {idea.tag}
                  </span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); deleteIdea(idea.id); }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-black/10 rounded-full transition-all text-zinc-600 dark:text-zinc-300"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                
                <p className="font-medium text-zinc-800 dark:text-zinc-100 leading-relaxed text-lg">
                  {idea.text}
                </p>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-black/5 dark:border-white/5">
                  <span className="text-xs font-mono opacity-50">{new Date().toLocaleDateString()}</span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); voteIdea(idea.id); }}
                    className="flex items-center gap-1.5 text-xs font-bold opacity-70 hover:opacity-100 transition-opacity bg-white/30 dark:bg-black/20 px-2 py-1 rounded-lg"
                  >
                    <ArrowRight size={12} className="-rotate-45" /> {idea.votes}
                  </button>
                </div>
              </div>
            ))}
            
            {/* Add New Placeholder */}
            <button 
              onClick={() => document.querySelector('input').focus()}
              className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-6 flex flex-col items-center justify-center text-zinc-400 hover:text-indigo-500 hover:border-indigo-500/50 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-all min-h-[180px] gap-2"
            >
              <Plus size={32} />
              <span className="font-medium">New Idea</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APPLICATION ---

export default function SecondBrain() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(true);
  const [noteInput, setNoteInput] = useState('');
  
  // Toggle Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={`min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300 font-sans selection:bg-indigo-500/30`}>
      
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-full w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl p-6 hidden md:flex flex-col z-20">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-indigo-500/20 shadow-lg">
            <Brain size={18} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Kaizen OS</h1>
        </div>

        <nav className="space-y-2 flex-1">
          <NavItem 
            icon={Layout} 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <NavItem 
            icon={Lightbulb} 
            label="Brainstorm" 
            active={activeTab === 'brainstorm'} 
            onClick={() => setActiveTab('brainstorm')} 
          />
          <NavItem 
            icon={Target} 
            label="Projects" 
            active={activeTab === 'projects'} 
            onClick={() => setActiveTab('projects')} 
          />
          <NavItem 
            icon={Layers} 
            label="Areas" 
            active={activeTab === 'areas'} 
            onClick={() => setActiveTab('areas')} 
          />
          <NavItem 
            icon={BookOpen} 
            label="Library" 
            active={activeTab === 'library'} 
            onClick={() => setActiveTab('library')} 
          />
          <NavItem 
            icon={CalendarIcon} 
            label="Schedule" 
            active={activeTab === 'schedule'} 
            onClick={() => setActiveTab('schedule')} 
          />
        </nav>

        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
          <NavItem 
            icon={Settings} 
            label="Settings" 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')} 
          />
          <button 
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            <span className="font-medium">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="md:ml-64 p-6 md:p-12 max-w-7xl mx-auto">
        
        {/* Global Top Bar */}
        <header className="flex justify-end items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
              <input 
                type="text" 
                placeholder="Search your brain..." 
                className="pl-10 pr-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              />
            </div>
            <button className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-indigo-600 transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200 dark:border-indigo-800">
              ME
            </div>
          </div>
        </header>

        {/* Content Switcher */}
        {activeTab === 'dashboard' && (
          <DashboardView noteInput={noteInput} setNoteInput={setNoteInput} />
        )}
        
        {activeTab === 'schedule' && (
          <ScheduleView />
        )}

        {activeTab === 'brainstorm' && (
          <BrainstormView />
        )}

        {/* Placeholder for other tabs */}
        {!['dashboard', 'schedule', 'brainstorm'].includes(activeTab) && (
          <div className="flex flex-col items-center justify-center h-[60vh] text-zinc-400">
            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center mb-4">
              <PenTool size={32} />
            </div>
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Work in Progress</h3>
            <p>This room is currently under construction.</p>
          </div>
        )}

      </main>
    </div>
  );
}
