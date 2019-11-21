import {region} from "firebase-functions";
import * as express from 'express';

const app = express();
const cors = require('cors');

app.use(cors({ origin: true }));

app.get('/', (req, res) => {
  res.json({hello: "world"})
});

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

export const api = region("asia-northeast1").https.onRequest(app);

export default app
