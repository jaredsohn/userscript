// ==UserScript==
// @name           KTXP Magnetifier
// @namespace      http://blog.bcse.info/ktxp-magnetifier
// @description    Add Magnet URI to KTXP
// @version        0.1
// @include        http://bt.ktxp.com/*
// ==/UserScript==

var magnet_icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJBAMAAAASvxsjAAAAFVBMVEX%2F%2F%2F8AAAAICAicnJze3t7%2FAAD%2FCAhS6jJCAAAAAXRSTlMAQObYZgAAADRJREFUaN5jUFRSUlJgUHFRcVFgEAGToklKaUAyEEyGqgFJw9C0JAMGRtE0JQYGBkFBAQYA4gkICX1b4oIAAAAASUVORK5CYII%3D';
var titles = document.querySelectorAll('td div.title');
for (var i = 0; i < titles.length; i++) {
	var links = titles[i].querySelectorAll('a[href$=".torrent"],a:not[rel="external"]');
	alert(links[0].href + links[1].innerText);
	//magnet:?xt=urn:sha1:
}