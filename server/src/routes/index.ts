import { Application } from 'express';
import agentsRouter from './agents';
import logsRouter from './logs';

export default (app: Application) => {
  app.use('/agents', agentsRouter);
  app.use('/logs', logsRouter);
};
