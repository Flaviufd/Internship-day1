const express = require('express');
const https = require('https');
const fs = require('fs');

const apiLogger = require('./apiLogger');

//edited

const app = express();
app.use(apiLogger);

let key = fs.readFileSync(__dirname+'/tutorial.key','utf-8')
let cert = fs.readFileSync(__dirname+'/tutorial.crt','utf-8')

// Define sample product data
const fruits = [
  { Id: 1, Name: 'Apple', Price: 3.4, Stock: 100},
  { Id: 2, Name: 'Banana', Price: 5.75, Stock: 50},
  { Id: 3, Name: 'Orange', Price: 12.45, Stock: 44}
];

// Start the server
const port = 443;
const parameters = {
  key: key,
  cert: cert
}

// Define route to get all products
app.get('/api/fruits', (req, res) => {
  res.json(fruits);
});

const server = https.createServer(parameters, app);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
