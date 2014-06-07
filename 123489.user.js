// ==UserScript==
// @name           4chan 18/01/2012 No Spoiler
// @namespace      Bullete
// @description    No spoiler.
// @include        http://boards.4chan.org/*
// @version        2.0
// ==/UserScript==

function ChanNoSpoilers(){
	var spoilers = document.getElementsByClassName("spoiler");
	for(var i = 0, l = spoilers.length; i<l; ++i){
		var spoiler = spoilers[i];
		spoiler.setAttribute("style","");
		spoiler.setAttribute("onmouseout","");
		spoiler.setAttribute("onmouseover","");
	}
}

var dd = document.getElementsByName('delform')[0];
if (typeof dd === 'object') dd.addEventListener('DOMNodeInserted', ChanNoSpoilers, false);

ChanNoSpoilers();