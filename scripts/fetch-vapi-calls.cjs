const dotenv = require('dotenv');
const mongoose = require('mongoose');
const CallLog = require('../models/CallLog.cjs');

dotenv.config();

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const ORG_ID = process.env.VAPI_ORG_ID;
const API_KEY = process.env.VAPI_API_KEY;

const fetchAndSaveCalls = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const res = await fetch(`https://api.vapi.ai/v1/calls?direction=inbound`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error('Unexpected response:', data);
      return;
    }

    for (const call of data) {
      await CallLog.findOneAndUpdate(
        { id: call.id },
        {
          from_number: call.from_number,
          duration_seconds: call.duration_seconds,
          timestamp: call.timestamp,
          transcript_url: call.transcript_url,
          audio_url: call.audio_url
        },
        { upsert: true }
      );
    }

    console.log('✅ All Vapi calls saved to MongoDB.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
};

fetchAndSaveCalls();