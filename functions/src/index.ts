import { region, config } from 'firebase-functions';
import * as express from 'express';
import { asanaRouter } from './api/routes/asana';
import { githubRouter } from './api/routes/github';
import { googleRouter } from './api/routes/google';
import { authRouter } from './api/routes/auth';
import { trelloRouter } from './api/routes/trello';

import * as admin from 'firebase-admin';

require('dotenv').config();

const fs = require('fs');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const AsanaStrategy = require('passport-asana').Strategy;

admin.initializeApp(config().firebase);
const firestore = admin.firestore();
const storage = admin.storage();
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
    async (accessToken: string, refreshToken: string, profile: any, cb: any) => {
      const account = {
        accessToken: accessToken,
        refreshToken: refreshToken || '',
        profile: profile,
      };
      const googleDocRef = firestore.collection('google-users').doc(profile.id);
      await googleDocRef.set(account).catch((err) => console.log(err));
      cb(undefined, account);
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
    async (accessToken: string, refreshToken: string, profile: any, cb: any) => {
      const account = {
        accessToken: accessToken,
        refreshToken: refreshToken || '',
        profile: profile,
      };
      const githubDocRef = firestore.collection('github-users').doc(profile.id);
      await githubDocRef.set(account).catch((err) => console.log(err));
      cb(undefined, account);
    },
  ),
);

passport.use(
  'Asana',
  new AsanaStrategy(
    {
      clientID: process.env.ASANA_CLIENT_ID,
      clientSecret: process.env.ASANA_CLIENT_SECRET,
      callbackURL: '/ag2w-245905/asia-northeast1/api/asana/callback',
    },
    async (accessToken: string, refreshToken: string, profile: any, cb: any) => {
      const account = {
        accessToken: accessToken,
        refreshToken: refreshToken || '',
        profile: profile,
      };
      const asanaDocRef = firestore.collection('asana-users').doc(profile.id);
      await asanaDocRef.set(account).catch((err) => console.log(err));
      cb(undefined, account);
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
app.use('/trello', trelloRouter);

app.get('/', (req, res) => {
  res.json({ hello: 'world' });
});

app.get('/getData', async (req, res) => {
  const users = await firestore.collection('users').get();
  const results: FirebaseFirestore.DocumentData[] = [];
  for (const doc of users.docs) {
    console.log(doc.id, '=>', doc.data());
    results.push(doc.data());
  }
  res.json(results);
});

app.get('/inputData', async (req, res) => {
  // collectionがデータのリスト(row) docがキー(Id)で中身がカラム(JSON)
  const docRef = firestore.collection('users').doc('alovelace');
  const setAda = await docRef.set({
    first: 'Ada',
    last: 'Lovelace',
    born: 1815,
  });
  res.json(setAda);
});

app.get('/uploadStorage', (req, res) => {
  const new_file = storage.bucket().file('image.png');
  const blobStream = new_file.createWriteStream({
    metadata: {
      contentType: 'image/png',
    },
  });
  blobStream.end(fs.readFileSync('/Users/kobayashi/workspace/project/TaskManagementWorkflow/ag2wlogo.png'), () => {
    res.json({ hello: 'world' });
  });
});

export const api = region('asia-northeast1').https.onRequest(app);

export default app;
