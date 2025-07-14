import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

// --- Helper Icon Component ---
const Icon = ({ path, className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
);

// --- Constants (normally in a separate file) ---
const ICONS = {
    CHART_BAR: "M3 13.125C3 12.504 3.504 12 4.125 12h3.75c.621 0 1.125.504 1.125 1.125v6.75c0 .621-.504 1.125-1.125 1.125h-3.75A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-3.75a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-3.75a1.125 1.125 0 01-1.125-1.125V4.125z",
    BOOK_OPEN: "M12 6.25a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0V7A.75.75 0 0112 6.25z M12 18.25a.75.75 0 01.75-.75h.01a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75zM12 4.5a3.75 3.75 0 00-3.75 3.75v9A3.75 3.75 0 0012 21a3.75 3.75 0 003.75-3.75V7.5A3.75 3.75 0 0012 4.5z M8.25 7.5a3.75 3.75 0 117.5 0v9a3.75 3.75 0 11-7.5 0v-9z",
    ARROW_RIGHT: "M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3",
    CHAT: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.332A.75.75 0 018.98 19.512v-.822c0-.38.212-.72.53-.882a17.92 17.92 0 014.076-1.554.75.75 0 01.81.316A19.1 19.1 0 0021 12z",
    BRIEFCASE: "M19.5 12.75l-4.5 4.5m4.5-4.5l-4.5-4.5m4.5 4.5h-15m4.5 4.5l-4.5-4.5m4.5 4.5v-15",
    PAPER_AIRPLANE: "M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
};

const API_URL = 'https://edu-back-3zz4.onrender.com/api';

// --- Sub-component for the Gabay AI Chat ---
function GabayAIChat({ userInfo, careerTitle }) {
    const [history, setHistory] = useState([]);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(scrollToBottom, [history]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const userMessage = { role: 'user', text: message };
        setIsLoading(true);
        const newHistory = [...history, userMessage];
        setHistory(newHistory);
        setMessage('');

        try {
            const response = await fetch(`${API_URL}/gabay/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userInfo.token}` },
                body: JSON.stringify({ message: userMessage.text, careerTitle, history: newHistory })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            const aiMessage = { role: 'ai', text: data.reply };
            setHistory(prev => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage = { role: 'ai', text: error.message || "I can't seem to connect right now." };
            setHistory(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[60vh] bg-black/50 rounded-lg shadow-inner backdrop-blur-md">
  <div className="flex-1 p-6 space-y-4 overflow-y-auto text-white">
    {history.length === 0 && (
      <div className="text-center text-gray-300 h-full flex flex-col justify-center items-center">
        <Icon path={ICONS.CHAT} className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h3 className="font-semibold text-lg">Talk to Gabay AI</h3>
        <p>Ask me anything about your new career path as a {careerTitle}!</p>
        <p className="text-sm mt-2 text-gray-400">e.g., "What does a typical day look like?"</p>
      </div>
    )}

    {history.map((msg, index) => (
      <div
        key={index}
        className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
      >
        {msg.role === 'ai' && (
          <Icon
            path={ICONS.CHAT}
            className="w-8 h-8 text-[#14b8a6] bg-black/40 rounded-full p-1"
          />
        )}
        <div
          className={`max-w-xs md:max-w-md p-3 rounded-2xl ${
            msg.role === 'user'
              ? 'bg-[#14b8a6] text-white rounded-br-none'
              : 'bg-white/10 text-white rounded-bl-none'
          }`}
        >
          <p className="text-sm">{msg.text}</p>
        </div>
      </div>
    ))}

    {isLoading && (
      <div className="flex justify-start">
        <div className="max-w-xs md:max-w-md p-3 rounded-2xl bg-white/10 text-white">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
          </div>
        </div>
      </div>
    )}

    <div ref={chatEndRef} />
  </div>

  <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 backdrop-blur-sm">
    <div className="relative">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask Gabay AI a question..."
        className="w-full pr-12 pl-4 py-3 rounded-full bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !message.trim()}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#14b8a6] text-white hover:bg-[#0d9488] disabled:bg-[#2dd4bf]/30 disabled:cursor-not-allowed transition-colors"
      >
        <Icon path={ICONS.PAPER_AIRPLANE} className="w-6 h-6" />
      </button>
    </div>
  </form>
</div>

    );
}

// --- Sub-component for the Opportunities Hub ---
function OpportunitiesHub({ userInfo, careerTitle }) {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchJobs = async () => {
            setIsLoading(true); setError('');
            try {
                const response = await fetch(`${API_URL}/gabay/opportunities`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userInfo.token}` }, body: JSON.stringify({ careerTitle }) });
                const data = await response.json();
                if (!response.ok) throw new Error(data.message);
                setJobs(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchJobs();
    }, [userInfo, careerTitle]);

    if (isLoading) return <div className="text-center p-10 text-gray-500">Generating relevant job opportunities with AI...</div>;
    if (error) return <div className="text-center text-red-500 p-10">{error}</div>;
    
    return (
        <div className="space-y-6">
            {jobs.map((job, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border-2 border-gray-200 shadow-sm transition-all hover:shadow-md hover:border-blue-300">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-bold text-blue-700">{job.jobTitle}</h3>
                            <p className="font-semibold text-gray-800">{job.company}</p>
                            <p className="text-sm text-gray-500">{job.location}</p>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                           <p className="font-semibold text-green-600">{job.salary}</p>
                           <p className="text-xs text-gray-400">Est. Monthly</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-x-6 gap-y-4 mt-4">
                        <div>
                            <h4 className="font-semibold mb-2 text-gray-700">Key Responsibilities</h4>
                            <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                                {job.responsibilities.map(r => <li key={r}>{r}</li>)}
                            </ul>
                        </div>
                         <div>
                            <h4 className="font-semibold mb-2 text-gray-700">Qualifications</h4>
                            <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                                {job.qualifications.map(q => <li key={q}>{q}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// --- NEW: Sub-component for the Dashboard ---
function DashboardHub({ userInfo }) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); setError('');
            try {
                const response = await fetch(`${API_URL}/gabay/dashboard`, { headers: { 'Authorization': `Bearer ${userInfo.token}` } });
                const result = await response.json();
                if (!response.ok) throw new Error(result.message);
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [userInfo]);

    if (isLoading) return <div className="text-center p-10 text-gray-500">Loading dashboard analytics...</div>;
    if (error) return <div className="text-center text-red-500 p-10">{error}</div>;
    if (!data) return null;

    // A small component for displaying individual stats
    const StatCard = ({ title, value, color }) => (
        <div className={`bg-white p-4 rounded-lg border-2 border-gray-200 shadow-sm`}>
            <p className="text-sm text-gray-500">{title}</p>
            <p className={`text-3xl font-bold ${color}`}>{value.toLocaleString()}</p>
        </div>
    );

    const pieData = [
        { name: 'Employed', value: data.currentlyEmployed },
        { name: 'Seeking New Role', value: data.seekingNewRole },
    ];
    const COLORS = ['#3B82F6', '#F59E0B'];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Top Row: High-impact stat cards */}
            <StatCard title="Total BPO Professionals" value={data.totalBpoProfessionals} color="text-blue-600" />
            <StatCard title="Currently Employed" value={data.currentlyEmployed} color="text-green-600" />
            <StatCard title="Successful Transitions to Tech" value={data.successfulTransitions} color="text-purple-600" />

            {/* AI Predictive Insight */}
            <div className="md:col-span-3 bg-white p-6 rounded-lg border-2 border-gray-200">
                <h3 className="font-bold text-lg text-gray-800">AI Predictive Insight</h3>
                <p className="mt-2 text-gray-600 italic">"{data.predictiveInsight}"</p>
            </div>
            
            {/* Charts */}
            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
                <h3 className="font-bold text-gray-800">BPO Workforce Overview</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                            {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
             <div className="md:col-span-2 bg-white p-6 rounded-lg border-2 border-gray-200">
                <h3 className="font-bold text-gray-800">Top Hiring Companies</h3>
                 <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={data.topHiringCompanies} layout="vertical" margin={{ top: 5, right: 20, left: 100, bottom: 5 }}>
                        <XAxis type="number" hide />
                        <YAxis type="category" dataKey="name" width={100} tick={{fontSize: 12}}/>
                        <Tooltip cursor={{fill: '#f3f4f6'}}/>
                        <Legend />
                        <Bar dataKey="hiringCount" name="Hiring Count" fill="#3B82F6" barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
             <div className="md:col-span-3 bg-white p-6 rounded-lg border-2 border-gray-200">
                <h3 className="font-bold text-gray-800">Monthly Role Demand Trend</h3>
                 <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data.demandTrend} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="demand" stroke="#3B82F6" strokeWidth={2} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

// --- Main RoadmapPage Component ---
export default function RoadmapPage({ roadmapData, onReset, onLogout, userInfo }) {
    const [activeTab, setActiveTab] = useState('roadmap');
    const { careerTitle, description, reason, modules, salary_range_php } = roadmapData;
    const [currentModule, setCurrentModule] = useState(0);
    const navigate = useNavigate();

    const TabButton = ({ tabName, iconPath, children }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === tabName ? 'bg-blue-600 text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}
        >
            <Icon path={iconPath} className="w-5 h-5"/>
            <span>{children}</span>
        </button>
    );

    const ModuleCard = ({ module, index, isActive, onClick }) => (
        <div
  onClick={onClick}
  className={`p-6 rounded-xl bg-black/50 hover:bg-black/40 transition-all duration-300 cursor-pointer`}
>
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-4">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#14b8a6] text-white font-bold text-lg">
        {index + 1}
      </div>
      <div>
        <h3 className="text-xl font-bold text-white">{module.title}</h3>
        <p className="text-sm text-gray-300 font-medium">Est. Duration: {module.duration}</p>
      </div>
    </div>
    {isActive && (
      <span className="bg-[#14b8a6]/20 text-[#14b8a6] text-xs font-semibold px-3 py-1 rounded-full">
        CURRENT STEP
      </span>
    )}
  </div>

  {isActive && (
    <div className="mt-6 pl-16 animate-fade-in-up">
      <h4 className="font-semibold text-white mb-2">Skills you'll learn:</h4>
      <div className="flex flex-wrap gap-2 mb-4">
        {module.skills.map((skill) => (
          <span
            key={skill}
            className="bg-white/10 text-white text-xs font-medium px-2.5 py-1 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>

      <h4 className="font-semibold text-white mb-3">Recommended Resources:</h4>
      <div className="space-y-2">
        {module.resources.map((res) => (
          <a
            href={res.url}
            key={res.name}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 bg-black/30 hover:bg-black/20 rounded-lg transition-all"
          >
            <div className="flex items-center">
              <Icon path={ICONS.BOOK_OPEN} className="w-5 h-5 mr-3 text-[#14b8a6]" />
              <span className="font-medium text-white">{res.name}</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-300 mr-3">{res.provider}</span>
              <Icon path={ICONS.ARROW_RIGHT} className="w-4 h-4 text-gray-400" />
            </div>
          </a>
        ))}
      </div>
    </div>
  )}
</div>

    );

    return (
        <div id="roadmap-page" className="relative min-h-screen font-sans bg-black overflow-hidden">
  {/* Gradient Background Blobs */}
  <div className="absolute inset-0 z-0" style={{ filter: 'blur(10vw)' }}>
    {/* First gradient blob */}
    <div
      className="absolute inset-0 mx-auto"
      style={{
        clipPath:
          'polygon(60% 35%, 45% 30%, 35% 20%, 30% 10%, 20% 15%, 10% 25%, 5% 50%, 20% 60%, 30% 70%, 40% 60%, 50% 65%, 60% 80%, 80% 85%, 90% 70%, 95% 50%, 85% 30%, 70% 20%, 60% 35%)',
        background: 'linear-gradient(135deg, #3b82f6, #9333ea, #ec4899)',
        opacity: 0.4,
      }}
    ></div>

    {/* Second gradient blob */}
    <div
      className="absolute inset-0 mx-auto"
      style={{
        clipPath:
          'polygon(70% 40%, 50% 35%, 35% 25%, 25% 10%, 10% 20%, 5% 40%, 10% 60%, 30% 70%, 45% 65%, 60% 75%, 75% 70%, 90% 50%, 85% 30%, 70% 20%, 60% 35%)',
        background: 'linear-gradient(135deg, #22d3ee, #14b8a6, #84cc16)',
        transform: 'rotate(180deg)',
        opacity: 0.5,
      }}
    ></div>
  </div>



  {/* Header */}
  <header className="bg-black/80 shadow-sm sticky top-0 z-20 border-b border-white/10 backdrop-blur-md">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-4">
        <div className="text-2xl font-bold text-teal-400">BPO Tech Bridge AI</div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-white hidden sm:block">Welcome, {userInfo.email}</span>
          <button onClick={() => navigate('/roadmap-selection')} className="text-sm font-medium text-white hover:text-teal-400">
            Back to Options
          </button>
          <button onClick={onReset} className="text-sm font-medium text-white hover:text-teal-400">
            Start New Assessment
          </button>
          <button onClick={onLogout} className="text-sm font-semibold text-teal-400 hover:text-white">
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>

  {/* Main Content */}
  <main className="relative z-10 py-10">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="mt-2 text-4xl font-extrabold text-white tracking-tight sm:text-5xl">{careerTitle}</h1>
      <p className="text-lg font-semibold text-emerald-300 mt-2">{salary_range_php}</p>
      <p className="mt-4 text-lg text-gray-300 max-w-3xl">{description}</p>
      <p className="mt-4 text-lg text-gray-300 max-w-3xl font-semibold">{reason}</p>

      {/* Tabs */}
      <div className="my-8 border-b-2 border-white/25">
        <div className="flex space-x-2 sm:space-x-4 ">
          <TabButton tabName="roadmap" iconPath={ICONS.BOOK_OPEN} classname="text-white">My Roadmap</TabButton>
          <TabButton tabName="gabay" iconPath={ICONS.CHAT}>Gabay AI</TabButton>
          <TabButton tabName="opportunities" iconPath={ICONS.BRIEFCASE}>Opportunities</TabButton>
          <TabButton tabName="dashboard" iconPath={ICONS.CHART_BAR}>Dashboard</TabButton>
        </div>
      </div>

<div className="animate-fade-in-up text-white">
  {activeTab === 'roadmap' && (
    <div className="space-y-4">
      {modules.map((module, index) => (
        <ModuleCard
          key={index}
          module={module}
          index={index}
          isActive={currentModule === index}
          onClick={() => setCurrentModule(index)}
        />
      ))}
    </div>
  )}
  {activeTab === 'gabay' && (
    <GabayAIChat userInfo={userInfo} careerTitle={careerTitle} />
  )}
  {activeTab === 'opportunities' && (
    <OpportunitiesHub userInfo={userInfo} careerTitle={careerTitle} />
  )}
  {activeTab === 'dashboard' && (
    <DashboardHub userInfo={userInfo} />
  )}
</div>

    </div>
  </main>
</div>

    );
}