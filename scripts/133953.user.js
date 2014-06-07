// ==UserScript==
// @name		Spotify Break after. DEV
// @namespace	markussss.net
// @include		https://embed.spotify.com/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js?ver=1.6.1
// ==/UserScript==
var interval, nowPlaying, compare_nowPlaying;
function getNowPlaying() {
    return $('.track-name').text();
}
function playPause() {
    $('.play-pause-btn').click();
}
function checkForChange() {
    compare_nowPlaying = getNowPlaying();
    if( nowPlaying != compare_nowPlaying ) {
        playPause();
        clearInterval(interval);
    }
}
$(document).keyup(function(e) {
    if (e.keyCode == 66) {
        nowPlaying = getNowPlaying();
        interval = setInterval(checkForChange, 500);
    }
});
$(document).ready(function(){
    var width = $('#widgetContainer').css('width');
    var marginLeft = $('#widgetContainer').width()/2;
    $('body').prepend('<form method="get" action="" style="text-align:center;background-color:#313131;width:'+width+';position:absolute;top:0;left:50%;margin-left:-'+marginLeft+'px;font-family:"lucida grande",tahoma,Verdana,Arial;padding:2px;">Spotify-URI: <input type="text" name="uri"><input type="submit" value="Send"></form>');
    $('#notifBar').css({'display':'none'});
    $('#widgetContainer').css({'margin-top':'25px'});
});