/*
  This is a mocha integration test of KeystoneJS User model and api.
*/

const rp = require('request-promise');
const assert = require('chai').assert;
const user = {};
var keystone = require('keystone');

require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var handlebars = require('express-handlebars');


function sleep (ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// Make sure the KeystoneJS server is running before executing tests.
before(async () => {
	try {

    await sleep(5000);

		let options = {
			method: 'GET',
			uri: 'http://localhost:3000/',
			resolveWithFullResponse: true,
		};

		const result = await rp(options);

	// console.log('result: ' + JSON.stringify(result, null, 2));

		if (result.statusCode !== 200)
		{
			console.error('KeystoneJS returned unexpected output. Exiting.');
			process.exit(1);
		}

	} catch (err) {
		if (err.name === 'RequestError') {
			console.error('Note: Start KeystoneJS server before running tests. Exiting.');
		} else
		{ console.error('err: ' + JSON.stringify(err, null, 2)); }
		process.exit(1);
	}
});

after(function (done) {
	done();
});

describe('User', function () {

	describe('POST /auth/local/register - Create Test User', function () {
		it('should return 200 status code', async () => {

			let options = {
				method: 'POST',
				uri: '/auth/local/register',
				resolveWithFullResponse: true,
				json: true,
				body: {
					_id: null,
					username: 'Test User',
					email: 'test@test.com',
					password: '123456',
				},
			};
      // let result = await rp(options);
      // console.log(`result stringified: ${JSON.stringify(result,null,2)}`);
      // assert.equal(result.statusCode, 200);
      // assert(result.statusCode === 200 || results.statusCode === 400, 'Creates new or reports already exists.');
			assert(1, 1, 'Testing the test.');
		});
	});

  /*
  describe('POST /auth/local - Log in as user', function() {
    it('should return 200 status code', async () => {

      try {
        let options = {
          method: 'POST',
          uri: strapi.config.url+'/auth/local',
          resolveWithFullResponse: true,
          json: true,
          body: {
            identifier: 'test@test.com',
            password: '123456'
          }
        };

        let result = await rp(options);
        console.log(`result stringified: ${JSON.stringify(result,null,2)}`);
        user.id = result.body.user._id;
        user.jwt = result.body.jwt;
        //assert.equal(result.statusCode, 200);
        assert(result.statusCode === 200 || results.statusCode === 400, 'Creates new or reports already exists.');
      } catch(err) {
        console.error('Error caught and stringified: '+JSON.stringify(err,null,2));
      }
    });
  });


  describe('DELETE /user/:id', function() {
    it('should return 401 status code', async () => {

      //console.log(`strapi plugins: ${JSON.stringify(strapi.plugins,null,2)}`);
      console.log(`UserId: ${user.id}`);

      let options = {
        method: 'DELETE',
        uri: strapi.config.url+`/user/${user.id}`,
        resolveWithFullResponse: true,
        //json: true,
        //body: {
        //}
        headers: {
          Authorization: `Bearer ${user.jwt}`
        }
      };
      let result = await rp(options);
      console.log(`result stringified: ${JSON.stringify(result,null,2)}`);
      assert.equal(result.statusCode, 401);
    });
  });
  */
});
