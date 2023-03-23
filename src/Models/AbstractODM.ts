import { Model, models, Schema, model } from 'mongoose';

export default abstract class AbstractODM<T> {
  private model: Model<T>;

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
    return this.model.findById(id);
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
    try {
      await this.model.findByIdAndDelete(id);
      return true;
    } catch (error) {
      return null;
    }
  }
}