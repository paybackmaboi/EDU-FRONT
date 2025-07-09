import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import AssessmentPage from './pages/AssessmentPage';
import RoadmapPage from './pages/RoadmapPage';

export default function App() {
    const [userInfo, setUserInfo] = useState(null);
    const [roadmapData, setRoadmapData] = useState(null);
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
        setRoadmapData(null);
        navigate('/'); // Navigate to landing page on logout
    };
    
    const handleAssessmentComplete = (data) => {
        setRoadmapData(data);
        navigate('/roadmap');
    };
    
    const handleReset = () => {
        setRoadmapData(null);
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

            <Route path="/roadmap" element={
                <ProtectedRoute>
                    {roadmapData ? (
                        <RoadmapPage 
                            roadmapData={roadmapData} 
                            onReset={handleReset} 
                            onLogout={handleLogout}
                            userInfo={userInfo}
                        />
                    ) : (
                        <Navigate to="/assessment" />
                    )}
                </ProtectedRoute>
            } />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}
