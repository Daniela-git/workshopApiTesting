const agent = require('superagent');
const statusCode = require('http-status-codes');
const chai = require('chai');
const chaiSub = require('chai-subset');

chai.use(chaiSub);
const { expect } = chai;

describe('Try POST/PATCH method', () => {
  const url = 'https://api.github.com';
  const user = 'Daniela-git';
  let repo;
  describe('repos list', () => {
    it('then get a repo', async () => {
      const response = await agent
        .get(`${url}/users/${user}/repos`)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
      [repo] = response.body;
      expect(response.status).to.equal(statusCode.OK);
      expect(repo.disabled).to.equal(false);
    });
  });
  describe('create an issue', () => {
    const issue = { title: 'test issues' };
    it('then the issue was created', async () => {
      const response = await agent
        .post(`${url}/repos/${user}/${repo.name}/issues`, issue)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
      expect(response.body).to.containSubset(issue);
      expect(response.body.body).to.equal(null);
    });
    describe('modify the isssue', () => {
      const add = { body: 'this is the body' };
      it('then the issue was modified', async () => {
        const response = await agent
          .patch(`${url}/repos/${user}/${repo.name}/issues/2`, add)
          .auth('token', process.env.ACCESS_TOKEN)
          .set('User-Agent', 'agent');
        expect(response.body).to.containSubset(add);
        expect(response.body).to.containSubset(issue);
      });
    });
  });
});
