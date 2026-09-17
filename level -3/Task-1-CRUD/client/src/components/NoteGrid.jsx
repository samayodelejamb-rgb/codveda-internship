import NoteCard from "./NoteCard";

const EMPTY_COPY = {
  all: { title: "No notes yet", body: "Create your first note to get started." },
  favorites: { title: "No favorites yet", body: "Star a note to see it here." },
  trash: { title: "Trash is empty", body: "Deleted notes will show up here." },
};

export default function NoteGrid({
  notes,
  view,
  onOpen,
  onNewNote,
  onToggleFavorite,
  onTrash,
  onRestore,
  onDeleteForever,
}) {
  const showCreateTile = view !== "trash";
  const empty = EMPTY_COPY[view];

  if (notes.length === 0 && !showCreateTile) {
    return (
      <div className="empty-state">
        <h2>{empty.title}</h2>
        <p>{empty.body}</p>
      </div>
    );
  }

  return (
    <div className="note-grid">
      {showCreateTile && (
        <button className="create-note-tile" onClick={onNewNote}>
          <span className="plus-circle">+</span>
          <span>Create new note</span>
        </button>
      )}

      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          inTrash={view === "trash"}
          onOpen={onOpen}
          onToggleFavorite={onToggleFavorite}
          onTrash={onTrash}
          onRestore={onRestore}
          onDeleteForever={onDeleteForever}
        />
      ))}

      {notes.length === 0 && showCreateTile && (
        <div className="empty-hint">
          <p>{empty.body}</p>
        </div>
      )}
    </div>
  );
}
