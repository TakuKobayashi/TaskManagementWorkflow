import { region } from 'firebase-functions';
import * as express from 'express';
import { asanaRouter } from './api/routes/asana';
import { githubRouter } from './api/routes/github';
import { googleRouter } from './api/routes/google';

const app = express();
const cors = require('cors');

app.use(cors({ origin: true }));

app.use('/asana', asanaRouter);
app.use('/google', googleRouter);
app.use('/github', githubRouter);

app.get('/', (req, res) => {
  res.json({ hello: 'world' });
});

export const api = region('asia-northeast1').https.onRequest(app);

export default app;
