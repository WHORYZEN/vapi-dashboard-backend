import express from 'express';
import CallLog from '../../models/CallLog.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    console.log("✅ Incoming webhook payload:", data);
    if (!data?.id || !data?.from_number) {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    await CallLog.findOneAndUpdate(
      { id: data.id },
      {
        $set: {
          from_number: data.from_number,
          duration_seconds: data.duration_seconds || 0,
          timestamp: data.timestamp || new Date(),
          transcript_url: data.transcript_url || '',
          audio_url: data.audio_url || ''
        }
      },
      { upsert: true }
    );
    console.log("✅ Call log saved to MongoDB");

    res.status(200).send('Call saved');
  } catch (err) {
    console.error('❌ Error saving call:', err);
    res.status(500).json({ error: 'Internal error' });
  }
});

export default router;