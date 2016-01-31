(function (app) {
	app.controller('NavCtrl', Controller);
	Controller.$ingect = ["GetDataSVC"];
	
	function Controller (GetDataSVC) {
		var vm = this;
		vm.navList = GetDataSVC.getTopNav();
		return vm;
	}	

}(angular.module('bbWebinar')));