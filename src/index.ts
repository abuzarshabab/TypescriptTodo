import express from 'express';
import todotRoute from './routes/todos';
import bodyParser from 'body-parser';

const SERVER_PORT = 3000;
const app = express();

app.use(bodyParser.json())
app.use(todotRoute);

app.listen(SERVER_PORT, () => {
  console.log('Server is listening in the localhost:' + SERVER_PORT)
})