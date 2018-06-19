import * as express from 'express';
import controller from './controller'

export default express.Router()
    .get('/', controller.heroes)
    .get('/:heroId', controller.heroById)
    .post('/', controller.addHero)
    .put('/:heroId', controller.heroUpdate)
    .delete('/:heroId', controller.heroDelete)
    .param('heroId', controller.heroId)

