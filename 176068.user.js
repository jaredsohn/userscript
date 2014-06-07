// ==UserScript==
// @name           test
// @namespace      http://userscripts.org/users/7063
// @version        2
// ==/UserScript==

/*jslint browser: true, forin: true*/

window.GMLowercaseAPIObject = function () {
	"use strict";
	var prop, match;
	for (prop in window) {
		match = prop.match(/^GM_(\S+)/);
		if (match) {this[match[1]] = window[prop]; }
	}
};
