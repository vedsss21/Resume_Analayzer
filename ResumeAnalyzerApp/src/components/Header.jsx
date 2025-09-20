import React from 'react';

const Header = ({ setActiveSection }) => {
  return (
    <header className="w-screen bg-indigo-600 text-white p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => setActiveSection('welcome')}
        >
          SmartPrep
        </h1>

        <nav className="space-x-6 text-sm md:text-base font-medium">
          <button onClick={() => setActiveSection('resume-analyzer')} className="hover:underline">
            Resume Analyzer
          </button>
          <button onClick={() => setActiveSection('career-chat')} className="hover:underline">
            Career Chatbot
          </button>
          <button onClick={() => setActiveSection('dsa-generator')} className="hover:underline">
            DSA Generator
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
