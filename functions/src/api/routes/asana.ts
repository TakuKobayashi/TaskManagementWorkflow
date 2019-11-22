import { NextFunction, Request, Response } from 'express';

const express = require('express');
const asanaRouter = express.Router();

asanaRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello asana');
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
