import express from 'express';

const app = express();

app.get('/', (request, response) => {
  response.send('Main Route sd!');
});

app.listen(3333, () => {
  console.log('Servidor subiu!!!');
});
