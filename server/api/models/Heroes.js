"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
let HeroesSchema = new mongoose.Schema({
    name: String
});
const Heroes = mongoose.model("Heroes", HeroesSchema);
exports.default = Heroes;
//# sourceMappingURL=Heroes.js.map