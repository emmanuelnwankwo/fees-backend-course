const express = require('express');
const { productController } = require('../controllers/index');
const { authMiddleware, productMiddleware } = require('../middlewares/index');

const router = express.Router();

const { getProducts, createProduct, getProduct, updateProduct, partialUpdateProduct, deleteProduct } = productController;
const { authorize } = authMiddleware;
const { onAddProduct, onUpdateProduct } = productMiddleware;

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products
 *     tags: 
 *      - Product
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 * 
 */
router.get('/products', getProducts);

/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product with the provided details
 *     tags:
 *      - Product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: iPhone 16 
 *               description:
 *                 type: string
 *                 example: iPhone 16 mobile phone
 *               status:
 *                 type: string
 *                 example: available
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *
 */
router.post('/product', authorize, onAddProduct, createProduct);

router.get('/product/:id', getProduct);

router.put('/product/:id', authorize, onUpdateProduct, updateProduct);

router.patch('/product/:id', authorize, onUpdateProduct, partialUpdateProduct);

router.delete('/product/:id', authorize, deleteProduct);

module.exports = router;