import { NextFunction, Request, Response } from 'express';
import { AsanaWebhookRoutine } from '../../libs/asana-webhook-routine';
const Asana = require('asana');

const express = require('express');
const passport = require('passport');
const asanaRouter = express.Router();

asanaRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello asana');
});

asanaRouter.get('/workspaces', async (req: Request, res: Response, next: NextFunction) => {
  const asanaAccessToken = req.get('asana-access-token') || '';
  const client = Asana.Client.create().useAccessToken(asanaAccessToken);
  const meUser = await client.users.me();
  res.json(meUser.workspaces);
});

asanaRouter.get('/projects', async (req: Request, res: Response, next: NextFunction) => {
  const asanaAccessToken = req.get('asana-access-token') || '';
  const workspaceId: string = req.query('workspaceId') || '';
  const client = Asana.Client.create().useAccessToken(asanaAccessToken);
  const projects = await client.projects.findByWorkspace(Number(workspaceId));
  res.json(projects.data);
});

asanaRouter.get('/registingWebhooks', async (req: Request, res: Response, next: NextFunction) => {
  const asanaAccessToken = req.get('asana-access-token') || '';
  const workspaceId: string = req.query('workspaceId') || '';
  const client = Asana.Client.create().useAccessToken(asanaAccessToken);
  const webhooks = await client.webhooks.getAll(workspaceId);
  res.json(webhooks.data);
});

asanaRouter.post('/registWebhook', async (req: Request, res: Response, next: NextFunction) => {
  const asanaAccessToken = req.get('asana-access-token') || '';
  const projectId: string = req.query('projectId') || '';
  const client = Asana.Client.create().useAccessToken(asanaAccessToken);
  // 一番最後に {opt_fields: []} コレを追加するとWebhookの時に付け加えるパラメータを増やすことができる https://developers.asana.com/docs/#establish-a-webhook
  const webhook = await client.webhooks.create(projectId, 'https://asia-northeast1-ag2w-245905.cloudfunctions.net/api/asana/webhook');
  res.json(webhook);
});

asanaRouter.post('/deleteWebhook', async (req: Request, res: Response, next: NextFunction) => {
  const asanaAccessToken = req.get('asana-access-token') || '';
  const webhookId: string = req.query('webhookId') || '';
  const client = Asana.Client.create().useAccessToken(asanaAccessToken);
  await client.webhooks.deleteById(webhookId);
  res.status(200);
});

asanaRouter.get('/auth', passport.authenticate('Asana'));

asanaRouter.get('/callback', passport.authenticate('Asana'), (req: Request, res: Response, next: NextFunction) => {
  res.redirect('/');
});

asanaRouter.post('/webhook', async (req: Request, res: Response, next: NextFunction) => {
  const hookSecret = req.headers['x-hook-secret'];
  if (hookSecret) {
    res.setHeader('X-Hook-Secret', hookSecret);
  } else {
    const webhookRoutine = new AsanaWebhookRoutine(req.body);
    await webhookRoutine.execute();
  }
  console.log(JSON.stringify(req.headers));
  console.log(JSON.stringify(req.query));
  console.log(JSON.stringify(req.body));
  res.json(req.body);
});

export { asanaRouter };
