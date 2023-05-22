const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Department = require('../../../models/department.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/departments', () => {
  before(async () => {
    const testDepOne = new Department({
      _id: '5d9f1140f10a81216cfd4408',
      name: 'Department #1'
    });
    await testDepOne.save();

    const testDepTwo = new Department({
      _id: '5d9f1159f81ce8d1ef2bee48',
      name: 'Department #2'
    });
    await testDepTwo.save();

    const testDepThree = new Department({
      _id: '5d9f1159f81ce8d1ef2b2023',
      name: 'Department #3'
    });
    await testDepTwo.save();
  });

  it('/:id should delete chosen document and return success', async () => {
    const res = await request(server).delete(
      '/api/departments/5d9f1140f10a81216cfd4408'
    );
    const deletedDepartment = await Department.findOne({
      name: 'Department #1'
    });
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal('OK');
    expect(deletedDepartment).to.be.null;
  });

  it('/:id should return error if document not found', async () => {
    const res = await request(server).get(
      '/api/departments/5d9f1140f10a81216cfd4408'
    );
    expect(res.status).to.be.equal(404);
  });

  it('/ should delete all document and return success', async () => {
    const res = await request(server).deleteMany('/api/departments');
    const deletedDepartments = await Department.find();
    expect(res.status).to.be.equal(404);
    expect(deletedDepartments).to.be.null;
  });

  it('/ should return true if there is no one document', async () => {
    const res = await request(server).get('/api/departments/'); // BRAK TAKIEGO ENDPOINTU!!!
    expect(res.status.body).to.be.equal(0);
  });

  after(async () => {
    await Department.deleteMany();
  });
});
