// ==UserScript==
// @name        Youtube-Force New Player
// @namespace   11235813
// @description Forces YouTube-Videos to play with the new Player
// @include     http://www.youtube.com/watch?v=*
// @require	http://github.com/Zahlii/Greasemonkey/raw/master/extend_js.js
// ==/UserScript==
(function() {
    handle_id = window.setInterval(check,50);
    function check() {
        if($('#movie_player')[0]) {
            $('#movie_player')[0].src = 'http://s.ytimg.com/yt/swf/watch_as3-vfl173197.swf';
            window.clearInterval(handle_id);
        }
    }
})();