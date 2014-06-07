// ==UserScript==
// @name           Fix Jaiku Links
// @namespace      http://www.hatena.ne.jp/Nikola/
// @description    Fix links on Jaiku
// @include        http://*.jaiku.com/*
// @exclude        http://www.jaiku.com/*
// ==/UserScript==
//
(function (){
	var toFixLinks = [
		'/logout',
		'/channel',
		'/explore'
	];
	var toFixArea = document.querySelectorAll('#header a');
	for (var i = 0, li = toFixLinks.length; i < li; i++) {
		for (var j = 0, lj = toFixArea.length; j < lj; j++) {
			if ('http://' + location.hostname + toFixLinks[i] === toFixArea[j].href) {
				toFixArea[j].href = 'http://www.jaiku.com' + toFixLinks[i];
				break;
			}
		}
	}
})();