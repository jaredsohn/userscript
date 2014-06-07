// ==UserScript==
// @name        bilibili toothbrush
// @namespace   http://www.icycat.com
// @description 牙刷科技,还原B站播放器,极简极速
// @include     *www.bilibili.tv/video/av*
// @include     *bilibili.kankanews.com/video/av*
// @version     1.7
// @run-at      document-end
// ==/UserScript==

(function() {

    var bofqi = document.getElementById('bofqi');
    var player = bofqi.getElementsByTagName('embed');

    if (player.length > 0) {

        var flashvars = player[0].getAttribute('flashvars');
        var cid_array = flashvars.match(/cid=(\d+)/);
        var cid = cid_array == null ? 'error' : cid_array[1];

        var aid_array = document.location.href.match(/av(\d+)/);
        var aid = aid_array == null ? 'error' : aid_array[1];

        if (cid == 'error' || aid == 'error') {
            return;
        }

        bofqi.innerHTML = '<iframe height="482" width="950" class="player" src="https://secure.bilibili.tv/secure,cid=' + cid + '&aid=' + aid + '" scrolling="no" border="0" frameborder="no" framespacing="0" onload="window.securePlayerFrameLoaded=true"></iframe>';

        if (navigator.userAgent.match(/Chrome/)) {
            window.addEventListener("message", function(e){eval(e.data.substr(6))}, false);
        }

    } else {
        return;
    }
})();