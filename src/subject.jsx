import { useState } from "react";
import Chapter from "./chapters";

const subjects = [
  "Math",
  "Physics",
  "Chemistry",
  "Computer Science",
  "English",
];

function Subjects({ onBack }) {
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Display chapters when a subject is selected
  if (selectedSubject) {
    return (
      <Chapter
        subject={selectedSubject}
        onBack={() => setSelectedSubject(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 border-b border-gray-800 pb-6">
                    <button
type="button"
onClick={onBack}
className="mb-8 flex items-center gap-2 text-sm text-gray-500 transition hover:text-white"

>

<span className="text-lg">←</span> <span>Back to Dashboard</span> </button>

          <p className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-3">
            Personal Workspace / 02
          </p>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            SUBJECTS<span className="text-gray-500">.</span>
          </h1>

          <p className="text-gray-500 mt-3 text-sm">
            Choose a subject. Focus on your learning.
          </p>
        </div>

        {/* Subject Section */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm uppercase tracking-[0.25em] text-gray-400">
            Your Subjects
          </h2>

          <span className="text-xs text-gray-500 border border-gray-800 rounded-full px-3 py-1">
            {subjects.length} Subjects
          </span>
        </div>

        {/* Subject List */}
        <div className="space-y-4">
          {subjects.map((subject, index) => (
            <button
              key={subject}
              type="button"
              onClick={() => setSelectedSubject(subject)}
              className="group flex w-full items-center gap-4 rounded-xl border border-gray-800 bg-gray-950 p-5 text-left transition-all duration-300 hover:border-gray-500 hover:bg-gray-900"
            >
              {/* Subject Number */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-800 bg-black text-sm font-mono text-gray-500 transition-colors group-hover:text-white">
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Subject Name */}
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-medium text-gray-100">
                  {subject}
                </h3>
              </div>

              {/* Arrow */}
              <span className="text-xl text-gray-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white">
                →
              </span>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-10 flex items-center justify-between border-t border-gray-800 pt-5">
          <p className="text-xs tracking-wider text-gray-600">
            SYSTEM STATUS: ACTIVE
          </p>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]" />

            <span className="text-xs text-gray-500">
              Ready to learn
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Subjects;
