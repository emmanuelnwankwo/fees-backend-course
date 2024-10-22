const bcrypt = require('bcrypt');
const request = require('supertest');
const User = require('../../src/models/user');
const app = require('../../src/index');

jest.mock('../../src/models/user');

describe('Auth Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /auth/login', () => {
        it('should login successfully with valid credentials', async () => {
            const hashedPassword = await bcrypt.hash('password123', 10)
            const mockUser = {
                username: 'testuser',
                hashPassword: hashedPassword,
                role: 'user'
            };
            User.findOne.mockResolvedValue(mockUser);
            bcrypt.compare = jest.fn().mockReturnValue(true);

            const response = await request(app)
                .post('/auth/login')
                .send({ username: 'testuser', password: 'password123' });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
            expect(response.body.data).toEqual({ username: 'testuser', role: 'user' });
        });

        it('should return a 401 error for invalid username', async () => {
            const user = {
                username: 'invalidUser',
                password: 'password123',
            };
            User.findOne.mockResolvedValue(null);

            const response = await request(app)
                .post('/auth/login')
                .send(user);

            expect(response.status).toBe(401);
            expect(response.body).toEqual({ message: 'Invalid credentials' });
        });

        it('should return a 401 error for invalid password', async () => {
            const user = {
                username: 'testuser', password: 'wrongpassword123'
            };
            const mockUser = {
                username: 'testuser',
                role: 'user'
            };
            User.findOne.mockResolvedValue(mockUser);
            bcrypt.compare = jest.fn().mockReturnValue(false);

            const response = await request(app)
                .post('/auth/login')
                .send(user);

            expect(response.status).toBe(401);
            expect(response.body).toEqual({ message: 'Invalid credentials' });
        });
    })

    describe('POST /auth/register', () => {
        it('should register a new user successfully', async () => {
            User.findOne.mockResolvedValue(null); 
            const response = await request(app)
                .post('/auth/register')
                .send({ username: 'newuser', password: 'password123', role: 'user' });

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('User created successfully');
            expect(User.prototype.save).toHaveBeenCalled(); 
        });

        it('should return 409 if user already exists', async () => {
            const mockUser = { username: 'existinguser' };
            User.findOne.mockResolvedValue(mockUser); 
            const response = await request(app)
                .post('/auth/register')
                .send({ username: 'existinguser', password: 'password123', role: 'user' });

            expect(response.status).toBe(409);
            expect(response.body.message).toBe('User already exists');
        });
    });
})