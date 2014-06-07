// ==UserScript==
// @name        Karttapaikka links for Small Hash Inquiry Tool
// @namespace   maeki.org
// @description Create links to Kansalaisen Karttapaikka as alternative to Google / OSM
// @include     http://tjum.anthill.de/cgi-bin/geohash.cgi?*
// @version     1
// ==/UserScript==

var allLinks = document.getElementsByTagName('a');
for (var i = 0; i < allLinks.length; i++) {
	if (allLinks[i].href.match('openstreetmap')) {
		console.log(allLinks[i]);
        lmatch = allLinks[i].href.match('mlat=([56][0-9]\.[0-9]+)&mlon=([1-3][0-9]\.[0-9]+)');
		console.log(lmatch);
		if (lmatch.length > 0) {
			var mlat = lmatch[1];
			var mlon = lmatch[2];
			var newElement = document.createElement('a');
			newElement.textContent = 'Karttapaikka';
			newElement.href = 'http://kansalaisen.karttapaikka.fi/kartanhaku/koordinaattihaku.html?y=' + mlat + '&x=' + mlon + '&srsName=EPSG%3A4258';
			allLinks[i].parentNode.insertBefore(newElement, allLinks[i].nextSibling);
			var newTextElement = document.createTextNode(' - ');
			allLinks[i].parentNode.insertBefore(newTextElement, allLinks[i].nextSibling);
			i = i + 1;
		}
	}
}