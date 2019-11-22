import { NextFunction, Request, Response } from 'express';

const express = require('express');
const githubRouter = express.Router();

githubRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello github');
});

export { githubRouter };
