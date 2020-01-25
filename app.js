const Server = function Server() {

    // Load modules
    const express = require('express');
    const logger = require("morgan");
    const errorhandler = require("errorhandler");
    const fs = require('fs');
    const path = require('path');

    // Use express and express router
    const app = express();
    const router = express.Router();

    // Middleware setup
    app.use('/', router);
    app.use(express.static(__dirname + '/public/'));
    app.use(logger("dev"));
    app.use(errorhandler());

    // Routes
    app.get('/', function(req,res) {
        res.redirect('/index');
    });

    app.get('/index', function(req,res) {
        res.status(200).sendFile(path.join(__dirname+'/views/index.html'));
    });

    app.get('*', function(req, res){
        res.status(404).sendFile(path.join(__dirname+'/views/404.html'));
    });


    // Start server
    var port = 4300;
    var server = app.listen(port, () => console.log('Listening on port ' + port));
    return server;

}

module.exports = Server;