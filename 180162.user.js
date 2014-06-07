// ==UserScript==
// @name           Save Magnet Links
// @version        0.02
// @description    Save Magnet Links as .magnet file for Deluge AutoAdd plugin
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @include        *
// @namespace      http://scripts.lewisl.net
// ==/UserScript==

(function() {
var magnetLink = $("a[href^='magnet:?']");
magnetLink.attr("href", "data:text/plain;charset=utf-8," + encodeURIComponent(magnetLink.attr("href")))
	.attr("download", "temp.magnet");
})();