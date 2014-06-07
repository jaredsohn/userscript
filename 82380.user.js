// ==UserScript==
// @name           AMO RedirLink Remover
// @namespace      http://userscripts.org/users/allen0960
// @include        https://addons.mozilla.org/*
// ==/UserScript==

(function() {
	var expr = "http://outgoing.mozilla.org/".replace(/\//g,"\\/").replace(/\./g,"\\.").replace(/\?/g,"\\?");
	var re = new RegExp("^"+expr+"(\\w+)\/(\\w+)\/(.*)$");

	var a = document.getElementsByTagName("A");
	for (var i=0; i<a.length; i++) {
		var tag = a[i];
		if (tag.hasAttribute("href")) {
			var m = tag.getAttribute("href").match(re);
			if (m) {
				tag.setAttribute("href", unescape(m[3]));
				tag.setAttribute("target", "_blank");
			}
		}
	}
})();
