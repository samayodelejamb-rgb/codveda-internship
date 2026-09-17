import { useEffect, useState } from "react";

export default function NoteEditor({ note, onClose, onSave, onTrash, onToggleFavorite }) {
  const [title, setTitle] = useState(note?.title === "Untitled" ? "" : note?.title || "");
  const [content, setContent] = useState(note?.content || "");

  useEffect(() => {
    setTitle(note?.title === "Untitled" ? "" : note?.title || "");
    setContent(note?.content || "");
  }, [note]);

  function handleSave() {
    onSave({ title: title.trim() || "Untitled", content });
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) handleSave();
  }

  const isNew = !note?._id;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal editor-modal">
        <div className="modal-header">
          <input
            className="editor-title-input"
            placeholder="Untitled"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <div className="editor-header-actions">
            {!isNew && (
              <button
                className={`star-btn ${note.isFavorite ? "is-favorite" : ""}`}
                title="Toggle favorite"
                onClick={() => onToggleFavorite(note._id)}
              >
                {note.isFavorite ? "★" : "☆"}
              </button>
            )}
            <button className="icon-btn" title="Close" onClick={handleSave}>✕</button>
          </div>
        </div>

        <textarea
          className="editor-textarea"
          placeholder="Start writing..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="modal-footer">
          {!isNew && (
            <button
              className="link-btn danger"
              onClick={() => {
                onTrash(note._id);
                onClose();
              }}
            >
              Move to trash
            </button>
          )}
          <div className="footer-spacer" />
          <button className="ghost-btn" onClick={onClose}>Cancel</button>
          <button className="primary-btn" onClick={handleSave}>Save note</button>
        </div>
      </div>
    </div>
  );
}
