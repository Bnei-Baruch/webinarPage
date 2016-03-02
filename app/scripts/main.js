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


(function(app) {
    app.service('GetDataSVC', GetDataSVC);

    function GetDataSVC($timeout) {
        return {
            getFooterData: getFooterData,
            getTopNav: getTopNav,
            getMailChimpTranslation: getMailChimpTranslation
        };

        function getFooterData() {
            return [{
                "title": "Обучение",
                "linkList": [{
                        "title": "Форматы обучения",
                        "url": "http://kabacademy.com/programm-online/"
                    }, {
                        "title": "Самостоятельное обучение",
                        "url": "http://kabacademy.com/"
                    }, {
                        "title": "Онлайн курсы",
                        "url": "http://kabacademy.com/programm-online/uznat-bolshe-ob-obuchenii-v-mak/"
                    },

                    {
                        "title": "Очное обучение",
                        "url": "http://kabacademy.com/filialyi/"
                    }
                ]
            }, {
                "title": "",
                "linkList": [{
                        "title": "Преподаватели",
                        "url": "http://kabacademy.com/nashi-prepodavateli/"
                    }, {
                        "title": "Программа обучения",
                        "url": "http://kabacademy.com/?p=453"
                    }, {
                        "title": "Сервисы для студентов",
                        "url": "http://kabacademy.com/?p=391"
                    },

                    {
                        "title": "Учебные материалы",
                        "url": "http://kabacademy.com/?p=388"
                    }
                ]
            }, {
                "title": "О нас",
                "linkList": [{
                        "title": "Что такое каббала",
                        "url": "http://kabacademy.com/nauka-kabbala/"
                    }, {
                        "title": "Михаэль Лайтман",
                        "url": "http://kabacademy.com/about-us/dr-michael-laitman/"
                    }, {
                        "title": "Каббалисты",
                        "url": "http://kabacademy.com/nauka-kabbala/kabbalistyi/"
                    },

                    {
                        "title": "Книги",
                        "url": "http://www.kbooks.ru/"
                    }
                ]
            }, {
                "title": "Наши сайты",
                "linkList": [{
                        "title": "Информационный портал",
                        "url": "http://www.kabbalah.info/rus/"
                    }, {
                        "title": "Блог М.Лайтмана",
                        "url": "http://www.laitman.ru/"
                    }, {
                        "title": "Каббала ТВ",
                        "url": "http://www.kab.tv/rus/"
                    },

                    {
                        "title": "Зоар ТВ",
                        "url": "http://www.zoar.tv/"
                    }
                ]
            }];
        }

        function getTopNav() {
            return [{
                "url": "http://kabacademy.com/programm-online/",
                "title": "Как мы учимся?"
            }, {
                "url": "http://kabacademy.com/filialyi/",
                "title": "Очное обучение"
            }, {
                "url": "http://kabacademy.com/programm-online/uznat-bolshe-ob-obuchenii-v-mak/",
                "title": "On-line обучение"
            }, {
                "url": "http://www.kbooks.ru/katalog/list/120",
                "title": "магазин книг"
            }];
        }


        /*** get object of messases translation */
        function getMailChimpTranslation() {
            return {
                required: "Это поле необходимо заполнить.",
                remote: "Пожалуйста, введите правильное значение.",
                email: "Пожалуйста, введите корректный адрес электронной почты.",
                url: "Пожалуйста, введите корректный URL.",
                date: "Пожалуйста, введите корректную дату.",
                dateISO: "Пожалуйста, введите корректную дату в формате ISO.",
                number: "Пожалуйста, введите число.",
                digits: "Пожалуйста, вводите только цифры.",
                creditcard: "Пожалуйста, введите правильный номер кредитной карты.",
                equalTo: "Пожалуйста, введите такое же значение ещё раз.",
                accept: "Пожалуйста, выберите файл с правильным расширением.",
                maxlength: jQuery.validator.format("Пожалуйста, введите не больше {0} символов."),
                minlength: jQuery.validator.format("Пожалуйста, введите не меньше {0} символов."),
                rangelength: jQuery.validator.format("Пожалуйста, введите значение длиной от {0} до {1} символов."),
                range: jQuery.validator.format("Пожалуйста, введите число от {0} до {1}."),
                max: jQuery.validator.format("Пожалуйста, введите число, меньшее или равное {0}."),
                min: jQuery.validator.format("Пожалуйста, введите число, большее или равное {0}.")
            };
        }
    }


})(angular.module('bbWebinar'));

