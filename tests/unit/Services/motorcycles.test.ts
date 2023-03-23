import { describe, afterEach } from 'mocha';
import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Testa a camada Service', function () {
  const moto = 'Honda Cb 600f Hornet';

  const motorcycleOutput = new Motorcycle({
    id: '641ba7ed17060851bebafad2',
    model: moto,
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30,
    category: 'Street',
    engineCapacity: 600,
  });

  const motorcycle: IMotorcycle = {
    model: moto,
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30,
    category: 'Street',
    engineCapacity: 600,
  };

  const arrayOutput = [
    new Motorcycle({
      id: '641ba7ed17060851bebafad2',
      model: moto,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30,
      category: 'Street',
      engineCapacity: 600,
    }),
  ];

  it('Testas se adiona moto', async function () {
    sinon.stub(Model, 'create').resolves(motorcycleOutput);

    const service = new MotorcycleService();
    const result = await service.create(motorcycle);

    expect(result.message).to.deep.equal(motorcycleOutput);
  });

  it('Testa se lista todos as motos', async function () {
    sinon.stub(Model, 'find').resolves(arrayOutput);
    
    const service = new MotorcycleService();
    const result = await service.get();

    expect(result.message).to.deep.equal(arrayOutput);
  });

  it('Testa se encontra moto por id', async function () {
    sinon.stub(Model, 'findById').resolves(arrayOutput[0]);
    
    const service = new MotorcycleService();
    const result = await service.get('641ba7ed17060851bebafad2');

    expect(result.message).to.deep.equal(arrayOutput[0]);
  }); 

  it('Testa id invalido', async function () {
    sinon.stub(Model, 'findById').resolves(arrayOutput[0]);
    
    const service = new MotorcycleService();
    const result = await service.get('1s4');

    expect(result.message).to.deep.equal({ message: 'Invalid mongo id' });
  }); 

  it('Testa car invalido', async function () {
    sinon.stub(Model, 'findById').resolves(arrayOutput[1]);
    
    const service = new MotorcycleService();
    const result = await service.get('641ba7ed17060851bebafad2');

    expect(result.message).to.deep.equal({ message: 'Motorcycle not found' });
  }); 
  afterEach(sinon.restore);
});