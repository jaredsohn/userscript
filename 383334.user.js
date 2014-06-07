// ==UserScript==
// @name        show imgs
// @namespace   http://userscripts.org/users/200448
// @description Replaces a href="image" with img src="image"
// @version     1
// @grant       GM_registerMenuCommand
// ==/UserScript==

function makeImgsFromLinks() {
	var as = document.getElementsByTagName('a');
	for (var i = 0; i != as.length; i++) {
		var el = as[i];
		if (el.href.match('(jpe?g|png|gif)$'))
			el.innerHTML += "<br /><img src='" + el.href + "' />";
	}
}

GM_registerMenuCommand("a -> a img", makeImgsFromLinks)
