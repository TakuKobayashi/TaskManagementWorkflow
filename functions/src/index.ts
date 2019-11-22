import { region } from 'firebase-functions';
import * as express from 'express';
import { asanaRouter } from './api/routes/asana';
import { githubRouter } from './api/routes/github';
import { googleRouter } from './api/routes/google';
import { authRouter } from './api/routes/auth';

import { initFirestore } from './libs/load-firestore';

const passport = require('passport');
const firestore = initFirestore();

const app = express();
const cors = require('cors');

app.use(passport.initialize());
app.use(cors({ origin: true }));

app.use('/auth', authRouter);
app.use('/asana', asanaRouter);
app.use('/google', googleRouter);
app.use('/github', githubRouter);

app.get('/', (req, res) => {
  res.json({ hello: 'world' });
});

app.get('/getData', async (req, res) => {
  const users = await firestore.collection('users').get()
  const results: FirebaseFirestore.DocumentData[] = [];
  users.forEach((doc: FirebaseFirestore.DocumentData) => {
    console.log(doc.id, '=>', doc.data());
    results.push(doc.data())
  });
  res.json(results);
});

app.get('/inputData', (req, res) => {
  // collectionがデータのリスト(row) docがキー(Id)で中身がカラム(JSON)
  const docRef = firestore.collection('users').doc('alovelace');
  const setAda = docRef.set({
    first: 'Ada',
    last: 'Lovelace',
    born: 1815,
  });
  res.json(setAda);
});

export const api = region('asia-northeast1').https.onRequest(app);

export default app;
