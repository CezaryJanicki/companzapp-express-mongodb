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
      name: 'Department #1',
    });
    await testDepOne.save();
  });

  it('should remove chosen document and return success', async () => {
  const res = await request(server).delete('/api/departments/' + '5d9f1140f10a81216cfd4408');
  const deletedDepartment = await Department.findById('5d9f1140f10a81216cfd4408');
  console.log(deletedDepartment); // Log the result
  expect(deletedDepartment).to.be.null;
  });
});