import { useEffect, useState } from "react";
import { notesApi } from "../api/notes";
import { previewText } from "../utils/time";

export default function SearchModal({ onClose, onOpenNote }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const handle = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await notesApi.list({ search: query, view: "all" });
        setResults(data);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => clearTimeout(handle);
  }, [query]);

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal search-modal">
        <input
          className="search-input"
          placeholder="Search notes by title or content..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />

        <div className="search-results">
          {loading && <p className="search-hint">Searching...</p>}
          {!loading && query.trim() && results.length === 0 && (
            <p className="search-hint">No notes match "{query}"</p>
          )}
          {results.map((note) => (
            <button
              key={note._id}
              className="search-result-item"
              onClick={() => {
                onOpenNote(note);
                onClose();
              }}
            >
              <span className="search-result-title">{note.title || "Untitled"}</span>
              <span className="search-result-preview">{previewText(note.content, 80)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
