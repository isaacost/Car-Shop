import { isValidObjectId } from 'mongoose';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import Car from '../Domains/Car';
import IResponse from '../Interfaces/IResponse';
import { response, responseError } from '../utils/response';

const NOT_FOUND = 'Car not found';
const INVALID_ID = 'Invalid mongo id';

export default class CarService {
  private model: CarODM = new CarODM();

  static createDomain(car: ICar | null) {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  async create(car: ICar): Promise<IResponse> {
    const newCar = await this.model.create(car);
    const message = CarService.createDomain(newCar);
    return response(201, message);
  }

  async get(id?: string): Promise<IResponse> {
    if (id) {
      if (!isValidObjectId(id)) return responseError(422, INVALID_ID);
  
      const car = await this.model.getById(id);
      if (!car) return responseError(404, NOT_FOUND);
      return response(200, CarService.createDomain(car));
    }
    const cars = await this.model.get();
    const carsDomains = cars.map((e) => CarService.createDomain(e));
    return response(200, carsDomains);
  }

  async update(id: string, car: Partial<ICar>) {
    if (!isValidObjectId(id)) return responseError(422, INVALID_ID);

    const carUpdate = await this.model.update(id, car);
    if (!carUpdate) return responseError(404, NOT_FOUND);

    const message = CarService.createDomain(carUpdate);
    return response(200, message);
  }

  async delete(id: string) {
    if (!isValidObjectId(id)) return responseError(422, INVALID_ID);

    const isDelete = await this.model.remove(id);
    if (!isDelete) return responseError(404, NOT_FOUND);
    return response(204, 'deletado');
  }
}