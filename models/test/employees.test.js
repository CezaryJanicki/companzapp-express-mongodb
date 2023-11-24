const Employee = require('../employees.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employees', () => {
  // Test case 1
  it('should be invalid if name is empty', async () => {
    const employee = new Employee({
      firstName: '',
      lastName: '',
      department: 'HR',
      age: 20
    });

    try {
      await employee.validate();
      // If validation succeeds, the error will be undefined, and the test will fail.
      expect.fail('Validation should fail for empty name');
    } catch (err) {
      // If validation fails, the error will be defined, and the test will pass.
      expect(err.errors.firstName && err.errors.lastName).to.exist;
    }
  });

  it('should be valid if name is provided', async () => {
    const employee = new Employee({
      firstName: 'John',
      lastName: 'Doe',
      department: 'HR',
      age: 20
    });

    try {
      await employee.validate();
      // If validation succeeds, the error will be undefined, and the test will pass.
    } catch (err) {
      // If validation fails, the error will be defined, and the test will fail.
      expect(err).to.be.undefined;
    }
  });

  it('should be valid if age is greater than or equal to 18', async () => {
    const employee = new Employee({
      firstName: 'John',
      lastName: 'Doe',
      department: 'HR',
      age: 18
    });

    try {
      await employee.validate();
      // If validation succeeds, the error will be undefined, and the test will pass.
    } catch (err) {
      // If validation fails, the error will be defined, and the test will fail.
      expect(err).to.be.undefined;
    }
  });

  it('should throw an error if no attribute is provided', async () => {
    const employee = new Employee();

    try {
      await employee.validate();
      // If validation succeeds, the error will be undefined, and the test will fail.
      expect.fail('Validation should fail for no attributes');
    } catch (err) {
      // If validation fails, the error will be defined, and the test will pass.
      expect(err.errors).to.exist;
    }
  });

  it('should throw an error if attribute is not a string', async () => {
    const cases = [{}, []];
    for (let test of cases) {
      const emp = new Employee({
        firstName: test,
        lastName: test,
        department: test,
      });

      try {
        await emp.validate();
        // If validation succeeds, the error will be undefined, and the test will fail.
        expect.fail('Validation should fail for non-string attributes');
      } catch (err) {
        // If validation fails, the error will be defined, and the test will pass.
        expect(err.errors).to.exist;
      }
    }
  });

  it('should throw an error if attributes are missing', async () => {
    const cases = [
      { firstName: 'John', lastName: 'Doe' },
      { firstName: 'John', department: 'IT' },
      { lastName: 'Doe', department: 'IT' },
    ];

    for (let test of cases) {
      const emp = new Employee(test);

      try {
        await emp.validate();
        // If validation succeeds, the error will be undefined, and the test will fail.
        expect.fail('Validation should fail for missing attributes');
      } catch (err) {
        // If validation fails, the error will be defined, and the test will pass.
        expect(err.errors).to.exist;
      }
    }
  });

  it('should not throw an error if attributes are correct', async () => {
    const cases = [
      { firstName: 'John', lastName: 'Doe', department: 'Management' },
      { firstName: 'Mark', lastName: 'Bernt', department: 'Finance' },
      { firstName: 'July', lastName: 'May', department: 'IT' },
    ];

    for (let test of cases) {
      const emp = new Employee(test);

      try {
        await emp.validate();
        // If validation succeeds, the error will be undefined, and the test will pass.
      } catch (err) {
        // If validation fails, the error will be defined, and the test will fail.
        expect(err).to.be.undefined;
      }
    }
  });

  after(() => {
    mongoose.models = {};
  });
});



