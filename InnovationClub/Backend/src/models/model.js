const mongoose = require('mongoose');

const credentialsSchema = mongoose.model('Credentials', new mongoose.Schema({
  email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'faculty', 'student'], required: true }
}));

module.exports = credentialsSchema;