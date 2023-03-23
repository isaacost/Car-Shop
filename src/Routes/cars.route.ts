import { IRouter, Router } from 'express';
import CarController from '../Controllers/CarController';

const control = new CarController();
const carRouter: IRouter = Router();

carRouter.post('/cars', control.create.bind(control));
carRouter.get('/cars', control.get.bind(control));
carRouter.get('/cars/:id', control.get.bind(control));
carRouter.put('/cars/:id', control.update.bind(control));
carRouter.delete('/cars/:id', control.delete.bind(control));

export default carRouter;