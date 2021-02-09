/* eslint-disable no-unused-vars */
const agent = require('superagent');
const chai = require('chai');
const md5 = require('md5');
chai.use(require('chai-subset'));

const { expect } = chai;

const url = 'https://api.github.com/users/aperdomob';
describe('Test Get Method', () => {
  describe('get user', () => {
    let user;
    beforeEach(async () => {
      const response = await agent
        .get(url)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
      user = response.body;
    });
    it('User info', async () => {
      expect(user.name).to.equal('Alejandro Perdomo');
      expect(user.company).to.equal('PSL');
      expect(user.location).to.equal('Colombia');
    });

    describe('download repo', () => {
      let repo;
      it('Find repo', async () => {
        const reposUrl = user.repos_url;
        const reposSearch = await agent
          .get(reposUrl)
          .auth('token', process.env.ACCESS_TOKEN)
          .set('User-Agent', 'agent');
        const repos = reposSearch.body;
        repo = repos.find(
          (objRepo) => objRepo.name === 'jasmine-awesome-report'
        );
        expect(repo.full_name).to.equal('aperdomob/jasmine-awesome-report');
        expect(repo.private).to.equal(false);
        expect(repo.description).to.equal('An awesome html report for Jasmine');
      });
      describe('get the zip', () => {
        const md5Zip = 'f2c7f95660350363942d51680365bb56';
        let zip;
        it('get the zip', async () => {
          const download = await agent
            .get(`${repo.html_url}/archive/${repo.default_branch}.zip`)
            .auth('token', process.env.ACCESS_TOKEN)
            .set('User-Agent', 'agent')
            .buffer(true);
          zip = download.text;
          expect(md5(zip)).to.equal(md5Zip);
        });
      });

      describe('search into the files', () => {
        it('get the readme', async () => {
          const info = {
            name: 'README.md',
            path: 'README.md',
            sha: '1eb7c4c6f8746fcb3d8767eca780d4f6c393c484'
          };
          const contentQuery = await agent
            .get(`${repo.url}/contents`)
            .auth('token', process.env.ACCESS_TOKEN)
            .set('User-Agent', 'agent');
          const list = contentQuery.body;
          const readme = list.find((obj) => obj.name === 'README.md');
          expect(readme).to.containSubset(info);
          describe('download the readme.md', () => {
            const md5Readme = '97ee7616a991aa6535f24053957596b1';
            it('then the readme was downloaded', async () => {
              const downloadQuery = await agent
                .get(readme.download_url)
                .auth('token', process.env.ACCESS_TOKEN)
                .set('User-Agent', 'agent');
              const content = downloadQuery.text;
              expect(md5(content)).to.equal(md5Readme);
            });
          });
        });
      });
    });
  });
});
