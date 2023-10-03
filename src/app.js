require('dotenv').config();
const express = require('express');
const cors = require('cors');

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

        //Middlewares
        this.middleeares();

    }

    middleeares(){
        //CORS
        this.app.use(cors(corsOpts));

        //Lectura y perseo del body
        this.app.use(express.json())
    }

    listen(){
        this.server.listen(this.port || 3000,()=>{
            console.log("El servidor está corriendo ", this.port);
        })

    }
}


module.exports = Server