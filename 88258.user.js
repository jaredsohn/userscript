// ==UserScript==
// @name			Colored nick names in IRCcloud
// @version			2011-03-24_1
// @author			Lukas Lalinsky (http://oxygene.sk/lukas/), based on http://chatlogs.musicbrainz.org/mb_chatlogger.user.js
// @licence			BSD
//
// @include			http://irccloud.com/*
// @include			https://irccloud.com/*
// ==/UserScript==

(function () {

	function hash(s) {
		var h = 0;
		for (var i = 0; i < s.length; i++) {
			h = h * 33 + s.charCodeAt(i);
		}
		return h;
	}

	var colorCache = []
	function nickColor(nick) {
		if (colorCache[nick])
			return colorCache[nick];
		var h = hash(nick);
		var mod = 200;
		var r = 0 + 150 * (1.0 * (h % mod) / mod); h = Math.floor(h/mod);
		var g = 0 + 150 * (1.0 * (h % mod) / mod); h = Math.floor(h/mod);
		var b = 0 + 150 * (1.0 * (h % mod) / mod); h = Math.floor(h/mod);
		var col = "rgb("+Math.floor(r)+","+Math.floor(g)+","+Math.floor(b)+")";
		return colorCache[nick] = col;
	}

	function newMessageAdded(event) {
		var row = event.target;
		if (row.tagName != 'TR' || !row.className.match(/\bchat\b/))
			return;
		for (var i = 0; i < row.childNodes.length; i++) {
			if (row.childNodes[i].className == 'author') {
				var links = row.childNodes[i].getElementsByTagName('a');
				if (links.length > 0) {
					links[0].style.color = nickColor(links[0].textContent);
				}
				return;
			}
		}
	}

	document.getElementById('buffer').addEventListener('DOMNodeInserted', newMessageAdded, false);

})();
