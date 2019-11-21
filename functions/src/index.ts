import {region} from "firebase-functions";
import * as express from 'express';
import { router } from './api/routes/asana';

const app = express();
const cors = require('cors');

app.use(cors({ origin: true }));

app.use('/asana', router);

app.get('/', (req, res) => {
  res.json({hello: "world"})
});

export const api = region("asia-northeast1").https.onRequest(app);

export default app
