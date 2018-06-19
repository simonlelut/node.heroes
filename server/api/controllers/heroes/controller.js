"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../../../common/logger");
const Heroes_1 = require("../../models/Heroes");
let hero_find;
class Controller {
    heroes(req, res) {
        Heroes_1.default.find().lean().exec((err, heroes) => {
            if (err) {
                logger_1.default.error(err);
                return res.status(404).send(err);
            }
            logger_1.default.info("get all heroes");
            return res.status(200).json(heroes);
        });
    }
    heroById(req, res) {
        logger_1.default.info("get hero " + hero_find._id);
        return res.status(200).json(hero_find);
    }
    addHero(req, res) {
        const hero = new Heroes_1.default({
            name: req.body.name,
        });
        hero.save((err) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                logger_1.default.error(err);
                return res.status(404).send(err);
            }
            logger_1.default.info("add hero");
            return res.status(200).json(hero);
        }));
    }
    heroUpdate(req, res) {
        if (req.body.name) {
            const hero = {
                name: req.body.name
            };
            Heroes_1.default.update({ _id: hero_find._id }, hero, (err) => {
                if (err) {
                    logger_1.default.error(err);
                    res.status(404).send(err);
                }
                logger_1.default.info("Update hero " + hero_find._id);
                return res.status(200).json("Hero successfully update !");
            });
        }
        else
            return res.status(404).send("Couldn't update hero, check your request !");
    }
    heroDelete(req, res) {
        Heroes_1.default.remove({ _id: hero_find._id }, (err) => {
            if (err) {
                logger_1.default.error(err);
                return res.status(404).send(err);
            }
            logger_1.default.info("Remove hero " + hero_find._id);
            return res.status(200).json("Hero successfully remove !");
        });
    }
    heroId(req, res, next, id) {
        Heroes_1.default.findById(id).lean().exec(((err, hero) => {
            if (!hero || err) {
                logger_1.default.error(err);
                return res.status(404).send("This hero doesn't exist !");
            }
            hero_find = hero;
            next();
        }));
    }
}
exports.Controller = Controller;
exports.default = new Controller();
//# sourceMappingURL=controller.js.map