import React from "react";

/**
 * Small, reusable status/placeholder UI.
 *
 * Variants:
 * - "loading": used while the app is preparing data
 * - "empty": used when there is nothing to show
 */
const VARIANT_LABELS = {
  loading: "Loading",
  empty: "Empty",
};

// PUBLIC_INTERFACE
function StatusState({ variant = "empty", title, description }) {
  const ariaLabel = VARIANT_LABELS[variant] || "Status";

  return (
    <div
      className={`todoEmpty todoStatus todoStatus--${variant}`}
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
    >
      {title && <div className="todoStatusTitle">{title}</div>}
      {description && <div className="todoStatusDescription">{description}</div>}
    </div>
  );
}

export default StatusState;
