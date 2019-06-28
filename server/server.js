const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const googleOAuth = require("./lambda/google-oauth/index");
const slideGenerate = require("./lambda/slide-generate/index");

const port = process.env.PORT || 3100;

//wake up http server
const http = require('http');

//Enable to receive requests access to the specified port
const server = http.createServer(app).listen(port, function() {
  console.log('Server listening at port %d', port);
});

app.get('/googleOauth', async function(req, res) {
  res.json(await googleOAuth.handler(req.query));
});

app.get('/slide/generate', async function (req, res) {
  res.json(await slideGenerate.handler(req.query));
});