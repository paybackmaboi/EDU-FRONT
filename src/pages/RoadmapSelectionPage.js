import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RoadmapSelectionPage({ roadmaps, onSelectRoadmap, onLogout, onReset, userInfo }) {
  const navigate = useNavigate();

  const handleSelect = (roadmap) => {
    onSelectRoadmap(roadmap);
    navigate('/roadmap');
  };

  return (
    <>
      {/* Header */}
<header className="fixed top-0 left-0 w-full z-[999]">
  <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>
  <div className="relative z-10 bg-white/10 backdrop-blur-lg shadow-md">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-4">
        <div className="text-2xl font-bold text-white drop-shadow">
          BPO Tech Bridge AI
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
          <span className="text-sm font-medium text-white">
            {userInfo?.email ? `Welcome, ${userInfo.email}` : 'Welcome'}
          </span>
          <button
            onClick={onLogout}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm font-semibold text-white transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</header>

      {/* Page Content */}
      <div className="relative w-full min-h-screen overflow-hidden bg-black">
        {/* Background */}
        <div className="absolute inset-0 grid z-0" style={{ filter: 'blur(10vw)' }}>
          <div
            className="absolute inset-0 mx-auto"
            style={{
              clipPath:
                'polygon(60% 35%, 45% 30%, 35% 20%, 30% 10%, 20% 15%, 10% 25%, 5% 50%, 20% 60%, 30% 70%, 40% 60%, 50% 65%, 60% 80%, 80% 85%, 90% 70%, 95% 50%, 85% 30%, 70% 20%, 60% 35%)',
              background: 'linear-gradient(135deg, #3b82f6, #9333ea, #ec4899)',
              opacity: 0.4,
            }}
          ></div>
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

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto p-8">
          <div className="h-20" />

          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">Choose Your Path</h1>
            <button
              onClick={onReset}
              className="bg-white px-4 py-2 rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-200 transition"
            >
              Start New Assessment
            </button>
          </div>

<div className="space-y-6 ">
  {roadmaps.map((roadmap) =>
    typeof roadmap.id !== 'undefined' ? (
      <div
        key={roadmap.id}
        className="relative bg-black/60 rounded-lg shadow-xl hover:shadow-2xl transition-shadow cursor-pointer p-6 backdrop-blur-xl p-8 rounded-2xl shadow-lg"
        onClick={() => handleSelect(roadmap)}
      >
        {/* Overlay for 10% white layer */}
        <div className="absolute inset-0 bg-white/10 rounded-lg pointer-events-none" />

        <div className="relative z-10">
          {/* Header with drop shadow */}
          <h2 className="text-2xl font-bold text-[#14b8a6] drop-shadow-md">{roadmap.careerTitle}</h2>

          <p className="text-lg font-semibold text-gray-200 mt-2">{roadmap.salary_range_php}</p>
          <p className="text-md text-gray-300 mt-4">{roadmap.reason}</p>
        </div>
      </div>
    ) : null
  )}
</div>
        </div>
      </div>
    </>
  );
}
