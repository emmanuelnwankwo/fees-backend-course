const request = require('supertest');
const Product = require('../../src/models/product');
const User = require('../../src/models/user');
const app = require('../../src/index');
const bcrypt = require('bcrypt');

jest.mock('../../src/models/product');
jest.mock('../../src/models/user');
jest.mock('../../src/config/envConfig', () => {
    return {
        env: {
            JWT_SECRET: 'secret',
            MONGODB_URI: 'mongodb://localhost:test/test',
            PORT: 3000,
            NODE_ENV: 'test'
        }
    }
});


describe('Product Controller', () => {
    let token;
    jest.spyOn(console, 'error').mockImplementation(() => { });

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(async () => {
        const hashedPassword = await bcrypt.hash('password123', 10)
        const mockUser = {
            username: 'testuser',
            hashPassword: hashedPassword,
            role: 'admin'
        };
        User.findOne.mockResolvedValue(mockUser);
        bcrypt.compare = jest.fn().mockReturnValue(true);

        const response = await request(app)
            .post('/auth/login')
            .send({ username: 'testuser', password: 'password123' });
        token = 'Bearer ' + response.body.token;
    });

    describe('GET /api/products', () => {
        it('should return all products', async () => {
            const mockProducts = [{ name: 'Product 1' }, { name: 'Product 2' }];
            Product.find.mockResolvedValue(mockProducts);

            const response = await request(app)
                .get('/api/products')
                .set('Authorization', token);

            expect(response.statusCode).toBe(200);
            expect(response.body.data).toEqual(mockProducts);
        });
        it('should return 401 if no token is provided', async () => {
            const response = await request(app)
                .get('/api/products');

            expect(response.statusCode).toBe(401);
            expect(response.body.error).toBe('Unauthorized');
        });
        it('should return 404 if no products found', async () => {
            Product.find.mockResolvedValue([]);

            const response = await request(app)
                .get('/api/products')
                .set('Authorization', token);

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('No products found');
        });
    });

    describe('GET /api/product/:id', () => {
        it('should return a product by id', async () => {
            const mockProduct = { name: 'Product 1' };
            Product.findById.mockResolvedValue(mockProduct);

            const response = await request(app)
                .get('/api/product/1')
                .set('Authorization', token);

            expect(response.statusCode).toBe(200);
            expect(response.body.data).toEqual(mockProduct);
        });
        it('should return 404 if product not found', async () => {
            Product.findById.mockResolvedValue(null);

            const response = await request(app)
                .get('/api/product/1')
                .set('Authorization', token);

            expect(response.statusCode).toBe(404);
            expect(response.body.message).toBe('Product not found');
        });
    });

    describe('POST /api/product', () => {
        it('should create a new product successfully', async () => {
            const newProduct = { name: 'New Product', description: 'Test product', status: 'available' };
            Product.findOne.mockResolvedValue(null);
            Product.create.mockResolvedValue(newProduct);

            const response = await request(app)
                .post('/api/product')
                .set('Authorization', token)
                .send(newProduct);

            expect(response.statusCode).toBe(201);
            expect(response.body.message).toBe('Product created successfully');
            expect(response.body.data).toEqual(newProduct);
        });
        it('should return 409 if product already exists', async () => {
            const existingProduct = { name: 'Existing Product', description: 'Test product', status: 'available' };
            Product.findOne.mockResolvedValue(existingProduct);

            const response = await request(app)
                .post('/api/product')
                .set('Authorization', token)
                .send(existingProduct);

            expect(response.statusCode).toBe(409);
            expect(response.body.message).toBe('Product already exists');
        });
    });

    describe('PUT /api/product/:id', () => {
        it('should update a product successfully', async () => {
            const existingProduct = { name: 'Old Product' };
            const updatedProduct = { name: 'Updated Product', description: 'Test product', status: 'available' };
            Product.findById.mockResolvedValue(existingProduct);
            Product.updateOne.mockResolvedValue(updatedProduct);

            const response = await request(app)
                .put('/api/product/1')
                .set('Authorization', token)
                .send(updatedProduct);

            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Product updated successfully');
            expect(response.body.data).toEqual(updatedProduct);
        });
        it('should return create a new product if product not found', async () => {
            const updateProduct = { name: 'Updated Product', description: 'Test product', status: 'available' };
            Product.findById.mockResolvedValue(null);
            Product.create.mockResolvedValue(updateProduct);

            const response = await request(app)
                .put('/api/product/1')
                .set('Authorization', token)
                .send(updateProduct);

            expect(response.statusCode).toBe(201);
            expect(response.body.message).toBe('Product created successfully');
        });
    });

    describe('DELETE /api/product/:id', () => {
        it('should delete a product successfully', async () => {
            const existingProduct = { name: 'Product to delete' };
            Product.findById.mockResolvedValue(existingProduct);
            Product.deleteOne.mockResolvedValue({ deletedCount: 1 });

            const response = await request(app)
                .delete('/api/product/1')
                .set('Authorization', token);

            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Product deleted successfully');
        });
        it('should return 404 if product not found', async () => {
            Product.findById.mockResolvedValue(null);

            const response = await request(app)
                .delete('/api/product/1')
                .set('Authorization', token);

            expect(response.statusCode).toBe(404);
            expect(response.body.message).toBe('Product not found');
        });
    });

});