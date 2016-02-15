(function (app) {
	//temparery param of started webinar date (year, month, date, hours, minutes)
	var _tempDateParam = new Date(2016, 0, 24, 17);
	/*_tempDateParam = new Date(
	 	_tempDateParam.getUTCFullYear(), 
	 	_tempDateParam.getUTCMonth(), 
	 	_tempDateParam.getUTCDate(),  
	 	_tempDateParam.getUTCHours()
 	);*/
	app.controller('MainCtrl', Controller);
	Controller.$ingect = ["YoutubeSVC", "UtilitiesSVC", "$rootScope"];
	
	function Controller (YoutubeSVC, UtilitiesSVC, $rootScope) {
		var vm = this;
		vm.pageCounter = 0, vm.currentClip = {}, vm.playList = [];
		vm.loadPage = loadPage;
		vm.openClip = openClip;
		vm.setLive = setLive;
		vm.isLive = false;
		vm.addHypercomments = UtilitiesSVC.addHypercomments();
		return vm;
		function setLive (live, id) {
			vm.isLive = (live === "true");
			if (vm.isLive) 
				YoutubeSVC.getVideoById(id).then(function(r){
					vm.currentClip = r.data.items[0];
					vm.currentClip.startIn = $rootScope.config.clipStartIn;
				});	
			else
				loadPage(null, 0, 0);
		}
		function openClip (clip, $index) {
			vm.currentClip = clip;			
			vm.currentClip.$index = vm.playList.pageInfo.resultsPerPage * vm.pageCounter + $index + 1;
        	window.youTubePlayer.player.loadVideoById(clip.snippet.resourceId.videoId);
		}
		function loadPage (pageToken, count) {
			vm.pageCounter += count;
			YoutubeSVC.getPlayList(pageToken).then(function(r){
				vm.playList = r.data;
				vm.currentClip = r.data.items[0];
				vm.currentClip.$index = vm.playList.pageInfo.resultsPerPage * vm.pageCounter + 1;
			});
		}
	}

}(angular.module('bbWebinar')));