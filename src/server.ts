import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import './database';
import { directoryAvatar } from './config/uploadAvatar';

const app = express();
app.use(express.json());
app.use('/files', express.static(directoryAvatar));
app.use(routes);

app.listen(3333, () => {
  console.log('Servidor subiu!!!');
});
