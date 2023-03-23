import { isValidObjectId } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import Motorcycle from '../Domains/Motorcycle';
import IResponse from '../Interfaces/IResponse';
import { response, responseError } from '../utils/response';

export default class MotorcycleService {
  private model: MotorcycleODM = new MotorcycleODM();

  static createDomain(motorcycle: IMotorcycle | null) {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  async create(motorcycle: IMotorcycle): Promise<IResponse> {
    const newMotorcycle = await this.model.create(motorcycle);
    const message = MotorcycleService.createDomain(newMotorcycle);
    return response(201, message);
  }

  async get(id?: string): Promise<IResponse> {
    if (id) {
      if (!isValidObjectId(id)) return responseError(422, 'Invalid mongo id');
  
      const motorcycle = await this.model.getById(id);
      if (!motorcycle) return responseError(404, 'Motorcycle not found');
      return response(200, MotorcycleService.createDomain(motorcycle));
    }
    const motorcycles = await this.model.get();
    const motorcyclesDomains = motorcycles.map((e) => MotorcycleService.createDomain(e));
    return response(200, motorcyclesDomains);
  }

  async update(id: string, moto: Partial<IMotorcycle>) {
    if (!isValidObjectId(id)) return responseError(422, 'Invalid mongo id');

    const motorcycleUpdate = await this.model.update(id, moto);
    if (!motorcycleUpdate) return responseError(404, 'Motorcycle not found');

    const message = MotorcycleService.createDomain(motorcycleUpdate);
    return response(200, message);
  }
}
