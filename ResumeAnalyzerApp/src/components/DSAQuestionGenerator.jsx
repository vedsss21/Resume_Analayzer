import { useState } from 'react';
import axios from 'axios';
import { SparklesIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

export default function DSAQuestionGenerator() {
  const [topic, setTopic] = useState('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setQuestion('');
    setError('');

    try {
      const res = await axios.post('http://localhost:3000/generate-question', { topic });
      setQuestion(res.data.question);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 text-white space-y-6">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-indigo-400 flex items-center gap-2">
        <SparklesIcon className="h-6 w-6 text-indigo-300" />
        DSA Question Generator
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter topic (e.g., Graphs, DP)"
          className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-3 rounded-lg font-semibold hover:scale-105 transition disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Question'}
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-red-400 bg-red-900/30 p-3 rounded-lg text-sm">
          <ExclamationCircleIcon className="h-5 w-5" />
          {error}
        </div>
      )}

      {/* Question Output */}
      {question && (
        <div className="mt-4 p-4 bg-gray-900 border border-indigo-500 rounded-lg text-sm font-mono whitespace-pre-wrap overflow-auto max-h-96 shadow-inner">
          {question}
        </div>
      )}
    </div>
  );
}
