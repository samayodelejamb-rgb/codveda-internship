const NAV = [
  { label: "All Tasks", icon: "⌂", filter: "All" },
  { label: "Pending", icon: "◷", filter: "Pending" },
  { label: "Completed", icon: "◎", filter: "Completed" },
];

export default function Sidebar({ active, onSelect }) {
  return (
    <div className="sidebar">
      <div>
        <div className="brand">
          <span className="brand-badge">✓</span>
          <span>
            Task<span className="brand-accent">Tracker</span>
          </span>
        </div>
        <p className="brand-tagline">Small steps. Big progress.</p>

        <nav className="nav">
          {NAV.map((item) => (
            <button
              key={item.filter}
              className={`nav-item ${active === item.filter ? "nav-item-active" : ""}`}
              onClick={() => onSelect(item.filter)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="plant">🌱</div>
        <p>Stay consistent, you got this! 💚</p>
      </div>
    </div>
  );
}
