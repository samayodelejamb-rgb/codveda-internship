import { useEffect, useState, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import NoteGrid from "./components/NoteGrid";
import NoteEditor from "./components/NoteEditor";
import SearchModal from "./components/SearchModal";
import { notesApi } from "./api/notes";

export default function App() {
  const [view, setView] = useState("all");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingNote, setEditingNote] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const loadNotes = useCallback(async (currentView) => {
    setLoading(true);
    setError(null);
    try {
      const data = await notesApi.list({ view: currentView });
      setNotes(data);
    } catch (err) {
      setError("Couldn't reach the NoteBuddy server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotes(view);
  }, [view, loadNotes]);

  function openNewNote() {
    setEditingNote({});
  }

  function openNote(note) {
    setEditingNote(note);
  }

  async function saveNote({ title, content }) {
    if (editingNote?._id) {
      await notesApi.update(editingNote._id, { title, content });
    } else {
      await notesApi.create({ title, content });
    }
    setEditingNote(null);
    loadNotes(view);
  }

  async function handleToggleFavorite(id) {
    await notesApi.toggleFavorite(id);
    loadNotes(view);
    if (editingNote?._id === id) {
      setEditingNote((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
    }
  }

  async function handleTrash(id) {
    await notesApi.trash(id);
    loadNotes(view);
  }

  async function handleRestore(id) {
    await notesApi.restore(id);
    loadNotes(view);
  }

  async function handleDeleteForever(id) {
    if (!window.confirm("Permanently delete this note? This can't be undone.")) return;
    await notesApi.remove(id);
    loadNotes(view);
  }

  const viewTitles = { all: "All Notes", favorites: "Favorites", trash: "Trash" };

  return (
    <div className="app-shell">
      <Sidebar
        activeView={view}
        onChangeView={setView}
        onNewNote={openNewNote}
        onOpenSearch={() => setSearchOpen(true)}
      />

      <main className="main-content">
        <header className="main-header">
          <h1>{viewTitles[view]}</h1>
          <button className="header-search-btn" onClick={() => setSearchOpen(true)}>
            Search
          </button>
        </header>

        {loading && <p className="status-text">Loading notes...</p>}
        {error && <p className="status-text error">{error}</p>}

        {!loading && !error && (
          <NoteGrid
            notes={notes}
            view={view}
            onOpen={openNote}
            onNewNote={openNewNote}
            onToggleFavorite={handleToggleFavorite}
            onTrash={handleTrash}
            onRestore={handleRestore}
            onDeleteForever={handleDeleteForever}
          />
        )}
      </main>

      {editingNote !== null && (
        <NoteEditor
          note={editingNote}
          onClose={() => setEditingNote(null)}
          onSave={saveNote}
          onTrash={handleTrash}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {searchOpen && (
        <SearchModal onClose={() => setSearchOpen(false)} onOpenNote={openNote} />
      )}
    </div>
  );
}
