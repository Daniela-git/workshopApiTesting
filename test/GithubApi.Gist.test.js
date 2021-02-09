const agent = require('superagent');
const statusCode = require('http-status-codes');
const chai = require('chai');

chai.use(require('chai-subset'));

const { expect } = chai;

describe('Try DELETE method', () => {
  const url = 'https://api.github.com';

  describe('create a gist', () => {
    const codeWait = `
    new Promise((resolve) => {
      setTimeout(() => {
        resolve('Hi!');
      }, 5000);
    })`;
    const newGist = {
      description: 'this is a test',
      public: true,
      files: { 'promise.js': { content: codeWait } }
    };
    let gist;
    it('then the gist was created', async () => {
      const response = await agent
        .post(`${url}/gists`, newGist)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
      gist = response.body;
      expect(response.status).to.equal(statusCode.CREATED);
      expect(gist).containSubset(newGist);
    });

    describe('get the new gist', () => {
      it('then the gist exist', async () => {
        const response = await agent
          .get(gist.url)
          .auth('token', process.env.ACCESS_TOKEN)
          .set('User-Agent', 'agent');
        expect(response.status).to.equal(statusCode.OK);
      });
    });
    describe('delete the gist', () => {
      it('then the gist was deleted', async () => {
        const response = await agent
          .del(gist.url)
          .auth('token', process.env.ACCESS_TOKEN)
          .set('User-Agent', 'agent');
        expect(response.status).to.equal(statusCode.NO_CONTENT);
      });
      describe('verify the gist was deleted', () => {
        let response;
        before(async () => {
          try {
            await agent
              .get(gist.url)
              .auth('token', process.env.ACCESS_TOKEN)
              .set('User-Agent', 'agent');
          } catch (error) {
            response = error.status;
          }
        });
        it('then the gist desnt exist', async () => {
          expect(response).to.equal(statusCode.NOT_FOUND);
        });
      });
    });
  });
});
