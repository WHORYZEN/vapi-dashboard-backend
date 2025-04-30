import mongoose from 'mongoose';

const CallLogSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  from_number: String,
  duration_seconds: Number,
  timestamp: Date,
  transcript_url: String,
  audio_url: String
}, { timestamps: true });

export default mongoose.model('CallLog', CallLogSchema);