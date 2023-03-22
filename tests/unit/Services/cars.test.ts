import { describe, afterEach } from 'mocha';
import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';
import ICar from '../../../src/Interfaces/ICar';

describe('Testa a camada Service', function () {
  const arrayOutput = [
    new Car({
      id: '641b5cade028df261c85d370',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    }),
  ];

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

  it('Testas se adiona carro', async function () {
    sinon.stub(Model, 'create').resolves(carsOutput);

    const service = new CarService();
    const result = await service.create(car);

    expect(result.message).to.deep.equal(carsOutput);
  });

  it('Testa se lista todos os carros', async function () {
    sinon.stub(Model, 'find').resolves(arrayOutput);
    
    const service = new CarService();
    const result = await service.get();

    expect(result.message).to.deep.equal(arrayOutput);
  });

  it('Testa se encontra carro por id', async function () {
    sinon.stub(Model, 'findById').resolves(arrayOutput[0]);
    
    const service = new CarService();
    const result = await service.get('641b5cade028df261c85d370');

    expect(result.message).to.deep.equal(arrayOutput[0]);
  }); 

  it('Testa id invalido', async function () {
    sinon.stub(Model, 'findById').resolves(arrayOutput[0]);
    
    const service = new CarService();
    const result = await service.get('1s4');

    expect(result.message).to.deep.equal({ message: 'Invalid mongo id' });
  }); 

  it('Testa car invalido', async function () {
    sinon.stub(Model, 'findById').resolves(arrayOutput[1]);
    
    const service = new CarService();
    const result = await service.get('641b5cade028df261c85d370');

    expect(result.message).to.deep.equal({ message: 'Car not found' });
  }); 

  afterEach(sinon.restore);
});