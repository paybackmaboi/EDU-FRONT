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
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState('');

  const finalJobTitle = selectedJob === 'Other' ? otherJobTitle : selectedJob;
  const isLast = currentQuestion === QUIZ_QUESTIONS.length - 1;
  const currentQ = QUIZ_QUESTIONS[currentQuestion];

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
    setError('');
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
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center p-4 font-sans overflow-hidden bg-black">

      {/* Animated Background */}
      <div className="absolute inset-0 grid z-0" style={{ filter: "blur(10vw)" }}>
        <div
          className="absolute inset-0 mx-auto"
          style={{
            clipPath:
              "polygon(60% 35%, 45% 30%, 35% 20%, 30% 10%, 20% 15%, 10% 25%, 5% 50%, 20% 60%, 30% 70%, 40% 60%, 50% 65%, 60% 80%, 80% 85%, 90% 70%, 95% 50%, 85% 30%, 70% 20%, 60% 35%)",
            background: "linear-gradient(135deg, #3b82f6, #9333ea, #ec4899)",
            animation: "spin 20s linear infinite",
            opacity: 0.4,
          }}
        ></div>
        <div
          className="absolute inset-0 mx-auto"
          style={{
            clipPath:
              "polygon(70% 40%, 50% 35%, 35% 25%, 25% 10%, 10% 20%, 5% 40%, 10% 60%, 30% 70%, 45% 65%, 60% 75%, 75% 70%, 90% 50%, 85% 30%, 70% 20%, 60% 35%)",
            background: "linear-gradient(135deg, #22d3ee, #14b8a6, #84cc16)",
            animation: "spinReverse 15s linear infinite",
            transform: "rotate(180deg)",
            opacity: 0.5,
          }}
        ></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-[999]">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>
        <div className="relative z-10 bg-white/10 backdrop-blur-lg shadow-md">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="text-2xl font-bold text-white drop-shadow">BPO Tech Bridge AI</div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-semibold text-white hidden sm:block">
                  Welcome, {userInfo.email}
                </span>
                <button onClick={onLogout} className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm font-semibold text-white transition">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Space below fixed header */}
      <div className="h-20" />

      <div className="relative z-20 w-full max-w-2xl mx-auto">
        {step === 1 && (
          <div className="text-center p-4">
            <h1 className="text-4xl font-bold text-white">Let's Chart Your Course</h1>
            <p className="mt-4 text-lg text-white/90">Your journey to a tech career begins with one question.</p>
            <p className="mt-2 text-md text-white/80">What is your current or most recent BPO job title?</p>
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
                    className="w-full px-6 py-4 text-lg text-gray-700 bg-white border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
          <div className="bg-black/60 backdrop-blur-xl p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-1 text-white">Quick Logic Quiz</h2>
            <p className="text-center text-gray-300 mb-6">Let's gauge your problem-solving skills.</p>
            <form onSubmit={handleQuizSubmit}>
              <p className="text-sm text-center text-gray-400 mb-4">
                Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
              </p>
              <div className="mb-6">
                <p className="font-semibold mb-2 text-white">
                  {currentQuestion + 1}. {currentQ.question}
                </p>

                {/* Updated Choices Styling */}
                <div className="space-y-2">
                  {currentQ.options.map((option) => (
                    <label
                      key={option}
                      className={`flex items-center p-4 rounded-lg bg-white/20 border-2 transition-all cursor-pointer 
                        ${
                          answers[currentQuestion] === option
                            ? 'border-[#14b8a6] bg-[#14b8a6]/20'
                            : 'border-white/20 hover:border-[#14b8a6]'
                        }`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion}`}
                        value={option}
                        checked={answers[currentQuestion] === option}
                        onChange={() => handleAnswerChange(currentQuestion, option)}
                        className="w-4 h-4 text-[#14b8a6] bg-gray-100 border-gray-300 focus:ring-[#14b8a6]"
                      />
                      <span className="ml-3 text-white text-base">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {error && <p className="text-red-500 text-center mb-4">{error}</p>}
              <div className="flex justify-between items-center gap-4">
                {currentQuestion > 0 && (
                  <button type="button" onClick={() => setCurrentQuestion((prev) => prev - 1)} className="w-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition">
                    Back
                  </button>
                )}
                {!isLast ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (answers[currentQuestion]) {
                        setCurrentQuestion((prev) => prev + 1);
                      } else {
                        setError("Please select an answer before continuing.");
                      }
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105"
                    disabled={isLoading || Object.keys(answers).length < QUIZ_QUESTIONS.length}
                  >
                    {isLoading ? "Our AI is Building Your Path..." : "Submit & See My Career Path"}
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
