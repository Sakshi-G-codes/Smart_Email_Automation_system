import { useEffect, useState } from "react";

export default function FollowUps() {
  const [followUps, setFollowUps] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("followups")) || [];
    setFollowUps(stored);
  }, []);

  return (
    <div>
      <h2>Follow-Ups</h2>

      {followUps.length === 0 ? (
        <p>No follow-ups detected.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {followUps.map((item, index) => (
            <li
              key={index}
              style={{
                marginBottom: "12px",
                padding: "10px",
                background: "#fff3cd",
                borderRadius: "6px",
              }}
            >
              <strong>{item.subject}</strong>
              <p>From: {item.from}</p>
              <p>Status: {item.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
