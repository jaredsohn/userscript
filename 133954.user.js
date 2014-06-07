// ==UserScript==
// @name		Spotify Break After Track
// @namespace	markussss.net
// @include		https://embed.spotify.com/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js?ver=1.6.1
// ==/UserScript==
var interval, nowPlaying, compare_nowPlaying, breaking=1;
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
        $('._breakAfterWillBreakMessage').remove();
    }
}
$(document).keyup(function(e) {
    if (e.keyCode == 66) {
        if( breaking == 1 ) {
            breaking = 2;
            nowPlaying = getNowPlaying();
            $('.meta').append('<span style="position: absolute; top:3px; right: 3px;" class="_breakAfterWillBreakMessage">Will break after current track.</span>');
            interval = setInterval(checkForChange, 500);
        } else if( breaking == 2 ) {
            breaking = 1;
            clearInterval(interval);
            $('._breakAfterWillBreakMessage').remove();
        }
    } else if( e.keyCode == 32 ) {
        playPause();
    }
});
$(document).ready(function(){
    var width = $('#widgetContainer').css('width');
    var marginLeft = $('#widgetContainer').width()/2;
    $('body').prepend('<form method="get" action="" style="text-align:center;background-color:#313131;width:'+width+';position:absolute;top:0;left:50%;margin-left:-'+marginLeft+'px;font-family:"lucida grande",tahoma,Verdana,Arial;padding:2px;">Spotify-URI: <input type="text" name="uri"><input type="submit" value="Send"></form>');
    $('#notifBar').css({'display':'none'});
    $('#widgetContainer').css({'margin-top':'25px'});
});