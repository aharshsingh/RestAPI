import express from 'express';
import { APP_PORT, DB_URL } from './config'
import routes from './routes';
import errorHandler from './middlewares/errorHandler';
import mongoose from 'mongoose';
const app = express();

//databaseConnection
mongoose.connect(DB_URL, { userNewUrlParser: true, useUnifiedTopology: true, userFindAndModify: false})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB connected...');
});

app.use(express.json());
app.use(routes);
app.use(errorHandler);
app.listen(APP_PORT, () => {
    console.log(`Listening on ${APP_PORT}`)
});