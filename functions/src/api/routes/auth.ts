import { NextFunction, Request, Response } from 'express';

const express = require('express');
const authRouter = express.Router();

authRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello login');
});

authRouter.post('/login', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello login');
});

authRouter.post('/logout', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello logout');
});

export { authRouter };
