const express = require('express');
const https = require('https');
const fs = require('fs');
const redis = require('redis');

const apiLogger = require('./apiLogger');

const app = express();
const redisClient = redis.createClient();

app.use(apiLogger);

let key = fs.readFileSync(__dirname+'/tutorial.key','utf-8')
let cert = fs.readFileSync(__dirname+'/tutorial.crt','utf-8')

const fruits = [
  { Id: 1, Name: 'Apple', Price: 3.4, Stock: 100},
  { Id: 2, Name: 'Banana', Price: 5.75, Stock: 50},
  { Id: 3, Name: 'Orange', Price: 12.45, Stock: 44}
];

const parameters = {
  key: key,
  cert: cert
}

function getDataFromSource(fruits) {
  return res.json(fruits);
}

app.get('/', (req, res) => {
  redisClient.get('data', (err, cachedData) => {
    if (cachedData) {
      console.log(`data from RAM`);
      return res.json({ data: JSON.parse(cachedData) });
    }
    const data = getDataFromSource(fruits);
    redisClient.setex('data', 300, JSON.stringify(data));
    
    console.log(`data from DB`);
    res.json({ data });
  });
});

const server = https.createServer(parameters, app);
server.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
