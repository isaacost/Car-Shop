import { IRouter, Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const MOTORCYCLE_POR_ID = '/motorcycles/:id';
const control = new MotorcycleController();
const motorcycleRouter: IRouter = Router();

motorcycleRouter.post('/motorcycles', control.create.bind(control));
motorcycleRouter.get('/motorcycles', control.get.bind(control));
motorcycleRouter.get(MOTORCYCLE_POR_ID, control.get.bind(control));
motorcycleRouter.put(MOTORCYCLE_POR_ID, control.update.bind(control));
motorcycleRouter.delete(MOTORCYCLE_POR_ID, control.delete.bind(control));

export default motorcycleRouter;