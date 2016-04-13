var timeOutId;

var db = require('./callDB');


var WebSocketServer = require('ws').Server;
var wsServer = new WebSocketServer({
    port: global.WEBINAR_CONFIG.socketPort,
    path: "/webinar/switchStatus"
});


wsServer.on('connection', function connection(ws) {
    db.getStatus(function(r) {
        ws.send(JSON.stringify(r));
    });
}).on('error', function(e) {
    console.log("Got error: " + e.message);
});

module.exports.broadcast = broadcast;

function broadcast(status) {
    wsServer.clients.forEach(function each(client) {
        client.send(JSON.stringify({ status: status }));
    });
};
