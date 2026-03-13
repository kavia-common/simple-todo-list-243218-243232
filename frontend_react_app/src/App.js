import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import FilterBar from "./components/FilterBar";
import TodoList from "./components/TodoList";
import { loadTodos, saveTodos } from "./utils/storage";

const FILTERS = /** @type {const} */ (["all", "active", "completed"]);
const STORAGE_KEY = "kavia.todos.v1";

// PUBLIC_INTERFACE
function App() {
  /** Current filter: "all" | "active" | "completed" */
  const [filter, setFilter] = useState("all");
  const [todos, setTodos] = useState(() => loadTodos(STORAGE_KEY));

  // Persist to localStorage whenever todos change.
  useEffect(() => {
    saveTodos(STORAGE_KEY, todos);
  }, [todos]);

  const remainingCount = useMemo(
    () => todos.filter((t) => !t.completed).length,
    [todos]
  );

  const visibleTodos = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.completed);
    if (filter === "completed") return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

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
              {remainingCount} left
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

          {todos.length === 0 && (
            <div className="todoEmpty" role="status" aria-live="polite">
              Your list is empty. Add something fun.
            </div>
          )}
        </section>

        <footer className="todoFooter">
          <span className="todoFooterHint">
            Tip: Press Enter to add quickly.
          </span>
        </footer>
      </main>
    </div>
  );
}

export default App;
