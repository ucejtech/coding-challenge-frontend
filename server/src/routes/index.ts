import { Application } from 'express';
import agentsRouter from './agents';
import logsRouter from './logs';
import callsRouter from './calls';

export default (app: Application) => {
  app.use('/calls', callsRouter);
  app.use('/agents', agentsRouter);
  app.use('/logs', logsRouter);
};
