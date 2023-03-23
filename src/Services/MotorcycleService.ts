import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import Motorcycle from '../Domains/Motorcycle';
import IResponse from '../Interfaces/IResponse';
import { response } from '../utils/response';

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
}