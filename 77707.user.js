// ==UserScript==
// @name           YouTube Gnash Script
// @namespace      http://*.youtube.com/watch?v=*
// @description    Enables Gnash Playback On YouTube
// @include        http://*.youtube.com/watch?v=*
// ==/UserScript==

var goodlink, goodlink2;


goodlink = document.getElementsByTagName("link").item(4).href;
goodlink2 = goodlink.replace(/.*watch\?v=(.*)/i, "$1");
goodlink2 = "http://www.youtube.com/v/"+goodlink2;

goodlink2 = "<object width='640' height='505'><param name='movie' value='"+goodlink2+"&hl=nl_NL&fs=1&'></param><param name='allowFullScreen' value='true'></param><param name='allowscriptaccess' value='always'></param><embed src='"+goodlink2+"&hl=nl_NL&fs=1&' type='application/x-shockwave-flash' allowscriptaccess='always' allowfullscreen='true' width='640' height='505'></embed></object>";

document.getElementById("watch-video").innerHTML = goodlink2;
