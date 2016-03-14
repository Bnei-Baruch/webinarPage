(function (app) {
	app.service('GetConfig', GetConfig);
	GetConfig.$inject = ["$http"];

	function GetConfig ($http) {
		return {
			getConfig: getConfig
		};
		function getConfig () {
			var param = {
				method: "POST",
				url: "app/config.json"
			}
			return $http(param);
		}
	}
})(angular.module('bbWebinar'));

