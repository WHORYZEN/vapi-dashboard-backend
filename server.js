// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import vapiRoutes from './api/vapi/calls.js';
import recordingRouter from './api/vapi/recording.js';
import webhookRouter from './api/vapi/webhook.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

app.use('/api/vapi/calls', vapiRoutes);
app.use('/api/vapi/recording', recordingRouter);
app.use('/api/vapi/webhook', webhookRouter);

app.get('/', (req, res) => {
  res.send('Vapi Dashboard Backend Running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});