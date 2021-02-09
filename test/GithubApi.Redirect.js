const { expect } = require('chai');
const agent = require('superagent');
const statusCode = require('http-status-codes');

describe('Try HEAD method', () => {
  const oldurl = 'https://github.com/aperdomob/redirect-test';
  const newurl = 'https://github.com/aperdomob/new-redirect-test';

  let response;
  before(async () => {
    try {
      await agent
        .head(oldurl)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
    } catch (error) {
      response = error;
    }
  });
  it('thet the redirect url seems fine', async () => {
    expect(response.response.headers.location).to.equal(newurl);
    expect(response.status).to.equal(statusCode.MOVED_PERMANENTLY);
  });

  describe('look that the redirection is working', () => {
    it('then the redirection is working', async () => {
      response = await agent
        .get(oldurl)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
      expect(response.status).to.equal(statusCode.OK);
    });
  });
});
