const mongoose = require('mongoose');

const sentEmailSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  text: { type: String, required: true },
  subject:  { type: String, required: true },
  to: { type: String, required: true },
  from: { type: String, required: true },
});

module.exports = mongoose.model('SentMessage', sentEmailSchema);