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

const LOCALHOST = 'http://localhost:3000';

function sleep (ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// Make sure the KeystoneJS server is running before executing tests.
before(async () => {
	try {

    // Sleep to give the KeystoneJS server time to start.
		await sleep(5000);

		let options = {
			method: 'GET',
			uri: LOCALHOST,
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

describe('Non-Logged In User', function () {

	let userId = '';

	describe('GET /api/user/list - Get All Users', function () {
		it('should return an array of users.', async () => {

			let options = {
				method: 'GET',
				uri: `${LOCALHOST}/api/users/list`,
				// resolveWithFullResponse: true,
				json: true,
			};
			let result = await rp(options);
			// console.log(`result stringified: ${JSON.stringify(result, null, 2)}`);

			userId = result.user[0]._id;
			console.log(`userId captured: ${userId}`);

			assert.isArray(result.user, 'User list is an array.');
		});
	});

	describe('GET /api/user/:id - Get Specific User', function () {
		it('should return an object with a single user.', async () => {

			let options = {
				method: 'GET',
				uri: `${LOCALHOST}/api/users/${userId}`,
				// resolveWithFullResponse: true,
				json: true,
			};
			let result = await rp(options);

			assert(result.user._id, userId, 'User IDs match.');
		});
	});


	describe('POST /api/users/:id/update - Update Should Fail', function () {
		it('Should fail to update user account.', async () => {
			try {
				let options = {
					method: 'POST',
					uri: `${LOCALHOST}/api/users/${userId}/update`,
					resolveWithFullResponse: true,
					json: true,
					body: {
						name: {
							first: 'Test',
							last: 'User',
						},
					},
				};
				let result = await rp(options);

				console.log(`result stringified: ${JSON.stringify(result, null, 2)}`);
				assert(0, 1, 'This code should not be executed.');

			} catch (err) {
				assert(err.statusCode, 500, 'Non-logged in users can not update user accounts.');
			}
		});
	});

/*

	describe('POST /api/users/:id/update - Update Test User', function () {
		it('First name should be changed.', async () => {
			try {
				let options = {
					method: 'POST',
					uri: `${LOCALHOST}/api/users/${userId}/update`,
					resolveWithFullResponse: true,
					json: true,
					body: {
						name: {
							first: 'Test',
							last: 'User',
						},
					},
				};
				let result = await rp(options);
				// console.log(`result stringified: ${JSON.stringify(result, null, 2)}`);
				assert(result.body.user.name.first, 'Test', 'User name was changed.');

			} catch (err) {
				console.log(`err stringified: ${JSON.stringify(err, null, 2)}`);
				throw err;
			}
		});
	});

*/

	describe('POST /api/users/create - Create New User', function () {
		it('Create New User', async () => {
			try {
				let options = {
					method: 'POST',
					uri: `${LOCALHOST}/api/users/create`,
					resolveWithFullResponse: true,
					json: true,
					body: {
						email: 'test.user@keystone.js',
						password: 'testpassword',
						name: {
							first: 'Test2',
							last: 'User2',
						},
					},
				};
				let result = await rp(options);

				// console.log(`result stringified: ${JSON.stringify(result, null, 2)}`);

				userId = result.body.user._id;

				// assert('Test', 'Test', 'User name was changed.');
				assert.isString(userId, `New user ${userId} created.`);

			} catch (err) {
				console.log(`err stringified: ${JSON.stringify(err, null, 2)}`);
				throw err;
			}
		});
	});


	describe('GET /api/users/:id/remove - Delete Test User', function () {
		it('Should not be able to delete a user.', async () => {
			try {
				let options = {
					method: 'GET',
					uri: `${LOCALHOST}/api/users/${userId}/remove`,
					resolveWithFullResponse: true,
					json: true,
				};
				let result = await rp(options);
				// console.log(`result stringified: ${JSON.stringify(result, null, 2)}`);

        console.log(`result stringified: ${JSON.stringify(result, null, 2)}`);
				assert(0, 1, 'This code should not be executed.');

			} catch (err) {
				assert(err.statusCode, 500, 'Non-logged in users can not update user accounts.');
			}
		});
	});

/*

	describe('GET /api/users/:id/remove - Delete Test User', function () {
		it('should return success == true', async () => {
			try {
				let options = {
					method: 'GET',
					uri: `${LOCALHOST}/api/users/${userId}/remove`,
					resolveWithFullResponse: true,
					json: true,
				};
				let result = await rp(options);
				// console.log(`result stringified: ${JSON.stringify(result, null, 2)}`);

				assert(result.body.success, true, 'Remove returns success.');
			} catch (err) {
				console.log(`err stringified: ${JSON.stringify(err, null, 2)}`);
				throw err;
			}
		});
	});

*/

});
