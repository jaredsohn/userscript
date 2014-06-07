// ==UserScript==
// @name           Youtube for Gnash
// @namespace      
// @description    Makes able Gnash to play Youtube videos. 
// @include        http://*youtube.com/*
// ==/UserScript==

var adress = String(window.location).replace(/&.*/, "");
adress = adress.replace(/.*watch\?v=(.*)/i, "$1");
if(document.getElementById("watch-video").innerHTML.search(/flash-player/i) >= 0){
	document.getElementById("watch-video").innerHTML = "<object width='640' height='390'><param name='movie' value='http://youtube.com/v/"+adress+"'></param><param name='allowFullScreen' value='true'></param><param name='allowscriptaccess' value='always'></param><embed src='http://youtube.com/v/"+adress+"' type='application/x-shockwave-flash' allowscriptaccess='always' allowfullscreen='true' width='640' height='390'></embed></object>";
}
