import { describe, afterEach } from 'mocha';
import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';
import ICar from '../../../src/Interfaces/ICar';

const NOT_FOUND = 'Car not found';
const INVALID_ID = 'Invalid mongo id';

describe('Testa a camada Service dos cars', function () {
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

  const arrayOutputUpdate = [
    new Car({
      id: '641b5cade028df261c85d370',
      model: 'Marea',
      year: 2002,
      color: 'Red',
      status: true,
      buyValue: 12.99,
      doorsQty: 2,
      seatsQty: 5,
    }),
  ];

  const carUpdate: ICar = {
    model: 'Marea',
    year: 2002,
    color: 'Red',
    status: true,
    buyValue: 12.99,
    doorsQty: 2,
    seatsQty: 5,
  };

  it('Testas se adiona carro', async function () {
    sinon.stub(Model, 'create').resolves(carsOutput);

    const service = new CarService();
    const result = await service.create(car);

    expect(result.message).to.deep.equal(carsOutput);
  });

  it('Testa se o dominio for nulo', async function () {
    sinon.stub(Model, 'create').resolves();

    const service = new CarService();
    const result = await service.create(car);

    expect(result.message).to.deep.equal(null);
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

    expect(result.message).to.deep.equal({ message: INVALID_ID });
  }); 

  it('Testa car invalido', async function () {
    sinon.stub(Model, 'findById').resolves(arrayOutput[1]);
    
    const service = new CarService();
    const result = await service.get('641b5cade028df261c85d370');

    expect(result.message).to.deep.equal({ message: NOT_FOUND });
  }); 

  it('Testa se é possível alterar pelo id', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(arrayOutputUpdate[0]);
    
    const service = new CarService();
    const result = await service.update('641b5cade028df261c85d370', carUpdate);

    expect(result.message).to.deep.equal(arrayOutputUpdate[0]);
  }); 

  it('Testa se não é possível alterar com id inválido', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(arrayOutputUpdate[0]);
    
    const service = new CarService();
    const result = await service.update('1s4', carUpdate);

    expect(result.message).to.deep.equal({ message: INVALID_ID });
  }); 

  it('Testa se não é possível alterar sem caroo', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves();
    
    const service = new CarService();
    const result = await service.update('641ba7ed17060851bebafad2', carUpdate);

    expect(result.message).to.deep.equal({ message: NOT_FOUND });
  }); 

  it('Testa se é possível remover pelo id', async function () {
    sinon.stub(Model, 'findById').resolves(true);
    sinon.stub(Model, 'findByIdAndDelete').resolves(true);

    const service = new CarService();
    const result = await service.delete('641ba7ed17060851bebafad2');

    expect(result.message).to.deep.equal('deletado');
  });

  it('Testa se não é possível remover com id invalido', async function () {
    sinon.stub(Model, 'findByIdAndDelete').resolves(arrayOutput[0]);

    const service = new CarService();
    const result = await service.delete('1s4');

    expect(result.message).to.deep.equal({ message: INVALID_ID });
  });

  it('Testa se não é possível remover sem carro', async function () {
    sinon.stub(Model, 'findByIdAndDelete').resolves();

    const service = new CarService();
    const result = await service.delete('641ba7ed17060851bebafad2');

    expect(result.message).to.deep.equal({ message: NOT_FOUND });
  });

  afterEach(sinon.restore);
});