export default function Sidebar({ activeView, onChangeView, onNewNote, onOpenSearch }) {
  const navItems = [
    { key: "all", label: "All Notes" },
    { key: "favorites", label: "Favorites" },
    { key: "trash", label: "Trash" },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-text">
          <h1>NoteBuddy</h1>
          <p>Your personal note-taking app</p>
        </div>
        <div className="brand-avatar" aria-hidden="true">N</div>
      </div>

      <button className="new-note-btn" onClick={onNewNote}>
        <span className="plus">+</span> New Note
      </button>

      <button className="search-trigger" onClick={onOpenSearch}>
        Search Notes
      </button>

      <nav className="nav-list">
        {navItems.map((item) => (
          <button
            key={item.key}
            className={`nav-item ${activeView === item.key ? "active" : ""}`}
            onClick={() => onChangeView(item.key)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
