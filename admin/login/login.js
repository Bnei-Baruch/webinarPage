(function() {
    var app = angular.module("LoginModule", []);
    app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
    }]);

    app.controller('LoginCtrl', ["$http", "$window", function($http, $window) {
        var vm = this;
        vm.user = {
            name: "admin",
            pass: "12345"
        };
        vm.login = login;
        return vm;

        function login() {
            var url = "http://localhost/webinar/adminLogin";
            $http.post(url, vm.user).then(function(r) {
                if (!r.data.error)
                    $window.location.reload()
            });
        }
    }]);



}())
