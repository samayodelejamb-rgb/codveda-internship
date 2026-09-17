import { timeAgo, previewText } from "../utils/time";

export default function NoteCard({ note, onOpen, onToggleFavorite, onTrash, onRestore, onDeleteForever, inTrash }) {
  return (
    <div className="note-card" onClick={() => onOpen(note)}>
      <div className="note-card-body">
        <div className="note-card-header">
          <h3>{note.title || "Untitled"}</h3>
          {!inTrash && (
            <button
              className={`star-btn ${note.isFavorite ? "is-favorite" : ""}`}
              title={note.isFavorite ? "Remove from favorites" : "Add to favorites"}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(note._id);
              }}
            >
              {note.isFavorite ? "★" : "☆"}
            </button>
          )}
        </div>
        <p className="note-preview">{previewText(note.content)}</p>
      </div>

      <div className="note-card-footer">
        <span className="note-time">{timeAgo(note.updatedAt)}</span>

        {inTrash ? (
          <div className="trash-actions">
            <button
              className="link-btn"
              onClick={(e) => {
                e.stopPropagation();
                onRestore(note._id);
              }}
            >
              Restore
            </button>
            <button
              className="link-btn danger"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteForever(note._id);
              }}
            >
              Delete forever
            </button>
          </div>
        ) : (
          <button
            className="link-btn danger"
            onClick={(e) => {
              e.stopPropagation();
              onTrash(note._id);
            }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
