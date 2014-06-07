// ==UserScript==
// @name	    Rapidshare Direct Download
// @version     1.0
// @description	version 1.0. Rapidshare Direct Download
// @namespace   Rapidshare Direct Download
// @include     http://www.rapidshare.com/#!download*
// ==/UserScript==

show();

function show()
{
	var js_download-timer_counter = document.getElementById("js_download-timer_counter");
	js_download-timer_counter.setAttribute("style", "display:none");

	var js_downloadlink = document.getElementById("js_downloadlink");
	js_downloadlink.setAttribute("style", "display:block");
	js_downloadlink.childNodes[0].setAttribute("onclick", "");
}

(function() {document.location = document.getElementById('js_downloadlink').firstChild.href;})();