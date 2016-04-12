var fs = require('fs');
global.WEBINAR_CONFIG = JSON.parse(fs.readFileSync('./server/config.json', "utf8"));

var http = require('http');
var ws = require('./server/webSocket');
var db = require('./server/callDB');
var bodyParser = require('body-parser');

var connect = require('connect');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');

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

router.post('/adminLogin', function(req, res) {
    try {

        if (global.WEBINAR_CONFIG.admin.name !== req.body.name) {
            res.send(JSON.stringify({ error: true, message: "bad user" }));
        } else if (global.WEBINAR_CONFIG.admin.pass !== req.body.pass) {
            res.send(JSON.stringify({ error: true, message: "bad user" }));
        } else {
            req.session.authorized = true;
            req.session.username = req.body.name;
            res.send(JSON.stringify({ error: false}));
        }


    } catch (e) {
        res.send(JSON.stringify({ error: true, message: "bad user" }));
    }
});

/*
routing for admin page
*/
var routerAdmin = express.Router();
routerAdmin.use(express.static(__dirname + '/admin/'));
app.use(cookieParser());
app.use(cookieSession({ secret: global.WEBINAR_CONFIG.admin.secret }));

app.all('/webinar/admin/', function(req, res, next) {
    if (req.session.authorized && (global.WEBINAR_CONFIG.admin.name === req.session.username)) {
        res.sendfile('./admin/index.html');
    } else {
        res.sendfile('./admin/login/index.html');
    }

});
routerAdmin.use(function(req, res, next) {
    if (req.session.authorized && (global.WEBINAR_CONFIG.admin.name === req.session.username))
        next();
    else {
        res.sendfile('./admin/index.html');
    }

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