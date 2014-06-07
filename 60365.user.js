// ==UserScript==
// @name           Gametrailers No Flash
// @namespace      none
// @description    Replaces flash player on gametrailers.com with native player
// @include        http://www.gametrailers.com/video/*
// ==/UserScript==

function setVideoPlayer(type) {
    if (!(type == current_type)) {
        if ((type == 'wmv') || (type == 'mov')) {
            movie_div.innerHTML = alternate_player.replace('VIDEO_URL', videos[type]);
            current_type = type;
        } else {
            movie_div.innerHTML = videos['flash'];
            current_type = 'flash';
        }
    }
}

var download_html = document.getElementById('MediaDownload').innerHTML;
var player_div = document.getElementById('HDPlayer');
if (!player_div) {
    player_div = document.getElementById('RegularPlayer');
}
var movie_div = player_div.getElementsByTagName('div')[0];

var videos = new Array();
videos['flash'] = movie_div.innerHTML;
videos['mov'] = download_html.match('http://www.gametrailers.com/download/.*\.mov');
videos['wmv'] = download_html.match('http://www.gametrailers.com/download/.*\.wmv');

var alternate_player = '<embed id="alternate-player" type="application/x-mplayer2" src="VIDEO_URL" width="' + movie_div.offsetWidth + '" height="' + movie_div.offsetHeight + '"><br>';
var alternatives = false;
var watch_mov = '';
var watch_wmv = '';
if (videos['mov']) {
    watch_mov = '<a href="#" id="watchmov">Quicktime</a> | ';
    alternatives = true;
}
if (videos['wmv']) {
    watch_wmv = '<a href="#" id="watchwmv">WMV</a> | ';
    alternatives = true;
}

if (alternatives) {
    var links = document.createElement('div')
    links.innerHTML = 'Watch: ' + watch_mov + watch_wmv + '<a href="#" id="watchflash">Flash</a>';
    player_div.appendChild(links);
    if (videos['mov']) {
        document.getElementById('watchmov').addEventListener('click', function el(e) {setVideoPlayer('mov'); GM_setValue('video_type', 'mov');}, false);
    }
    if (videos['wmv']) {
        document.getElementById('watchwmv').addEventListener('click', function el(e) {setVideoPlayer('wmv'); GM_setValue('video_type', 'wmv');}, false);
    }
    document.getElementById('watchflash').addEventListener('click', function el(e) {setVideoPlayer('flash'); GM_setValue('video_type', 'flash');}, false);
}

var current_type = 'flash';

var video_type = GM_getValue('video_type', 'wmv');
if (!videos[video_type]) {
    video_type = ['mov', 'wmv']['wmv' == video_type];
    if (!videos[video_type]) {
        video_type = 'flash';
    }
}

setVideoPlayer(video_type);
