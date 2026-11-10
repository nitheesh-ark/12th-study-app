
import { useState } from "react";
import Todo from "./Todo";
import Subjects from "./subject";
import ExamCountdown from "./exam_countdown";

const dashboardItems = [
  {
    id: "todo",
    label: "TODO",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="m8 9 2 2 4-4" />
        <path d="M8 15h8M8 18h5" />
      </svg>
    ),
  },
  {
    id: "subjects",
    label: "Subjects",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 7v14" />
        <path d="M3 4.5A2.5 2.5 0 0 1 5.5 2H12v19H5.5A2.5 2.5 0 0 0 3 23z" />
        <path d="M21 4.5A2.5 2.5 0 0 0 18.5 2H12v19h6.5a2.5 2.5 0 0 1 2.5 2z" />
      </svg>
    ),
  },
  {
    id: "countdown",
    label: "Countdown",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="13" r="8.5" />
        <path d="M12 8v5l3 2M9 2h6M12 2v2M19 5l1.5 1.5" />
      </svg>
    ),
  },
  {
    id: "future",
    label: "Coming Soon",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
        <path d="m5.6 5.6 2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1m-8.6 8.6-2.1 2.1" />
        <circle cx="12" cy="12" r="5" />
        <path d="M12 9v3l2 1" />
      </svg>
    ),
  },
];

function App() {
  const [activePage, setActivePage] = useState("home");


if (activePage === "todo") {
  return <Todo onBack={() => setActivePage("home")} />;
}

if (activePage === "subjects") {
  return <Subjects onBack={() => setActivePage("home")} />;
}

if (activePage === "countdown") {
  return <ExamCountdown onBack={() => setActivePage("home")} />;
}


  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-12 text-white">

      {/* Subtle Background */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-[100px]" />

      <div className="relative z-10 w-full max-w-xl">

        {/* Minimal Header */}
        <header className="mb-12 text-center">
          <p className="mb-3 text-[10px] uppercase tracking-[0.6em] text-gray-600">
            Personal Workspace
          </p>

          <h1 className="text-3xl font-semibold tracking-[0.2em] sm:text-4xl">
            FOCUS<span className="text-gray-600">.</span>
          </h1>

          <div className="mx-auto mt-5 h-px w-12 bg-gray-700" />
        </header>

        {/* Four Centered Icon Boxes */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5">
          {dashboardItems.map((item, index) => {
            const isFuture = item.id === "future";

            return (
              <button
                key={item.id}
                type="button"
                disabled={isFuture}
                aria-label={item.label}
                title={item.label}
                onClick={() => setActivePage(item.id)}
                className={`group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isFuture
                    ? "cursor-not-allowed border-gray-900 bg-gray-950/50 text-gray-700"
                    : "border-gray-800 bg-gray-950 text-gray-400 hover:-translate-y-1 hover:border-gray-500 hover:bg-gray-900 hover:text-white"
                }`}
              >
                {/* Index */}
                <span className="absolute left-4 top-4 font-mono text-[10px] tracking-widest text-gray-700">
                  0{index + 1}
                </span>

                {/* Icon */}
                <span
                  className={`mb-4 block h-10 w-10 transition-transform duration-300 sm:h-12 sm:w-12 ${
                    !isFuture
                      ? "group-hover:scale-110"
                      : ""
                  }`}
                >
                  {item.icon}
                </span>

                {/* Small Indicator */}
                <span
                  className={`h-1 w-1 rounded-full transition-all duration-300 ${
                    isFuture
                      ? "bg-gray-800"
                      : "bg-gray-600 group-hover:w-6 group-hover:bg-white"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <footer className="mt-10 flex items-center justify-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-gray-500" />

          <p className="text-[10px] uppercase tracking-[0.35em] text-gray-600">
            One thing at a time
          </p>
        </footer>

      </div>
    </main>
  );
}

export default App;
