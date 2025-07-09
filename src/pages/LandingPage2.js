import React from 'react';
import { Link } from 'react-router-dom';

// This component contains the entire landing page structure.
export default function LandingPage2() {
    return (
        <div className="bg-gray-100 text-gray-800">
            <style>{`
                html {
                    scroll-behavior: smooth;
                }
                .hero-bg {
                    background-image: url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2832&auto=format&fit=crop');
                }
                .section-bg-1 {
                    background-image: url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2832&auto=format&fit=crop');
                }
                .section-bg-2 {
                    background-image: url('https://images.unsplash.com/photo-1531297484001-80022131c5a9?q=80&w=2820&auto=format&fit=crop');
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .fade-in {
                    animation: fadeIn 1s ease-out forwards;
                    opacity: 0; /* Start hidden */
                }
                .fade-in-delay-1 { animation-delay: 0.2s; }
                .fade-in-delay-2 { animation-delay: 0.4s; }
            `}</style>

            {/* Header */}
            <header className="bg-white/80 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 shadow-sm">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-600">BPO Tech Bridge AI</h1>
                    <nav className="hidden md:flex space-x-8">
                        <a href="#about" className="text-gray-600 hover:text-blue-600 transition">About</a>
                        <a href="#features" className="text-gray-600 hover:text-blue-600 transition">Features</a>
                        <a href="#start" className="text-gray-600 hover:text-blue-600 transition">Get Started</a>
                    </nav>
                    <Link to="/login" className="bg-blue-600 text-white font-bold px-6 py-2 rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105">
                        Login
                    </Link> 
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero-bg bg-cover bg-center h-screen flex items-center justify-center text-white">
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative text-center p-6 z-10">
                    <h2 className="text-5xl md:text-7xl font-black leading-tight fade-in [text-shadow:_0_4px_8px_rgb(0_0_0_/_40%)]">
                        Bridge Your BPO Career to the World of Technology
                    </h2>
                    <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto opacity-90 fade-in fade-in-delay-1 [text-shadow:_0_2px_4px_rgb(0_0_0_/_40%)]">
                        Leverage your valuable experience to launch a high-growth career in tech. Our AI-powered platform creates a personalized roadmap just for you.
                    </p>
                    <a href="#about" className="mt-10 inline-block bg-blue-600 text-white font-bold text-lg px-10 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 shadow-2xl fade-in fade-in-delay-2">
                        Get Started Now
                    </a>
                </div>
            </section>

            {/* Section 1: The Problem & Solution */}
            <section id="about" className="relative section-bg-1 bg-cover bg-center py-20 md:py-32">
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="text-center md:text-left">
                            <h3 className="text-4xl md:text-5xl font-bold text-gray-900">From Call Center to Code</h3>
                            <p className="mt-6 text-lg text-gray-700">
                                The BPO industry has equipped you with world-class skills in problem-solving, communication, and process management. Yet, the path to a tech career can seem unclear and overwhelming.
                            </p>
                            <p className="mt-4 text-lg text-gray-700">
                                **BPO Tech Bridge AI** closes this "guidance gap." We analyze your unique BPO experience and use AI to build a personalized, step-by-step bridge to your new career in technology, ensuring your valuable skills are not just recognized, but become your greatest asset.
                            </p>
                        </div>
                        <div>
                            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" alt="Team collaborating on a project" className="rounded-2xl shadow-2xl w-full h-auto" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: How It Works (Features) */}
            <section id="features" className="relative section-bg-2 bg-cover bg-center py-20 md:py-32 text-white">
                 <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h3 className="text-4xl md:text-5xl font-bold">Your Personalized Journey in 3 Steps</h3>
                        <p className="mt-4 text-lg opacity-80">We make the transition simple, clear, and supportive.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="bg-white/10 p-8 rounded-2xl border border-white/20 backdrop-blur-lg text-center">
                            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-blue-500 rounded-full mb-6">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
                            </div>
                            <h4 className="text-2xl font-bold mb-2">AI-Powered Assessment</h4>
                            <p className="opacity-80">Our AI analyzes your BPO job title and a quick logic quiz to identify your core strengths and best-fit tech career paths.</p>
                        </div>
                        {/* Step 2 */}
                        <div className="bg-white/10 p-8 rounded-2xl border border-white/20 backdrop-blur-lg text-center">
                             <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-500 rounded-full mb-6">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <h4 className="text-2xl font-bold mb-2">Custom Learning Roadmap</h4>
                            <p className="opacity-80">Receive a personalized, step-by-step learning plan with curated resources from YouTube, TESDA, and more to build your new skills.</p>
                        </div>
                        {/* Step 3 */}
                        <div className="bg-white/10 p-8 rounded-2xl border border-white/20 backdrop-blur-lg text-center">
                             <div className="flex items-center justify-center w-16 h-16 mx-auto bg-purple-500 rounded-full mb-6">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h2m6-4v4m-6 4v4m-6-4v4"></path></svg>
                            </div>
                            <h4 className="text-2xl font-bold mb-2">Continuous Support</h4>
                            <p className="opacity-80">Chat with our Gabay AI for guidance, find relevant job opportunities, and track market trends with our analytics dashboard.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: Call to Action */}
            <section id="start" className="bg-gray-100 py-20 md:py-32">
                <div className="container mx-auto px-6 text-center">
                    <h3 className="text-4xl md:text-5xl font-bold text-gray-900">Ready to Build Your Future?</h3>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Your skills are valuable. Your potential is limitless. Take the first step today and let our AI guide you to a successful career in technology.
                    </p>
                    <Link to="/login" className="mt-10 inline-block bg-blue-600 text-white font-bold text-lg px-10 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 shadow-lg">
                        Create Your Free Account
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white">
                <div className="container mx-auto px-6 py-8 text-center">
                    <p className="text-lg font-semibold">BPO Tech Bridge AI</p>
                    <p className="mt-2 text-sm opacity-60">&copy; 2025 BPO Tech Bridge AI. All Rights Reserved. A Hackathon Project.</p>
                    <div className="mt-6 flex justify-center space-x-6">
                        <a href="/" className="opacity-70 hover:opacity-100 transition">Facebook</a>
                        <a href="/" className="opacity-70 hover:opacity-100 transition">Twitter</a>
                        <a href="/" className="opacity-70 hover:opacity-100 transition">LinkedIn</a>
                    </div>
                </div>
            </footer>
        </div>
    );
} 