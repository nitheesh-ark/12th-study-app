
import { useEffect, useState } from "react";

const STORAGE_KEY = "study-app-exam-date";

function getSavedDate() {
  try {
    return localStorage.getItem(STORAGE_KEY) || "";
  } catch {
    return "";
  }
}

function ExamCountdown({ onBack }) {
  const [examDate, setExamDate] = useState(getSavedDate);
  const [inputDate, setInputDate] = useState(getSavedDate);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isEditing, setIsEditing] = useState(!getSavedDate());

  // Save the selected exam date locally
  useEffect(() => {
    try {
      if (examDate) {
        localStorage.setItem(STORAGE_KEY, examDate);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.error("Could not save exam date:", error);
    }
  }, [examDate]);

  // Update countdown every second
  useEffect(() => {
    function updateCountdown() {
      if (!examDate) {
        setTimeLeft(null);
        return;
      }

      const target = new Date(`${examDate}T00:00:00`).getTime();
      const difference = target - Date.now();

      if (!Number.isFinite(target) || difference <= 0) {
        setTimeLeft({
          expired: true,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      );
      const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
      );
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        expired: false,
        days,
        hours,
        minutes,
        seconds,
      });
    }

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [examDate]);

  function saveExamDate(event) {
    event.preventDefault();

    if (!inputDate) return;

    setExamDate(inputDate);
    setIsEditing(false);
  }

  function formatDate(date) {
    if (!date) return "";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  return (
          <div className="min-h-screen overflow-hidden bg-black px-5 py-8 text-white sm:px-8 sm:py-12">
                {/* Back to Dashboard */}
          <button
            type="button"
            onClick={onBack}
            className="mb-8 flex items-center gap-2 text-sm text-gray-500 transition hover:text-white"
          >
  <span className="text-lg">←</span>
  <span>Back to Dashboard</span>
</button>
      <div className="mx-auto flex min-h-[85vh] max-w-5xl flex-col">

        {/* Top Navigation */}
        <header className="flex items-center justify-between border-b border-gray-800 pb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gray-500">
              Personal Workspace / 04
            </p>

            <h1 className="mt-2 text-lg font-semibold tracking-tight">
              EXAM<span className="text-gray-500">.TIME</span>
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
            <span className="text-xs uppercase tracking-widest text-gray-500">
              Countdown Active
            </span>
          </div>
        </header>

        {/* Main Countdown */}
        <main className="flex flex-1 flex-col justify-center py-16">

          <div className="mb-10 text-center">
            <p className="mb-5 text-xs uppercase tracking-[0.5em] text-gray-500 sm:text-sm">
              Every second counts
            </p>

            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
              YOUR FUTURE
              <br />
              <span className="text-gray-500">STARTS NOW.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
              Stay focused. Make every day count. Your exam is a goal,
              not a guess.
            </p>
          </div>

          {/* Countdown Display */}
          {timeLeft && !timeLeft.expired ? (
            <div className="mx-auto w-full max-w-4xl">

              {/* Large Days */}
              <div className="relative mb-5 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] px-5 py-8 text-center sm:px-10 sm:py-12">
                <p className="mb-3 text-xs uppercase tracking-[0.5em] text-gray-500">
                  Time Remaining
                </p>

                <div
                  className="text-8xl font-semibold leading-none tracking-[-0.08em] sm:text-[11rem] md:text-[13rem]"
                  aria-live="off"
                >
                  {timeLeft.days}
                </div>

                <p className="mt-5 text-sm font-medium uppercase tracking-[0.6em] text-gray-400">
                  Days
                </p>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              </div>

              {/* Smaller Units */}
              <div className="grid grid-cols-3 gap-3 sm:gap-5">
                {[
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Minutes", value: timeLeft.minutes },
                  { label: "Seconds", value: timeLeft.seconds },
                ].map((unit) => (
                  <div
                    key={unit.label}
                    className="rounded-2xl border border-gray-800 bg-gray-950 px-2 py-5 text-center sm:px-5 sm:py-7"
                  >
                    <p className="text-3xl font-medium tabular-nums tracking-tight sm:text-5xl md:text-6xl">
                      {String(unit.value).padStart(2, "0")}
                    </p>

                    <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-gray-500 sm:text-xs sm:tracking-[0.35em]">
                      {unit.label}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          ) : (
            <div className="mx-auto w-full max-w-3xl rounded-3xl border border-gray-800 bg-gray-950 px-5 py-12 text-center sm:px-10">
              <p className="text-xs uppercase tracking-[0.4em] text-gray-500">
                {timeLeft?.expired ? "The countdown has ended" : "Your next milestone"}
              </p>

              <h3 className="mt-5 text-3xl font-semibold sm:text-5xl">
                {timeLeft?.expired ? "EXAM DAY." : "SET YOUR DATE."}
              </h3>

              <p className="mt-4 text-sm text-gray-500">
                {timeLeft?.expired
                  ? "Your target date has arrived. Give it your best."
                  : "Choose your exam date to start the countdown."}
              </p>
            </div>
          )}

          {/* Exam Date Information */}
          {examDate && (
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
              <p className="text-sm text-gray-400">
                Target date:{" "}
                <span className="font-medium text-white">
                  {formatDate(examDate)}
                </span>
              </p>

              <button
                type="button"
                onClick={() => {
                  setInputDate(examDate);
                  setIsEditing(true);
                }}
                className="rounded-full border border-gray-800 px-4 py-2 text-xs text-gray-400 transition hover:border-gray-500 hover:text-white"
              >
                Change Date
              </button>
            </div>
          )}

          {/* Date Picker */}
          {isEditing && (
            <form
              onSubmit={saveExamDate}
              className="mx-auto mt-8 w-full max-w-md rounded-2xl border border-white/15 bg-white/[0.05] p-5 backdrop-blur-xl sm:p-7"
            >
              <label
                htmlFor="exam-date"
                className="mb-3 block text-xs uppercase tracking-[0.25em] text-gray-400"
              >
                Select Your Exam Date
              </label>

              <input
                id="exam-date"
                type="date"
                required
                min={new Date().toLocaleDateString("en-CA")}
                value={inputDate}
                onChange={(event) => setInputDate(event.target.value)}
                className="w-full rounded-xl border border-gray-700 bg-black px-4 py-4 text-base text-white outline-none transition focus:border-white/50 [color-scheme:dark]"
              />

              <div className="mt-5 flex gap-3">
                {examDate && (
                  <button
                    type="button"
                    onClick={() => {
                      setInputDate(examDate);
                      setIsEditing(false);
                    }}
                    className="flex-1 rounded-xl border border-gray-700 px-4 py-3 text-sm text-gray-400 transition hover:text-white"
                  >
                    Cancel
                  </button>
                )}

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
                >
                  Save Exam Date
                </button>
              </div>
            </form>
          )}

          {/* Motivation */}
          <div className="mt-12 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-600">
              Discipline today. Confidence tomorrow.
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="flex flex-col items-center justify-between gap-3 border-t border-gray-800 pt-5 sm:flex-row">
          <p className="text-xs tracking-wider text-gray-600">
            SYSTEM STATUS: ACTIVE
          </p>

          <p className="text-xs text-gray-600">
            YOUR TIME. YOUR GOAL. YOUR FUTURE.
          </p>
        </footer>

      </div>
    </div>
  );
}

export default ExamCountdown;
