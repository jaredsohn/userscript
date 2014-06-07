// ==UserScript==
// @name       edX youtube player 
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      https://courses.edx.org/courses/*/courseware/*
// @copyright  2012+, You
// ==/UserScript==

function change_player() {
    if (document.getElementsByClassName('video').length == 0) { return }
    play_div = document.getElementsByClassName('video')[0]
    vid = /1.00:([^,$]+)/.exec(play_div.getAttribute('data-streams'))[1]
    youtube_player = '<object width="844" height="475"><param name="movie" value="//www.youtube.com/v/' + vid + '?hl=zh_TW&amp;version=3&amp;rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="//www.youtube.com/v/' + vid + '?cc_load_policy=1&autoplay=1&vq=large&hl=zh_TW&amp;version=3&amp;rel=0" type="application/x-shockwave-flash" width="844" height="475" allowscriptaccess="always" allowfullscreen="true"></embed></object>'
    play_div.outerHTML = youtube_player
}

var id = setInterval(function(){change_player()}, 1000);