import { IRouter, Router } from 'express';
import CarController from '../Controllers/CarController';

const control = new CarController();
const carRouter: IRouter = Router();

carRouter.post('/cars', control.create.bind(control));

export default carRouter;