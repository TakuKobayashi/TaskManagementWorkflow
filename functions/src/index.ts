import * as functions from 'firebase-functions';
import * as express from 'express';

const app = express();
const cors = require('cors');

app.use(cors({ origin: true }));

app.post('/webhook', (req, res) => {
  console.log(req.headers)
  res.json(req.body)
});

export const asana = functions.https.onRequest(app);

export default app
