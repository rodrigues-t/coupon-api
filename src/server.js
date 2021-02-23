const express = require('express');
const helmet = require('helmet');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('./database');
require('./helpers/auth');

class App {
    constructor() {
        this.express = express();
        this.middlewares();
        this.swagger();
        this.routes();

        this.express.listen(3001, () => console.log('API running...'));
    }

    middlewares() {
        this.express.use(express.json());
        this.express.use(helmet());
    }

    routes() {
        this.express.use('/api', require('./routes'));
    }

    swagger() {
        const options = {
            swaggerDefinition: {
                openapi: "3.0.0",
                info: {
                    title: "Coupon API",
                    version: "0.1.0",
                    description: "API to create and manage coupons and users.",
                    license: {
                        name: "MIT",
                        url: "https://spdx.org/licenses/MIT.html",
                    },
                    contact: {
                        name: "Thiago Rodrigues",
                        url: "https://github.com/rodrigues-t",
                        email: "thiagonr86@gmail.com",
                    },
                },
                servers: [
                    {
                        url: "http://localhost:3001/api",
                    },
                ],
            },
            apis: ["src/routes/*.js", "src/models/*.js"],
        };
        const specs = swaggerJsdoc(options);
        console.log(specs);
        this.express.use("/docs", swaggerUi.serve, swaggerUi.setup(specs, { explore: true }));
    }
}

module.exports = new App().express;