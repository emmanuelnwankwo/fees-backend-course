const swaggerJsDoc = require('swagger-jsdoc');
const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const product = require('./productRoute');
const auth = require('./authRoute');
const { authMiddleware } = require('../middlewares/index');
const { env } = require('../config/envConfig');

const { authenticate } = authMiddleware

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Product API",
            version: "1.0.0",
            description: "A simple Express Product API"
        },
        servers: [
            {
                url: `http://localhost:${env.PORT}`,
                description: "Development environment"
            },
            {
                url: 'https://fees-product-api.onrender.com',
                description: "Production environment"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ["./src/routes/*.js"]
}

const swaggerDocs = swaggerJsDoc(options);

router.use('/api', authenticate, product);
router.use('/auth', auth);
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = router;