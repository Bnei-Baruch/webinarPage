(function (app) {
	app.controller('FooterCtrl', Controller);
	Controller.$ingect = ["GetDataSVC", '$timeout'];
	
	function Controller (GetDataSVC, $timeout) {
		var vm = this;
		vm.navData = GetDataSVC.getFooterData();
	 	setMChTranslation();
		return vm;
		
		function setMChTranslation (argument) {
	        if (!jQuery.validator) {
	            $timeout(setMChTranslation, 0, false);
	            return;
	        }
	        
			var msgObj = GetDataSVC.getMailChimpTranslation();		
            angular.extend(jQuery.validator.messages, msgObj);
		}
	}

}(angular.module('bbWebinar')));