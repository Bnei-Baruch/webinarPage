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
		GetConfig.getConfig().then(function(r){
			var d = r.data.webinarDate;
			var config = {
				"clipStartIn": new Date(d.year, d.month, d.day, d.hour),
				"pageTitle": r.data.pageTitle
			};
			angular.extend($rootScope.config , config);
		});
	})
}());