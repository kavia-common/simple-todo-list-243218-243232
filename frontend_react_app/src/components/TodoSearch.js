import React, { useId } from "react";

/**
 * Minimal controlled text search input.
 *
 * Kept as a separate component so it can be reused/relocated without
 * coupling it to filtering logic or list rendering.
 */
// PUBLIC_INTERFACE
function TodoSearch({ value, onChange }) {
  const inputId = useId();

  return (
    <div className="searchBar" aria-label="Search todos">
      <label className="srOnly" htmlFor={inputId}>
        Search todos
      </label>

      <input
        id={inputId}
        type="search"
        className="todoInput searchInput"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='Search todos… (e.g., "email")'
        autoComplete="off"
        aria-label="Search todos by text"
      />
    </div>
  );
}

export default TodoSearch;
