// ==UserScript==
// @name           YouTube Video Speedtest (in kilobits per second)
// @namespace      http://dttvb.com
// @include        http://www.youtube.com/watch?*
// ==/UserScript==

function getBytesLoaded() {
	return 0 + unsafeWindow.document.getElementById('movie_player').getVideoBytesLoaded()
}

var header = document.getElementsByTagName('h1')[0];
var span = document.createElement('span');
span.style.fontWeight = 'normal';
var text = document.createTextNode('[Speed: ]');
header.insertBefore (span, header.firstChild);
span.appendChild(text);
span.appendChild(document.createTextNode(' '));

var log = [];
setInterval (function() {

	var curKb = (getBytesLoaded() / 1024) * 8;
	var curS  = new Date().getTime() / 1000;
	log.push ([curS, curKb]);
	while (log[0][0] - log[log.length - 1][0] < -10) {
		log.shift ();
	}
	if (log.length >= 2) {
		var speed = (log[0][1] - log[log.length - 1][1]) / (log[0][0] - log[log.length - 1][0]);
		text.data = '[Speed: ' + Math.round(speed) + 'kb/s]';
	}

}, 10);

