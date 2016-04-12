(function(app) {
    /*temparery param of started webinar date (year, month, date, hours, minutes)*/
    app.controller('MainCtrl', ["YoutubeSVC", "UtilitiesSVC", "$rootScope", "$timeout", "$rootScope",
        function(YoutubeSVC, UtilitiesSVC, $rootScope, $timeout, $rootScope) {
            var vm = this;
            var clipId, timeoutPromise, ws;

            vm.pageCounter = 0;
            vm.currentClip = {};
            vm.playList = [];
            vm.loadPage = loadPage;
            vm.openClip = openClip;
            vm.playerMode = "playlist";
            vm.addHypercomments = UtilitiesSVC.addHypercomments($rootScope.config.chatId);
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
                ws = UtilitiesSVC.getWebsocket();
                ws.onMessage(function(data) {
                    var msg = JSON.parse(data.data);

                    switch (msg.status) {
                        case "live":
                            _switchToLiveMode();
                            break;
                        case "wait":
                            _switchToWaitMode();
                            break;
                        case "playlist":
                            _switchToPlayListMode();
                            break;
                    }
                });
            }

            function _switchToLiveMode() {
                vm.playerMode = "live";
                YoutubeSVC.getVideoById($rootScope.config.liveVideoId).then(function(item) {
                    var delta = $rootScope.config.clipStartIn - _getUTCTimeNow();
                    vm.currentClip = item;
                    if ($rootScope.config.videoTitle)
                        vm.currentClip.snippet.title = $rootScope.config.videoTitle;
                });
                $rootScope.player.loadVideoById($rootScope.config.liveVideoId);
            }

            function _switchToWaitMode() {
                vm.playerMode = "wait";
                $rootScope.player.stopVideo();
                $timeout.cancel(timeoutPromise);


                YoutubeSVC.getVideoById($rootScope.config.liveVideoId).then(function(item) {
                    var delta = $rootScope.config.clipStartIn - _getUTCTimeNow();
                    vm.currentClip = item;
                    vm.counter = {
                        url: $rootScope.config.timerImg || item.snippet.thumbnails.high.url,
                        timer: _getDateBindObj(delta)
                    };
                    _runIncreaseCount();
                });
            }

            function _switchToPlayListMode() {
                vm.playerMode = "playlist";
                loadPage(null, 0, 0);
            }

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
                    //_loadPlayerData();
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
                YoutubeSVC.getPlayList(pageToken, $rootScope.config.playListId).then(function(r) {
                    vm.playList = r;
                    vm.currentClip = r.items[0];
                    vm.currentClip.$index = vm.playList.pageInfo.resultsPerPage * vm.pageCounter + 1;


                    if ($rootScope.config.liveVideoId)
                        $rootScope.player.loadVideoById($rootScope.config.liveVideoId);
                    else if (count === 0)
                        $rootScope.player.loadVideoById(vm.currentClip.snippet.resourceId.videoId, 0);
                });
            }
        }
    ]);

}(angular.module('bbWebinar')));
