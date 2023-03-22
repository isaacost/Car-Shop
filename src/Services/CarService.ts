import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import Car from '../Domains/Car';
import IResponse from '../Interfaces/IResponse';
import { response } from '../utils/response';

export default class CarService {
  private model: CarODM = new CarODM();

  static createDomain(car: ICar) {
    return new Car(car);
  }

  async create(car: ICar): Promise<IResponse> {
    const newCar = await this.model.create(car);
    const message = CarService.createDomain(newCar);
    return response(201, message);
  }
}