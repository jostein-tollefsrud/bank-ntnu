const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        personal_number: {
            type: String,
            required: true,
            unique: true,
        },
        account_number: {
            type: Number,
            default: function () {
                // Generate 16 digits random number
                return (number = Math.floor(
                    Math.random() * 8999999999 + 10000000000
                ));
            },
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
