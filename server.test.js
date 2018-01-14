const request = require('supertest');
const app = require('./server');

test('GET / should have statuscode 200', () => {
  request(app)
  .get('/')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });
});