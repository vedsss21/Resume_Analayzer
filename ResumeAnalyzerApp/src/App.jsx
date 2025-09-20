import { useState } from 'react';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import CareerChatWidget from './components/CareerChatWidget';
import ResultCard from './components/ResultCard';
import DSAQuestionGenerator from './components/DSAQuestionGenerator';

export default function App() {
  const [result, setResult] = useState('');
  const [activeSection, setActiveSection] = useState('welcome'); // default view

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header setActiveSection={setActiveSection} />

      <div className="max-w-3xl mx-auto p-4 space-y-12">
        {activeSection === 'welcome' && (
          <div className="text-center mt-32">
            <h1 className="text-4xl font-bold text-indigo-400">Welcome to the Prototype of NeroPrep</h1>
            <p className="mt-4 text-lg text-gray-300">Select a feature from the menu to get started.</p>
          </div>
        )}

        {activeSection === 'resume-analyzer' && (
          <>
            <UploadSection setResult={setResult} />
            <ResultCard result={result} />
          </>
        )}

        {activeSection === 'dsa-generator' && <DSAQuestionGenerator />}

        {activeSection === 'career-chat' && <CareerChatWidget />}
      </div>
    </div>
  );
}
