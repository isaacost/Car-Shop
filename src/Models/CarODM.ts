import { model, Model, models, Schema } from 'mongoose';
import ICar from '../Interfaces/ICar';

export default class CarODM {
  private model: Model<ICar>;
  private schema: Schema;

  constructor() {
    this.schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false, default: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    this.model = models.Car || model('Car', this.schema);
  }

  async create(car: ICar) {
    return this.model.create({ ...car });
  }

  async get() {
    return this.model.find();
  }

  async getById(id: string) {
    try {
      const car = await this.model.findById(id);
      return car;
    } catch (error) {
      return null;
    }
  }
}