// ==UserScript==
// @name           Album hide
// @namespace      http://userscripts.org
// @description    Album hide
// @include        http://what.cd/artist.php?id=*
// @include        https://ssl.what.cd/artist.php?id=*
// ==/UserScript==

var hide = ['single',
	'anthology',
	'bootleg',
	'mixtape',
	'guest_appearance',
	'remixed_by',
	'remix',
	'compilation',
	'live_album',
	'soundtrack',
	'ep',
	'unknown',
	'interview'];

(function() {
	for (var i = 0; i < hide.length; i++) {
		var el = document.querySelector('table[id="torrents_' + hide[i] + '"]');
		var el2 = document.querySelector('div[class="box center"] a[href="#torrents_' + hide[i] + '"]');
		if (el != null) {
			el.parentNode.removeChild(el);
			el2.parentNode.removeChild(el2);
		}
	}
})();