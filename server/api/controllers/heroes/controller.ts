import {NextFunction, Request, Response} from 'express';
import l from '../../../common/logger';
import {default as Heroes, HeroesModel} from "../../models/Heroes";



let hero_find : HeroesModel;

export class Controller {

    heroes(req: Request, res: Response): void {

        let name = req.query.name
        let heroes = null;
        
        if(name){
            heroes =  Heroes.find({name: new RegExp(name, "i")});
        }
        else
            heroes =  Heroes.find();

       heroes.lean().exec((err: Error, heroes:  HeroesModel[]) =>{
            if(err ){
                l.error(err);
                return res.status(404).send(err);
            }
            if(heroes.length === 0){
                l.info("get 0 hero");
                return res.status(204).send();
            }
            l.info("get "+ heroes.length + " heroes");
            res.status(200).json(heroes);
        });
    }

    heroById(req: Request, res: Response): void {

        l.info("get hero " + hero_find._id);
        res.status(200).json(hero_find);
    }

    addHero(req: Request, res: Response): void {

        const hero = new Heroes({
            name: req.body.name,
        });

        hero.save(async (err: Error) => {
            if(err){
                l.error(err);
                return res.status(404).send(err);
            }
            l.info("add hero");
            res.status(201)
                .location(`heroes/${hero.id}`)
                .json(hero);
        });
    }

    heroUpdate(req: Request, res: Response): void {

        console.log(req.body)

        if(req.body.name){

            const hero = {
                name : req.body.name
            };

            Heroes.update({_id : hero_find._id}, hero , (err: Error) => {
                if(err){
                    l.error(err);
                    return res.status(404).send(err);
                }

                l.info("Update hero " + hero_find._id);
                res.status(200).json("Hero successfully update !")
            });
        }
        else
            res.status(404).send("Couldn't update hero, check your request !");
    }

    heroDelete(req: Request, res: Response): void {

        Heroes.remove({_id : hero_find._id}, (err: Error) => {
            if(err){
                l.error(err);
                return res.status(404).send(err);
            }

            l.info("Remove hero " + hero_find._id);
            res.status(200).json("Hero successfully remove !")
        });
    }

    heroId(req: Request, res: Response, next: NextFunction, id: string): void {

        Heroes.findById(id).lean().exec( ((err: Error, hero: HeroesModel) => {
            if(!hero || err){
                l.error(err);
                return res.status(404).send("This hero doesn't exist !");
            }

            hero_find  = hero;
            next();
        }));

    }
}
export default new Controller();
