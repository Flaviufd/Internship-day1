const fs = require('fs');

function apiLogger(req, res, next) {
  const logEntry = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`;
  console.log(logEntry);

  // Optionally, you can log the request body as well
  console.log('Request Body:', req.body);

  // Create a write stream to append the log entry to a file
  const logStream = fs.createWriteStream('api.log', { flags: 'a' });
  logStream.write(logEntry + '\n');

  // Continue to the next middleware or route handler
  next();
}

module.exports = apiLogger;
