
export default function TaskForm({ value, date, onChange, onDateChange, onAdd }) {
  function handleSubmit(e) {
    e.preventDefault();
    onAdd();
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form-input">
        <span className="task-form-plus">+</span>
        <input
          type="text"
          placeholder="Add a new task..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <select value={date} onChange={(e) => onDateChange(e.target.value)} className="task-form-date">
        <option value="Today">Today</option>
        <option value="Tomorrow">Tomorrow</option>
        <option value="This week">This week</option>
        <option value="No date">No date</option>
      </select>
      <button type="submit" className="task-form-add">
        Add Task
      </button>
    </form>
  );
}
