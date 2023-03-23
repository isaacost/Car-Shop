import { IRouter, Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const control = new MotorcycleController();
const motorcycleRouter: IRouter = Router();

motorcycleRouter.post('/motorcycles', control.create.bind(control));

export default motorcycleRouter;