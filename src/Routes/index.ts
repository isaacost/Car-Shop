import { IRouter, Router } from 'express';
import carRouter from './cars.route';

const router: IRouter = Router();

router.use(carRouter);

export default router;