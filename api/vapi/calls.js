// api/vapi/calls.js
import express from 'express';
const router = express.Router();

// In-memory call storage (simulating a database)
let callLogs = [];

router.get('/', async (req, res) => {
  try {
    res.json(callLogs);
  } catch (error) {
    console.error('Error fetching call logs:', error);
    res.status(500).json({ error: 'Failed to return call logs' });
  }
});

export default router;

// Export reference to callLogs so webhook.js can update it
export { callLogs };