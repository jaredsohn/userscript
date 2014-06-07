// ==UserScript==
// @name           YouTube 720p Player
// @description    Enlarges YouTube's new player to 1280x720
// @include        http://*.youtube.com/watch*
// @include        http://youtube.com/watch*
// @include        https://*.youtube.com/watch*
// @include        https://youtube.com/watch*
// @version        1.2
// ==/UserScript==

var script = document.createElement('script');
script.setAttribute('type', 'text/javascript');
script.textContent += [
	function resizePlayer() {
        videoDiv = document.getElementById('player-api');
        videoDiv.setAttribute('style', 'width: 1280px !important; height: 750px !important');
	}
].join('\n');
script.textContent += "resizePlayer();\n";
var body = document.getElementsByTagName('body')[0];
body.appendChild(script);
