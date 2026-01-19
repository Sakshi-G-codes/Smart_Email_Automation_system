const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');



const { sendEmail, fetchEmails, syncEmails } = require('./services/emailService');




const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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



app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});
