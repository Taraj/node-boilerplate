import express, { Application } from 'express';
import { Model } from 'objection';
import Knex from 'knex';
import knexConfig from './knexfile';
import errorMiddleware from './errors/error.middleware';
import authMiddleware from './auth/auth.middleware';
import { PageNotFound } from './errors/exceptions/pageNotFound';
import { AuthController } from './auth/auth.controller';
import { Config } from './config';


const app: Application = express();
Model.knex(Knex(knexConfig.development))


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(authMiddleware);

//////// Routes /////////
AuthController(app);


////////////////////////
app.use(() => {
    throw new PageNotFound('Not Found.');
});

app.use(errorMiddleware);

app.listen(Config.APP_PORT, () => {
    console.log(`App is listening on port ${Config.APP_PORT}!`);
});