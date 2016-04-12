(function() {
    /**
     * Module
     * 
     * Description
     */
    angular
        .module('bbWebinar', ["ngWebSocket"])
        .constant("webConfig", {
            "host": "http://localhost/webinar/",
            "wsHost": "ws://localhost:81/webinar/switchStatus"
        })
        .run(function($rootScope, UtilitiesSVC) {
            $rootScope.config = {};
            UtilitiesSVC.getConfig().then(function(r) {
                var d = new Date(r.data.liveStart);
                var config = r.data;
                config.clipStartIn = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), (d.getHours() - 3), d.getMinutes());
                angular.extend($rootScope.config, config);
            });
        });
}());
