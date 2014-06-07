// ==UserScript==
// @name           Bahamut RedirLink Remover
// @namespace      http://userscripts.org/users/allen0960
// @description    Bahamut RedirLink Remover
// @include        http://*.gamer.com.tw/*
// ==/UserScript==

(function() {
	var expr = "http://ref.gamer.com.tw/redir.php?url=".replace(/\//g,"\\/").replace(/\./g,"\\.").replace(/\?/g,"\\?");
	var re = new RegExp("^"+expr+"(.*)$");

	var a = document.getElementsByTagName("A");
	for (var i=0; i<a.length; i++) {
		var tag = a[i];
		if (tag.hasAttribute("href")) {
			var m = tag.getAttribute("href").match(re);
			if (m) {
				tag.setAttribute("href", unescape(m[1]));
				tag.setAttribute("target", "_blank");
			}
		}
	}
})();
