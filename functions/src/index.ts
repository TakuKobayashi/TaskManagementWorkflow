import { region } from 'firebase-functions';
import * as express from 'express';
import { asanaRouter } from './api/routes/asana';
import { githubRouter } from './api/routes/github';
import { googleRouter } from './api/routes/google';
import { authRouter } from './api/routes/auth';

import { initFirestore } from './libs/load-firestore';

require('dotenv').config();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GitHubStrategy = require('passport-github').Strategy;

const firestore = initFirestore();
const app = express();
const cors = require('cors');

app.use(passport.initialize());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL: '/ag2w-245905/asia-northeast1/api/google/callback',
    },
    (accessToken: string, refreshToken: string, profile: any, cb: any) => {
      const googleDocRef = firestore.collection('google-users').doc(profile.id);
      const googleToken = googleDocRef.set({
        accessToken: accessToken,
        refreshToken: refreshToken || '',
        profile: profile,
      });
      cb(undefined, googleToken);
    },
  ),
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/ag2w-245905/asia-northeast1/api/github/callback',
    },
    (accessToken: string, refreshToken: string, profile: any, cb: any) => {
      console.log({ accessToken, refreshToken, profile, cb });
      const githubDocRef = firestore.collection('github-users').doc(profile.id);
      const githubToken = githubDocRef.set({
        accessToken: accessToken,
        refreshToken: refreshToken || '',
        profile: profile,
      });
      cb(undefined, githubToken);
    },
  ),
);

passport.serializeUser(function(user: any, done: any) {
  done(null, user);
});

passport.deserializeUser(function(user: any, done: any) {
  done(null, user);
});

app.use(cors({ origin: true }));

app.use('/auth', authRouter);
app.use('/asana', asanaRouter);
app.use('/google', googleRouter);
app.use('/github', githubRouter);

app.get('/', (req, res) => {
  res.json({ hello: 'world' });
});

app.get('/getData', async (req, res) => {
  const users = await firestore.collection('users').get();
  const results: FirebaseFirestore.DocumentData[] = [];
  users.forEach((doc: FirebaseFirestore.DocumentData) => {
    console.log(doc.id, '=>', doc.data());
    results.push(doc.data());
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
