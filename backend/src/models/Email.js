const mongoose = require('mongoose');


const emailSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    messageId: {
        type: String,
        required: true,
        unique: true
    },
    provider: {
        type: String,
        enum: ['gmail', 'outlook'],
        required: true,
        default: 'gmail'
    },
    subject: {
        type: String,
        default: ''
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    body: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        enum: ['work', 'personal', 'spam', 'important', 'other'],
        default: 'other'
    },
    isRead: {
        type: Boolean,
        default: false
    },
    isEmbedded: {
        type: Boolean,
        default: false
    },
    embeddingId: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Email', emailSchema);
