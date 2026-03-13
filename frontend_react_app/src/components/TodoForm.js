import React, { useState } from "react";

// PUBLIC_INTERFACE
function TodoForm({ onAdd }) {
  const [text, setText] = useState("");

  // PUBLIC_INTERFACE
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(text);
    setText("");
  };

  return (
    <form className="todoForm" onSubmit={handleSubmit}>
      <label className="srOnly" htmlFor="newTodo">
        Add a todo
      </label>
      <input
        id="newTodo"
        type="text"
        className="todoInput"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task…"
        autoComplete="off"
        maxLength={120}
        required
      />
      <button className="todoButton" type="submit">
        Add
      </button>
    </form>
  );
}

export default TodoForm;
