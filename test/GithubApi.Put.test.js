const agent = require('superagent');
// const statusCode = require('http-status-codes');
const { expect } = require('chai');

describe('Try PUT method', () => {
  const url = 'https://api.github.com/user/following';
  const user = 'aperdomob';
  let listLength;
  describe('try to follow someone', () => {
    it('then follow an user', async () => {
      const response = await agent
        .put(`${url}/${user}`)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
      expect(response.status).to.equal(204);
    });

    describe('follow list', () => {
      it(`then I follow ${user}`, async () => {
        const response = await agent
          .get(`${url}`)
          .auth('token', process.env.ACCESS_TOKEN)
          .set('User-Agent', 'agent');
        const res = response.body.find((obj) => obj.login === user);
        expect(res).to.include({ id: 17033942 });
        listLength = response.body.length;
      });
    });
  });
  describe('try to follow an user again', () => {
    it('then verify the method is identpotend', async () => {
      const response = await agent
        .put(`${url}/${user}`)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
      expect(response.status).to.equal(204);
    });

    describe('follow list', () => {
      it(`then I follow ${user}`, async () => {
        const response = await agent
          .get(`${url}`)
          .auth('token', process.env.ACCESS_TOKEN)
          .set('User-Agent', 'agent');
        const res = response.body.find((obj) => obj.login === user);
        expect(res).to.include({ id: 17033942 });
        expect(response.body.length).to.equal(listLength);
      });
    });
  });
});
