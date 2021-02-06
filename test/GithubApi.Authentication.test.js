const agent = require('superagent');
const statusCode = require('http-status-codes');
const { expect } = require('chai');

const urlBase = 'https://api.github.com';
const githubUserName = 'Daniela-git';
const repository = 'workshop-api-testing-js';

describe('Github Api Test', () => {
  describe('Authentication', () => {
    it('Via OAuth2 Tokens by Header', async () => {
      const response = await agent
        .get(`${urlBase}/repos/${githubUserName}/${repository}`)
        .auth('token', '4a403980178d1de41eedb91b73f79407926f46f5')
        .set('User-Agent', 'agent');
      expect(response.status).to.equal(statusCode.OK);
      expect(response.body.description).equal(
        'This is a Workshop about Api Testing in JavaScript'
      );
    });
  });
});
