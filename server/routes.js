"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./api/controllers/heroes/router");
function routes(app) {
    app.use('/heroes', router_1.default);
}
exports.default = routes;
;
//# sourceMappingURL=routes.js.map