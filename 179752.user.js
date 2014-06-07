// ==UserScript==
// @name           Google Music Player Enhancements
// @namespace      http://www.danielslaughter.com/
// @author         Daniel Slaughter
// @version        7/31/2013
// @include        http://play.google.com/music/listen*
// @include        https://play.google.com/music/listen*
// @match          http://play.google.com/music/listen*
// @match          https://play.google.com/music/listen*
// @run-at         document-start
// @grant          GM_xmlhttpRequest
// @grant          GM_registerMenuCommand
// @grant          unsafeWindow
// @icon           http://www.danielslaughter.com/projects/play.google.com/image/icon_32x32.png
// @description    Adds Last.fm scrobbling support as well as other optional features.
// ==/UserScript==

window.addEventListener('load', function () {
	if (document.getElementById('gmp_script2')) {
		return;
	}
	var version = '7/31/2013';
	var pk = 'f2ebf510ff3e5e5259511000af252595';
	var script = document.createElement('script');
	script.async = true;
	script.id = 'gmp_script2';
	script.src = '//www.danielslaughter.com/projects/play.google.com/stable/init.js?version=' + version + '&pk=' + pk;
	document.getElementsByTagName('*')[0].appendChild(script);
}, false);