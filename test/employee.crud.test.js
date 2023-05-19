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

  describe('Updating data', async () => {
    beforeEach(async () => {
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

    it('should properly update one document with updateOne method', async () => {
      await Employee.updateOne(
        { firstName: 'John', lastName: 'Doe', department: 'IT' },
        { $set: { firstName: '=John=', lastName: '=Doe=', department: '=IT=' } }
      );
      const updatedEmployee = await Employee.findOne({
        firstName: '=John=',
        lastName: '=Doe=',
        department: '=IT='
      });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update one document with save method', async () => {
      const employee = await Employee.findOne({
        firstName: 'John',
        lastName: 'Doe',
        department: 'IT'
      });
      employee.firstName = '=John=';
      await employee.save();

      const updatedEmployee = await Employee.findOne({
        firstName: '=John=',
        lastName: 'Doe',
        department: 'IT'
      });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with updateMany method', async () => {
      await Employee.updateMany(
        {},
        {
          $set: {
            firstName: 'Updated!',
            lastName: 'Updated!',
            department: 'Updated!'
          }
        }
      );
      const employees = await Employee.find({
        firstName: 'Updated!',
        lastName: 'Updated!',
        department: 'Updated!'
      });
      expect(employees.length).to.be.equal(2);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Removing data', async () => {
    beforeEach(async () => {
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

    it('should properly remove one document with deleteOne method', async () => {
      await Employee.deleteOne({
        firstName: 'John',
        lastName: 'Doe',
        department: 'IT'
      });
      const deletedEmployee = await Employee.findOne({
        firstName: 'John',
        lastName: 'Doe',
        department: 'IT'
      });
      expect(deletedEmployee).to.be.null;
    });

    it('should properly remove one document with remove method', async () => {
      const employee = await Employee.findOne({
        firstName: 'John',
        lastName: 'Doe',
        department: 'IT'
      });
      await employee.remove();
      const removedEmployee = await Employee.findOne({
        firstName: 'John',
        lastName: 'Doe',
        department: 'IT'
      });
      expect(removedEmployee).to.be.null;
    });

    it('should properly remove multiple documents with deleteMany method', async () => {
      await Employee.deleteMany();
      const employees = await Employee.find();
      expect(employees.length).to.be.equal(0);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });
});
