(function (app) {
	app.controller('FooterCtrl', Controller);
	Controller.$ingect = ["GetDataSVC"];
	
	function Controller (GetDataSVC) {
		var vm = this;
		vm.navData = GetDataSVC.getFooterData();
		return vm;
	}

}(angular.module('bbWebinar')));