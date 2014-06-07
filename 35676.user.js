// ==UserScript==
// @name		gamerLinkReset
// @description		轉換巴哈姆特開新視窗連結為普通連結 updated by by bluelovers
// @include		http://forum*.gamer.com.tw/G2.php*
// @include		http://forum*.gamer.com.tw/C.php*
// ==/UserScript==
(function() {
	D = document;
	var gamerLinkReset = function() {
		var a = D.getElementsByTagName('A');
		re = /.*\(\s?\'([^"]*)\'\s?\)/ig;
		re2 = /.*\(\s?\"([^']*)\"\s?\)/ig;

		for(i=0; i<a.length; i++) {
			tag = a[i];

			var url = tag.getAttribute('href');

			if (/confirmLink\s?\(/i.test(url)) {
				var r = url.replace(re, "$1");

				if (r == url) r = url.replace(re2, "$1");

				r = decodeURIComponent(r);
				tag.setAttribute('href', r);
				tag.href = r;

				tag.setAttribute('title', url);

				if (tag.getAttribute('target') != '_blank') tag.setAttribute('target', '_blank');
			}
		}
	}
	window.addEventListener("load", gamerLinkReset, false);
})();