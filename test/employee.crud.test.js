const Employee = require('../models/employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  before(async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    } catch (err) {
      console.log(err);
    }
  });

  describe('Reading data', () => {
    before(async () => {
      const testEmpOne = new Employee({
        firstName: 'John',
        lastName: 'Doe',
        department: 'IT'
      });
      await testEmpOne.save();

      const testEmpTne = new Employee({
        firstName: 'Amanda',
        lastName: 'Clark',
        department: 'Management'
      });
      await testEmpTne.save();
    });

    it('should return all the data with find method', async () => {
      const employee = await Employee.find();
      const expectedLength = 2;
      expect(employee.length).to.be.equal(expectedLength);
    });

    it('should return proper document by various params with findOne method', async () => {
      const employee = await Employee.findOne({
        firstName: 'John',
        lastName: 'Doe',
        department: 'IT'
      });
      const expectedFirstName = 'John';
      expect(employee.firstName).to.be.equal(expectedFirstName);
      const expectedLastName = 'John';
      expect(employee.firstName).to.be.equal(expectedLastName);
      const expectedDepartment = 'John';
      expect(employee.firstName).to.be.equal(expectedDepartment);
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Creating data', async () => {
    it('should insert new document with insertOne method', async () => {
      const employee = new Employee({
        firstName: 'John',
        lastName: 'Doe',
        department: 'IT'
      });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });
});
