// ==UserScript==
// @name           TGTV Livestream Popup
// @namespace      armeagle.nl
// @description    Adds a popup link to the TGTV Livestream page(s) so you can watch the stream in a small window. Also enables the fullscreen button.
// @include        http://total.gamingradio.net/
// @include        http://total.gamingradio.net/chat
// ==/UserScript==
try {
var livestream_cont = document.getElementById('livestreamPlayer').parentNode;

var link = document.createElement('div');
link.appendChild(document.createTextNode('Open in popup'));
link.setAttribute('style','cursor: pointer; text-decoration: underline;');
link.addEventListener('click',
	function(event) {
		window.open("http://armeagle.nl/tgtvmin.html", "TGTV Livestream", "width=560, height=317");
	},
	true
);

livestream_cont.appendChild(link);
} catch (ex) { alert(ex) }