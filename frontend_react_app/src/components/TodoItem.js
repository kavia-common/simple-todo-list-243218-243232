import React from "react";

// PUBLIC_INTERFACE
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todoItem ${todo.completed ? "isDone" : ""}`}>
      <label className="todoCheck">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
          aria-label={`Mark "${todo.text}" as ${
            todo.completed ? "not completed" : "completed"
          }`}
        />
        <span className="todoText">{todo.text}</span>
      </label>

      <button
        type="button"
        className="iconButton"
        onClick={onDelete}
        aria-label={`Delete "${todo.text}"`}
        title="Delete"
      >
        ×
      </button>
    </li>
  );
}

export default TodoItem;
