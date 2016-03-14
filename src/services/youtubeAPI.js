(function(app) {
    var key = "AIzaSyBoMXQDrlRUCQCxv4fjfiyTHXog8OB2Nz0";
    app.service('YoutubeSVC', YoutubeSVC);
    YoutubeSVC.$inject = ["$http"];

    function YoutubeSVC($http) {
        return {
            getPlayList: GetPlayList,
            getVideoById: GetVideoById,
            getPlayerData: getPlayerData
        };

        function GetPlayList(pageToken, playlistId) {
            var data = {
                part: "snippet",
                playlistId: playlistId || "PL3s9Wy5W7M-NLdc1mNXEk_BtJtsLIaGAQ",
                key: key,
                maxResults: 4
            };
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
                part: "snippet",
                id: id,
                key: key
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
                "eventType": 'live',
                "type": 'video',
                "order": 'date',
                "channelId": channelId || 'UCAhq4ttjWzWAT4zmPXm0DZw',
                "key": key,
            };

            var param = {
                method: "GET",
                url: 'https://www.googleapis.com/youtube/v3/search',
                params: data
            }

            return $http(param).then(function(r) {
                if (r.data.items.length > 0)
                    return r.data;
                param.params.eventType = 'upcoming';
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
