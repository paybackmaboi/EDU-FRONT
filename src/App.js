import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import AssessmentPage from './pages/AssessmentPage';
import RoadmapPage from './pages/RoadmapPage';
import RoadmapSelectionPage from './pages/RoadmapSelectionPage';

export default function App() {
    const [userInfo, setUserInfo] = useState(null);
    const [roadmapOptions, setRoadmapOptions] = useState([]);
    const [selectedRoadmap, setSelectedRoadmap] = useState(null);
    const navigate = useNavigate();

    // Check for logged-in user on initial load
    useEffect(() => {
        const storedUser = localStorage.getItem('bpo_tech_bridge_user');
        if (storedUser) {
            setUserInfo(JSON.parse(storedUser));
        }
    }, []);

    const handleLoginSuccess = (userData) => {
        localStorage.setItem('bpo_tech_bridge_user', JSON.stringify(userData));
        setUserInfo(userData);
        navigate('/assessment');
    };

    const handleLogout = () => {
        localStorage.removeItem('bpo_tech_bridge_user');
        setUserInfo(null);
        setRoadmapOptions([]);
        setSelectedRoadmap(null);
        navigate('/'); // Navigate to landing page on logout
    };
    
    const handleAssessmentComplete = (data) => {
        setRoadmapOptions(data.roadmaps);
        navigate('/roadmap-selection');
    };

    const handleSelectRoadmap = (roadmap) => {
        setSelectedRoadmap(roadmap);
    };
    
    const handleReset = () => {
        setRoadmapOptions([]);
        setSelectedRoadmap(null);
        navigate('/assessment');
    }

    // A component to protect routes that require authentication
    const ProtectedRoute = ({ children }) => {
        if (!userInfo) {
            return <Navigate to="/login" replace />;
        }
        return children;
    };

    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            
            <Route path="/login" element={
                userInfo ? <Navigate to="/assessment" /> : <AuthPage onLoginSuccess={handleLoginSuccess} />
            } />
            
            <Route path="/assessment" element={
                <ProtectedRoute>
                    <AssessmentPage 
                        onAssessmentComplete={handleAssessmentComplete} 
                        onLogout={handleLogout}
                        userInfo={userInfo}
                    />
                </ProtectedRoute>
            } />

            <Route path="/roadmap-selection" element={
                <ProtectedRoute>
                    <RoadmapSelectionPage
                        userInfo={userInfo}
                        roadmaps={roadmapOptions}
                        onSelectRoadmap={handleSelectRoadmap}
                        onReset={handleReset}
                        onLogout={handleLogout}
                    />
                </ProtectedRoute>
            } />

            <Route path="/roadmap" element={
                <ProtectedRoute>
                    {selectedRoadmap ? (
                        <RoadmapPage 
                            roadmapData={selectedRoadmap} 
                            onReset={handleReset} 
                            onLogout={handleLogout}
                            userInfo={userInfo}
                        />
                    ) : (
                        <Navigate to="/roadmap-selection" />
                    )}
                </ProtectedRoute>
            } />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}