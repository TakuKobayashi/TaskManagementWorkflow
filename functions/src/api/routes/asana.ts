import { NextFunction, Request, Response } from 'express';
//import * as Asana from 'asana';

const express = require('express');
const passport = require('passport');
const asanaRouter = express.Router();

asanaRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello asana');
});

asanaRouter.get('/auth', passport.authenticate('Asana'));
//asanaRouter.get('/auth', (req: Request, res: Response, next: NextFunction) => {
/*
  const client = Asana.Client.create({
    clientId: process.env.ASANA_CLIENT_ID,
    clientSecret: process.env.ASANA_CLIENT_SECRET,
    redirectUri: '/ag2w-245905/asia-northeast1/api/asana/callback',
  });
  */
//});

asanaRouter.get('/callback', passport.authenticate('Asana'), (req: Request, res: Response, next: NextFunction) => {
  res.redirect('/');
});

asanaRouter.post('/webhook', (req: Request, res: Response, next: NextFunction) => {
  const hookSecret = req.headers['x-hook-secret'];
  console.log(hookSecret);
  if (hookSecret) {
    res.setHeader('X-Hook-Secret', hookSecret);
  }
  console.log(req.headers);
  console.log(req.query);
  console.log(req.body);
  res.json(req.body);
});

export { asanaRouter };
