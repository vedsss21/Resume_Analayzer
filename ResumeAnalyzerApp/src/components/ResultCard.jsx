import React from "react";

export default function ResultCard({ result }) {
  if (!result) return null;

  // Directly use the JSON coming from backend
  const matchScore = result.match_score ?? "N/A";
  const missingSkills = result.missing_skills ?? [];
  const suggestions = result.suggestions ?? [];

  return (
    <div className="bg-white/10 backdrop-blur-md text-white p-6 rounded-xl shadow-2xl border border-white/20 mt-6 space-y-8 transition-all duration-300">
      <h3 className="text-3xl font-bold text-indigo-400 flex items-center gap-2">
        📊 Analysis Result
      </h3>

      {/* Match Score */}
      <div>
        <h4 className="text-lg font-semibold text-indigo-300 mb-1 flex items-center gap-2">
          🎯 Match Score
        </h4>
        <p className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg font-semibold shadow-md">
          {matchScore}
        </p>
      </div>

      {/* Missing Skills */}
      <div>
        <h4 className="text-lg font-semibold text-yellow-300 mb-2 flex items-center gap-2">
          ⚠️ Missing Skills
        </h4>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-100">
          {missingSkills.length > 0 ? (
            missingSkills.map((skill, idx) => (
              <li key={idx} className="hover:text-yellow-200 transition">
                {skill}
              </li>
            ))
          ) : (
            <li className="text-gray-400">No missing skills listed.</li>
          )}
        </ul>
      </div>

      {/* Suggestions */}
      <div>
        <h4 className="text-lg font-semibold text-green-300 mb-2 flex items-center gap-2">
          💡 Suggestions
        </h4>
        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-100">
          {suggestions.length > 0 ? (
            suggestions.map((tip, idx) => (
              <li key={idx} className="hover:text-green-200 transition">
                {tip}
              </li>
            ))
          ) : (
            <li className="text-gray-400">No suggestions provided.</li>
          )}
        </ol>
      </div>
    </div>
  );
}
