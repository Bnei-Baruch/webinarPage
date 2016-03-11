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
    UtilitiesSVC.$inject = ["$q"];

    function UtilitiesSVC($q) {


        return {
            addHypercomments: addHypercomments,
            initPlayer: initPlayer
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
        /*
            init youtube player
        */
        function initPlayer() {
            var deferred = $q.defer();
            window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

            return deferred.promise;

            function onYouTubeIframeAPIReady() {
                deferred.resolve(true);
            }
        }
    }
})(angular.module('bbWebinar'));

(function(app) {
    app.service('YoutubeSVC', YoutubeSVC);
    YoutubeSVC.$inject = ["$http"];

    function YoutubeSVC($http) {
        return {
            getPlayList: GetPlayList,
            getVideoById: GetVideoById,
            getPlayerData: getPlayerData
        };

        function GetPlayList(pageToken) {
            var data = {
                "part": "snippet",
                "playlistId": "PL3s9Wy5W7M-NLdc1mNXEk_BtJtsLIaGAQ",
                "key": "AIzaSyBoMXQDrlRUCQCxv4fjfiyTHXog8OB2Nz0",
                "maxResults": 4
            }
            if (!!pageToken)
                data.pageToken = pageToken;

            var param = {
                method: "GET",
                url: "https://www.googleapis.com/youtube/v3/playlistItems/",
                params: data
            }
            return $http(param).then(function(r) {
                return r.data;
            });
        }

        function GetVideoById(id) {
            var data = {
                "part": "snippet",
                "id": id,
                "key": "AIzaSyBoMXQDrlRUCQCxv4fjfiyTHXog8OB2Nz0"
            }
            var param = {
                method: "GET",
                url: "https://www.googleapis.com/youtube/v3/videos/",
                params: data
            }
            return $http(param).then(function(r) {
                r.data.items[0].id = {
                    "kind": "youtube#video",
                    "videoId": r.data.items[0].id
                }
                return r.data;
            });
        }
        //TODO: not take into account that can be two upcomming/live events
        function getPlayerData(channelId) {
            var data = {
                "part": "snippet",
                "eventType": 'upcoming',
                "type": 'video',
                "order": 'date',
                "channelId": channelId || 'UCAhq4ttjWzWAT4zmPXm0DZw',
                "key": 'AIzaSyBoMXQDrlRUCQCxv4fjfiyTHXog8OB2Nz0',
            };

            var param = {
                method: "GET",
                url: 'https://www.googleapis.com/youtube/v3/search',
                params: data
            }

            return $http(param).then(function(r) {
                if (r.data.items.length > 0)
                    return r.data;
                param.params.eventType = 'live';
                return $http(param).then(function(r) {
                    //if no live video take spacial playlist (use simulation of request)
                    if (r.data.items.length > 0) {
                        return r.data;
                    } else {

                        return {
                            "items": [{
                                "id": { "videoId": "playlist" },
                                "snippet": { "liveBroadcastContent": "playlist" }
                            }]
                        };
                    }
                });
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
(function(app) {
    'use strict'
    /*temparery param of started webinar date (year, month, date, hours, minutes)*/
    app.controller('MainCtrl', Controller);
    Controller.$ingect = ["YoutubeSVC", "UtilitiesSVC", "$rootScope", "$timeout"];

    function Controller(YoutubeSVC, UtilitiesSVC, $rootScope, $timeout) {
        var vm = this;
        var clipId, timeoutPromise;


        vm.pageCounter = 0;
        vm.currentClip = {};
        vm.playList = [];
        vm.loadPage = loadPage;
        vm.openClip = openClip;
        vm.playerMode = "playlist";
        vm.addHypercomments = UtilitiesSVC.addHypercomments();
        initVideo();
        return vm;

        /*initialise youtube player API*/
        function initVideo() {
            UtilitiesSVC.initPlayer().then(function(r) {
                if (!$rootScope.player) {
                    var _obj = _getParamObj();
                    $rootScope.player = new YT.Player('player', _obj);
                }
            });
        }

        /** load and update data for player with function that call himself*/
        function _loadPlayerData() {
            YoutubeSVC.getPlayerData($rootScope.config.channelId)
                .then(_loadPlayerDataCallback);
        }

        function _loadPlayerDataCallback(r) {
            var video, id, item;

            item = r.items[0];
            id = item.id.videoId;

            if (timeoutPromise)
                $timeout.cancel(timeoutPromise);

            timeoutPromise = $timeout(_loadPlayerData, 1 * 60 * 1000);
            var delta = $rootScope.config.clipStartIn - _getUTCTimeNow();
            if (clipId === id && item.snippet.liveBroadcastContent === vm.playerMode) {
                return;
            } else if (item.snippet.liveBroadcastContent.toLowerCase() === "upcoming" && (delta + 1 * 30 * 60 * 1000 < 0)) {
                _switchToPlayListMode(item);
                $timeout.cancel(timeoutPromise);
            } else if (id === "playlist") {
                _switchToPlayListMode(item);
            } else if (item.snippet.liveBroadcastContent.toLowerCase() === "upcoming") {
                _switchToUpcomingMode(item);
            } else if (item.snippet.liveBroadcastContent.toLowerCase() === "live") {
                _switchToLiveMode(item);
            }
            clipId = id;
        }

        function _switchToLiveMode(item) {
            vm.playerMode = "live";
            vm.currentClip = item;
            $rootScope.player.loadVideoById(item.id.videoId);
        }

        function _switchToPlayListMode(item) {
            vm.playerMode = "playlist";
            var list = $rootScope.config.playListId || "PL3s9Wy5W7M-NLdc1mNXEk_BtJtsLIaGAQ";
            $rootScope.player.loadPlaylist({
                'list': list,
                'listType': 'playlist'
            });
            loadPage(null, 0, 0);
        }

        function _switchToUpcomingMode(item) {
            vm.playerMode = "upcoming";
            $rootScope.player.stopVideo();
            vm.currentClip = item;
            $timeout.cancel(timeoutPromise);
            var delta = $rootScope.config.clipStartIn - _getUTCTimeNow();

            vm.counter = {
                "url": item.snippet.thumbnails.high.url,
                "timer": _getDateBindObj(delta)
            };
            _runIncreaseCount();
        }


        /*use Moskow time couse the time in .config is Moskow time*/
        function _getUTCTimeNow() {
            var d = new Date();
            var nowUTC = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
            return nowUTC;
        }

        /*start time counter*/
        function _runIncreaseCount() {
            var delta = $rootScope.config.clipStartIn - _getUTCTimeNow();
            if (delta < 0) {
                vm.counter.timer = _getDateBindObj(delta);
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function() {
                    _loadPlayerData();
                }, 10 * 1000);
                return;
            }

            timeoutPromise = $timeout(function() {
                vm.counter.timer = _getDateBindObj(delta);
                _runIncreaseCount();
            }, 100);
        }

        function _getDateBindObj(startTime) {
            if (!startTime)
                return "";
            var delta, d, h, m, s;
            if (startTime <= 0)
                return { "d": 0, "h": 0, "m": 0, "s": 0 };
            delta = new Date(startTime);
            d = delta.getUTCDate() - 1;
            h = delta.getUTCHours();
            m = delta.getUTCMinutes();
            s = delta.getUTCSeconds();
            return { "d": d, "h": h, "m": m, "s": s };
        }

        /*prepare player param */
        function _getParamObj(id) {
            var param = {
                height: '390',
                width: '640',
                playerVars: {
                    rel: 0,
                    fresca_preroll: 1,
                    controls: 1
                },
                events: {
                    "onReady": function(event) {
                        _loadPlayerData();
                    }
                }
            };
            return param;
        }


        function openClip(clip, $index) {
            vm.currentClip = clip;
            vm.currentClip.$index = vm.playList.pageInfo.resultsPerPage * vm.pageCounter + $index + 1;
            $rootScope.player.loadVideoById(clip.snippet.resourceId.videoId);
        }

        function loadPage(pageToken, count) {
            vm.pageCounter += count;
            YoutubeSVC.getPlayList(pageToken).then(function(r) {
                vm.playList = r;
                vm.currentClip = r.items[0];
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
