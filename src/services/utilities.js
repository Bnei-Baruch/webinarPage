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
