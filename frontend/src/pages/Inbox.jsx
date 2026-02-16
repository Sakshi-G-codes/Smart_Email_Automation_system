import { useEffect, useState } from "react";
import { fetchEmailsTest } from "../api";

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
    <div>
      <h2>Inbox</h2>

      {emails.length === 0 ? (
        <p>No emails found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
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

            // Sentiment detection
            let sentiment = "Neutral";
            let cardBackground = "white";

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
              cardBackground = "#fee2e2";
            }

            // Proper summary extraction
            let summary =
  email.snippet ||
  email.text ||
  email.body ||
  "";


// 🔹 Clean MIME headers
summary = summary.replace(/Content-Type:[^\n]*/gi, "");
summary = summary.replace(/Content-Transfer-Encoding:[^\n]*/gi, "");
summary = summary.replace(/--=_Part_[^\n]*/gi, "");

// 🔹 Remove HTML tags
summary = summary.replace(/<[^>]*>?/gm, "");

// 🔹 Trim whitespace
summary = summary.trim();

if (!summary) {
  summary = "No content available";
}

if (summary.length > 120) {
  summary = summary.substring(0, 120) + "...";
}


            if (summary.length > 120) {
              summary = summary.substring(0, 120) + "...";
            }

            return (
              <li
                key={index}
                style={{
                  marginBottom: "15px",
                  padding: "12px",
                  background: cardBackground,
                  borderRadius: "6px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <strong>{email.subject || "No Subject"}</strong>

                  <span
                    style={{
                      background: priorityColor,
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  >
                    {priorityLabel}
                  </span>
                </div>

                <p>From: {email.from || "Unknown"}</p>
                <p><strong>Summary:</strong> {summary}</p>
                <p><strong>Sentiment:</strong> {sentiment}</p>

                <button
  onClick={() => generateAIReply(email, index)}
  style={{
    marginTop: "10px",
    padding: "6px 12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  Generate AI Reply
</button>

{replies[index] && (
  <div
    style={{
      marginTop: "10px",
      padding: "10px",
      background: "#f3f4f6",
      borderRadius: "6px",
      whiteSpace: "pre-line",
    }}
  >
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
