import { Model, models, Schema, model } from 'mongoose';

export default abstract class AbstractODM<T> {
  protected model: Model<T>;

  constructor(private schema: Schema, modelName: string) {
    this.schema = schema;
    this.model = models[modelName] || model(modelName, this.schema);
  }
  
  async create(body: T) {
    return this.model.create({ ...body });
  }

  async get() {
    return this.model.find();
  }

  async getById(id: string) {
    try {
      const body = await this.model.findById(id);
      return body;
    } catch (error) {
      return null;
    }
  }

  async update(id: string, body: Partial<T>) {
    try {
      const updatedBody = await this.model.findByIdAndUpdate(id, body, { new: true });
      return updatedBody;
    } catch (error) {
      return null;
    }
  }

  async remove(id: string) {
    const carExist = await this.getById(id);
    if (!carExist) return null;
    await this.model.findByIdAndDelete(id);
    return true;
  }
}