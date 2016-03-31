var fs = require('fs');
global.WEBINAR_CONFIG = JSON.parse(fs.readFileSync('./server/config.json', "utf8"));

var http = require('http');
var ws = require('./server/webSocket');
var db = require('./server/callDB');
var bodyParser = require('body-parser');
var express = require('express');

var app = express();
app.on('error', function(e) {
    console.log("Got error: " + e.message);
});
app.use(bodyParser.json());
/*
routing for webinar page
*/
var router = express.Router();
router.use(express.static(__dirname + '/app/'));
router.get('/', function(req, res, next) {
    res.sendfile('./app/index.html');
});
router.post('/getConfig', function(req, res) {
    db.getConfig(function(conf) {
        res.send(JSON.stringify(conf));
    });
});

/*
routing for admin page
*/
var routerAdmin = express.Router();
routerAdmin.use(express.static(__dirname + '/admin/'));
routerAdmin.get('/', function(req, res, next) {
    res.sendfile('./admin/index.html');
});

routerAdmin.post('/setStatus', function(req, res) {
    var status = req.body.type;
    db.setStatus(status);
    ws.broadcast(status);
    res.send(JSON.stringify({ error: false }));
});
routerAdmin.post('/getStatus', function(req, res) {
    db.getStatus(function(status) {
        res.send(JSON.stringify(status));
    });
});

routerAdmin.post('/setConfig', function(req, res) {
    db.setConfig(req.body);
    res.send(JSON.stringify({ error: false }));
});
routerAdmin.post('/getConfig', function(req, res) {
    db.getConfig(function(conf) {
        res.send(JSON.stringify(conf));
    });
});




app.use("/webinar/", router);
app.use("/webinar/admin", routerAdmin);
app.listen(global.WEBINAR_CONFIG.clientPort);
