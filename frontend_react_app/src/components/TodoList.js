import React from "react";
import TodoItem from "./TodoItem";

// PUBLIC_INTERFACE
function TodoList({ todos, onToggle, onDelete }) {
  return (
    <ul className="todoList" aria-label="Todo list">
      {todos.map((t) => (
        <TodoItem
          key={t.id}
          todo={t}
          onToggle={() => onToggle(t.id)}
          onDelete={() => onDelete(t.id)}
        />
      ))}
    </ul>
  );
}

export default TodoList;
