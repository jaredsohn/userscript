// ==UserScript==
// @name           IMDb Poster Right Click Fix
// @author         Darkimmortal
// @namespace      http://www.imdb.com
// @description    Fixes the inability to right click on IMDb poster images.
// @include        http://www.imdb.com/*
// @include        http://imdb.com/*
// ==/UserScript==

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined'){
    	window.setTimeout(GM_wait,100);
    } else {
    	$ = unsafeWindow.jQuery; main();
    }
}

GM_wait();

function main() {
	$("img[galleryimg='no']").removeAttr("onmousemove").removeAttr("oncontextmenu").removeAttr("onmousedown");
}