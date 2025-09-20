import { useState } from 'react';
import axios from 'axios';

export default function UploadSection({ setResult }) {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!resumeFile || !jobDescription.trim()) {
      setError('Please upload a resume and enter job description.');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jobDescription', jobDescription);

    try {
      const response = await axios.post('http://localhost:3000/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data.result);
    } catch (err) {
      setError('Failed to analyze. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
   
      <div className="w-full items-center justify-center max-w-2xl bg-gray-950 p-8 rounded-xl shadow-2xl border border-gray-700 space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center">Resume Analyzer</h1>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Upload Resume (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setResumeFile(e.target.files[0])}
            className="block w-full text-sm text-gray-300 bg-gray-800 border border-gray-600 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Submit Job Description</label>
          <textarea
            rows="6"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste job description here..."
            className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-md font-semibold transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Submit'}
        </button>

        {error && <p className="text-red-400 text-center">{error}</p>}
      </div>
   
  );
}
