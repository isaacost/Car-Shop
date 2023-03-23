import { IRouter, Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const control = new MotorcycleController();
const motorcycleRouter: IRouter = Router();

motorcycleRouter.post('/motorcycles', control.create.bind(control));
motorcycleRouter.get('/motorcycles', control.get.bind(control));
motorcycleRouter.get('/motorcycles/:id', control.get.bind(control));

export default motorcycleRouter;