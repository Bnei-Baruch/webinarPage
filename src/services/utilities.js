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
