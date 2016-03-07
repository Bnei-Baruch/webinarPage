(function(app) {
    //temparery param of started webinar date (year, month, date, hours, minutes)
    var _tempDateParam = new Date(2016, 0, 24, 17);
    /*_tempDateParam = new Date(
        _tempDateParam.getUTCFullYear(), 
        _tempDateParam.getUTCMonth(), 
        _tempDateParam.getUTCDate(),  
        _tempDateParam.getUTCHours()
    );*/
    app.controller('MainCtrl', Controller);
    Controller.$ingect = ["YoutubeSVC", "UtilitiesSVC", "$rootScope", "$timeout"];

    function Controller(YoutubeSVC, UtilitiesSVC, $rootScope, $timeout) {
        var vm = this;
        var player, clipId, timeoutPromise;


        vm.pageCounter = 0, vm.currentClip = {}, vm.playList = [];
        vm.loadPage = loadPage;
        vm.openClip = openClip;
        vm.playerMode = "live";
        vm.initVideo = initVideo;
        vm.addHypercomments = UtilitiesSVC.addHypercomments();
        return vm;

        /*initialised from html - ngInit*/
        function initVideo() {
            UtilitiesSVC.initPlayer().then(_loadPlayerData);
        }

        /** load and update data for player with function that call himself*/
        function _loadPlayerData(data) {
            YoutubeSVC.getPlayerData().then(function(r) {
                var video, id, item;

                item = r.items[0];
                id = item.id.videoId;

                if (timeoutPromise)
                    $timeout.cancel(timeoutPromise);

                timeoutPromise = $timeout(_loadPlayerData, 1 * 60 * 1000);
                var delta = $rootScope.config.clipStartIn < _getMoskowTimeNow();
                if (clipId === id) {
                    return;
                } else if (!!clipId && id.toLowerCase() !== "playlist") {
                    player.stopVideo();
                    player.loadVideoById(id);
                } else if (item.snippet.liveBroadcastContent.toLowerCase() === "upcoming" && delta) {
                    vm.playerMode = "playlist";
                    clipId = "playlist";
                    item.id.videoId = "playlist";
                    $timeout.cancel(timeoutPromise);
                    return;
                } else if (item.snippet.liveBroadcastContent.toLowerCase() === "upcoming") {
                    _switchToUpcomingMode(item);
                    return;
                } else if (item.snippet.liveBroadcastContent.toLowerCase() === "live") {
                    vm.playerMode = "live";
                }
                clipId = id;
                _buildPlayer(item);
            });
        }

        //use Moskow time couse the time in .config is Moskow time
        function _getMoskowTimeNow() {
            var _now = new Date();
            var delta = _now.getTimezoneOffset() * 60 * 1000
            var moskowDate = _now.getTime() + delta + 2 * 60 * 60 * 1000;
            return moskowDate;
        }

        function _switchToUpcomingMode(item) {
            vm.playerMode = "upcoming";
            $timeout.cancel(timeoutPromise);
            var delta = $rootScope.config.clipStartIn - _getMoskowTimeNow();

            vm.counter = {
                "url": item.snippet.thumbnails.high.url,
                "timer": _getDateBindObj(delta)
            };
            _runIncreaseCount();
        }


        /*start time counter*/
        function _runIncreaseCount() {
            var delta = _getMoskowTimeNow() - $rootScope.config.clipStartIn;
            if (delta < 0) {
                _loadPlayerData();
                $timeout.cancel(timeoutPromise);
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
            delta = new Date(startTime);
            d = delta.getUTCDate() - 1;
            h = delta.getUTCHours();
            m = delta.getUTCMinutes();
            s = delta.getUTCSeconds();
            return {"d": d, "h": h, "m": m, "s": s};
        }

        function _buildPlayer(item) {
            var defParam = _getParamObj();

            if (item.id.videoId.toLowerCase() === "playlist") {
                vm.playerMode = "playlist";
                defParam.playerVars.listType = 'playlist';
                defParam.playerVars.list = "PL3s9Wy5W7M-NLdc1mNXEk_BtJtsLIaGAQ";
                defParam.playerVars.controls = "1";
                loadPage(null, 0, 0);
            } else {
                vm.playerMode = "live";
                defParam.videoId = item.id.videoId;
            }

            player = new YT.Player('player', defParam);

        }


        //prepare player param 
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
                        player.playVideo();
                    }
                }
            };
            return param;
        }


        function openClip(clip, $index) {
            vm.currentClip = clip;
            vm.currentClip.$index = vm.playList.pageInfo.resultsPerPage * vm.pageCounter + $index + 1;
            player.loadVideoById(clip.snippet.resourceId.videoId);
        }

        function loadPage(pageToken, count) {
            vm.pageCounter += count;
            YoutubeSVC.getPlayList(pageToken).then(function(r) {
                vm.playList = r.data;
                vm.currentClip = r.data.items[0];
                vm.currentClip.$index = vm.playList.pageInfo.resultsPerPage * vm.pageCounter + 1;
            });
        }
    }

}(angular.module('bbWebinar')));
