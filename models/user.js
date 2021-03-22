const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        personal_number: {
            type: String,
            required: true,
        },
        account_number: {
            type: Number,
        },
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        date_of_birth: {
            type: Date,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
