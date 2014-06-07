// ==UserScript==
// @author         StreamBurner.net
// @name           StreamBurner
// @version 	   1.3.1
// @description    Enhances Twitch.TV, Justin.TV and other streaming sites with new features, bug fixes, and reduced clutter.
// @namespace      https://www.streamburner.net/
// @run-at         document-start
// @include        http://justin.tv/*
// @include        http://*.justin.tv/*
// @include        http://twitch.tv/*
// @include        http://*.twitch.tv/*
// ==/UserScript==

(function() {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://run.streamburner.net/streamburner.min.js';
	document.documentElement.appendChild(script);
})();
