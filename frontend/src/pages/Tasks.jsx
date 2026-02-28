import { useEffect, useState } from "react";
import "./Tasks.css";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  return (
  <div className="tasks-container">
    <h2 className="tasks-title">Extracted Tasks</h2>

    {tasks.length === 0 ? (
      <p>No tasks detected.</p>
    ) : (
      <ul className="tasks-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-card">
            <div className="task-title">{task.title}</div>
            <div className="task-meta">From: {task.from}</div>
            <div className="task-meta">Status: {task.status}</div>
          </li>
        ))}
      </ul>
    )}
  </div>
);
}
