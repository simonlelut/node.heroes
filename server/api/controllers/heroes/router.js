"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const controller_1 = require("./controller");
exports.default = express.Router()
    .get('/', controller_1.default.heroes)
    .get('/:heroId', controller_1.default.heroById)
    .post('/', controller_1.default.addHero)
    .put('/:heroId', controller_1.default.heroUpdate)
    .delete('/:heroId', controller_1.default.heroDelete)
    .param('heroId', controller_1.default.heroId);
//# sourceMappingURL=router.js.map