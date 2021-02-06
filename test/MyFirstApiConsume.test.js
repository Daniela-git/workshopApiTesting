const agent = require('superagent');
const statusCode = require('http-status-codes');
const chai = require('chai');

const { expect } = chai;

describe('First Api Test', () => {
  it('Consume GET service', async () => {
    const response = await agent.get('https://httpbin.org/ip');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body).to.have.property('origin');
  });

  it('Consume GET service with query parameters', async () => {
    const query = {
      name: 'John',
      age: '31',
      city: 'New york'
    };
    const response = await agent.get('https://httpbin.org/get').query(query);
    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.args).to.eql(query);
  });

  it('Consume HEAD service', async () => {
    const response = await agent.head('https://httpbin.org/headers');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.headers).to.have.property('server');
  });
  it('Consume DELETE service', async () => {
    const response = await agent.del('https://httpbin.org/delete');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.headers).to.have.property('date');
    expect(response.body).to.have.property('data');
  });
  it('Consume PATCH service', async () => {
    const response = await agent.patch('https://httpbin.org/patch');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.headers).to.have.property('server');
    expect(response.body).to.have.property('json');
  });
  it('Consume PUT service', async () => {
    const response = await agent.put('https://httpbin.org/put').send({});

    expect(response.status).to.equal(statusCode.OK);
    expect(response.headers).to.have.property('server');
    expect(response.body.args).to.eql({});
  });
});
