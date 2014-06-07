// ==UserScript==
// @name       RYM: Click to see youtube videos
// @namespace  http://rateyourmusic.com/~BruceWayne
// @version    0.1
// @include      http://rateyourmusic.com/*
// @include      https://rateyourmusic.com/*
// @copyright  2013+, Old Brucey Bastard
// ==/UserScript==


var $ = unsafeWindow.jQuery; 

youtube = '<object width="YTWID" height="YTHEI"><param name="movie" value="//www.youtube.com/v/VIDEO_CODE=en_GB&amp;version=3">'
youtube += '</param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param>'
youtube += '<embed src="//www.youtube.com/v/VIDEO_CODE?hl=en_GB&amp;version=3" type="application/x-shockwave-flash" width="YTWID" height="YTHEI" allowscriptaccess="always" allowfullscreen="true"></embed></object>'

$.each($('.youtube_embed'), function(){
    $(this).bind('click', function(event){
        youtubeId = $(this).parent().attr('data-youtube-id');
        $(this).parent().attr('href','');
        $(this).html(youtube.replace('VIDEO_CODE',youtubeId).replace('VIDEO_CODE',youtubeId).replace('YTWID',$(this).width()).replace('YTWID',$(this).width()).replace('YTHEI',$(this).height()).replace('YTHEI',$(this).height()));
        return false;
    });
}, false)   
