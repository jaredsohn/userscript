// ==UserScript==
// @name           PreventFlvSelection
// @namespace      http://d.hatena.ne.jp/shobonengine/
// @include        http://www.nicovideo.jp/watch/*
// @include        http://www.nicovideo.jp/playlist/mylist/*
// @include        http://tw.nicovideo.jp/watch/*
// @include        http://es.nicovideo.jp/watch/*
// @include        http://de.nicovideo.jp/watch/*
// @include        http://live.nicovideo.jp/watch/*
// @include        http://watch.live.nicovideo.jp/watch/*
// @include        http://www.youtube.com/watch*
// ==/UserScript==

(function() {
    // -------------------------------------------------------------------------
    // 動画プレーヤーの focus を解除する
    // -------------------------------------------------------------------------
    function clickFlv(e) {
//        console.log('clickFlv: ' + e.type + ' ' + e.target + ' ' + e.currentTarget);
        e.target.blur();  // <embed>
    }
    
    // -------------------------------------------------------------------------
    // ニコニコ動画
    // -------------------------------------------------------------------------
    var flvplayer = document.getElementById('flvplayer');
    var flvplayer_container = document.getElementById('flvplayer_container');  // contains embed#flvplayer
    
    if (flvplayer && document.addEventListener) {
        flvplayer.addEventListener('click', clickFlv, false);  // Firefox3.6
        flvplayer_container.addEventListener('mouseup', clickFlv, false);  // Chrome
    }
    
    // -------------------------------------------------------------------------
    // YouTube
    // -------------------------------------------------------------------------
    var movie_player = document.getElementById('movie_player');
    var watchPlayer = document.getElementById('watch-player');  // contains embed#movie_player

    if (movie_player && document.addEventListener) {
        movie_player.addEventListener('click', clickFlv, false);  // Firefox3.6
        watchPlayer.addEventListener('mouseup', clickFlv, false);  // Chrome
    }
})();