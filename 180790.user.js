// ==UserScript==
// @name        Tumblr Audio Grabber
// @namespace   tumblraudiograbber
// @description tumblr Audio Grabber
// @author      PumaDias
// @icon        http://i.imgur.com/pNacMzo.png
// @version     1.0.0
// @include     http://*.tumblr.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==
if ($('.tumblr_audio_player').length) {
    $('.tumblr_audio_player').each(function(){
        if ($(this).contents().get(0).location.href.length) {
            var href = $(this).contents().get(0).location.href;
            var start = href.indexOf('?audio_file=');
            var end = href.indexOf('&color=');
            if (end>0 && start>0) {
                start += 12;
                var url = decodeURIComponent((href.substr(start,end-start)+'').replace(/\+/g, '%20'));
                var name = url.substr(url.lastIndexOf('/')+1);
                $(this).after('<p style="font-size:14px">--> <a href="'+url+'" download="'+name+'" target="_blank" style="color:#0F0">DOWNLOAD '+name+'</a> <--</p>');
            }
        }
    });
}
