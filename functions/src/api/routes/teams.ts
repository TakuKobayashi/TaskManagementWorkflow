import { NextFunction, Request, Response } from 'express';

const express = require('express');
const teamsRouter = express.Router();

teamsRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello login');
});

teamsRouter.get('/index', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello login');
});

teamsRouter.post('/join', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello login');
});

teamsRouter.post('/create', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello login');
});

teamsRouter.post('/update', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello logout');
});

teamsRouter.post('/delete', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello logout');
});

export { teamsRouter };
