import { useState } from "react";

export default function TaskCard({ id, title, date, completed, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(title);

  function saveEdit() {
    const trimmed = draft.trim();
    if (trimmed) onEdit(id, trimmed);
    setEditing(false);
  }

  return (
    <div className="task-card">
      <button
        className={`task-check ${completed ? "task-check-done" : ""}`}
        onClick={() => onToggle(id)}
        aria-label={completed ? "Mark as pending" : "Mark as complete"}
      >
        {completed && "✓"}
      </button>

      <div className="task-body">
        {editing ? (
          <input
            className="task-edit-input"
            value={draft}
            autoFocus
            onChange={(e) => setDraft(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveEdit();
              if (e.key === "Escape") {
                setDraft(title);
                setEditing(false);
              }
            }}
          />
        ) : (
          <div className={`task-title ${completed ? "task-title-done" : ""}`}>{title}</div>
        )}
        <div className="task-date">📅 {date}</div>
      </div>

      <span className={`task-status ${completed ? "status-completed" : "status-pending"}`}>
        {completed ? "Completed" : "Pending"}
      </span>

      <div className="task-actions">
        <button className="icon-btn" onClick={() => setEditing(true)} aria-label="Edit task">
          ✎
        </button>
        <button className="icon-btn icon-btn-danger" onClick={() => onDelete(id)} aria-label="Delete task">
          🗑
        </button>
      </div>
    </div>
  );
}
