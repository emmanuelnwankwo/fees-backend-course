const { authenticate, authorize, onUserLogin, onUserRegisteration } = require('../../src/middlewares/authMiddleware');
const jwt = require('jsonwebtoken');
const { authValidation } = require('../../src/validations/index');


jest.mock('jsonwebtoken');
jest.mock('../../src/config/envConfig', () => {
    return {
        env: {
            JWT_SECRET: 'secret',
        }
    }
});

describe('Auth Middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            header: jest.fn(),
            body: {},
            userRole: undefined
        };
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        next = jest.fn();
    });
    describe('authorize', () => {
        it('should call next() if user is authorized', () => {
            req.userRole = 'admin';

            authorize(req, res, next);

            expect(next).toHaveBeenCalled();
        })
        it('should return 403 error if user is not authorized or is not an admin', () => {
            req.userRole = 'user';

            authorize(req, res, next);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.send).toHaveBeenCalledWith({ error: 'Forbidden' });
        });
    });

    describe('authenticate', () => {
        it('should call next() if token is valid', () => {
            const decoded = { role: 'admin' }
            req.header.mockReturnValue('Bearer validToken');
            jwt.verify.mockReturnValue(decoded);

            authenticate(req, res, next);

            expect(req.userRole).toBe(decoded.role);
            expect(next).toHaveBeenCalled();
        });
        it('should return 401 error if token is invalid', () => {
            req.header.mockReturnValue('Bearer invalidToken');
            jwt.verify.mockImplementation(() => {
                throw new Error('Invalid token');
            });

            authenticate(req, res, next);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.send).toHaveBeenCalledWith({ error: 'Unauthorized' });
        });
        it('should return 401 error if no token is provided', () => {
            authenticate(req, res, next);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.send).toHaveBeenCalledWith({ error: 'Unauthorized' });
        });
    });

    describe('onUserLogin', () => {
        it('should call next() id login validation passes', () => {
            req.body = {
                username: 'testuser',
                password: 'password'
            };
            authValidation.validateUserLogin = jest.fn().mockReturnValue(true);

            onUserLogin(req, res, next);

            expect(next).toHaveBeenCalled();
        });
        it('should return 400 error if login validation fails', () => {
            req.body = {
                username: 'testuser'
            };
            authValidation.validateUserLogin.mockImplementation(() => {
                throw { details: [{ message: 'Password is required' }] };
            });

            onUserLogin(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({ error: 'Password is required' });
        });
    })

    describe('onUserRegisteration', () => {
        it('should call next() if registration validation passes', () => {
            req.body = {
                username: 'newuser',
                password: 'password'
            };
            authValidation.validateUserRegistration = jest.fn().mockReturnValue(true);

            onUserRegisteration(req, res, next);

            expect(next).toHaveBeenCalled();
        });
        it('should return 400 error if registration validation fails', () => {
            req.body = {
                password: 'password'
            };
            authValidation.validateUserRegistration.mockImplementation(() => {
                throw { details: [{ message: 'Username is required' }] };
            });

            onUserRegisteration(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({ error: 'Username is required' });
        });
    });
});
