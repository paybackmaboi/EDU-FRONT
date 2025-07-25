import React, { useState } from 'react';

const LoginIllustration = () => (
    <>
        <style>{`
            @keyframes particle-flow {
                0% { transform: translate(0, 0); opacity: 0; }
                25% { opacity: 1; }
                75% { opacity: 1; }
                100% { transform: translate(140px, -140px); opacity: 0; }
            }
            .particle { animation: particle-flow 4s ease-in-out infinite; }
        `}</style>
        <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <defs>
                <linearGradient id="bgGradient" x1="0.5" y1="0" x2="0.5" y2="1">
                    <stop stopColor="#0f172a"/>
                    <stop offset="1" stopColor="#1e293b"/>
                </linearGradient>
            </defs>
            <rect width="512" height="512" rx="20" fill="url(#bgGradient)"/>
            <g transform="translate(120, 320)">
                <circle cx="30" cy="30" r="30" fill="#3B82F6"/>
                <path d="M22 25H38" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <path d="M22 35H32" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            </g>
            <g transform="translate(332, 160)">
                <circle cx="30" cy="30" r="30" fill="#10B981"/>
                <path d="M25 22L20 30L25 38" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <path d="M35 22L40 30L35 38" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            </g>
            <path d="M180 320 C 250 320, 262 190, 332 190" stroke="#9CA3AF" strokeWidth="4" strokeDasharray="8 8" />
            <g transform="translate(180, 320)">
                 <circle className="particle" r="6" fill="#F59E0B" style={{animationDelay: '0s'}}/>
                 <circle className="particle" r="6" fill="#EF4444" style={{animationDelay: '1s'}}/>
                 <circle className="particle" r="6" fill="#8B5CF6" style={{animationDelay: '2s'}}/>
                 <circle className="particle" r="6" fill="#EC4899" style={{animationDelay: '3s'}}/>
            </g>
        </svg>
    </>
);

const API_URL = 'https://edu-back-7z2n.onrender.com';

export default function AuthPage({ onLoginSuccess }) {
    const [authMode, setAuthMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAuthSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setIsLoading(true);

        const endpoint = authMode === 'login' ? '/api/users/login' : '/api/users/register';

        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            if (authMode === 'login') {
                onLoginSuccess(data);
            } else {
                setSuccessMessage('Account created successfully! Please log in.');
                setAuthMode('login');
                setEmail('');
                setPassword('');
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPasswordSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setIsLoading(true);
        setTimeout(() => {
            setSuccessMessage("If an account with that email exists, a password reset link has been sent.");
            setIsLoading(false);
        }, 1000);
    };

    const switchMode = (mode) => {
        setAuthMode(mode);
        setEmail('');
        setPassword('');
        setError('');
        setSuccessMessage('');
    };

    const renderFormContent = () => {
        const inputBaseClass = "w-full text-lg p-2 mt-1 bg-white/10 border-b-2 border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:border-[#14b8a6]";

        if (authMode === 'forgotPassword') {
            return (
                <>
                    <div className="mb-10">
                        <h3 className="text-3xl font-extrabold text-white">Reset Password</h3>
                        <p className="text-gray-300 mt-2">Enter your email to receive a reset link.</p>
                    </div>
                    <form onSubmit={handleForgotPasswordSubmit} className="space-y-6">
                        <div>
                            <label className="text-sm font-bold text-white tracking-wide">Email Address</label>
                            <input
                                className={inputBaseClass}
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        {successMessage && <p className="text-green-400 text-center text-sm font-semibold">{successMessage}</p>}
                        <div>
                            <button className="w-full bg-[#14b8a6] hover:bg-[#0d9488] text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:scale-105" type="submit" disabled={isLoading}>
                                {isLoading ? 'Sending...' : 'Send Reset Link'}
                            </button>
                        </div>
                        <p className="text-center text-gray-400 text-sm">
                            Remembered your password?
                            <button type="button" onClick={() => switchMode('login')} className="font-bold text-[#14b8a6] hover:text-white ml-2">
                                Back to Login
                            </button>
                        </p>
                    </form>
                </>
            );
        }

        return (
            <>
                <div className="mb-10">
                    <h3 className="text-3xl font-extrabold text-white">{authMode === 'login' ? "Welcome Back!" : "Create Your Account"}</h3>
                    <p className="text-gray-300 mt-2">{authMode === 'login' ? "Please login to continue." : "Get started in just a few clicks."}</p>
                </div>
                <form onSubmit={handleAuthSubmit} className="space-y-6">
                    <div>
                        <label className="text-sm font-bold text-white tracking-wide">Email Address</label>
                        <input
                            className={inputBaseClass}
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-white tracking-wide">Password</label>
                        <input
                            className={inputBaseClass}
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {authMode === 'login' && (
                        <div className="text-right">
                            <button type="button" onClick={() => switchMode('forgotPassword')} className="text-sm font-semibold text-[#14b8a6] hover:text-white">Forgot password?</button>
                        </div>
                    )}
                    {error && <p className="text-red-400 text-center text-sm">{error}</p>}
                    {successMessage && <p className="text-green-400 text-center text-sm font-semibold">{successMessage}</p>}
                    <div>
                        <button className="w-full bg-[#14b8a6] hover:bg-[#0d9488] text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:scale-105" type="submit" disabled={isLoading}>
                            {isLoading ? 'Processing...' : (authMode === 'login' ? 'Login' : 'Create Account')}
                        </button>
                    </div>
                    <p className="text-center text-gray-400 text-sm">
                        {authMode === 'login' ? "Don't have an account?" : "Already have an account?"}
                        <button type="button" onClick={() => switchMode(authMode === 'login' ? 'register' : 'login')} className="font-bold text-[#14b8a6] hover:text-white ml-2">
                            {authMode === 'login' ? 'Sign Up' : 'Login'}
                        </button>
                    </p>
                </form>
            </>
        );
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0" style={{
                    clipPath: 'polygon(60% 35%, 45% 30%, 35% 20%, 30% 10%, 20% 15%, 10% 25%, 5% 50%, 20% 60%, 30% 70%, 40% 60%, 50% 65%, 60% 80%, 80% 85%, 90% 70%, 95% 50%, 85% 30%, 70% 20%, 60% 35%)',
                    background: 'linear-gradient(135deg, #3b82f6, #9333ea, #ec4899)',
                    opacity: 0.3,
                    filter: 'blur(10vw)'
                }} />
                <div className="absolute inset-0" style={{
                    clipPath: 'polygon(70% 40%, 50% 35%, 35% 25%, 25% 10%, 10% 20%, 5% 40%, 10% 60%, 30% 70%, 45% 65%, 60% 75%, 75% 70%, 90% 50%, 85% 30%, 70% 20%, 60% 35%)',
                    background: 'linear-gradient(135deg, #22d3ee, #14b8a6, #84cc16)',
                    transform: 'rotate(180deg)',
                    opacity: 0.3,
                    filter: 'blur(10vw)'
                }} />
            </div>

            <div className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2 relative z-10 backdrop-blur-lg bg-white/10">
                <div className="text-white p-8 md:p-12 flex flex-col justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-[#14b8a6]">BPO Tech Bridge AI</h2>
                        <p className="mt-2 text-gray-200">Your personalized journey from BPO to a career in Technology starts here.</p>
                    </div>
                    <div className="my-8">
                        <LoginIllustration />
                    </div>
                    <p className="text-sm text-gray-400">Unlock your potential with our AI-powered career guidance.</p>
                </div>

                <div className="p-8 md:p-12 flex flex-col justify-center">
                    {renderFormContent()}
                </div>
            </div>
        </div>
    );
}
