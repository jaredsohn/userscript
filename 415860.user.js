// ==UserScript==
// @name Straight Techgig
// @id	straight_techgig_xifos
// @namespace	  in.co.tossing.toolkit.techgig
// @description	Remove URL redirection from TechGig
// @license	GPL v3 or later version
// @updateURL	  http://userscripts.org/scripts/source/415860.user.js
// @include		*://www.techgig.com/*
// @version	0.1
// @author	XiFoS
// ==/UserScript==

(function (d) {
	var all_a = d.getElementsByTagName('a');
	var a = null;
	var match;
	for(i = 0; i < all_a.length; i++) {
		a = all_a.item(i);
		if(a.href) {
			match = a.href.match(/readnews\.php/);
			if(match) {
				a.href = getQueryVariable(a.href, 'tgnews_link');
			}
		}
	}

	function urldecode(url) {
		return decodeURIComponent(url.replace(/\+/g, ' '));
	}

	function getQueryVariable(url, variable) {
		// remove all until the first `?`
		var query = url.split('?');
		query.shift(1);
		var vars = query.join('?').split('&');
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split('=');
			if (urldecode(pair[0]) == variable) {
				return urldecode(pair[1]);
			}
		}
		return null;
	}
})(document);