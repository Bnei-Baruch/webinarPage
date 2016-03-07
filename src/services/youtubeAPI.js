(function(app) {
    app.service('YoutubeSVC', YoutubeSVC);
    YoutubeSVC.$inject = ["$http"];

    function YoutubeSVC($http) {
        return {
            getPlayList: GetPlayList,
            getVideoById: GetVideoById,
            getPlayerData: getPlayerData,
            getLiveData: getLiveData,
            test: test
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
            return $http(param).then(function (r) {
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
            return $http(param).then(function (r) {
                r.data.items[0].id = {
                    "kind": "youtube#video",
                    "videoId": r.data.items[0].id
                }
                return r.data;
            });
        }

        function getPlayerData() {
            var data = {
                "part": "snippet",
                "eventType": 'upcoming',
                "type": 'video',
                "order": 'date',
                "channelId": 'UC0JEz9QF6lT5tCqIkbzt65A',
                //"channelId": 'UCAhq4ttjWzWAT4zmPXm0DZw',
                //channelId : 'UCXBGJ0iWWa5jmSrLTvgARRQ',
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
                    if (r.data.items.length === 0)
                        r.data.items = [{ id: { videoId: "playlist" } }];
                    return r.data;
                });
            });
        }

        function getLiveData() {
            var url = 'https://www.googleapis.com/youtubei/v1/player/live_state';
            var param = {
                alt: 'json',
                key: 'AIzaSyBoMXQDrlRUCQCxv4fjfiyTHXog8OB2Nz0',
            };
            return $http.post(url, param).then(function(r) {
                if (r.data.items.length > 0)
                    return r.data;
                param.eventType = 'live';
                return $http.get(url, param).then(function(r) {
                    //if no live video take spacial playlist (use simulation of request)
                    if (r.data.items.length === 0)
                        r.data.items = [{ id: { videoId: "playlist" } }];
                    return r.data;
                });
            });
        }

        function test() {
            var url = 'http://devedu.kbb1.com/webinar2/server/youtubeApi.php';
            var param = {
                test: '123'
            };
            return $http.post(url, param).then(function(r) {
                console.log(r);
            });
        }
    }
})(angular.module('bbWebinar'));
