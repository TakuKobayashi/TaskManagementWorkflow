import app from './src/index';

app.get('/', (req, res) => {
  res.json(req.query)
});

const port = process.env.PORT || 5100;
const http = require('http');
http.createServer(app).listen(port, () => {
  console.log('Server listening at port %d', port);
});