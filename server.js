import express from 'express';
import dotenv from 'dotenv';
import vapiRoutes from './api/vapi/calls.js';
import recordingRouter from './api/vapi/recording.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;

app.use('/api/vapi', vapiRoutes);
app.use('/api/vapi/recording', recordingRouter); // ✅ add this line

app.get('/', (req, res) => {
  res.send('Vapi Dashboard Backend');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
