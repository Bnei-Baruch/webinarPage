(function() {
    /**
     * Module
     * 
     * Description
     */
    angular
        .module('bbWebinar', [])
        .run(function($rootScope, GetConfig) {
            $rootScope.config = {};
            GetConfig.getConfig().then(function(r) {
                var d = r.data.webinarDate;
                var config = r.data.config;
                config.clipStartIn = Date.UTC(d.year, d.month, d.day, (d.hour - 3), d.min);
                angular.extend($rootScope.config, config);
            });
        });
}());
