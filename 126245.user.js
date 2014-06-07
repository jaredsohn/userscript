// ==UserScript==
// @name          t.co Bypasser[modified]
// @namespace     http://www.technoticraccoon.com
// @description   Bypasses the t.co shortner on twitter
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// ==/UserScript==

/*void (function(){
	document.addEventListener("mousedown", tcoToLinkTitleURL, true);

	function tcoToLinkTitleURL(ev)
	{
		var target = ev.target;
		if (/^http(?:s?):\/\/t.co\//.test(target.href))
			target.href=target.title;
	}
}());*/

// https://gist.github.com/2969301
document.addEventListener("mouseover", function(e) {
	var t=e.target, u;
	if (!t.href) t = t.parentNode;
	if (t.href) {
		if (t.host=="t.co"){
			u=t.getAttribute("data-expanded-url");
			if (!u && t.search) {
				u=(u=t.search.match(/\burl=(.+)?&/))&&unescape(u[1]);
			} else if(!u && t.title.indexOf("http") == 0) {
				u = t.title;
			}
			if (u) t.href=u;
		}
	}
}, false);