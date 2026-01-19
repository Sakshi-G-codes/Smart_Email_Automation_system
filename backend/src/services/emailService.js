const nodemailer = require('nodemailer');
const imaps = require('imap-simple');
const Email = require('../models/Email');
const { upsertEmailEmbedding } = require('../vectorStore');

const config = {
    imap: {
        user: process.env.MAIL_USERNAME,
        password: process.env.MAIL_PASSWORD,
        host: 'imap.gmail.com',
        port: 993,
        tls: true,
        tlsOptions: { rejectUnauthorized: false },
        authTimeout: 3000
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
            bodies: ['HEADER', 'TEXT'],
            markSeen: false
        };

        const messages = await connection.search(searchCriteria, searchOptions);

        const emails = messages.map(message => {
            const parts = message.parts;
            const headerPart = parts.find(part => part.which === 'HEADER');
            const textPart = parts.find(part => part.which === 'TEXT');

            return {
                messageId: message.attributes.uid.toString(),
                subject: headerPart.body.subject ? headerPart.body.subject[0] : '(No Subject)',
                from: headerPart.body.from ? headerPart.body.from[0] : '(Unknown)',
                date: headerPart.body.date ? new Date(headerPart.body.date[0]) : new Date(),
                body: textPart ? textPart.body : '(No Body)',
                provider: 'gmail'
            };
        });

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
