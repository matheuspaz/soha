import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import router from './routes'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());

app.disable('x-powered-by');
app.use(express.json());
app.use(cookieParser());

app.use(router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});