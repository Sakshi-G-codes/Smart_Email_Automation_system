import { useEffect, useState } from "react";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  return (
    <div>
      <h2>Extracted Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks detected.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task, index) => (
            <li
              key={index}
              style={{
                marginBottom: "12px",
                padding: "10px",
                background: "white",
                borderRadius: "6px",
              }}
            >
              <strong>{task.title}</strong>
              <p>From: {task.from}</p>
              <p>Status: {task.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
