// models/CallLog.js
import mongoose from 'mongoose';

const CallLogSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  from_number: String,
  duration_seconds: Number,
  timestamp: Date,
  transcript_url: String,
  audio_url: String,
  transcript: String
}, { timestamps: true });

const CallLog = mongoose.model('CallLog', CallLogSchema);
export default CallLog; // ✅ Proper ESM export