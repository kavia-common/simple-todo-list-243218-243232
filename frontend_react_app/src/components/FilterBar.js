import React from "react";

// PUBLIC_INTERFACE
function FilterBar({
  filters,
  value,
  onChange,
  completedCount,
  onClearCompleted,
}) {
  return (
    <div className="filterBar" aria-label="Todo filters">
      <div className="filterGroup" role="tablist" aria-label="Filter todos">
        {filters.map((f) => {
          const active = f === value;
          return (
            <button
              key={f}
              type="button"
              className={`filterChip ${active ? "isActive" : ""}`}
              onClick={() => onChange(f)}
              aria-pressed={active}
            >
              {f === "all" ? "All" : f === "active" ? "Active" : "Completed"}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="linkButton"
        onClick={onClearCompleted}
        disabled={completedCount === 0}
        aria-disabled={completedCount === 0}
        title={
          completedCount === 0 ? "No completed items to clear" : "Clear completed"
        }
      >
        Clear completed
      </button>
    </div>
  );
}

export default FilterBar;
