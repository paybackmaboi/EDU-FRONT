import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const API_URL = 'http://localhost:8000/api';

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      setSuccess('Account created successfully! Please log in.');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="py-4 px-8 flex items-center justify-between" style={{ background: 'linear-gradient(to right, #ed5de8, #d514ea)' }}>
        <div className="flex items-center">
          <span className="text-white text-4xl font-bold font-sans tracking-tight">tabadidoy</span>
        </div>
        <button onClick={() => navigate('/login')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded ml-2">Login</button>
      </div>
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        {/* Left Side */}
        <div className="w-full max-w-md mr-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">tabadidoy helps you </h2>
          <div className="bg-white rounded shadow p-6 flex items-center justify-center">
            {/* Placeholder for world map illustration */}
            <div className="w-64 h-40 bg-blue-100 rounded flex items-center justify-center text-blue-400 text-6xl">
              🌍
            </div>
          </div>
        </div>
        {/* Right Side - Sign Up Form */}
        <div className="w-full max-w-sm bg-white rounded shadow p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign Up</h2>
          <p className="text-gray-600 mb-4">It's free and anyone can join</p>
          <form className="space-y-3" onSubmit={handleSignUp}>
            <input type="email" placeholder="Email Address" className="w-full px-3 py-2 border rounded" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" className="w-full px-3 py-2 border rounded" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded mt-2" disabled={isLoading}>{isLoading ? 'Signing Up...' : 'Sign Up'}</button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?
              <button type="button" onClick={() => navigate('/login')} className="font-bold text-blue-600 hover:text-blue-800 ml-2">
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 