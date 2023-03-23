import { IRouter, Router } from 'express';
import carRouter from './cars.route';
import motorcycleRouter from './motorcycles.route';

const router: IRouter = Router();

router.use(carRouter);
router.use(motorcycleRouter);

export default router;