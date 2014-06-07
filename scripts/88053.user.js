// ==UserScript==
// @name           Hide Wikipedia fake usermessages
// @namespace      262a1312-9013-4e8a-8de9-c7256cbf3c4d
// @description    Someone (like me) uses a fake usermessage alert box on the Wikipedia user pages. Now you can hide them.
// @include        http://*.wikipedia.org/*
// @include        https://secure.wikimedia.org/wikipedia/*
// @author         Tomchen1989
// @version        1.2.0
// ==/UserScript==
(function () {
var divs = document.getElementsByTagName("div");
var us = [];
var u;
for (i = 0, l = divs.length; i < l; i++) {
	if ( /(^|\s)usermessage(\s|$)/.test(divs[i].className) ) {
		u = divs[i];
		var uas = u.getElementsByTagName("a");
		if (uas.length>1) {
			if (uas[1].href.substr(-8)!=="diff=cur" || /(^|\s)external(\s|$)/.test(uas[1].className)) {
				u.style.display = "none";
			}
		} else {
			u.style.display = "none";
		}
	}
}
})();