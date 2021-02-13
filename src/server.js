const express = require('express');
require('./database');
require('./middlewares/auth');

class App {
    constructor() {
        this.express = express();
        this.middlewares();
        this.routes();

        this.express.listen(3001, () => console.log('API running...'));
    }
    
    middlewares() {
        this.express.use(express.json())
    }

    routes(){
        this.express.use('/api', require('./routes'));
    }
}

module.exports = new App().express;