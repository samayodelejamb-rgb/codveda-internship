const FILTERS = ["All", "Pending", "Completed"];

export default function FilterButtons({ active, onChange }) {
  return (
    <div className="filter-buttons">
      {FILTERS.map((f) => (
        <button
          key={f}
          className={`filter-btn ${active === f ? "filter-btn-active" : ""}`}
          onClick={() => onChange(f)}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
