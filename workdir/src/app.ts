import bodyParser from 'body-parser';
/* eslint-disable max-len */
import express, { Request, Response } from 'express';
import morgan from 'morgan';// for accessing config in .env file
import path from 'path';
import routes from './routes/index';

const rfs: any = require('rotating-file-stream');

const app = express();
app.use(bodyParser.json());

const requestLogStream = rfs.createStream('request.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'logs'),
});

// to resolve cross origin resource shearing (CORS) error add folowing to te response header
app.use((req:Request, res: Response, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms', { stream: requestLogStream }));

app.use(morgan('dev'));
app.use('/api/v1/week-6-task', routes);

app.get('*', (req: Request, res: Response) => { res.end('Server is Live'); });

export default app;
