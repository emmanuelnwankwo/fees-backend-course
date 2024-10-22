const { onAddProduct, onUpdateProduct } = require('../../src/middlewares/productMiddleware');

describe('Product Middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            header: jest.fn(),
            body: {}
        };
        res = {
            status: jest.fn().mockReturnThis({}),
            send: jest.fn()
        };
        next = jest.fn();
    });
    describe('onAddProduct', () => {
        it('should call next if validation passes', () => {
            req.body = { name: 'Product 1', description: 'Test product', status: 'available' };

            onAddProduct(req, res, next);

            expect(next).toHaveBeenCalled();
        });
        it('should return 400 if validation fails', () => {

            onAddProduct(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(next).not.toHaveBeenCalled();
        });
    });

    describe('onUpdateProduct', () => {
        it('should call next if validation passes', () => {
            req.body = { name: 'Product 1', description: 'Test product', status: 'available' };

            onUpdateProduct(req, res, next);

            expect(next).toHaveBeenCalled();
        });
    });
});