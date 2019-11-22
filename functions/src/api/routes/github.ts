import { NextFunction, Request, Response } from 'express';

const express = require('express');
const passport = require('passport');
const githubRouter = express.Router();

githubRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello github');
});

githubRouter.get('/auth', passport.authenticate('github'));

githubRouter.get('/callback', passport.authenticate('github'), (req: Request, res: Response, next: NextFunction) => {
  res.redirect('/');
});

export { githubRouter };
