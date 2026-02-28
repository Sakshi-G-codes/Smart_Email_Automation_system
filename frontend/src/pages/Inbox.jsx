import { useEffect, useState } from "react";
import { fetchEmailsTest } from "../api";
import "./Inbox.css";

export default function Inbox() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [replies, setReplies] = useState({});


  useEffect(() => {
    fetchEmailsTest()
      .then((data) => {
        const emailsWithPriority = data.map((email) => ({
          ...email,
          priorityScore: Math.floor(Math.random() * 5) + 1,
        }));

        emailsWithPriority.sort((a, b) => b.priorityScore - a.priorityScore);

        // Extract tasks
        const extractedTasks = [];
        const followUps = [];

        emailsWithPriority.forEach((email) => {
          const content =
            (email.subject || "") +
            " " +
            (email.snippet || "") +
            " " +
            (email.text || "") +
            " " +
            (email.body || "");

          const lower = content.toLowerCase();

          if (
            lower.includes("confirm") ||
            lower.includes("meeting") ||
            lower.includes("submit") ||
            lower.includes("deadline") ||
            lower.includes("schedule")
          ) {
            extractedTasks.push({
              title: email.subject || "Untitled Task",
              from: email.from || "Unknown",
              status: "Pending",
            });
          }

          if (
            lower.includes("deadline") ||
            lower.includes("asap") ||
            lower.includes("remind") ||
            lower.includes("follow up") ||
            lower.includes("by tomorrow") ||
            lower.includes("by friday")
          ) {
            followUps.push({
              subject: email.subject || "No Subject",
              from: email.from || "Unknown",
              status: "Pending",
            });
          }
        });

        localStorage.setItem("tasks", JSON.stringify(extractedTasks));
        localStorage.setItem("followups", JSON.stringify(followUps));

        setEmails(emailsWithPriority);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch emails");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading emails...</p>;
  if (error) return <p>{error}</p>;

  const generateAIReply = async (email, index) => {
  try {
    const response = await fetch("http://localhost:3000/ai/reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: email.subject,
        content: email.snippet || "",
      }),
    });

    const data = await response.json();

    setReplies((prev) => ({
      ...prev,
      [index]: data.reply,
    }));
  } catch (error) {
    console.error("Failed to generate reply", error);
  }
};


  return (
  <div className="inbox-container">
    <h2 className="inbox-title">Inbox</h2>

    {emails.length === 0 ? (
      <p>No emails found.</p>
    ) : (
      <ul className="email-list">
        {emails.map((email, index) => {
          let priorityLabel = "Low";
          let priorityColor = "green";

          if (email.priorityScore >= 4) {
            priorityLabel = "High";
            priorityColor = "red";
          } else if (email.priorityScore === 3) {
            priorityLabel = "Medium";
            priorityColor = "orange";
          }

          const content =
            (email.subject || "") +
            " " +
            (email.snippet || "") +
            " " +
            (email.text || "") +
            " " +
            (email.body || "");

          let sentiment = "Neutral";
          const lower = content.toLowerCase();

          if (
            lower.includes("urgent") ||
            lower.includes("issue") ||
            lower.includes("problem") ||
            lower.includes("complaint") ||
            lower.includes("angry") ||
            lower.includes("not happy")
          ) {
            sentiment = "Negative";
          }

          let summary =
            email.snippet || email.text || email.body || "";

          summary = summary.replace(/<[^>]*>?/gm, "").trim();

          if (!summary) summary = "No content available";

          if (summary.length > 120) {
            summary = summary.substring(0, 120) + "...";
          }

          return (
            <li key={index} className="email-card">
              <div className="email-header">
                <strong>{email.subject || "No Subject"}</strong>

                <span
                  className="priority-badge"
                  style={{ background: priorityColor }}
                >
                  {priorityLabel}
                </span>
              </div>

              <p>From: {email.from || "Unknown"}</p>
              <p><strong>Summary:</strong> {summary}</p>
              <p><strong>Sentiment:</strong> {sentiment}</p>

              <button
                onClick={() => generateAIReply(email, index)}
                className="ai-button"
              >
                Generate AI Reply
              </button>

              {replies[index] && (
                <div className="ai-draft">
                  <strong>AI Draft:</strong>
                  <p>{replies[index]}</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    )}
  </div>
);
}
