import { useEffect, useState } from "react";
import data from "../todo.js";

const STORAGE_KEY = "personal-todo-tasks";

function Todo({ onBack }) {
  const [questions, setQuestions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved !== null) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error("Could not load saved tasks:", error);
    }

    return data.questions.map((task, index) => ({
      id: `initial-${index}`,
      title: typeof task === "string" ? task : task.title,
      completed: false,
    }));
  });

  const [showPopup, setShowPopup] = useState(false);
  const [newTask, setNewTask] = useState("");

  // Save tasks locally whenever the list changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
    } catch (error) {
      console.error("Could not save tasks:", error);
    }
  }, [questions]);

  // Add a new task
  function addTask(event) {
    event.preventDefault();

    const title = newTask.trim();

    if (!title) return;

    setQuestions((previous) => [
      ...previous,
      {
        id: `${Date.now()}-${Math.random()}`,
        title,
        completed: false,
      },
    ]);

    setNewTask("");
    setShowPopup(false);
  }

  // Mark a task as complete or incomplete
  function deleteTask(id) {
  setQuestions((previous) =>
    previous.filter((task) => task.id !== id)
  );
}
  function toggleTask(id) {
    setQuestions((previous) =>
      previous.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  return (
        <div className="min-h-screen bg-black text-white px-6 py-10">
              {/* Back to Dashboard */}
        <button
          type="button"
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-sm text-gray-500 transition hover:text-white"
        >
  <span className="text-lg">←</span>
  <span>Back to Dashboard</span>
</button>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-10 border-b border-gray-800 pb-6">
          <p className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-3">
            Personal Workspace / 01
          </p>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            TODO<span className="text-gray-500">.</span>
          </h1>

          <p className="text-gray-500 mt-3 text-sm">
            Organize your tasks. Control your day.
          </p>
        </div>

        {/* Task Section */}
        <div className="flex items-center justify-between mb-5 gap-4">
          <h2 className="text-sm uppercase tracking-[0.25em] text-gray-400">
            Today's Tasks
          </h2>

          <span className="text-xs text-gray-500 border border-gray-800 rounded-full px-3 py-1 whitespace-nowrap">
            {questions.length} Tasks
          </span>
        </div>

        {/* Add Task Button */}
        <button
          onClick={() => setShowPopup(true)}
          className="mb-6 w-full rounded-xl border border-gray-700 bg-gray-900 px-5 py-4 text-sm font-medium text-white transition-all duration-300 hover:border-gray-400 hover:bg-gray-800"
        >
          <span className="mr-2 text-lg">+</span>
          Add Task
        </button>

        {/* Task List */}
        <div className="space-y-4">
          {questions.length > 0 ? (
            questions.map((task, index) => (
              <div
                key={task.id}
                className="group flex items-center gap-4 rounded-xl border border-gray-800 bg-gray-950 p-5 transition-all duration-300 hover:border-gray-500 hover:bg-gray-900"
              >
                {/* Task Number */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-800 bg-black text-sm font-mono text-gray-500 transition-colors group-hover:text-white">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Task Details */}
                <div className="min-w-0 flex-1">
                  <h3
                    className={`text-base font-medium transition-colors ${
                      task.completed
                        ? "text-gray-500 line-through"
                        : "text-gray-100"
                    }`}
                  >
                    {task.title}
                  </h3>
                </div>

                {/* Checkbox */}
                {/* Checkbox + Delete */}
                <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    aria-label={`Mark task ${index + 1} as complete`}
                    className="h-5 w-5 shrink-0 cursor-pointer accent-white"
                />

                {task.completed && (
                    <button
                    type="button"
                    onClick={() => deleteTask(task.id)}
                    aria-label={`Delete task ${index + 1}`}
                    className="rounded-lg border border-red-900/50 px-3 py-2 text-xs text-red-400 transition hover:border-red-500 hover:bg-red-500/10 hover:text-red-300"
                    >
                    Delete
                    </button>
                )}
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-gray-800 bg-gray-950 px-6 py-14 text-center">
              <div className="mb-4 text-3xl text-gray-700">◇</div>

              <h3 className="text-lg font-medium text-gray-300">
                No tasks found
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                Your workspace is clear. Add a task to get started.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-10 flex items-center justify-between border-t border-gray-800 pt-5">
          <p className="text-xs tracking-wider text-gray-600">
            SYSTEM STATUS: ACTIVE
          </p>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
            <span className="text-xs text-gray-500">
              All systems ready
            </span>
          </div>
        </div>

      </div>

      {/* Glass Popup */}
      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-md"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowPopup(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-task-title"
            className="w-full max-w-md rounded-2xl border border-white/15 bg-white/[0.08] p-6 shadow-2xl backdrop-blur-2xl sm:p-8"
          >
            {/* Popup Header */}
            <div className="mb-7 flex items-start justify-between">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gray-500">
                  New entry / 02
                </p>

                <h2
                  id="add-task-title"
                  className="text-2xl font-semibold tracking-tight"
                >
                  Add a task<span className="text-gray-500">.</span>
                </h2>

                <p className="mt-2 text-sm text-gray-400">
                  What do you want to get done?
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowPopup(false)}
                aria-label="Close popup"
                className="rounded-lg px-3 py-1 text-xl text-gray-400 transition hover:bg-white/10 hover:text-white"
              >
                ×
              </button>
            </div>

            {/* Task Form */}
            <form onSubmit={addTask}>
              <label
                htmlFor="task-input"
                className="mb-2 block text-xs uppercase tracking-widest text-gray-400"
              >
                Task description
              </label>

              <textarea
                id="task-input"
                autoFocus
                required
                rows={3}
                maxLength={300}
                value={newTask}
                onChange={(event) => setNewTask(event.target.value)}
                placeholder="e.g. Finish the React project by 7 PM..."
                className="w-full resize-none rounded-xl border border-white/15 bg-black/30 p-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-white/40 focus:bg-black/50"
              />

              <p className="mt-2 text-right text-xs text-gray-600">
                {newTask.length}/300
              </p>

              {/* Popup Actions */}
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowPopup(false);
                    setNewTask("");
                  }}
                  className="flex-1 rounded-xl border border-white/15 px-4 py-3 text-sm text-gray-300 transition hover:bg-white/10"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!newTask.trim()}
                  className="flex-1 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  + Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Todo;