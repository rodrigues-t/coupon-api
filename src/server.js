const express = require('express');
const helmet = require('helmet');
require('./database');
require('./helpers/auth');

class App {
    constructor() {
        this.express = express();
        this.middlewares();
        this.routes();

        this.express.listen(3001, () => console.log('API running...'));
    }
    
    middlewares() {
        this.express.use(express.json());
        this.express.use(helmet());
    }

    routes(){
        this.express.use('/api', require('./routes'));
    }
}

module.exports = new App().express;