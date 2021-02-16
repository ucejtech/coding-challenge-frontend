/**
 * @package - Call Center
 * @description -Daily Call and Resolution Tracking Server
 */
import express, { Application, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { LogStream } from './config/logger';
import { HttpErrorException } from './@types/exceptions';
import corsConfig from './config/cors';
const PORT = 3000;

const app: Application = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true
  })
);
app.use(morgan('combined', { stream: new LogStream() }));

/*
 * Cors is enabled so the client can acces enpoint on this API wthout having to make request *
 *  from the same Origin
 */
app.use(function (
  err: HttpErrorException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.header('Access-Control-Allow-Origin', corsConfig.origins);
  res.header('Access-Control-Allow-Headers', corsConfig.headers);
  if (req.method === 'OPTIONS') {
    //preflight request
    res.header('Access-Control-Allow-Methods', corsConfig.methods);
    return res.status(200).json({});
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
