"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const os = require("os");
const cookieParser = require("cookie-parser");
const swagger_1 = require("./swagger");
const logger_1 = require("./logger");
const mongoose = require("mongoose");
const fs = require('fs');
mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://localhost/heroes", (err) => {
    if (err) {
        logger_1.default.error(err);
    }
});
const app = express();
class ExpressServer {
    constructor() {
        const root = path.normalize(__dirname + '/../..');
        app.set('appPath', root + 'client');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cookieParser(process.env.SESSION_SECRET));
        app.use(express.static(`${root}/public`));
        app.use(cors({ origin: true }));
    }
    router(routes) {
        swagger_1.default(app, routes);
        return this;
    }
    listen(port = parseInt(process.env.PORT)) {
        const welcome = port => () => logger_1.default.info(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${port}}`);
        http.createServer(app).listen(port, welcome(port));
        return app;
    }
}
exports.default = ExpressServer;
//# sourceMappingURL=server.js.map