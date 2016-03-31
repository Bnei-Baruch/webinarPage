var fs = require('fs');
var returnObj;

var callDB = {
    init: init,
    getConfig: getConfig,
    setConfig: setConfig,
    setStatus: setStatus,
    getStatus: getStatus
};
module.exports = callDB;

function init() {}

function setStatus(status) {
    var data = fs.writeFileSync('./server/status.json', status.toString());
    return data;
}
function getStatus() {
    var data = fs.readFileSync('./server/status.json', 'utf8');
    return data;
}

function getConfig() {
    var data = fs.readFileSync('./server/config.json', "utf8");
    var json = JSON.parse(data);

    return json;
}

function setConfig(arr) {
    var json = JSON.stringify(resultado);
    var data = fs.writeFileSync('./server/config.json', json);
    return JSON.parse(data);

}