(function(app) {
    app.service('UtilitiesSVC', UtilitiesSVC);
    UtilitiesSVC.$inject = ["YoutubeSVC", "$timeout", "$http"];

    function UtilitiesSVC(YoutubeSVC, $timeout) {
        return {
            addHypercomments: addHypercomments,
            buildPlayer: buildPlayer
        };

        function addHypercomments() {
            window._hcwp = window._hcwp || [];
            window._hcwp.push({
                widget: "Stream",
                widget_id: 68039
            });

            if ("HC_LOAD_INIT" in window) return;
            HC_LOAD_INIT = true;
            var lang = (navigator.language || navigator.systemLanguage || navigator.userLanguage || "en").substr(0, 2).toLowerCase();
            var hcc = document.createElement("script");
            hcc.type = "text/javascript";
            hcc.async = true;
            hcc.src = ("https:" == document.location.protocol ? "https" : "http") + "://w.hypercomments.com/widget/hc/68039/" + lang + "/widget.js";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hcc, s.nextSibling);
        }

        function buildPlayer() {
            window.youTubePlayer = {};
            window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

            function onYouTubeIframeAPIReady() {
                YoutubeSVC.getPlayerData().then(function(r) {
                    var video, id, playerParam;
                    // здесь надо комментить, 
                    id = r.items[0].id.videoId;
                    // var id = "W_0fndxoZIM";
                    if (youTubePlayer.timeoutId)
                        clearTimeout(youTubePlayer.timeoutId);
                    youTubePlayer.timeoutId = $timeout(function(argument) {
                        onYouTubeIframeAPIReady();
                    }, 1 * 60 * 1000);

                    if (youTubePlayer.id === id) {
                        return;
                    } else if (!!youTubePlayer.id) {
                        youTubePlayer.player.stopVideo();
                        youTubePlayer.player.loadVideoById(id);
                        youTubePlayer.id = id;
                        return;
                    }

                    youTubePlayer.id = id;
                    playerParam = preparePlayerParam(id);
                    youTubePlayer.player = new YT.Player('player', playerParam);

                });
            }
            //prepare player param 
            function preparePlayerParam(id) {
                var param = {
                    height: '390',
                    width: '640',
                    playerVars: {
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

                } else {
                    param.videoId = id;
                }
                //todo:David - this is temporaly integration with Angular (need move all code thare)
                var playerScope = angular.element(document.querySelector('#player')).scope();
                if (id === "playlist")
                    playerScope.$apply(playerScope.main.setLive("false"));
                else
                    playerScope.$apply(playerScope.main.setLive("true", id));

                return param;
            }

            function onPlayerReady(event) {
                youTubePlayer.player.playVideo();

            }

            function onPlayerStateChange(event) {}
        }
    }
})(angular.module('bbWebinar'));

