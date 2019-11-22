import { NextFunction, Request, Response } from 'express';

const express = require('express');
const googleRouter = express.Router();

googleRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello google');
});

export { googleRouter };
