import TaskCard from "./TaskCard.jsx";

export default function TaskList({ tasks, filter, onToggle, onDelete, onEdit }) {
  const visible = tasks.filter((t) => {
    if (filter === "Pending") return !t.completed;
    if (filter === "Completed") return t.completed;
    return true;
  });

  if (visible.length === 0) {
    return <div className="task-empty">No tasks here yet.</div>;
  }

  return (
    <div className="task-list">
      {visible.map((t) => (
        <TaskCard
          key={t.id}
          id={t.id}
          title={t.title}
          date={t.date}
          completed={t.completed}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
