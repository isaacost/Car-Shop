import { Request, Response, NextFunction } from 'express';
import CarService from '../Services/CarService';

export default class CarController {
  private service: CarService = new CarService();

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.create(req.body);
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }
}