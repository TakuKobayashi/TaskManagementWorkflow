import * as functions from 'firebase-functions';
import * as express from 'express';

const app = express();
const cors = require('cors');

app.use(cors({ origin: true }));

app.post('/webhook', (req, res) => {
  const hookSecret = req.headers["x-hook-secret"]
  console.log(hookSecret)
  if(hookSecret){
    res.setHeader('X-Hook-Secret', hookSecret);
  }
  console.log(req.headers)
  console.log(req.query)
  console.log(req.body)
  res.json(req.body)
});

export const asana = functions.https.onRequest(app);

export default app
