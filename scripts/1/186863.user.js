// ==UserScript==
// @name Regain Right Click
// @description Right click/select whatever you please (removes all event handlers for context menu and selection)
// @author Andrew Lovejoy
// @license 2-Clause BSD
// @version 1.1
// @include http://*
// @include https://*
// @exclude */webman/index.cgi
// ==/UserScript==

(function() {
	'use strict';
	var f = function() {
		function nukeEvents(element) {
			function nukeEvent(element, eventName) {
				element.addEventListener(eventName, function(event) {
					event.stopImmediatePropagation();
					return true;
				}, true);
			}
			nukeEvent(element, 'selectstart');
			nukeEvent(element, 'contextmenu');
			nukeEvent(element, 'dragstart');
		}
		nukeEvents(document);
		var all = document.getElementsByTagName('*');
		for (var i = 0; i < all.length; ++i) {
			nukeEvents(all[i]);
		}
	};
	var script = document.createElement('script');
	script.textContent = '(' + f.toString() + ')()';
	(document.head || document.documentElement).appendChild(script);
	script.parentNode.removeChild(script);
})();