import express from 'express';
import CallLog from '../../models/CallLog.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const logs = await CallLog.find().sort({ timestamp: -1 });
    res.json(logs);
  } catch (error) {
    console.error('Error fetching call logs:', error);
    res.status(500).json({ error: 'Failed to return call logs' });
  }
});

export default router;