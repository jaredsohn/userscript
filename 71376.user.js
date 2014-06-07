// ==UserScript==
// @name           WMHD Radio <audio>
// @namespace      http://freecog.net/2010/
// @description    Replace the embedded Java player applet with an <audio> tag.  You can use AdBlock+  to prevent the Java applet from ever loading (search for "applet" and block the .jar file's URL).
// @include        http://www.wmhdradio.org/player/
// @include        http://wmhd.rose-hulman.edu/player/
// ==/UserScript==

var applet = document.getElementsByTagName('applet')[0];
if (applet) {
	var audio = document.createElement('audio');
	var highsrc = document.createElement('source');
	highsrc.setAttribute('src', 'http://' + document.domain + ':8000/wmhd-high.ogg');
	audio.appendChild(highsrc);
	audio.setAttribute('controls', 'controls');
	audio.setAttribute('autoplay', 'autoplay');
	applet.parentNode.replaceChild(audio, applet);
}
