
// JSONP callback function of youtube API /////////////
(function (jQuery) {
	window.youTubePlayer = {};
	window.onYouTubeIframeAPIReady = function() {
		var url = 'https://www.googleapis.com/youtube/v3/search';
		var param = {
				part : 'snippet',
				eventType: 'upcoming',
				type: 'video',
				order: 'date',
				channelId : 'UCAhq4ttjWzWAT4zmPXm0DZw',
				//channelId : 'UCXBGJ0iWWa5jmSrLTvgARRQ',
				key : 'AIzaSyBoMXQDrlRUCQCxv4fjfiyTHXog8OB2Nz0',
		}
		jQuery.get(url, param)
			.done(function (r) {
				if(r.items.length == 0){				
					param.eventType = 'live';
					jQuery.get(url, param)
						.done(function (r) {
							if(r.items.length == 0){				
								//if no live video take spacial playlist (use simulation of request)
								r.items = [
									{
										id:{
											videoId: "playlist"
										}
									}
								];
							}

							_done(r);
						});
				} else {
					_done(r)
				}
			});
		function _done(r) {
			var video, id, playerParam;
			// здесь надо комментить, 
			id = r.items[0].id.videoId;
			// var id = "W_0fndxoZIM";
			if (youTubePlayer.timeoutId) 
				clearTimeout(youTubePlayer.timeoutId);
			youTubePlayer.timeoutId = setTimeout(function (argument) {
				onYouTubeIframeAPIReady();
			}, 1*60*1000); 

			if (youTubePlayer.id === id){
	        	return;
			} else if(!!youTubePlayer.id) {
				youTubePlayer.player.stopVideo();
	        	youTubePlayer.player.loadVideoById(id);
	        	youTubePlayer.id = id;
	        	return;
			}
			
			youTubePlayer.id = id;
			playerParam = preparePlayerParam(id);
			youTubePlayer.player =  new YT.Player('player', playerParam);
		}
		//prepare player param 
		function preparePlayerParam (id) {
			var param = {
		        height: '390',
		      	width: '640',
		      	playerVars:{
					rel: 0,
					fresca_preroll: 1,
					controls: 1
		      	},
			    events: {
			      'onReady': onPlayerReady,
			      'onStateChange': onPlayerStateChange
			    }
			};
			
			if (id === "playlist") {
				param.playerVars.listType = 'playlist';
				param.playerVars.list = "PL3s9Wy5W7M-NLdc1mNXEk_BtJtsLIaGAQ";
				param.playerVars.controls = "1";

			} else{
				param.videoId = id;
			}
			//todo:David - this is temporaly integration with Angular (need move all code thare)
			var playerScope = angular.element(document.querySelector( '#player' ) ).scope();
			if (id === "playlist")
				playerScope.$apply(playerScope.main.setLive("false"));
			else
				playerScope.$apply(playerScope.main.setLive ("true", id));
			
			return param;
		}
		function onPlayerReady (event) {		
			//youTubePlayer.player.playVideo();		
			
		}
		function onPlayerStateChange (event) {
		}
	}
})(jQuery);
