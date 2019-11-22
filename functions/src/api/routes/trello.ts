import { NextFunction, Request, Response } from 'express';

const express = require('express');
const trelloRouter = express.Router();

trelloRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello trello');
});

export { trelloRouter };
