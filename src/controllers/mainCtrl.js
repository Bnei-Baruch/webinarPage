(function(app) {
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

            if (timeoutPromise) {
                $timeout.cancel(timeoutPromise);
            }

            timeoutPromise = $timeout(_loadPlayerData, 1 * 60 * 1000);
            var delta = $rootScope.config.clipStartIn - _getUTCTimeNow();
            if (clipId === id && _modeIsNotChanged(item.snippet.liveBroadcastContent, vm.playerMode)) {
                return;
            } else if (item.snippet.liveBroadcastContent.toLowerCase() === "upcoming" && (delta < 0)) {
                _switchToLiveMode(item);
            } else if (id === "playlist") {
                _switchToPlayListMode(item);
            } else if (item.snippet.liveBroadcastContent.toLowerCase() === "upcoming") {
                _switchToUpcomingMode(item);
            } else{
                _switchToLiveMode(item);
            }
            clipId = id;
        }

        function _modeIsNotChanged(newVal, oldVal) {
            var _modeNew = "playlist",
                _modeOld = "playlist";

            if (newVal === "live" || newVal === "upcoming") {
                _modeNew = "live";
            }
            if (oldVal === "live" || oldVal === "upcoming") {
                _modeOld = "live";
            }
            return _modeNew === _modeOld;
        }

        function _switchToLiveMode(item) {
            vm.playerMode = "live";
            vm.currentClip = item;
            $rootScope.player.loadVideoById(item.id.videoId);
        }

        function _switchToPlayListMode(item) {
            vm.playerMode = "playlist";
            $rootScope.player.loadPlaylist({
                list: $rootScope.config.playListId || "PL3s9Wy5W7M-NLdc1mNXEk_BtJtsLIaGAQ",
                listType: 'playlist'
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
                url: $rootScope.config.timerImg || item.snippet.thumbnails.high.url,
                timer: _getDateBindObj(delta)
            };
            _runIncreaseCount();
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
                clipId = "";
                timeoutPromise = $timeout(function() {
                    _loadPlayerData();
                }, 1 * 1000);
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
            });
        }
    }

}(angular.module('bbWebinar')));
