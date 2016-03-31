(function() {
    var basePath = "http://localhost/webinar/admin/";
    var app = angular.module("WebinarAdmin", []);
    app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
    }]);


    app.service('SwitchStatus', SwitchStatus);
    SwitchStatus.$injector = ["$http"];

    function SwitchStatus($http) {
        this.setStatus = function(status) {
            var url = basePath + "setStatus";
            return $http.post(url, { status: "setStatus", type: status.type });
        }
        this.getStatus = function() {
            var url = basePath + "getStatus";
            return $http.post(url);
        }

    }

    app.service('GetSetConfig', GetSetConfig);
    GetSetConfig.$injector = ["$http"];

    function GetSetConfig($http) {
        this.getConfig = function() {
            var url = basePath + "getConfig";
            return $http.post(url);
        }
        this.setConfig = function(data) {
            var url = basePath + "setConfig";
            return $http.post(url, data);
        }
    }

    app.controller('SwitchModeController', SwitchModeController);
    SwitchModeController.$injector = ["$scope", "SwitchStatus"];

    function SwitchModeController($scope, SwitchStatus) {
        var vm = this;
        vm.statusRadio = [{
            "type": "live"
        }, {
            "type": "wait"
        }, {
            "type": "playlist"
        }];
        vm.statusSel = vm.statusRadio[0];
        vm.setStatus = setStatus;
        getStatus();
        return vm;

        function setStatus(status) {
            vm.statusSel = status;
            SwitchStatus.setStatus(status).then(function(data) {
                var a = data;
            });
        }

        function getStatus() {
            SwitchStatus.getStatus().then(function(data) {
                vm.statusRadio.forEach(function(item) {
                    if (item.type === data.data.status)
                        vm.statusSel = item;
                })
            });
        }

    }


    app.controller('ConfigFormController', ConfigFormController);
    ConfigFormController.$injector = ["$scope", "GetSetConfig"];

    function ConfigFormController($scope, GetSetConfig) {
        var vm = this;
        vm.form = $scope.form;
        vm.setConfig = setConfig;

        getConfig();
        return vm;

        function getConfig() {
            GetSetConfig.getConfig().then(function(r) {
                r.data.liveStart = new Date(r.data.liveStart);
                vm.sendData = r.data;
            });
        }

        function setConfig() {
            GetSetConfig.setConfig(vm.sendData).then(function(r) {
                var a = r;
            });
        }
    }
}())
