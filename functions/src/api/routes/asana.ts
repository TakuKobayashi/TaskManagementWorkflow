import { NextFunction, Request, Response } from 'express';

const express = require('express');
const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello asana');
});

router.post('/webhook', (req: Request, res: Response, next: NextFunction) => {
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

export { router };
