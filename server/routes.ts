import { Application }  from 'express';
import routeHeroes      from './api/controllers/heroes/router';

export default function routes(app: Application): void {

  app.use('/heroes', routeHeroes);
};

