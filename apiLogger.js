const fs = require('fs');

function apiLogger(req, res, next) {
  const logEntry = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`;
  console.log(logEntry);
  
  const logStream = fs.createWriteStream('api.log', { flags: 'a' });
  logStream.write(logEntry + '\n');

  next();
}

module.exports = apiLogger;
