const mongoose = require('mongoose');

const CallLogSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  from_number: String,
  duration_seconds: Number,
  timestamp: Date,
  transcript_url: String,
  audio_url: String,
  transcript: String
}, { timestamps: true });

module.exports = mongoose.model('CallLog', CallLogSchema);