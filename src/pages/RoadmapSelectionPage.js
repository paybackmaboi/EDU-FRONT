import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RoadmapSelectionPage({ roadmaps, onSelectRoadmap, onLogout }) {
    const navigate = useNavigate();

    const handleSelect = (roadmap) => {
        onSelectRoadmap(roadmap);
        navigate('/roadmap');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">Choose Your Path</h1>
                    <button onClick={onLogout} className="bg-white px-4 py-2 rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-200 transition">Logout</button>
                </div>
                <div className="space-y-6">
                    {roadmaps.map((roadmap) => (
                        <div key={roadmap.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleSelect(roadmap)}>
                            <h2 className="text-2xl font-bold text-blue-600">{roadmap.careerTitle}</h2>
                            <p className="text-lg font-semibold text-gray-700 mt-2">{roadmap.salary_range_php}</p>
                            <p className="text-md text-gray-600 mt-4">{roadmap.reason}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}