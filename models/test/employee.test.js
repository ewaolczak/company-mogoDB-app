const Employee = require('../employee.model');
const expect = require('chai').expect;

describe('Employee', () => {
  it('should throw an error if arg is not a string', () => {
    const cases = [{}, []];
    for (let arg of cases) {
      const empl = new Employee({
        firstName: arg,
        lastName: arg,
        department: arg
      });

      empl.validate((err) => {
        expect(err.errors.firstName).to.exist; //dlaczego firstName a nie arg
      });
    }
  });

  it('should throw an error if there is no one of args', () => {
    const cases = [
      { firstName: 'John' },
      { firstName: 'John', lastName: 'Doe' },
      { lastName: 'Doe', department: 'IT' },
      { firstName: 'John', department: 'IT' }
    ];
    for (let arg of cases) {
      const empl = new Employee(arg);

      empl.validate((err) => {
        expect(err.errors).to.exist;
      });
    }
  });

  it('should not throw an error if args are OK', () => {
    const cases = [
      { firstName: 'John', lastName: 'Doe', department: 'IT' },
      { firstName: 'Amanda', lastName: 'Watson', department: 'Management' }
    ];

    for (let arg of cases) {
      const empl = new Employee(arg);

      empl.validate((err) => {
        expect(err).to.not.exist;
      });
    }
  });
});
