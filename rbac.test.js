const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const expect = require('chai').expect;

const secretKey = 'your_secret_key';

describe('RBAC API Testing', function () {
    const userToken = jwt.sign({ username: 'user1', role: 'user' }, secretKey);
    const adminToken = jwt.sign({ username: 'admin1', role: 'admin' }, secretKey);

    it('should allow admin access to /admin', function (done) {
        request(app)
            .get('/admin')
            .set('Authorization', adminToken)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.equal('Welcome Admin');
                done();
            });
    });

    it('should deny user access to /admin', function (done) {
        request(app)
            .get('/admin')
            .set('Authorization', userToken)
            .expect(403, done);
    });

    it('should allow user access to /user', function (done) {
        request(app)
            .get('/user')
            .set('Authorization', userToken)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.equal('Welcome User');
                done();
            });
    });

    it('should deny access if no token is provided', function (done) {
        request(app)
            .get('/user')
            .expect(401, done);
    });
});
