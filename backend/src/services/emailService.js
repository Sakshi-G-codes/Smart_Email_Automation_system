const nodemailer = require('nodemailer');
const imaps = require('imap-simple');
const Email = require('../models/Email');
const { upsertEmailEmbedding } = require('../vectorStore');
const { simpleParser } = require('mailparser');

const config = {
    imap: {
        user: process.env.MAIL_USERNAME,
        password: process.env.MAIL_PASSWORD,
        host: 'imap.gmail.com',
        port: 993,
        tls: true,
        tlsOptions: { rejectUnauthorized: false },
        authTimeout: 10000,
        connTimeout: 10000
    },
    smtp: {
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    }
};

const sendEmail = async (to, subject, text, html) => {
    try {
        const transporter = nodemailer.createTransport(config.smtp);
        const info = await transporter.sendMail({
            from: process.env.MAIL_USERNAME,
            to,
            subject,
            text,
            html
        });
        console.log('Message sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

const fetchEmails = async (searchCriteria = ['UNSEEN']) => {
    try {
        const connection = await imaps.connect(config);
        await connection.openBox('INBOX');

        const searchOptions = {
            bodies: [''],
            struct: true,
            markSeen: false
        };

        const messages = await connection.search(searchCriteria, searchOptions);

        const emails = [];

        for (const message of messages) {
            const all = message.parts.find(part => part.which === '');
            const raw = all?.body;

            if (!raw) continue;

            const parsed = await simpleParser(raw);

            let cleanText = parsed.text;

if (!cleanText && parsed.html) {
    cleanText = parsed.html;

    // Remove style and script blocks completely
    cleanText = cleanText.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
    cleanText = cleanText.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');

    // Remove HTML tags
    cleanText = cleanText.replace(/<[^>]*>/g, '');

    // Remove CSS-like leftovers
    cleanText = cleanText.replace(/\{[^}]*\}/g, '');

    // Remove excessive whitespace
    cleanText = cleanText.replace(/\s+/g, ' ').trim();
}

if (!cleanText || cleanText.length < 5) {
    cleanText = 'No readable content';
}


            emails.push({
                messageId: message.attributes.uid.toString(),
                subject: parsed.subject || '(No Subject)',
                from: parsed.from?.text || '(Unknown)',
                date: parsed.date || new Date(),
                snippet: cleanText.substring(0, 200).trim(),
                provider: 'gmail'
            });
        }

        connection.end();
        return emails;

    } catch (error) {
        console.error('Error fetching emails:', error);
        throw error;
    }
};



const syncEmails = async () => {
    try {
        const emails = await fetchEmails(['ALL']); // Fetch all to sync (limit logic can be added later)
        let savedCount = 0;
        let embeddedCount = 0;

        for (const emailData of emails) {
            // Check if email already exists
            const existingEmail = await Email.findOne({ messageId: emailData.messageId });
            if (!existingEmail) {
                const newEmail = new Email(emailData);
                await newEmail.save();
                savedCount++;

                // Generate embedding
                const embeddingResult = await upsertEmailEmbedding(newEmail._id, newEmail.body);
                if (embeddingResult) {
                    newEmail.isEmbedded = true;
                    await newEmail.save();
                    embeddedCount++;
                }
            }
        }
        return { savedCount, embeddedCount };
    } catch (error) {
        console.error('Error syncing emails:', error);
        throw error;
    }
};

module.exports = {
    sendEmail,
    fetchEmails,
    syncEmails
};
