import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import FilterBar from "./components/FilterBar";
import TodoList from "./components/TodoList";
import StatusState from "./components/StatusState";
import { loadTodos, saveTodos } from "./utils/storage";

const FILTERS = /** @type {const} */ (["all", "active", "completed"]);
const STORAGE_KEY = "kavia.todos.v1";

// PUBLIC_INTERFACE
function App() {
  /** Current filter: "all" | "active" | "completed" */
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  // Load persisted todos on mount (kept separate from state init to allow a loading state).
  useEffect(() => {
    const loaded = loadTodos(STORAGE_KEY);
    setTodos(loaded);
    setIsLoading(false);
  }, []);

  // Persist to localStorage whenever todos change.
  useEffect(() => {
    if (isLoading) return;
    saveTodos(STORAGE_KEY, todos);
  }, [todos, isLoading]);

  const remainingCount = useMemo(
    () => todos.filter((t) => !t.completed).length,
    [todos]
  );

  const visibleTodos = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.completed);
    if (filter === "completed") return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  const emptyState = useMemo(() => {
    if (isLoading) {
      return {
        variant: "loading",
        title: "Loading your todos…",
        description: "Getting your saved list ready.",
      };
    }

    if (todos.length === 0) {
      return {
        variant: "empty",
        title: "No todos yet",
        description: 'Add your first task above (e.g., "Buy milk").',
      };
    }

    if (visibleTodos.length === 0) {
      const filterLabel =
        filter === "active"
          ? "Active"
          : filter === "completed"
          ? "Completed"
          : "All";

      return {
        variant: "empty",
        title: `No ${filterLabel.toLowerCase()} items`,
        description: "Try another filter or add a new task.",
      };
    }

    return null;
  }, [isLoading, todos.length, visibleTodos.length, filter]);

  // PUBLIC_INTERFACE
  const addTodo = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setTodos((prev) => [
      {
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
        text: trimmed,
        completed: false,
        createdAt: Date.now(),
      },
      ...prev,
    ]);
  };

  // PUBLIC_INTERFACE
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // PUBLIC_INTERFACE
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  // PUBLIC_INTERFACE
  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  return (
    <div className="App">
      <main className="todoShell">
        <header className="todoHeader">
          <div className="todoTitleRow">
            <h1 className="todoTitle">Retro Todo</h1>
            <span className="todoBadge" aria-label="Remaining todos">
              {isLoading ? "…" : remainingCount} left
            </span>
          </div>
          <p className="todoSubtitle">
            Add tasks, mark them done, filter the view — all saved locally.
          </p>
        </header>

        <section className="todoCard" aria-label="Todo app">
          <TodoForm onAdd={addTodo} />

          <FilterBar
            filters={FILTERS}
            value={filter}
            onChange={setFilter}
            completedCount={todos.length - remainingCount}
            onClearCompleted={clearCompleted}
          />

          <TodoList
            todos={visibleTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />

          {emptyState && (
            <StatusState
              variant={emptyState.variant}
              title={emptyState.title}
              description={emptyState.description}
            />
          )}
        </section>

        <footer className="todoFooter">
          <span className="todoFooterHint">Tip: Press Enter to add quickly.</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
