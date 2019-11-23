import { NextFunction, Request, Response } from 'express';
import * as Asana from 'asana';

const express = require('express');
const passport = require('passport');
const asanaRouter = express.Router();

asanaRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello asana');
});

asanaRouter.get('/workspaces', async (req: Request, res: Response, next: NextFunction) => {
  const asanaAccessToken = req.get('asana-access-token') || '';
  const client = Asana.Client.create().useAccessToken(asanaAccessToken);
  const meUser = await client.users.me()
  res.json(meUser.workspaces);
});

asanaRouter.get('/projects', async (req: Request, res: Response, next: NextFunction) => {
  const asanaAccessToken = req.get('asana-access-token') || '';
  const workspaceId: string = req.query('workspaceId') || '';
  const client = Asana.Client.create().useAccessToken(asanaAccessToken);
  const projects = await client.projects.findByWorkspace(Number(workspaceId))
  res.json(projects.data);
});

asanaRouter.get('/auth', passport.authenticate('Asana'));

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
