const { expect } = require('chai');
const agent = require('superagent');
const statusCode = require('http-status-codes');

describe('Try query parameters', () => {
  const url = 'https://api.github.com/users';
  describe('number of defaults users', () => {
    it('should get the numeber of default users', async () => {
      const response = await agent
        .get(url)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
      expect(response.status).to.equal(statusCode.OK);
      expect(response.body.length).to.equal(30);
    });
  });
  describe('10 users', () => {
    it('should get 10 users', async () => {
      const response = await agent
        .get(url)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent')
        .query({ per_page: 10 });
      expect(response.status).to.equal(statusCode.OK);
      expect(response.body.length).to.equal(10);
    });
  });
  describe('50 users', () => {
    it('should get 50 users', async () => {
      const response = await agent
        .get(url)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent')
        .query({ per_page: 50 });
      expect(response.status).to.equal(statusCode.OK);
      expect(response.body.length).to.equal(50);
    });
  });
});
