import { Request, Response, NextFunction } from 'express';
import MotorcycleService from '../Services/MotorcycleService';

export default class MotorcycleController {
  private service: MotorcycleService = new MotorcycleService();

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.create(req.body);
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.get(id);      
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }
}