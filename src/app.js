require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const connectDatabase =  require('./database/config');

const corsOpts = {
    origin: '*',
    methods: [
      'GET',
      'POST',
      'PUT',
      'DELETE'
    ],  
    allowedHeaders: [
      'Content-Type',
    ],
  };



class Server{

    constructor(){
        this.app = express()
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);


        //Routes
        this.usersPath="/api/users";
        this.ordersPath = "/api/orders";

        //Middlewares
        this.middleeares();

        //Connection Database
        connectDatabase();

        //Route
        this.routes()
    }

    middleeares(){
        //CORS
        this.app.use(cors(corsOpts));

        //Lectura y perseo del body
        this.app.use(express.json())

        //Parse el cuerpo de la solicitud
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
    }

    routes(){
      this.app.use(this.usersPath, require('./routes/users'))
      this.app.use(this.ordersPath, require('./routes/orders'))

  }

    listen(){
        this.server.listen(this.port || 3000,()=>{
            console.log("El servidor está corriendo ", this.port);
        })

    }
}


module.exports = Server