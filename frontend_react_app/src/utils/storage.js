/**
 * Very small storage helpers to keep components readable.
 */

// PUBLIC_INTERFACE
export function loadTodos(storageKey) {
  /** Load todos from localStorage, returning a safe default on any error. */
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (t) =>
        t &&
        typeof t.id === "string" &&
        typeof t.text === "string" &&
        typeof t.completed === "boolean"
    );
  } catch {
    return [];
  }
}

// PUBLIC_INTERFACE
export function saveTodos(storageKey, todos) {
  /** Save todos to localStorage, ignoring quota/security errors gracefully. */
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(todos));
  } catch {
    // Intentionally ignore; app should still function without persistence.
  }
}
