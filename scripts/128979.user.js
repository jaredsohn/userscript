// ==UserScript==
// @name          Torrentz Infohash Magnets
// @namespace     http://userscripts.org/users/thingy
// @description   Appends a magnet link to search listings on torrentz.eu
// @include       http://torrentz.eu/*
// ==/UserScript==

(function () {
	var links = document.querySelectorAll('.results dl a');
	for (var i = 0; i < links.length; i++) {
		var link = links[i];
		var magnet = document.createElement('a');
		magnet.textContent = '\u03a9'; // omega
		magnet.style.color = '#a00';
		magnet.style.fontWeight = 'bold';
		
		var args = [
            'xt=urn:btih:' + encodeURIComponent(link.href.replace(/^.*\/([0-9a-f]{10,})($|\/.*|\?.*)/i, '$1')),
            'dn=' + encodeURIComponent(link.textContent),
            'tr=' + encodeURIComponent('udp://tracker.openbittorrent.com'),
            'tr=' + encodeURIComponent('udp://tracker.publicbt.com')
        ];
		magnet.href = 'magnet:?' + args.join('&');
		link.parentNode.insertBefore(magnet, link);
		link.parentNode.insertBefore(document.createTextNode(' '), link);
	}
}());
