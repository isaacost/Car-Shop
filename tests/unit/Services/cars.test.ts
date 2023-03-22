import { describe, afterEach } from 'mocha';
import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';
import ICar from '../../../src/Interfaces/ICar';

describe('Testa a camada Service', function () {
  const carsOutput = new Car({
    id: '641b5cade028df261c85d370',
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.99,
    doorsQty: 4,
    seatsQty: 5,
  });

  const car: ICar = {
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.99,
    doorsQty: 4,
    seatsQty: 5,
  };

  it('Cria a rota cars', async function () {
    sinon.stub(Model, 'create').resolves(carsOutput);

    const service = new CarService();
    const result = await service.create(car);

    expect(result.message).to.deep.equal(carsOutput);
  });

  afterEach(sinon.restore);
});