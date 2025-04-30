// api/vapi/webhook.js
import express from 'express';
import { callLogs } from './calls.js';

const router = express.Router();

router.post('/', (req, res) => {
  try {
    const data = req.body;
    console.log('✅ Incoming Vapi webhook:', data);

    if (data?.id && data?.from_number) {
      callLogs.unshift({
        id: data.id,
        from_number: data.from_number,
        duration_seconds: data.duration_seconds || 0,
        timestamp: data.timestamp || new Date().toISOString(),
        transcript_url: data.transcript_url || '',
        audio_url: data.audio_url || '',
      });
    }

    res.status(200).send('Webhook received');
  } catch (err) {
    console.error('❌ Webhook error:', err);
    res.status(500).json({ error: 'Failed to process webhook' });
  }
});

export default router;