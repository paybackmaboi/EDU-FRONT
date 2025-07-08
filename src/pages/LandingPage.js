import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      <div className="py-4 px-8 flex items-center justify-between" style={{ background: 'linear-gradient(to right, #ed5de8, #d514ea)' }}>
        <div className="flex items-center">
          <span className="text-white text-4xl font-bold font-sans tracking-tight">tabadidoy</span>
        </div>
        <form className="flex items-center space-x-4" onSubmit={e => { e.preventDefault(); navigate('/login'); }}>
          <div className="flex items-end pb-1">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded ml-2">LOGIN</button>
          </div>
        </form>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-12">

        <div className="w-full max-w-md mr-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">tabadidoy helps you </h2>
          <div className="bg-white rounded shadow p-6 flex items-center justify-center">
            {/* Placeholder for world map illustration */}
            <div className="w-64 h-40 bg-blue-100 rounded flex items-center justify-center text-blue-400 text-6xl">
              🌍
            </div>
          </div>
        </div>
        <div className="w-full max-w-sm bg-white rounded shadow p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign Up</h2>
          <p className="text-gray-600 mb-4">It's free and anyone can join</p>
          <form className="space-y-3">
            <div className="flex space-x-2">
              <input type="text" placeholder="First Name" className="w-1/2 px-3 py-2 border rounded" />
              <input type="text" placeholder="Last Name" className="w-1/2 px-3 py-2 border rounded" />
            </div>
            <input type="email" placeholder="Your Email" className="w-full px-3 py-2 border rounded" />
            <input type="password" placeholder="New Password" className="w-full px-3 py-2 border rounded" />
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded mt-2">Sign Up</button>
          </form>
          <div className="mt-4 text-center">
            <a href="#" className="text-blue-700 text-sm font-semibold">tabadidoy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 