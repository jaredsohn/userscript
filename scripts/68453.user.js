// ==UserScript==
// @name          Travian Report Times
// @namespace     TravianReportTimes
// @description   shows report times in village's page, map page, and in gold club farm statistics
// @include       http://*.travian.*/karte.php*
// @include       http://*.travian.*/build.php*
// @version       4
// ==/UserScript==

var links = document.getElementsByTagName('a');
for (var i=0; i<links.length; ++i) {
	try {
		var a = links[i];
		if (a.href && a.href.indexOf('berichte.php') >= 0 && a.innerHTML && a.title) {
			var text = a.innerHTML;
			if (a.title.indexOf(":") >= 0) {
				var s = a.title.split(':');
				if (s.length > 2)
					s.length = 2;
				text += " @ " + s.join(':');
				a.innerHTML = text;
			}
		}
	} catch (ignore) {
		alert('hiba: ' + ignore);
	}
};
