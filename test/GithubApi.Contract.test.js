const agent = require('superagent');
const chai = require('chai');
const {
  listPublicEventsSchema
} = require('./schema/ListPublicEvents.schema.js');

const { expect } = chai;
chai.use(require('chai-json-schema'));

const urlBase = 'https://api.github.com';

describe('Given event Github Api resources', () => {
  describe('When wanna verify the list public events', () => {
    let response;

    before(async () => {
      response = await agent
        .get(`${urlBase}/events`)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
    });

    it('then the body should have a schema', () => {
      expect(response).to.be.jsonSchema(listPublicEventsSchema);
    });
  });
});
