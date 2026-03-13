import React, { useId, useMemo, useState } from "react";

const MAX_TODO_LENGTH = 120;

/**
 * Returns a user-friendly error string, or "" if valid.
 */
function validateTodoText(rawText) {
  const trimmed = rawText.trim();
  if (!trimmed) return "Please type something before adding.";
  if (trimmed.length > MAX_TODO_LENGTH) {
    return `Keep it under ${MAX_TODO_LENGTH} characters.`;
  }
  return "";
}

// PUBLIC_INTERFACE
function TodoForm({ onAdd }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const inputId = useId();
  const errorId = useMemo(() => `${inputId}-error`, [inputId]);

  // PUBLIC_INTERFACE
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateTodoText(text);
    if (validationError) {
      setError(validationError);
      return;
    }

    onAdd(text);
    setText("");
    setError("");
  };

  const handleChange = (nextValue) => {
    setText(nextValue);

    // Clear any previous error once the user starts correcting the input.
    if (error) setError("");
  };

  return (
    <form className="todoForm" onSubmit={handleSubmit} noValidate>
      <label className="srOnly" htmlFor={inputId}>
        Add a todo
      </label>

      <div className="todoField">
        <input
          id={inputId}
          type="text"
          className={`todoInput ${error ? "hasError" : ""}`}
          value={text}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Add a new task…"
          autoComplete="off"
          maxLength={MAX_TODO_LENGTH}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : undefined}
        />

        {error && (
          <div
            id={errorId}
            className="todoError"
            role="alert"
            aria-live="polite"
          >
            {error}
          </div>
        )}
      </div>

      <button className="todoButton" type="submit">
        Add
      </button>
    </form>
  );
}

export default TodoForm;
