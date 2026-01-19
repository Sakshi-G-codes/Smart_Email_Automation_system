const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
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
    body: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        required: true
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
