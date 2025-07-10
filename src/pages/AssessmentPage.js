import React, { useState } from 'react';
import SearchableDropdown from '../components/SearchableDropdown';
import { ICONS, BPO_JOB_TITLES, QUIZ_QUESTIONS } from '../constants';

const API_URL = 'http://localhost:8000/api';

const Icon = ({ path, className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
);

export default function AssessmentPage({ onAssessmentComplete, userInfo, onLogout }) {
    const [step, setStep] = useState(1);
    const [selectedJob, setSelectedJob] = useState('');
    const [otherJobTitle, setOtherJobTitle] = useState('');
    const [answers, setAnswers] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [validationError, setValidationError] = useState('');

    const finalJobTitle = selectedJob === 'Other' ? otherJobTitle : selectedJob;

    const handleJobTitleSubmit = (e) => {
        e.preventDefault();
        setValidationError(''); 
        if (!finalJobTitle.trim()) {
            setValidationError('Please select or specify your job title before proceeding.');
            return;
        }
        setStep(2);
    };

    const handleAnswerChange = (questionIndex, answer) => {
        setAnswers(prev => ({ ...prev, [questionIndex]: answer }));
    };

    const handleQuizSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(answers).length < QUIZ_QUESTIONS.length) {
            setError("Please answer all questions before submitting.");
            return;
        }
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_URL}/assessments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`
                },
                body: JSON.stringify({ jobTitle: finalJobTitle, quizScore: 5 })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to generate roadmap.');
            onAssessmentComplete(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div 
            className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-4 font-sans"
            style={{backgroundImage: "url('https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=2070&auto=format&fit=crop')"}}
        >
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute top-4 right-4 z-10 flex items-center space-x-4">
                <span className="text-sm font-semibold text-white hidden sm:block">Welcome, {userInfo.email}</span>
                <button onClick={onLogout} className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold text-white hover:bg-white/30 transition">Logout</button>
            </div>
            <div className="relative w-full max-w-2xl mx-auto">
                {step === 1 && (
                    <div className="text-center p-4">
                        <h1 className="text-4xl font-bold text-white [text-shadow:_0_2px_4px_rgb(0_0_0_/_40%)]">Let's Chart Your Course</h1>
                        <p className="mt-4 text-lg text-white/90 [text-shadow:_0_1px_2px_rgb(0_0_0_/_30%)]">Your journey to a tech career begins with one question.</p>
                        <p className="mt-2 text-md text-white/80 [text-shadow:_0_1px_2px_rgb(0_0_0_/_30%)]">What is your current or most recent BPO job title?</p>
                        <form onSubmit={handleJobTitleSubmit} className="mt-8 max-w-lg mx-auto">
                            <div className="space-y-4">
                                <SearchableDropdown
                                    options={BPO_JOB_TITLES}
                                    value={selectedJob}
                                    onChange={setSelectedJob}
                                    placeholder="Select or search for your job title..."
                                />
                                {selectedJob === 'Other' && (
                                     <input
                                        type="text"
                                        value={otherJobTitle}
                                        onChange={(e) => setOtherJobTitle(e.target.value)}
                                        className="w-full px-6 py-4 text-lg text-gray-700 bg-white border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 animate-fade-in-up"
                                        placeholder="Please specify your job title"
                                        required
                                    />
                                )}
                            </div>
                            {validationError && <p className="text-red-500 text-sm mt-4">{validationError}</p>}
                            <button type="submit" className="mt-6 w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={!finalJobTitle.trim()}>
                                <span>Next: Quiz</span>
                                <Icon path={ICONS.ARROW_RIGHT} className="w-5 h-5 ml-2" />
                            </button>
                        </form>
                    </div>
                )}
                {step === 2 && (
                    <div className="bg-white p-8 rounded-2xl shadow-lg animate-fade-in-up">
                        <h2 className="text-2xl font-bold text-center mb-1">Quick Logic Quiz</h2>
                        <p className="text-center text-gray-600 mb-6">Let's gauge your problem-solving skills.</p>
                        <form onSubmit={handleQuizSubmit}>
                            {QUIZ_QUESTIONS.map((q, index) => (
                                <div key={index} className="mb-6">
                                    <p className="font-semibold mb-2 text-gray-800">{index + 1}. {q.question}</p>
                                    <div className="space-y-2">
                                        {q.options.map(option => (
                                            <label key={option} className="flex items-center p-3 rounded-lg bg-gray-50 border-2 border-gray-200 has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500 transition-all cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name={`question-${index}`}
                                                    value={option}
                                                    checked={answers[index] === option}
                                                    onChange={() => handleAnswerChange(index, option)}
                                                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                />
                                                <span className="ml-3 text-gray-700">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105" disabled={isLoading || Object.keys(answers).length < QUIZ_QUESTIONS.length}>
                                {isLoading ? "Our AI is Building Your Path..." : "Submit & See My Career Path"}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}