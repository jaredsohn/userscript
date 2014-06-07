// ==UserScript==
// @name        Universal HTML5 for YouTube
// @description Some videos, especially those of mega channels, are not available in HTML5 by default, but they can be viewable in HTML5 if embedded.  This scrip simply replaces the video area with an embedded frame!
// @namespace   http://userscripts.org/users/osamak
// @include     https://www.youtube.com/watch*
// @include     http://www.youtube.com/watch*
// @version     1.1
// @grant       none
// ==/UserScript==
//
//  To the extent possible under law, Osama Khalid has waived all
//  copyright and related or neighboring rights to Universal HTML5 for
//  YouTube.

url = document.location;
patt= /v=.{11}/i;
video_id = patt.exec(url);
video_id = video_id[0].substr(2,13);
document.getElementById("watch7-player").innerHTML="<iframe width=640 height=390 src=\"https://www.youtube.com/embed/" + video_id + "?autoplay=1\" frameborder=0 allowfullscreen></iframe>";
