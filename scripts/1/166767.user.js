// ==UserScript==
// @name        Next Video Please
// @description Automatically plays a new related video when the current video ends
// @namespace   http://userscripts.org/users/AnnanFay
// @include     http*://www.youtube.com/watch*
// @version     2
// ==/UserScript==

// compatabiltity fixes for opera and chrome, not tested
if (!!window.opera) {
    unsafeWindow = window;
} else if (!!window.navigator.vendor.match(/Google/)) {
    var div = document.createElement('div');
    div.setAttribute('onclick','return window;');
    unsafeWindow = div.onclick();
}

(function (w) {
    var d = w.document;
    var nop = function(){};
    var player = null;
    var _onYouTubePlayerReady = w.onYouTubePlayerReady || nop;
    var _ytPlayerOnYouTubePlayerReady = w.ytPlayerOnYouTubePlayerReady || nop;

    w.onYouTubePlayerReady = w.ytPlayerOnYouTubePlayerReady = function() {
        if (!!w.videoPlayer) {
            for (var i in w.videoPlayer) {
                if (!!w.videoPlayer[i] && !!w.videoPlayer[i].setPlaybackQuality) {
                    player = w.videoPlayer[i];
                    break;
                }
            }
        } else {
            player = d.getElementById('movie_player') ||
                d.getElementById('movie_player-flash') ||
                d.getElementById('movie_player-html5') ||
                d.getElementById('movie_player-html5-flash');
        }

        if (!!player) {
            if (typeof XPCNativeWrapper === 'function') {
                player = XPCNativeWrapper.unwrap(player);
            }
            player.addEventListener('onStateChange','onPlayerStateChange');
        }

        _ytPlayerOnYouTubePlayerReady();
        _onYouTubePlayerReady();
    };

    w.onPlayerStateChange = function(state) {
        if (state == 0) {
            var related = d.getElementById('watch-related').children;
            while (true) {
                var choice = Math.round(Math.random() * related.length);
                var chosen =  related[choice].firstElementChild;
                if (chosen.href.indexOf('list') == -1) {
                    break;
                }
            }
            chosen.click();
        }
    };

}) (unsafeWindow);