import { describe, afterEach } from 'mocha';
import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

const NOT_FOUND = 'Motorcycle not found';
const INVALID_ID = 'Invalid mongo id';

describe('Testa a camada Service das motorcycles', function () {
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

  const motorcycleUpdate: IMotorcycle = {
    model: moto,
    year: 2005,
    color: 'Black',
    status: true,
    buyValue: 30,
    category: 'Street',
    engineCapacity: 60,
  };

  const arrayOutputUpdate = [
    new Motorcycle({
      id: '641ba7ed17060851bebafad2',
      model: moto,
      year: 2005,
      color: 'Black',
      status: true,
      buyValue: 30,
      category: 'Street',
      engineCapacity: 60,
    }),
  ];

  it('Testas se adiona moto', async function () {
    sinon.stub(Model, 'create').resolves(motorcycleOutput);

    const service = new MotorcycleService();
    const result = await service.create(motorcycle);

    expect(result.message).to.deep.equal(motorcycleOutput);
  });

  it('Testa se o dominio for nulo', async function () {
    sinon.stub(Model, 'create').resolves();

    const service = new MotorcycleService();
    const result = await service.create(motorcycle);

    expect(result.message).to.deep.equal(null);
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

    expect(result.message).to.deep.equal({ message: INVALID_ID });
  }); 

  it('Testa car invalido', async function () {
    sinon.stub(Model, 'findById').resolves(arrayOutput[1]);
    
    const service = new MotorcycleService();
    const result = await service.get('641ba7ed17060851bebafad2');

    expect(result.message).to.deep.equal({ message: NOT_FOUND });
  }); 
  
  it('Testa se é possível alterar pelo id', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(arrayOutputUpdate[0]);
    
    const service = new MotorcycleService();
    const result = await service.update('641ba7ed17060851bebafad2', motorcycleUpdate);

    expect(result.message).to.deep.equal(arrayOutputUpdate[0]);
  }); 

  it('Testa se não é possível alterar com id inválido', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(arrayOutputUpdate[0]);
    
    const service = new MotorcycleService();
    const result = await service.update('1s4', motorcycleUpdate);

    expect(result.message).to.deep.equal({ message: INVALID_ID });
  }); 

  it('Testa se não é possível alterar sem moto', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves();
    
    const service = new MotorcycleService();
    const result = await service.update('641ba7ed17060851bebafad2', motorcycleUpdate);

    expect(result.message).to.deep.equal({ message: NOT_FOUND });
  }); 

  it('Testa se é possível remover pelo id', async function () {
    sinon.stub(Model, 'findById').resolves(true);
    sinon.stub(Model, 'findByIdAndDelete').resolves(true);

    const service = new MotorcycleService();
    const result = await service.delete('641ba7ed17060851bebafad2');

    expect(result.message).to.deep.equal('deletado');
  });

  it('Testa se não é possível remover com id invalido', async function () {
    sinon.stub(Model, 'findByIdAndDelete').resolves(arrayOutput[0]);

    const service = new MotorcycleService();
    const result = await service.delete('1s4');

    expect(result.message).to.deep.equal({ message: INVALID_ID });
  });

  it('Testa se não é possível remover sem carro', async function () {
    sinon.stub(Model, 'findByIdAndDelete').resolves();

    const service = new MotorcycleService();
    const result = await service.delete('641ba7ed17060851bebafad2');

    expect(result.message).to.deep.equal({ message: NOT_FOUND });
  });

  afterEach(sinon.restore);
});