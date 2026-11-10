
import { useEffect, useState } from "react";
import chaptersData from "./data/chapter.json";

const STORAGE_KEY = "study-app-chapter-ratings";

const ratings = [
  {
    label: "Excellent",
    value: "excellent",
    color: "border-green-500/50 bg-green-500/10",
    active: "border-green-400 bg-green-500/20 text-green-300",
  },
  {
    label: "Good",
    value: "good",
    color: "border-blue-500/50 bg-blue-500/10",
    active: "border-blue-400 bg-blue-500/20 text-blue-300",
  },
  {
    label: "Average",
    value: "average",
    color: "border-yellow-500/50 bg-yellow-500/10",
    active: "border-yellow-400 bg-yellow-500/20 text-yellow-300",
  },
  {
    label: "Poor",
    value: "poor",
    color: "border-red-500/50 bg-red-500/10",
    active: "border-red-400 bg-red-500/20 text-red-300",
  },
];

function Chapter({ subject, onBack }) {
  const chapters = chaptersData[subject] || [];

  const [chapterRatings, setChapterRatings] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  });

  // Save ratings automatically
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(chapterRatings)
      );
    } catch (error) {
      console.error("Could not save chapter ratings:", error);
    }
  }, [chapterRatings]);

  // Update a chapter's rating
  function updateRating(chapter, rating) {
    const key = `${subject}::${chapter}`;

    setChapterRatings((previous) => ({
      ...previous,
      [key]: rating,
    }));
  }

  // Count rated chapters
  const ratedCount = chapters.filter(
    (chapter) => chapterRatings[`${subject}::${chapter}`]
  ).length;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-10 border-b border-gray-800 pb-6">
          <p className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-3">
            Personal Workspace / 03
          </p>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {subject.toUpperCase()}
            <span className="text-gray-500">.</span>
          </h1>

          <p className="text-gray-500 mt-3 text-sm">
            Track your preparation. Master every chapter.
          </p>
        </div>

        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          className="mb-8 text-sm text-gray-400 transition hover:text-white"
        >
          ← Back to Subjects
        </button>

        {/* Chapter Summary */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <h2 className="text-sm uppercase tracking-[0.25em] text-gray-400">
            Chapters
          </h2>

          <span className="text-xs text-gray-500 border border-gray-800 rounded-full px-3 py-1">
            {ratedCount}/{chapters.length} Rated
          </span>
        </div>

        {/* Rating Legend */}
        <div className="flex flex-wrap gap-2 mb-6">
          {ratings.map((rating) => (
            <span
              key={rating.value}
              className={`rounded-full border px-3 py-1 text-xs ${rating.color}`}
            >
              {rating.label}
            </span>
          ))}
        </div>

        {/* Chapter List */}
        <div className="space-y-4">
          {chapters.length > 0 ? (
            chapters.map((chapter, index) => {
              const key = `${subject}::${chapter}`;
              const selectedRating = chapterRatings[key];

              const selectedOption = ratings.find(
                (rating) => rating.value === selectedRating
              );

              return (
                <div
                  key={chapter}
                  className={`rounded-xl border p-5 transition-all duration-300 ${
                    selectedOption
                      ? selectedOption.color
                      : "border-gray-800 bg-gray-950"
                  }`}
                >
                  {/* Chapter Name */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-800 bg-black text-sm font-mono text-gray-400">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-medium text-gray-100">
                        {chapter}
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        {selectedOption
                          ? `Preparation: ${selectedOption.label}`
                          : "How well have you prepared?"}
                      </p>
                    </div>
                  </div>

                  {/* Rating Options */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {ratings.map((rating) => {
                      const isSelected =
                        selectedRating === rating.value;

                      return (
                        <button
                          key={rating.value}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() =>
                            updateRating(chapter, rating.value)
                          }
                          className={`rounded-lg border px-3 py-3 text-xs font-medium transition-all duration-200 ${
                            isSelected
                              ? rating.active
                              : "border-gray-800 bg-black/30 text-gray-400 hover:border-gray-600 hover:text-white"
                          }`}
                        >
                          {isSelected ? "✓ " : ""}
                          {rating.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-xl border border-dashed border-gray-800 bg-gray-950 px-6 py-14 text-center">
              <h3 className="text-lg font-medium text-gray-300">
                No chapters found
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                Check your chapter.json data file.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-10 flex items-center justify-between border-t border-gray-800 pt-5">
          <p className="text-xs tracking-wider text-gray-600">
            STUDY STATUS: ACTIVE
          </p>

          <span className="text-xs text-gray-500">
            {ratedCount === chapters.length && chapters.length > 0
              ? "All chapters rated"
              : `${chapters.length - ratedCount} chapters left to rate`}
          </span>
        </div>

      </div>
    </div>
  );
}

export default Chapter;
