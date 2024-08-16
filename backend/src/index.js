const express = require('express');
const uploadRoute = require('./routes/uploadRoute');
const logger = require('./logger'); 
const app = express();
const port = 5000;

app.use(express.json());
app.use('/api/upload', uploadRoute);



process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.listen(port, () => {
  logger.info(`Server running on http://localhost:${port}`);
});