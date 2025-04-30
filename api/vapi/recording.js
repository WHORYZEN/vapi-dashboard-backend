import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const callId = req.params.id;
    const url = `https://api.vapi.ai/calls/${callId}/recording`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
      },
      responseType: 'stream',
    });

    res.setHeader('Content-Type', 'audio/mpeg');
    response.data.pipe(res);
  } catch (error) {
    console.error('Error fetching Vapi recording:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to stream recording' });
  }
});

export default router;