import express from 'express';
import path from 'path';
import router from './routes.js';

const dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/', express.static(`${dirname}/src/public`));
app.use('/', router);

export default app;
