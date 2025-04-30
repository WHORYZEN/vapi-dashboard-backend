// backend/api/vapi/calls.js
import express from 'express';
import axios from 'axios';

const router = express.Router();
const VAPI_API_KEY = process.env.VAPI_API_KEY;

router.get('/calls', async (req, res) => {
  try {
    const response = await axios.get('https://api.vapi.ai/calls?direction=inbound', {
      headers: {
        'Authorization': `Bearer ${VAPI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const formattedCalls = response.data.calls.map(call => ({
      id: call.id,
      from_number: call.from,
      duration_seconds: call.duration,
      timestamp: call.created_at,
      transcript_url: call.transcript_url || null,
      audio_url: call.recording_url || null
    }));

    res.status(200).json(formattedCalls);
  } catch (error) {
    console.error('Failed to fetch Vapi call logs:', error.message);
    res.status(500).json({ error: 'Failed to fetch call logs' });
  }
});

router.get('/recording/:id', async (req, res) => {
  const callId = req.params.id;
  try {
    const response = await axios.get(`https://api.vapi.ai/calls/${callId}`, {
      headers: {
        'Authorization': `Bearer ${VAPI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const recordingUrl = response.data.recording_url;
    if (!recordingUrl) {
      return res.status(404).json({ error: 'Recording not available' });
    }

    const audioStream = await axios.get(recordingUrl, { responseType: 'stream' });
    res.setHeader('Content-Type', 'audio/mpeg');
    audioStream.data.pipe(res);
  } catch (error) {
    console.error('Failed to stream recording:', error.message);
    res.status(500).json({ error: 'Failed to fetch recording' });
  }
});

export default router;
