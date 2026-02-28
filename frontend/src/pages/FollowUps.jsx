import { useEffect, useState } from "react";
import "./FollowUps.css";

export default function FollowUps() {
  const [followUps, setFollowUps] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("followups")) || [];
    setFollowUps(stored);
  }, []);

  return (
    <div className="followups-container">
      <h2 className="followups-title">Follow Ups Required</h2>

      {followUps.length === 0 ? (
        <p>No follow ups detected.</p>
      ) : (
        <ul className="followups-list">
          {followUps.map((item, index) => (
            <li key={index} className="followup-card">
              <strong>{item.subject}</strong>
              <div className="followup-meta">From: {item.from}</div>
              <div className="followup-meta">Status: {item.status}</div>

              <span className="followup-badge">Needs Attention</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}