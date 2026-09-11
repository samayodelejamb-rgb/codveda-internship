import { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import TaskForm from "./components/TaskForm.jsx";
import FilterButtons from "./components/FilterButtons.jsx";
import TaskList from "./components/TaskList.jsx";
import "./App.css";

const INITIAL_TASKS = [
  { id: 1, title: "Finish React task 3", date: "Today", completed: true },
  { id: 2, title: "Study for CSC 246", date: "Tomorrow", completed: false },
  { id: 3, title: "Build portfolio update", date: "Sep 12, 2025", completed: false },
  { id: 4, title: "Read a book", date: "Sep 10, 2025", completed: true },
  { id: 4, title: "Read a book", date: "Sep 10, 2025", completed: true },
  { id: 4, title: "Read a book", date: "Sep 10, 2025", completed: true },
  { id: 4, title: "Read a book", date: "Sep 10, 2025", completed: true },
];

export default function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [newTask, setNewTask] = useState("");
  const [newDate, setNewDate] = useState("Today");
  const [filter, setFilter] = useState("All");

  function addTask() {
    const title = newTask.trim();
    if (!title) return;
    setTasks((prev) => [
      { id: Date.now(), title, date: newDate, completed: false },
      ...prev,
    ]);
    setNewTask("");
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function editTask(id, title) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, title } : t)));
  }

  const pendingCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="app">
      <div className="dashboard">
        <Sidebar active={filter} onSelect={setFilter} />

        <div className="main-panel">
          <Header name="Samuel" />

          <TaskForm
            value={newTask}
            date={newDate}
            onChange={setNewTask}
            onDateChange={setNewDate}
            onAdd={addTask}
          />

          <FilterButtons active={filter} onChange={setFilter} />

          <TaskList
            tasks={tasks}
            filter={filter}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={editTask}
          />

          <div className="task-count">{pendingCount} task(s) pending</div>
        </div>
      </div>
    </div>
  );
}
