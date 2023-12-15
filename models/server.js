const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // Connect to Database
        this.connectDB();

        // Middlewares
        this.midlewares();
        // Routes Application
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    midlewares() {
        
        // CORS
        this.app.use(cors());

        // Read and Parse Body
        this.app.use(express.json());
        
        // Public Directory
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/users'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server Running, Port:', this.port);
        });
    }
}




module.exports = Server;