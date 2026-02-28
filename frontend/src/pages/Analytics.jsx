import { useEffect, useState } from "react";
import "./Analytics.css";

export default function Analytics() {
  const [totalEmails, setTotalEmails] = useState(0);
  const [tasks, setTasks] = useState(0);
  const [followUps, setFollowUps] = useState(0);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const storedFollowUps = JSON.parse(localStorage.getItem("followups")) || [];

    setTasks(storedTasks.length);
    setFollowUps(storedFollowUps.length);

    // Estimate total emails from tasks + followups logic
    setTotalEmails(storedTasks.length + storedFollowUps.length);
  }, []);

  return (
    <div className="analytics-container">
      <h2 className="analytics-title">Analytics</h2>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Total Emails Processed</h3>
          <p>{totalEmails}</p>
        </div>

        <div className="analytics-card">
          <h3>Tasks Detected</h3>
          <p>{tasks}</p>
        </div>

        <div className="analytics-card">
          <h3>Follow Ups Required</h3>
          <p>{followUps}</p>
        </div>

        <div className="analytics-card">
          <h3>AI Replies Generated</h3>
          <p>Coming Soon</p>
        </div>
      </div>
    </div>
  );
}