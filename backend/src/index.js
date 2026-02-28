const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');

const { generateReply } = require('./services/aiService');

const { sendEmail, fetchEmails, syncEmails } = require('./services/emailService');

const authRoutes = require("./routes/auth");

const protect = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/test/email/send', async (req, res) => {
  try {
    const { to, subject, text } = req.query;
    if (!to) return res.status(400).send('Missing "to" parameter');
    await sendEmail(to, subject || 'Test Email', text || 'This is a test email.');
    res.send({ status: 'Email sent successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get('/test/email/fetch', async (req, res) => {
  try {
    const emails = await fetchEmails(['ALL']); // Fetching all just for test, limit in prod
    // Limit to last 5 for sanity
    res.json(emails.slice(0, 5));
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get('/test/email/sync', async (req, res) => {
  try {
    const result = await syncEmails();
    res.json(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post('/ai/reply', protect, async (req, res) => {
  try {
    const { subject, content } = req.body;

    if (!subject || !content) {
      return res.status(400).json({ error: "Subject and content required" });
    }

    const reply = await generateReply(subject, content);

    res.json({ reply });
  } catch (error) {
    console.error("AI Reply Error:", error);
    res.status(500).json({ error: "Failed to generate reply" });
  }
});



app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});