(function (app) {
	app.service('YoutubeSVC', YoutubeSVC);
	YoutubeSVC.$inject = ["$http"];

	function YoutubeSVC ($http) {
		return {
			getPlayList: GetPlayList,
			getVideoById: GetVideoById,
			getPlayerData: getPlayerData,
			getLiveData: getLiveData,
			test: test
		};
		function GetPlayList (pageToken) {
				var data = {
					"part":"snippet",
					"playlistId": "PL3s9Wy5W7M-NLdc1mNXEk_BtJtsLIaGAQ",
					"key" : "AIzaSyBoMXQDrlRUCQCxv4fjfiyTHXog8OB2Nz0",
					"maxResults": 4
				}
				if (!!pageToken)	
					data.pageToken = pageToken;

				var param = {
						method: "GET",
						url: "https://www.googleapis.com/youtube/v3/playlistItems/",
						params: data					
				}
				return $http(param);
		}
		function GetVideoById (id) {
			var data = {
				"part":"snippet",
				"id": id,
				"key" : "AIzaSyBoMXQDrlRUCQCxv4fjfiyTHXog8OB2Nz0"
			}
			var param = {
					method: "GET",
					url: "https://www.googleapis.com/youtube/v3/videos/",
					params: data					
			}
			return $http(param);
		}
		function getPlayerData () {
			var url = 'https://www.googleapis.com/youtube/v3/search';
			var param = {
				part : 'snippet',
				eventType: 'upcoming',
				type: 'video',
				order: 'date',
				channelId : 'UCAhq4ttjWzWAT4zmPXm0DZw',
				//channelId : 'UCXBGJ0iWWa5jmSrLTvgARRQ',
				key : 'AIzaSyBoMXQDrlRUCQCxv4fjfiyTHXog8OB2Nz0',
			};
			return $http.get(url, param).then(function (r) {
				if(r.items.length > 0)
					return r;
				param.eventType = 'live';
				return $http.get(url, param).then(function (r) {
					//if no live video take spacial playlist (use simulation of request)
					if(r.items.length === 0)
						r.items = [ { id:{ videoId: "playlist" }}];
					return r;
				});
			});
		}
		function getLiveData () {
			var url = 'https://www.googleapis.com/youtubei/v1/player/live_state';
		//?alt=json&key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8
			var param = {
				alt : 'json',
				key : 'AIzaSyBoMXQDrlRUCQCxv4fjfiyTHXog8OB2Nz0',
			};
			return $http.post(url, param).then(function (r) {
				if(r.items.length > 0)
					return r;
				param.eventType = 'live';
				return $http.get(url, param).then(function (r) {
					//if no live video take spacial playlist (use simulation of request)
					if(r.items.length === 0)
						r.items = [ { id:{ videoId: "playlist" }}];
					return r;
				});
			});
		}

		function test () {
			var url = 'http://devedu.kbb1.com/webinar2/server/youtubeApi.php';
			var param = {
				test : '123'
			};
			return $http.post(url, param).then(function (r) {
				console.log(r);
			});
		}
	}
})(angular.module('bbWebinar'));


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
		vm.initVideo = initVideo;
		vm.addHypercomments = UtilitiesSVC.addHypercomments();
		return vm;
		
		function initVideo() {
		 	UtilitiesSVC.buildPlayer(); 
		 } 
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
(function (app) {
	app.controller('NavCtrl', Controller);
	Controller.$ingect = ["GetDataSVC"];
	
	function Controller (GetDataSVC) {
		var vm = this;
		vm.navList = GetDataSVC.getTopNav();
		return vm;
	}	

}(angular.module('bbWebinar')));
	(function(w, d, s, l, i) {
	    w[l] = w[l] || [];
	    w[l].push({
	        'gtm.start': new Date().getTime(),
	        event: 'gtm.js'
	    });
	    var f = d.getElementsByTagName(s)[0],
	        j = d.createElement(s),
	        dl = l != 'dataLayer' ? '&l=' + l : '';
	    j.async = true;
	    j.src =
	        '//www.googletagmanager.com/gtm.js?id=' + i + dl;
	    f.parentNode.insertBefore(j, f);
	})(window, document, 'script', 'dataLayer', 'GTM-5WGLDJ');
	(function() {
	    var widget_id = 'ygZrmdRfik';
	    var s = document.createElement('script');
	    s.type = 'text/javascript';
	    s.async = true;
	    s.src =
	        '//code.jivosite.com/script/widget/' + widget_id;
	    var ss =
	        document.getElementsByTagName('script')[0];
	    ss.parentNode.insertBefore(s, ss);
	})();

(function($) {
    window.fnames = new Array();
    window.ftypes = new Array();
    fnames[0] = 'EMAIL';
    ftypes[0] = 'email';
    fnames[1] = 'FNAME';
    ftypes[1] = 'text';
    fnames[3] = 'MMERGE3';
    ftypes[3] = 'text';
})(jQuery);

	
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
