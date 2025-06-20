const express = require('express');
const fileUpload = require('multer')();
const dotenv = require('dotenv');
const processMeetingRouter = require('./routes/processMeeting');

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload.any());

app.use('/process-meeting', processMeetingRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
