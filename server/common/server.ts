import * as express from 'express';
import { Application } from 'express';
import * as path from 'path';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import * as cookieParser from 'cookie-parser';
import swaggerify from './swagger';
import l from './logger';
import mongoose = require("mongoose");
const fs = require('fs');

mongoose.Promise = require('bluebird');

mongoose.connect("mongodb://localhost/heroes", (err) => {
    if (err) {
        l.error(err)
    }
});
const app = express();

export default class ExpressServer {
  constructor() {
    const root = path.normalize(__dirname + '/../..');
    app.set('appPath', root + 'client');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(express.static(`${root}/public`));
    app.use(cors({ origin: true }));
  }

  router(routes: (app: Application) => void): ExpressServer {
    swaggerify(app, routes)
    return this;
  }

  listen(port: number = parseInt(process.env.PORT)): Application {
    const welcome = port => () => l.info(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname() } on port: ${port}}`);
    http.createServer(app).listen(port, welcome(port));
    return app;
  }
}